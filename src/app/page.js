"use client";
import React, { useEffect, useState, useCallback } from "react";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import ar from "i18n-iso-countries/langs/ar.json";
import "./App.css";
import Link from "next/link";
import { useData } from "./Context/DarklightContext";
import { useData2 } from "./Context/Arabic";
import { useSession, signIn } from "next-auth/react";
import Footer from "./components/Footer";

countries.registerLocale(en);
countries.registerLocale(ar);

function toFloatingICSDate(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    const hh = String(dateObj.getHours()).padStart(2, "0");
    const mm = String(dateObj.getMinutes()).padStart(2, "0");
    const ss = String(dateObj.getSeconds()).padStart(2, "0");
    return `${y}${m}${d}T${hh}${mm}${ss}`;
}

function toUTCICSDate(dateObj) {
    return dateObj.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function toLocalISOString(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    const hh = String(dateObj.getHours()).padStart(2, "0");
    const mm = String(dateObj.getMinutes()).padStart(2, "0");
    const ss = String(dateObj.getSeconds()).padStart(2, "0");
    return `${y}-${m}-${d}T${hh}:${mm}:${ss}`;
}

export default function Home() {
    const apikeyforcountry = "b721f60ec45901c4df9158699cdddf564ad21360a80c12885e2556a3c25cec58";

    const [PrayerData, SetApi] = useState({});
    const [CountryData, SetCountry] = useState([]);
    const [selecter, setsec] = useState("");
    const [sel2, set2] = useState("");
    const [State, setSate] = useState([]);
    const [now, setNow] = useState(null);

    const [gpsCoords, setGpsCoords] = useState(null);
    const [isDetectingLocation, setIsDetectingLocation] = useState(false);
    const [locationNotice, setLocationNotice] = useState(null);

    const [isSyncing, setIsSyncing] = useState(false);
    const [syncMessage, setSyncMessage] = useState(null);
    const [showSyncModal, setShowSyncModal] = useState(false);
    const [copiedFeed, setCopiedFeed] = useState(false);

    const {
        K, is12Hours,
        eventBusy,
        calcMethod,
        asrSchool,
        preBuffer,
        postBuffer,
        selectedPrayers,
        minuteOffsets,
        exportRange,
        setExportRange,
    } = useData();

    const { isarabic } = useData2();
    const { data: session } = useSession();

    useEffect(() => { setNow(new Date()); }, []);

    const date = now || new Date(0);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
        date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;

    let FajrInt = PrayerData.data?.timings?.Fajr;
    let DhuhrInt = PrayerData.data?.timings?.Dhuhr;
    let AsrInt = PrayerData.data?.timings?.Asr;
    let MaghribInt = PrayerData.data?.timings?.Maghrib;
    let IshaInt = PrayerData.data?.timings?.Isha;

    useEffect(() => {
        fetch("https://api.countrystatecity.in/v1/countries", {
            headers: {
                "X-CSCAPI-KEY": `${apikeyforcountry}`,
            },
        })
            .then((res) => res.json())
            .then((coun) => SetCountry(Array.isArray(coun) ? coun : []))
            .catch(() => SetCountry([]));
    }, []);

    const detectUserLocation = useCallback(() => {
        if (typeof window === "undefined" || !navigator.geolocation) {
            setLocationNotice(isarabic ? "تحديد الموقع الجغرافي غير مدعوم في متصفحك." : "Geolocation is not supported by your browser.");
            return;
        }

        setIsDetectingLocation(true);
        setLocationNotice(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                try {
                    const geoRes = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=${isarabic ? "ar" : "en"}`
                    );
                    const geoData = await geoRes.json();

                    const detectedCity = geoData.city || geoData.locality || geoData.principalSubdivision || "Current Location";
                    const detectedCountryCode = geoData.countryCode || "SA";
                    const detectedCountryName = geoData.countryName || "";

                    setGpsCoords({
                        latitude: lat,
                        longitude: lng,
                        cityName: detectedCity,
                        countryCode: detectedCountryCode,
                        countryName: detectedCountryName,
                    });

                    setsec(detectedCountryCode);
                    set2(detectedCity);

                    const pRes = await fetch(
                        `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${lat}&longitude=${lng}&method=${calcMethod || 4}&school=${asrSchool || 0}`
                    );
                    const pData = await pRes.json();
                    if (pData?.data) {
                        SetApi(pData);
                    }
                } catch (e) {
                    try {
                        const pRes = await fetch(
                            `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${lat}&longitude=${lng}&method=${calcMethod || 4}&school=${asrSchool || 0}`
                        );
                        const pData = await pRes.json();
                        if (pData?.data) {
                            SetApi(pData);
                            setGpsCoords({ latitude: lat, longitude: lng, cityName: "My Location", countryCode: "SA" });
                            set2("My Location");
                        }
                    } catch (err) { }
                } finally {
                    setIsDetectingLocation(false);
                }
            },
            (error) => {
                setIsDetectingLocation(false);
                if (error.code === error.PERMISSION_DENIED) {
                    setLocationNotice(
                        isarabic
                            ? "تم رفض إذن الموقع، يمكنك اختيار الدولة والمدينة يدويًا أدناه."
                            : "Location permission denied. You can select your country and city manually below."
                    );
                } else {
                    setLocationNotice(
                        isarabic
                            ? "تعذر تحديد الموقع، يرجى الاختيار يدويًا."
                            : "Could not auto-detect location. Please choose manually."
                    );
                }
            },
            { timeout: 8000, enableHighAccuracy: true }
        );
    }, [formattedDate, calcMethod, asrSchool, isarabic]);

    useEffect(() => {
        detectUserLocation();
    }, [detectUserLocation]);

    const MapofCount = CountryData.map((items) => (
        <option key={items.id} value={items.iso2}>
            {isarabic ? (countries.getName(items.iso2, "ar") || items.name) : items.name}
        </option>
    ));

    const Mapofstate = State.map((items) => (
        <option key={items.id} value={items.name}>
            {items.name}
        </option>
    ));

    function formatToISO(timeString, addMins = 0, baseDate = null) {
        if (!timeString) return null;
        const cleanTime = timeString.split(" ")[0];
        const [hours, mins] = cleanTime.split(":").map(Number);

        const eventDate = baseDate ? new Date(baseDate) : new Date();
        eventDate.setHours(hours, mins + addMins, 0, 0);

        return eventDate;
    }

    useEffect(() => {
        if (!selecter) return;
        fetch(
            `https://api.countrystatecity.in/v1/countries/${selecter}/states`,
            {
                headers: {
                    "X-CSCAPI-KEY": `${apikeyforcountry}`,
                },
            }
        )
            .then((res) => {
                if (!res.ok) throw new Error(`States request failed: ${res.status}`);
                return res.json();
            })
            .then((state) => {
                setSate(Array.isArray(state) ? state : []);
            })
            .catch((err) => {
                console.error("Failed to load states:", err);
                setSate([]);
            });
    }, [selecter]);

    useEffect(() => {
        if (!sel2 || !selecter) return;
        if (gpsCoords && (sel2 === gpsCoords.cityName && selecter === gpsCoords.countryCode)) return;

        fetch(
            `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=${encodeURIComponent(sel2)}&country=${encodeURIComponent(selecter)}&method=${calcMethod || 4}&school=${asrSchool || 0}`
        )
            .then((res) => res.json())
            .then((time) => SetApi(time))
            .catch((err) => console.error("TimingsByCity error:", err));
    }, [sel2, selecter, formattedDate, calcMethod, asrSchool, gpsCoords]);

    const offsetFajr = minuteOffsets?.Fajr || 0;
    const offsetDhuhr = minuteOffsets?.Dhuhr || 0;
    const offsetAsr = minuteOffsets?.Asr || 0;
    const offsetMaghrib = minuteOffsets?.Maghrib || 0;
    const offsetIsha = minuteOffsets?.Isha || 0;

    const fajrStart = formatToISO(FajrInt, offsetFajr - (preBuffer || 0));
    const dhuhrStart = formatToISO(DhuhrInt, offsetDhuhr - (preBuffer || 0));
    const asrStart = formatToISO(AsrInt, offsetAsr - (preBuffer || 0));
    const maghribStart = formatToISO(MaghribInt, offsetMaghrib - (preBuffer || 0));
    const ishaStart = formatToISO(IshaInt, offsetIsha - (preBuffer || 0));

    const isDataValid = fajrStart && dhuhrStart && asrStart && maghribStart && ishaStart;

    const allSingleDayEvents = isDataValid
        ? [
            { key: "Fajr", title: isarabic ? "صلاة الفجر" : "Fajr Prayer", start: fajrStart, raw: FajrInt },
            { key: "Dhuhr", title: isarabic ? "صلاة الظهر" : "Dhuhr Prayer", start: dhuhrStart, raw: DhuhrInt },
            { key: "Asr", title: isarabic ? "صلاة العصر" : "Asr Prayer", start: asrStart, raw: AsrInt },
            { key: "Maghrib", title: isarabic ? "صلاة المغرب" : "Maghrib Prayer", start: maghribStart, raw: MaghribInt },
            { key: "Isha", title: isarabic ? "صلاة العشاء" : "Isha Prayer", start: ishaStart, raw: IshaInt },
        ]
        : null;

    const events = allSingleDayEvents
        ? allSingleDayEvents.filter((ev) => selectedPrayers ? selectedPrayers[ev.key] !== false : true)
        : null;

    function buildICS(eventsList) {
        const activeLocation = sel2 || gpsCoords?.cityName || "My Location";
        const lines = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//PrayerSync//EN",
            "CALSCALE:GREGORIAN",
            `X-WR-CALNAME:PrayerSync - ${activeLocation}`,
            "REFRESH-INTERVAL;VALUE=DURATION:PT6H",
        ];

        const durationMinutes = (preBuffer || 0) + (postBuffer || 30);

        eventsList.forEach((ev, idx) => {
            const endDate = new Date(ev.start.getTime() + durationMinutes * 60000);
            lines.push(
                "BEGIN:VEVENT",
                `UID:${idx}-${ev.start.getTime()}@prayer-sync.vercel.app`,
                `DTSTAMP:${toUTCICSDate(new Date())}`,
                `DTSTART:${toFloatingICSDate(ev.start)}`,
                `DTEND:${toFloatingICSDate(endDate)}`,
                `SUMMARY:${ev.title}`,
                `DESCRIPTION:${ev.title} - Time: ${ev.raw}\\n🧭 Qibla: https://qiblafinder.withgoogle.com\\n📖 Adhkar: https://sunnah.com/hisn`,
                `LOCATION:${activeLocation}`,
                `TRANSP:${eventBusy !== false ? "OPAQUE" : "TRANSPARENT"}`,
                "END:VEVENT"
            );
        });

        lines.push("END:VCALENDAR");
        return lines.join("\r\n");
    }

    const baseUrl = "https://prayer-sync.vercel.app";
    const prayersQuery = Object.keys(selectedPrayers || {}).filter((k) => selectedPrayers[k]).join(",");
    const offsetsQuery = Object.entries(minuteOffsets || {}).map(([k, v]) => `${k}:${v}`).join(",");
    const liveWebcalUrl = `${baseUrl}/api/calendar/feed?country=${encodeURIComponent(selecter || "SA")}&city=${encodeURIComponent(sel2 || "Makkah")}&method=${calcMethod || 4}&school=${asrSchool || 0}&preBuffer=${preBuffer || 0}&postBuffer=${postBuffer || 30}&busy=${eventBusy !== false}&prayers=${prayersQuery}&offsets=${offsetsQuery}&lang=${isarabic ? "ar" : "en"}`.replace(/^https?:\/\//, "webcal://");

    async function fetchCalendarEvents(rangeType) {
        const curYear = date.getFullYear();
        const curMonth = date.getMonth() + 1;
        let daysData = [];

        if (rangeType === "today") {
            return events || [];
        }

        const monthsToFetch = rangeType === "year" ? 12 : 1;
        for (let m = curMonth; m <= (rangeType === "year" ? 12 : curMonth); m++) {
            try {
                let fetchUrl;
                if (gpsCoords && !sel2) {
                    fetchUrl = `https://api.aladhan.com/v1/calendar/${curYear}/${m}?latitude=${gpsCoords.latitude}&longitude=${gpsCoords.longitude}&method=${calcMethod || 4}&school=${asrSchool || 0}`;
                } else {
                    fetchUrl = `https://api.aladhan.com/v1/calendarByCity/${curYear}/${m}?city=${encodeURIComponent(sel2 || "Makkah")}&country=${encodeURIComponent(selecter || "SA")}&method=${calcMethod || 4}&school=${asrSchool || 0}`;
                }

                const response = await fetch(fetchUrl);
                const monthData = await response.json();
                if (monthData?.data && Array.isArray(monthData.data)) {
                    daysData = [...daysData, ...monthData.data];
                }
            } catch (err) {
                console.error("Failed to fetch month range:", err);
            }
        }

        if (rangeType === "7days") {
            const todayDate = date.getDate();
            daysData = daysData.filter((d) => {
                const p = d.date?.gregorian?.date?.split("-");
                if (!p) return false;
                const dNum = parseInt(p[0], 10);
                return dNum >= todayDate && dNum < todayDate + 7;
            });
        }

        const rangeEvents = [];
        const prayerKeyNames = {
            Fajr: isarabic ? "صلاة الفجر" : "Fajr Prayer",
            Dhuhr: isarabic ? "صلاة الظهر" : "Dhuhr Prayer",
            Asr: isarabic ? "صلاة العصر" : "Asr Prayer",
            Maghrib: isarabic ? "صلاة المغرب" : "Maghrib Prayer",
            Isha: isarabic ? "صلاة العشاء" : "Isha Prayer",
        };

        daysData.forEach((dayItem) => {
            const dateParts = dayItem.date?.gregorian?.date?.split("-");
            if (!dateParts || dateParts.length < 3) return;

            const dayNum = parseInt(dateParts[0], 10);
            const monthNum = parseInt(dateParts[1], 10) - 1;
            const yearNum = parseInt(dateParts[2], 10);
            const timings = dayItem.timings || {};

            ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].forEach((prayerKey) => {
                if (selectedPrayers && selectedPrayers[prayerKey] === false) return;
                const timeStr = timings[prayerKey];
                if (!timeStr) return;

                const clean = timeStr.split(" ")[0];
                const [h, m] = clean.split(":").map(Number);
                const offset = minuteOffsets?.[prayerKey] || 0;

                const azanDate = new Date(yearNum, monthNum, dayNum, h, m + offset, 0, 0);
                const startDate = new Date(azanDate.getTime() - (preBuffer || 0) * 60 * 1000);
                const endDate = new Date(azanDate.getTime() + (postBuffer || 30) * 60 * 1000);

                rangeEvents.push({
                    title: prayerKeyNames[prayerKey] || prayerKey,
                    start: startDate,
                    end: endDate,
                    raw: timeStr,
                });
            });
        });

        return rangeEvents;
    }

    async function downloadICS() {
        if (!events) return;
        try {
            const eventsToExport = await fetchCalendarEvents(exportRange || "month");
            if (eventsToExport.length > 0) {
                const icsContent = buildICS(eventsToExport);
                const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `prayer-times-${exportRange}-${formattedDate}.ics`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                setShowSyncModal(false);
            }
        } catch (err) {
            console.error("Export error:", err);
        }
    }

    async function syncToGoogleCalendar() {
        if (!events) return;
        if (!session || !session.accessToken) {
            signIn("google");
            return;
        }

        setIsSyncing(true);
        setSyncMessage(null);

        try {
            const fetched = await fetchCalendarEvents(exportRange || "month");
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

            const prayerEventsToSync = fetched.map((ev) => ({
                title: ev.title,
                start: toLocalISOString(ev.start),
                end: toLocalISOString(ev.end || new Date(ev.start.getTime() + (postBuffer || 30) * 60000)),
                description: `${ev.title} (${ev.raw}) - PrayerSync\\n🧭 Qibla: https://qiblafinder.withgoogle.com\\n📖 Adhkar: https://sunnah.com/hisn`,
                location: sel2 || gpsCoords?.cityName || "My Location",
                timeZone: tz,
            }));

            const syncRes = await fetch("/api/calendar/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    events: prayerEventsToSync,
                    accessToken: session.accessToken,
                    timeZone: tz,
                    isBusy: eventBusy !== false,
                }),
            });

            const resData = await syncRes.json();

            if (syncRes.ok && resData.success) {
                setSyncMessage({
                    type: "success",
                    text: isarabic
                        ? `تمت مزامنة ${resData.createdCount} صلاة بنجاح مع تقويم Google!`
                        : `Successfully synced ${resData.createdCount} prayer times to Google Calendar!`,
                });
                setShowSyncModal(false);
            } else {
                setSyncMessage({
                    type: "error",
                    text: resData.message || (isarabic ? "فشلت المزامنة." : "Failed to sync to Google Calendar."),
                });
            }
        } catch (err) {
            setSyncMessage({
                type: "error",
                text: isarabic ? "حدث خطأ أثناء المزامنة." : "An error occurred during sync.",
            });
        } finally {
            setIsSyncing(false);
        }
    }

    const Day = now ? date.getDate() : null;
    const Month = now ? date.toLocaleString(isarabic ? "ar" : "default", { month: "long" }) : null;
    const Year = now ? date.getFullYear() : null;

    function formatPrayerDisplayTime(rawTime, offset = 0) {
        if (!rawTime) return "--:--";
        const cleanTime = rawTime.split(" ")[0];
        const parts = cleanTime.split(":");
        if (parts.length < 2) return cleanTime;
        let hours = parseInt(parts[0], 10);
        let minutes = parseInt(parts[1], 10) + offset;

        if (minutes >= 60) {
            hours += Math.floor(minutes / 60);
            minutes = minutes % 60;
        } else if (minutes < 0) {
            hours -= 1;
            minutes = 60 + minutes;
        }

        const minStr = String(minutes).padStart(2, "0");

        if (is12Hours === false) {
            return `${String(hours).padStart(2, "0")}:${minStr}`;
        }

        const ampm = hours >= 12 ? (isarabic ? "م" : "PM") : (isarabic ? "ص" : "AM");
        hours = hours % 12;
        if (hours === 0) hours = 12;
        return `${hours}:${minStr} ${ampm}`;
    }

    const prayerList = [
        { key: "Fajr", name: isarabic ? "الفجر" : "Fajr", displayTime: formatPrayerDisplayTime(PrayerData.data?.timings?.Fajr, offsetFajr) },
        { key: "Dhuhr", name: isarabic ? "الظهر" : "Dhuhr", displayTime: formatPrayerDisplayTime(PrayerData.data?.timings?.Dhuhr, offsetDhuhr) },
        { key: "Asr", name: isarabic ? "العصر" : "Asr", displayTime: formatPrayerDisplayTime(PrayerData.data?.timings?.Asr, offsetAsr) },
        { key: "Maghrib", name: isarabic ? "المغرب" : "Maghrib", displayTime: formatPrayerDisplayTime(PrayerData.data?.timings?.Maghrib, offsetMaghrib) },
        { key: "Isha", name: isarabic ? "العشاء" : "Isha", displayTime: formatPrayerDisplayTime(PrayerData.data?.timings?.Isha, offsetIsha) },
    ];

    const countryName = selecter ? (isarabic ? (countries.getName(selecter, "ar") || selecter) : countries.getName(selecter, "en")) : "";
    const activeCity = sel2 || (gpsCoords ? gpsCoords.cityName : "");
    const locationText = activeCity ? (countryName ? `${activeCity}, ${countryName}` : activeCity) : (isarabic ? "يرجى تحديد الموقع" : "Choose location");

    return (
        <div className="app-wrapper" dir={isarabic ? "rtl" : "ltr"} style={{ backgroundColor: K ? "#0f1412" : "#f5faf9", minHeight: "100vh" }}>
            <header className="navbar" style={{ backgroundColor: K ? "#0f1412" : "#f5faf9" }}>
                <a href="#" className="navbar-logo" style={{ color: K ? "#95d3ba" : "#003829" }}>
                    {isarabic ? "مزامنة الصلاة" : "PrayerSync"}
                </a>
                <nav>
                    <ul className="navbar-links">
                        <li>
                            <Link href="/" className="navbar-link active" style={{ color: K ? "#ffe088" : "#003829" }}>
                                {isarabic ? "الصفحة الرئيسة" : "Home"}
                            </Link>
                        </li>
                        <li>
                            <Link href="/PTime" className="navbar-link" style={{ color: K ? "#89938e" : "#6e827c" }}>
                                {isarabic ? "مواقيت الصلاة" : "Schedule"}
                            </Link>
                        </li>
                        <li>
                            <Link href="/guides" className="navbar-link" style={{ color: K ? "#89938e" : "#6e827c" }}>
                                {isarabic ? "الأدلة والشروحات" : "Guides"}
                            </Link>
                        </li>
                        <li>
                            <Link href="/Settings" className="navbar-link" style={{ color: K ? "#89938e" : "#6e827c" }}>
                                {isarabic ? "الجدولة والإنتاجية" : "Settings"}
                            </Link>
                        </li>
                        <li>
                            <Link href="/About" className="navbar-link" style={{ color: K ? "#89938e" : "#6e827c" }}>
                                {isarabic ? "عن التطبيق" : "About"}
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="navbar-actions">
                    <Link href="/Settings" className="navbar-icon-btn" aria-label="Settings" style={{ color: K ? "#89938e" : "#6e827c", display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                        <svg className="navbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                    </Link>
                    <Link href="/Contact" className="navbar-icon-btn" aria-label="Contact" style={{ color: K ? "#89938e" : "#6e827c", display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                        <svg className="navbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                    </Link>
                </div>
            </header>

            <main className="hero-section">
                <h1 className="hero-title" style={{ color: K ? "#95d3ba" : "#003829" }}>
                    {isarabic ? "أضف أوقات الصلاة إلى التقويم بذكاء واحترافية." : "Add prayer times to your Calendar with Smart Sync."}
                </h1>
                <p className="hero-subtitle" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                    {isarabic
                        ? "تحديد تلقائي للموقع عبر GPS أو يدوي، تغذية تقويم متجددة، وحماية أوقات الصلاة من الاجتماعات."
                        : "Auto-detect location with GPS or select manually, live updating calendar feeds, and work meeting protection."}
                </p>
            </main>

            <div className="dashboard-container">
                <div className="location-card" style={{ backgroundColor: K ? "#0b0f0d" : "#f4f7f6", border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #e1e8e6" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <h2 className="location-card-title" style={{ color: K ? "#95d3ba" : "#003829", margin: 0 }}>
                            {isarabic ? "الموقع والمزامنة" : "Location & Sync"}
                        </h2>
                        <button
                            type="button"
                            onClick={detectUserLocation}
                            disabled={isDetectingLocation}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "6px 12px",
                                borderRadius: "20px",
                                fontSize: "12px",
                                fontWeight: "700",
                                backgroundColor: gpsCoords ? (K ? "rgba(16, 185, 129, 0.2)" : "#d1fae5") : (K ? "#1a2520" : "#ffffff"),
                                color: gpsCoords ? (K ? "#6ee7b7" : "#065f46") : (K ? "#95d3ba" : "#003829"),
                                border: gpsCoords ? "1px solid #10b981" : (K ? "1px solid rgba(149, 211, 186, 0.4)" : "1px solid #c8d6d2"),
                                cursor: isDetectingLocation ? "wait" : "pointer"
                            }}
                        >
                            <span>📍</span>
                            <span>
                                {isDetectingLocation
                                    ? (isarabic ? "جاري التحديد..." : "Locating...")
                                    : (gpsCoords ? (isarabic ? "موقعي الحالي ✓" : "GPS Active ✓") : (isarabic ? "تحديد موقعي تلقائياً" : "Auto-Detect GPS"))}
                            </span>
                        </button>
                    </div>

                    {locationNotice && (
                        <div style={{ fontSize: "12px", color: K ? "#ffe088" : "#854d0e", marginBottom: "10px", padding: "6px 10px", borderRadius: "6px", backgroundColor: K ? "rgba(250, 204, 21, 0.1)" : "#fef9c3" }}>
                            ℹ️ {locationNotice}
                        </div>
                    )}

                    <div className="input-group">
                        <span className="input-label" style={{ color: K ? "#5a7a70" : "#8c9e99" }}>
                            {isarabic ? "الدولة (يدوي أو تلقائي)" : "Country (Manual or Auto)"}
                        </span>
                        <div className="select-wrapper" style={{ width: "100%", minWidth: "100%" }}>
                            <select
                                value={selecter}
                                onChange={(e) => {
                                    setsec(e.target.value);
                                    setGpsCoords(null);
                                }}
                                className="premium-select"
                                style={{
                                    width: "100%",
                                    minWidth: "100%",
                                    backgroundColor: K ? "#0f1412" : "#ffffff",
                                    color: K ? "#95d3ba" : "#2c463f",
                                    borderColor: K ? "rgba(63,73,69,0.4)" : "#e1e8e6",
                                }}
                            >
                                <option value="">{isarabic ? "اختر الدولة..." : "Choose a country..."}</option>
                                {MapofCount}
                            </select>
                        </div>
                    </div>

                    <div className="input-group">
                        <span className="input-label" style={{ color: K ? "#5a7a70" : "#8c9e99" }}>
                            {isarabic ? "المدينة / المنطقة" : "City / State"}
                        </span>
                        <div className="select-wrapper" style={{ width: "100%", minWidth: "100%" }}>
                            <select
                                value={sel2}
                                onChange={(e) => {
                                    set2(e.target.value);
                                    setGpsCoords(null);
                                }}
                                className="premium-select"
                                style={{
                                    width: "100%",
                                    minWidth: "100%",
                                    backgroundColor: K ? "#0f1412" : "#ffffff",
                                    color: K ? "#95d3ba" : "#2c463f",
                                    borderColor: K ? "rgba(63,73,69,0.4)" : "#e1e8e6",
                                }}
                            >
                                <option value="">{isarabic ? "اختر المدينة..." : "Choose a city..."}</option>
                                {Mapofstate}
                            </select>
                        </div>
                    </div>

                    {syncMessage && (
                        <div
                            style={{
                                padding: "10px 14px",
                                borderRadius: "8px",
                                marginTop: "6px",
                                marginBottom: "6px",
                                fontSize: "13px",
                                backgroundColor: syncMessage.type === "success" ? (K ? "rgba(16, 185, 129, 0.15)" : "#d1fae5") : (K ? "rgba(239, 68, 68, 0.15)" : "#fee2e2"),
                                color: syncMessage.type === "success" ? (K ? "#6ee7b7" : "#065f46") : (K ? "#fca5a5" : "#991b1b"),
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span>{syncMessage.text}</span>
                                <button onClick={() => setSyncMessage(null)} style={{ cursor: "pointer", background: "none", border: "none", color: "inherit", fontWeight: "bold" }}>×</button>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => setShowSyncModal(true)}
                        disabled={!events}
                        className="calendar-button"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                            padding: "14px",
                            borderRadius: "12px",
                            backgroundColor: events ? (K ? "#95d3ba" : "#003829") : (K ? "#1a2520" : "#cdd8d5"),
                            color: events ? (K ? "#0b0f0d" : "#ffffff") : (K ? "#3d5a52" : "#8c9e99"),
                            fontSize: "15px",
                            fontWeight: "700",
                            cursor: events ? "pointer" : "not-allowed",
                            boxShadow: events ? "0 4px 14px rgba(0, 56, 41, 0.2)" : "none",
                            transition: "all 0.2s ease"
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                            <path d="M8 14h8M12 14v4"></path>
                        </svg>
                        <span>{isarabic ? "إضافة / مزامنة مع التقويم" : "Add / Sync to Calendar"}</span>
                    </button>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", padding: "0 4px" }}>
                        <span style={{ fontSize: "12px", color: K ? "#6b8a7e" : "#8c9e99" }}>
                            {eventBusy !== false ? (isarabic ? "🔒 محجوز كـ مشغول" : "🔒 Marked as Busy") : (isarabic ? "🔓 متاح" : "🔓 Available")} • {preBuffer > 0 ? `+${preBuffer}m prep` : "0m prep"}
                        </span>
                        <Link href="/Settings" style={{ fontSize: "12px", fontWeight: "700", color: K ? "#95d3ba" : "#003829", textDecoration: "underline" }}>
                            {isarabic ? "تعديل التفضيلات ⚙️" : "Preferences ⚙️"}
                        </Link>
                    </div>
                </div>

                <div
                    className="Prayertime"
                    style={{
                        backgroundColor: K ? "#0b0f0d" : "#f4f7f6",
                        border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #e1e8e6",
                    }}
                >
                    <div className="schedule-header">
                        <div className="header-left">
                            <h2 className="schedule-title" style={{ color: K ? "#95d3ba" : "#003829" }}>
                                {isarabic ? "مواقيت الصلاة اليوم" : "Today's Schedule"}
                            </h2>
                            <div className="location-container" style={{ color: K ? "#5a7a70" : "#5c726c" }}>
                                <svg className="location-icon" viewBox="0 0 12 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 0C2.68629 0 0 2.68629 0 6C0 9.75 6 14 6 14C6 14 12 9.75 12 6C12 2.68629 9.31371 0 6 0ZM6 8.25C4.75736 8.25 3.75 7.24264 3.75 6C3.75 4.75736 4.75736 3.75 6 3.75C7.24264 3.75 8.25 4.75736 8.25 6C8.25 7.24264 7.24264 8.25 6 8.25Z" />
                                </svg>
                                <span className="location-text" style={{ color: K ? "#5a7a70" : "#5c726c" }}>{locationText}</span>
                            </div>
                        </div>
                        <div
                            className="date-badge"
                            suppressHydrationWarning
                            style={{
                                backgroundColor: K ? "#1a2520" : "#e3ebec",
                                color: K ? "#95d3ba" : "#2c463f",
                            }}
                        >
                            {now ? `${Month} ${Day}, ${Year}` : ""}
                        </div>
                    </div>

                    <div className="schedule-divider" style={{ backgroundColor: K ? "rgba(63,73,69,0.3)" : undefined }}></div>

                    <div className="prayer-list">
                        {prayerList.map((prayer) => (
                            <div
                                key={prayer.key}
                                className="prayer-card"
                                suppressHydrationWarning
                                style={{
                                    backgroundColor: K ? "#111915" : "#ffffff",
                                }}
                            >
                                <span
                                    className="prayer-name"
                                    style={{
                                        color: K ? "#95d3ba" : "#003829",
                                        fontWeight: 600,
                                    }}
                                >
                                    {prayer.name}
                                </span>
                                <div className="prayer-time-container">
                                    <span className="prayer-time" style={{ color: K ? "#c8e8dc" : "#0e1f1a" }}>
                                        {prayer.displayTime}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showSyncModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.65)",
                        backdropFilter: "blur(4px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                        padding: "20px"
                    }}
                    onClick={() => setShowSyncModal(false)}
                >
                    <div
                        style={{
                            backgroundColor: K ? "#0b0f0d" : "#ffffff",
                            padding: "28px",
                            borderRadius: "20px",
                            maxWidth: "480px",
                            width: "100%",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                            border: K ? "1px solid rgba(149, 211, 186, 0.3)" : "1px solid #e1e8e6"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                            <h3 style={{ fontSize: "18px", fontWeight: "700", color: K ? "#95d3ba" : "#003829", margin: 0 }}>
                                📅 {isarabic ? "اختر طريقة إضافة التقويم" : "Choose Calendar Option"}
                            </h3>
                            <button
                                onClick={() => setShowSyncModal(false)}
                                style={{ background: "none", border: "none", color: K ? "#89938e" : "#6e827c", fontSize: "20px", cursor: "pointer", fontWeight: "bold" }}
                            >
                                ×
                            </button>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ fontSize: "12px", fontWeight: "700", color: K ? "#89938e" : "#5c726c", display: "block", marginBottom: "8px" }}>
                                {isarabic ? "نطاق الأيام:" : "Export Range:"}
                            </label>
                            <div className="toggle-group" style={{ backgroundColor: K ? "#111915" : "#eef5f7", width: "100%", display: "flex" }}>
                                {[
                                    { id: "today", labelEn: "Today", labelAr: "اليوم" },
                                    { id: "7days", labelEn: "7 Days", labelAr: "٧ أيام" },
                                    { id: "month", labelEn: "Month", labelAr: "الشهر" },
                                    { id: "year", labelEn: "Year", labelAr: "السنة" },
                                ].map((r) => (
                                    <button
                                        key={r.id}
                                        type="button"
                                        className={`toggle-btn ${exportRange === r.id ? "active" : ""}`}
                                        onClick={() => setExportRange(r.id)}
                                        style={{
                                            flex: 1,
                                            padding: "6px",
                                            fontSize: "12px",
                                            backgroundColor: exportRange === r.id ? (K ? "#1a2520" : "#ffffff") : "transparent",
                                            color: exportRange === r.id ? (K ? "#95d3ba" : "#003829") : (K ? "#89938e" : "#6e827c"),
                                        }}
                                    >
                                        {isarabic ? r.labelAr : r.labelEn}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={syncToGoogleCalendar}
                            disabled={isSyncing}
                            style={{
                                width: "100%",
                                padding: "14px",
                                borderRadius: "12px",
                                backgroundColor: K ? "#1a2520" : "#ffffff",
                                color: K ? "#95d3ba" : "#003829",
                                border: K ? "1px solid rgba(149, 211, 186, 0.4)" : "1px solid #c8d6d2",
                                fontWeight: "700",
                                fontSize: "14px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "12px",
                                transition: "all 0.2s"
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                            </svg>
                            <div style={{ textAlign: isarabic ? "right" : "left", flex: 1 }}>
                                <div>{isSyncing ? (isarabic ? "جاري المزامنة..." : "Syncing...") : (isarabic ? "مزامنة مباشرة مع Google Calendar" : "Sync directly to Google Calendar")}</div>
                                <div style={{ fontSize: "11px", fontWeight: "normal", color: K ? "#89938e" : "#6e827c" }}>{isarabic ? "إضافة فورية إلى حسابك المسجل" : "Instant 1-click sync to your account"}</div>
                            </div>
                        </button>

                        <button
                            onClick={downloadICS}
                            style={{
                                width: "100%",
                                padding: "14px",
                                borderRadius: "12px",
                                backgroundColor: K ? "#1a2520" : "#ffffff",
                                color: K ? "#95d3ba" : "#003829",
                                border: K ? "1px solid rgba(149, 211, 186, 0.4)" : "1px solid #c8d6d2",
                                fontWeight: "700",
                                fontSize: "14px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "12px",
                                transition: "all 0.2s"
                            }}
                        >
                            <span style={{ fontSize: "20px" }}>📥</span>
                            <div style={{ textAlign: isarabic ? "right" : "left", flex: 1 }}>
                                <div>{isarabic ? "تنزيل ملف تقويم (.ics)" : "Download Calendar File (.ics)"}</div>
                                <div style={{ fontSize: "11px", fontWeight: "normal", color: K ? "#89938e" : "#6e827c" }}>{isarabic ? "متوافق مع Apple وOutlook وGoogle" : "Compatible with Outlook, Apple & Google"}</div>
                            </div>
                        </button>

                        <div
                            style={{
                                padding: "12px",
                                borderRadius: "12px",
                                backgroundColor: K ? "#111915" : "#eef5f7",
                                border: K ? "1px solid rgba(149, 211, 186, 0.3)" : "1px solid #dde4e6"
                            }}
                        >
                            <div style={{ fontSize: "12px", fontWeight: "700", color: K ? "#95d3ba" : "#003829", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                                <span>📡</span> {isarabic ? "تغذية تلقائية دائمة (Webcal - بدون أذونات)" : "Live Auto-Updating Feed (Zero-Permission)"}
                            </div>
                            <div style={{ fontSize: "11px", color: K ? "#89938e" : "#5c726c", marginBottom: "8px" }}>
                                {isarabic ? "اشترك مرة واحدة لتحديث المواعيد تلقائياً كل شهر." : "Subscribe once for rolling automated updates."}
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    if (navigator.clipboard) {
                                        navigator.clipboard.writeText(liveWebcalUrl);
                                        setCopiedFeed(true);
                                        setTimeout(() => setCopiedFeed(false), 2500);
                                    }
                                }}
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "8px",
                                    backgroundColor: K ? "#95d3ba" : "#003829",
                                    color: K ? "#0b0f0d" : "#ffffff",
                                    fontWeight: "700",
                                    fontSize: "12px",
                                    cursor: "pointer",
                                    border: "none"
                                }}
                            >
                                {copiedFeed ? (isarabic ? "تم نسخ رابط التغذية! ✓" : "Copied Feed URL! ✓") : (isarabic ? "نسخ رابط التغذية المباشر" : "Copy Live Feed URL")}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <section className="rich-content-section" style={{ maxWidth: "1100px", margin: "40px auto 20px auto", padding: "0 20px", width: "100%", boxSizing: "border-box" }}>
                {/* JSON-LD Structured Data for Google SEO and FAQ rich snippet */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": isarabic ? "كيف يتم تحديث مواقيت الصلاة في التقويم تلقائياً على مدار العام؟" : "How does PrayerSync automatically adjust prayer times throughout the year?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": isarabic
                                            ? "عند الاشتراك عبر رابط التغذية المباشرة (Webcal)، يتصل تطبيق التقويم (سواء كان Google Calendar أو Apple أو Outlook) بخادمنا بشكل دوري كل 12-24 ساعة لتحديث المواعيد وفق أدق الحسابات الفلكية للموقع المختار دون أي تدخل يدوي."
                                            : "When subscribing via our dynamic Webcal feed, your calendar software (Google Calendar, Apple, Outlook) polls our servers periodically (every 12-24 hours) to fetch updated astronomical timings based on your exact latitude and longitude without manual imports."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": isarabic ? "هل يؤدي تنزيل مواقيت الصلاة إلى ازدحام تقويمي أو إرسال تنبيهات مزعجة؟" : "Will syncing prayer times crowd my calendar or send annoying notifications?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": isarabic
                                            ? "كلا، يمكنك تخصيص الصلوات المراد مزامنتها بدقة (مثلاً صلاتي الظهر والعصر فقط لساعات العمل)، كما يمكنك إيقاف التنبيهات الصوتية أو جعل الحالة 'مشغول' لحجز وقت الصلاة ومنع الاجتماعات المتداخلة."
                                            : "No. You can selectively choose which prayers to sync (e.g. Dhuhr & Asr for corporate workday blocks) and configure audio reminders or calendar 'Busy' availability to shield your worship from meeting overlaps."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": isarabic ? "ما هو الفرق بين طريقة أم القرى ورابطة العالم الإسلامي و ISNA؟" : "What is the difference between Umm Al-Qura, MWL, and ISNA calculation methods?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": isarabic
                                            ? "تعتمد كل هيئة فلكية زاوية انخفاض معينة للشمس تحت الأفق؛ فأم القرى تعتمد زاوية 18.5 درجة للفجر و90 دقيقة بعد المغرب للعشاء (120 دقيقة في رمضان)، بينما تعتمد رابطة العالم الإسلامي 18 درجة للفجر و17 درجة للعشاء، وتعتمد ISNA زاوية 15 درجة لكليهما."
                                            : "Each organization uses specific solar depression angles beneath the horizon. Umm al-Qura uses 18.5° for Fajr and fixed 90 mins post-sunset for Isha (120 min in Ramadan). Muslim World League (MWL) applies 18° for Fajr and 17° for Isha, while ISNA uses 15° for both twilights."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": isarabic ? "هل يحتفظ موقع PrayerSync بأي بيانات شخصية أو موقعي الجغرافي؟" : "Does PrayerSync store any personal data or location logs?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": isarabic
                                            ? "نحن نتبع سياسة الخصوصية الصارمة (Zero Server-Side Retention)؛ يتم حساب المواقيت وتخزين التفضيلات محلياً في متصفحك عبر localStorage، ولا يتم تسجيل سجل تحركاتك أو موقعك الجغرافي على خوادمنا نهائياً."
                                            : "We enforce zero server-side retention. Prayer calculations and user preferences are handled locally in your browser's localStorage. We never log, store, or sell location coordinates or calendar events."
                                    }
                                }
                            ]
                        })
                    }}
                />

                {/* Section 1: Detailed Synchronization Guide */}
                <div style={{
                    backgroundColor: K ? "#0b0f0d" : "#ffffff",
                    border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #e1e8e6",
                    borderRadius: "16px",
                    padding: "36px 28px",
                    marginBottom: "32px",
                    boxShadow: K ? "none" : "0 4px 20px rgba(0, 56, 41, 0.04)"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                        <span style={{ fontSize: "28px" }}>📅</span>
                        <div>
                            <h2 style={{ margin: 0, color: K ? "#95d3ba" : "#003829", fontSize: "1.6rem", fontWeight: "800" }}>
                                {isarabic ? "دليل المزامنة الشامل لتقاويم Google و Apple و Outlook" : "Comprehensive Calendar Synchronization Guide"}
                            </h2>
                            <p style={{ margin: "4px 0 0 0", color: K ? "#89938e" : "#5c726c", fontSize: "14px" }}>
                                {isarabic ? "خطوات بسيطة وسريعة لربط مواقيت الصلاة مع جميع أجهزتك وتطبيقاتك اليومية" : "Step-by-step instructions to integrate prayer schedules seamlessly across all your devices"}
                            </p>
                        </div>
                    </div>

                    <p style={{ color: K ? "#c8e8dc" : "#2c463f", lineHeight: "1.8", fontSize: "15px", marginBottom: "24px" }}>
                        {isarabic
                            ? "صُمم PrayerSync ليكون حلقة الوصل الذكية بين الحساب الفلكي الدقيق لمواقيت الصلاة، وبين التقويم الرقمي الذي تعتمد عليه في جدول أعمالك اليومي. بدلاً من الاعتماد على التطبيقات التي تتطلب فتحها يدوياً أو تفوتك إشعاراتها، تظهر أوقات الصلاة كأحداث تقويم أساسية تنبهك وتمنع الاجتماعات المتعارضة."
                            : "PrayerSync bridges the gap between high-precision astronomical prayer calculation and your daily digital workflow. Instead of relying on standalone mobile apps that you must manually remember to open, prayer times populate directly inside your primary calendar, protecting your spiritual obligations during busy workweeks."}
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                        <div style={{ padding: "20px", borderRadius: "12px", backgroundColor: K ? "#111915" : "#f5faf9", border: K ? "1px solid rgba(149, 211, 186, 0.2)" : "1px solid #ddecde" }}>
                            <div style={{ fontSize: "16px", fontWeight: "700", color: K ? "#ffe088" : "#004d38", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                                <span>📱</span> {isarabic ? "تقويم Apple (iPhone, iPad, Mac)" : "Apple Calendar (iOS & macOS)"}
                            </div>
                            <ol style={{ margin: 0, paddingInlineStart: "20px", color: K ? "#a0c4b8" : "#4a6660", fontSize: "13px", lineHeight: "1.8" }}>
                                <li>{isarabic ? "انسخ رابط التغذية المباشرة (Webcal Feed) من زر المزامنة أعلاه." : "Copy the live Webcal Feed URL from the sync button above."}</li>
                                <li>{isarabic ? "افتح الإعدادات على جهازك > التقويم > الحسابات > إضافة حساب تقويم مشترك." : "Open Settings > Calendar > Accounts > Add Subscribed Calendar."}</li>
                                <li>{isarabic ? "الصق الرابط واضغط 'حفظ' لتحديث المواعيد آلياً في الخلفية." : "Paste the link and hit Save for automatic periodic background updates."}</li>
                            </ol>
                        </div>

                        <div style={{ padding: "20px", borderRadius: "12px", backgroundColor: K ? "#111915" : "#f5faf9", border: K ? "1px solid rgba(149, 211, 186, 0.2)" : "1px solid #ddecde" }}>
                            <div style={{ fontSize: "16px", fontWeight: "700", color: K ? "#ffe088" : "#004d38", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                                <span>🌐</span> {isarabic ? "تقويم Google Calendar" : "Google Calendar (Web & Android)"}
                            </div>
                            <ol style={{ margin: 0, paddingInlineStart: "20px", color: K ? "#a0c4b8" : "#4a6660", fontSize: "13px", lineHeight: "1.8" }}>
                                <li>{isarabic ? "يمكنك النقر على 'مزامنة بضغطة زر مع Google' للإضافة الفورية عبر OAuth." : "Click '1-Click Sync with Google' for instantaneous authenticated insertion."}</li>
                                <li>{isarabic ? "أو افتح تقويم Google على المتصفح > تقاويم أخرى (+) > من عنوان URL." : "Or open Google Calendar on web > Other Calendars (+) > From URL."}</li>
                                <li>{isarabic ? "الصق رابط التغذية وسيقوم تقويم Google بتحديث المواعيد تلقائياً." : "Paste the Webcal URL and Google will auto-refresh times rolling forward."}</li>
                            </ol>
                        </div>

                        <div style={{ padding: "20px", borderRadius: "12px", backgroundColor: K ? "#111915" : "#f5faf9", border: K ? "1px solid rgba(149, 211, 186, 0.2)" : "1px solid #ddecde" }}>
                            <div style={{ fontSize: "16px", fontWeight: "700", color: K ? "#ffe088" : "#004d38", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                                <span>💼</span> {isarabic ? "تقويم Microsoft Outlook و Office 365" : "Microsoft Outlook & Teams"}
                            </div>
                            <ol style={{ margin: 0, paddingInlineStart: "20px", color: K ? "#a0c4b8" : "#4a6660", fontSize: "13px", lineHeight: "1.8" }}>
                                <li>{isarabic ? "في تطبيق Outlook، انتقل إلى عرض التقويم واضغط 'إضافة تقويم'." : "In Outlook, navigate to Calendar view and click 'Add Calendar'."}</li>
                                <li>{isarabic ? "اختر 'الاشتراك من الويب' (Subscribe from web) والصق الرابط." : "Choose 'Subscribe from web' and insert your custom Webcal link."}</li>
                                <li>{isarabic ? "تنعكس مواعيد الصلاة فوراً في Microsoft Teams لمنع تعارض الاجتماعات." : "Times reflect in Teams to automatically prevent conflicting meeting bookings."}</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* Section 2: Astronomical Calculation Methods Explanation */}
                <div style={{
                    backgroundColor: K ? "#0b0f0d" : "#ffffff",
                    border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #e1e8e6",
                    borderRadius: "16px",
                    padding: "36px 28px",
                    marginBottom: "32px",
                    boxShadow: K ? "none" : "0 4px 20px rgba(0, 56, 41, 0.04)"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                        <span style={{ fontSize: "28px" }}>🕌</span>
                        <div>
                            <h2 style={{ margin: 0, color: K ? "#95d3ba" : "#003829", fontSize: "1.6rem", fontWeight: "800" }}>
                                {isarabic ? "شرح طرق الحساب الفلكية والمعايير الفقهية المعتمدة" : "Astronomical Calculation Methods & Fiqh Standards"}
                            </h2>
                            <p style={{ margin: "4px 0 0 0", color: K ? "#89938e" : "#5c726c", fontSize: "14px" }}>
                                {isarabic ? "كيف تُحسب زوايا الشفق، وما الفرق بين المنهجيات الفلكية حول العالم؟" : "Understanding solar angles, twilight definitions, and regional astronomical conventions"}
                            </p>
                        </div>
                    </div>

                    <p style={{ color: K ? "#c8e8dc" : "#2c463f", lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
                        {isarabic
                            ? "تعتمد مواقيت الصلاة الشرعية على موقع الشمس بالنسبة للأفق الأرضي. تختلف المنظمات والهيئات الإسلامية العالمية في تحديد زاوية انخفاض مركز قرص الشمس تحت الأفق لتعريف الفجر الصادق واختفاء الشفق الأحمر أو الأبيض لصلاتي الفجر والعشاء:"
                            : "Islamic prayer times rely on precise celestial mechanics—specifically the sun's altitude relative to the local geometric horizon. Major Islamic institutions apply specific solar depression angles to determine true astronomical dawn (Fajr) and twilight disappearance (Isha):"}
                    </p>

                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: isarabic ? "right" : "left" }}>
                            <thead>
                                <tr style={{ borderBottom: K ? "2px solid rgba(149, 211, 186, 0.3)" : "2px solid #003829" }}>
                                    <th style={{ padding: "12px 14px", color: K ? "#ffe088" : "#003829", fontWeight: "700" }}>{isarabic ? "الهيئة / الطريقة الفلكية" : "Authority / Method"}</th>
                                    <th style={{ padding: "12px 14px", color: K ? "#ffe088" : "#003829", fontWeight: "700" }}>{isarabic ? "زاوية الفجر" : "Fajr Angle"}</th>
                                    <th style={{ padding: "12px 14px", color: K ? "#ffe088" : "#003829", fontWeight: "700" }}>{isarabic ? "معيار العشاء" : "Isha Parameter"}</th>
                                    <th style={{ padding: "12px 14px", color: K ? "#ffe088" : "#003829", fontWeight: "700" }}>{isarabic ? "نطاق الاستخدام الشائع" : "Primary Region"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1" }}>
                                    <td style={{ padding: "12px 14px", fontWeight: "600", color: K ? "#95d3ba" : "#003829" }}>{isarabic ? "جامعة أم القرى (مكة المكرمة)" : "Umm Al-Qura (Makkah)"}</td>
                                    <td style={{ padding: "12px 14px", color: K ? "#c8e8dc" : "#2c463f" }}>18.5°</td>
                                    <td style={{ padding: "12px 14px", color: K ? "#c8e8dc" : "#2c463f" }}>{isarabic ? "٩٠ دقيقة بعد المغرب (١٢٠ في رمضان)" : "90 min after Maghrib (120 in Ramadan)"}</td>
                                    <td style={{ padding: "12px 14px", color: K ? "#89938e" : "#6e827c" }}>{isarabic ? "المملكة العربية السعودية والخليج العربي" : "Saudi Arabia & Arabian Peninsula"}</td>
                                </tr>
                                <tr style={{ borderBottom: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1" }}>
                                    <td style={{ padding: "12px 14px", fontWeight: "600", color: K ? "#95d3ba" : "#003829" }}>{isarabic ? "رابطة العالم الإسلامي (MWL)" : "Muslim World League (MWL)"}</td>
                                    <td style={{ padding: "12px 14px", color: K ? "#c8e8dc" : "#2c463f" }}>18.0°</td>
                                    <td style={{ padding: "12px 14px", color: K ? "#c8e8dc" : "#2c463f" }}>17.0°</td>
                                    <td style={{ padding: "12px 14px", color: K ? "#89938e" : "#6e827c" }}>{isarabic ? "أوروبا، الشرق الأقصى، وأجزاء من آسيا" : "Europe, Far East & Global Standard"}</td>
                                </tr>
                                <tr style={{ borderBottom: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1" }}>
                                    <td style={{ padding: "12px 14px", fontWeight: "600", color: K ? "#95d3ba" : "#003829" }}>{isarabic ? "الجمعية الإسلامية لأمريكا الشمالية (ISNA)" : "Islamic Society of North America (ISNA)"}</td>
                                    <td style={{ padding: "12px 14px", color: K ? "#c8e8dc" : "#2c463f" }}>15.0°</td>
                                    <td style={{ padding: "12px 14px", color: K ? "#c8e8dc" : "#2c463f" }}>15.0°</td>
                                    <td style={{ padding: "12px 14px", color: K ? "#89938e" : "#6e827c" }}>{isarabic ? "الولايات المتحدة الأمريكية وكندا" : "USA & Canada"}</td>
                                </tr>
                                <tr style={{ borderBottom: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1" }}>
                                    <td style={{ padding: "12px 14px", fontWeight: "600", color: K ? "#95d3ba" : "#003829" }}>{isarabic ? "الهيئة العامة المصرية للمساحة" : "Egyptian General Authority of Survey"}</td>
                                    <td style={{ padding: "12px 14px", color: K ? "#c8e8dc" : "#2c463f" }}>19.5°</td>
                                    <td style={{ padding: "12px 14px", color: K ? "#c8e8dc" : "#2c463f" }}>17.5°</td>
                                    <td style={{ padding: "12px 14px", color: K ? "#89938e" : "#6e827c" }}>{isarabic ? "مصر، شمال أفريقيا، والشرق الأوسط" : "Egypt, North Africa, Levant"}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: "12px 14px", fontWeight: "600", color: K ? "#95d3ba" : "#003829" }}>{isarabic ? "جامعة العلوم الإسلامية بكراتشي" : "Univ. of Islamic Sciences, Karachi"}</td>
                                    <td style={{ padding: "12px 14px", color: K ? "#c8e8dc" : "#2c463f" }}>18.0°</td>
                                    <td style={{ padding: "12px 14px", color: K ? "#c8e8dc" : "#2c463f" }}>18.0°</td>
                                    <td style={{ padding: "12px 14px", color: K ? "#89938e" : "#6e827c" }}>{isarabic ? "باكستان، الهند، بنغلاديش، وأفغانستان" : "Pakistan, India, Bangladesh"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Section 3: Privacy, Calendar Security & Work Shield */}
                <div style={{
                    backgroundColor: K ? "#0b0f0d" : "#ffffff",
                    border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #e1e8e6",
                    borderRadius: "16px",
                    padding: "36px 28px",
                    marginBottom: "32px",
                    boxShadow: K ? "none" : "0 4px 20px rgba(0, 56, 41, 0.04)"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                        <span style={{ fontSize: "28px" }}>🛡️</span>
                        <div>
                            <h2 style={{ margin: 0, color: K ? "#95d3ba" : "#003829", fontSize: "1.6rem", fontWeight: "800" }}>
                                {isarabic ? "الخصوصية الصارمة وحماية التقويم الشخصي وساعات العمل" : "Calendar Privacy, Work Shield & Meeting Protection"}
                            </h2>
                            <p style={{ margin: "4px 0 0 0", color: K ? "#89938e" : "#5c726c", fontSize: "14px" }}>
                                {isarabic ? "مبدأ انعدام تخزين البيانات (Zero-Data Retention) وكيف نحمي خصوصيتك" : "Why our minimal-permission architecture protects your corporate and personal confidentiality"}
                            </p>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                        <div>
                            <h3 style={{ color: K ? "#ffe088" : "#003829", fontSize: "1.1rem", fontWeight: "700", marginBottom: "8px" }}>
                                {isarabic ? "🔒 خصوصية الموقع التامة" : "🔒 Zero Location Storage"}
                            </h3>
                            <p style={{ color: K ? "#a0c4b8" : "#4a6660", lineHeight: "1.7", fontSize: "14px" }}>
                                {isarabic
                                    ? "على عكس التطبيقات التجارية التي تتبع موقعك وترسل بياناتك لشركات الإعلانات، يعمل PrayerSync بحسابات فورية ومحلية. إحداثياتك لا تُحفظ في قواعد بيانات خارجية ولا تباع لأي طرف ثالث."
                                    : "Unlike commercial mobile apps that continuously log your background GPS movements for telemetry brokers, PrayerSync runs on local ephemeral computation. Your coordinates are never monetized or stored."}
                            </p>
                        </div>

                        <div>
                            <h3 style={{ color: K ? "#ffe088" : "#003829", fontSize: "1.1rem", fontWeight: "700", marginBottom: "8px" }}>
                                {isarabic ? "💼 حماية اجتماعات العمل (Smart Work Shield)" : "💼 Smart Corporate Meeting Shield"}
                            </h3>
                            <p style={{ color: K ? "#a0c4b8" : "#4a6660", lineHeight: "1.7", fontSize: "14px" }}>
                                {isarabic
                                    ? "عند تفعيل خاصية 'مشغول' في إعدادات التقويم، تُحجز فترة الصلاة والاستعداد كفترة انشغال رسمية في أنظمة مثل Google Meet و Teams، مما يمنع زملائك من جدولة اجتماعات فوق وقت الصلاة."
                                    : "When you mark events as 'Busy', your corporate calendar in Google Meet and Microsoft Teams automatically blocks colleagues from booking meetings over prayer and Wudu windows."}
                            </p>
                        </div>

                        <div>
                            <h3 style={{ color: K ? "#ffe088" : "#003829", fontSize: "1.1rem", fontWeight: "700", marginBottom: "8px" }}>
                                {isarabic ? "🧹 أداة التنظيف وإلغاء المزامنة بضغطة زر" : "🧹 Instant Calendar Wipe & Reset"}
                            </h3>
                            <p style={{ color: K ? "#a0c4b8" : "#4a6660", lineHeight: "1.7", fontSize: "14px" }}>
                                {isarabic
                                    ? "هل انتقلت إلى مدينة جديدة أو غيرت وظيفتك؟ تتيح لك لوحة الإعدادات زر 'حذف مواقيت الصلاة السابقة' لمسح كافة الأحداث التي أنشأها التطبيق دفعة واحدة دون التأثير على مواعيدك الشخصية الأخرى."
                                    : "Moved to a new timezone or switched employers? Our Settings dashboard includes a one-click 'Wipe & Reset' tool to remove all PrayerSync events cleanly without touching your personal agendas."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 4: Frequently Asked Questions (FAQ) */}
                <div style={{
                    backgroundColor: K ? "#0b0f0d" : "#ffffff",
                    border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #e1e8e6",
                    borderRadius: "16px",
                    padding: "36px 28px",
                    marginBottom: "32px",
                    boxShadow: K ? "none" : "0 4px 20px rgba(0, 56, 41, 0.04)"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                        <span style={{ fontSize: "28px" }}>❓</span>
                        <div>
                            <h2 style={{ margin: 0, color: K ? "#95d3ba" : "#003829", fontSize: "1.6rem", fontWeight: "800" }}>
                                {isarabic ? "الأسئلة الشائعة (Frequently Asked Questions)" : "Frequently Asked Questions (FAQ)"}
                            </h2>
                            <p style={{ margin: "4px 0 0 0", color: K ? "#89938e" : "#5c726c", fontSize: "14px" }}>
                                {isarabic ? "إجابات مفصلة لأهم التساؤلات الفنية والفقهية حول مزامنة التقويم" : "Answers to common technical, Fiqh, and synchronization questions"}
                            </p>
                        </div>
                    </div>

                    <div style={{ display: "grid", gap: "16px" }}>
                        {[
                            {
                                q_ar: "كيف يتم تحديث مواقيت الصلاة في التقويم تلقائياً؟",
                                q_en: "How does the calendar feed stay updated throughout the seasons?",
                                a_ar: "عند استخدامك لرابط Webcal، يقوم تطبيق التقويم الخاص بك بطلب التحديث من خادمنا دورياً (كل 12-24 ساعة). يقوم الخادم بحساب مواقيت الشهر القادم بناءً على إحداثياتك، وبذلك تظل المواعيد محدثة على مدار الفصول دون أي تدخل يدوي منك.",
                                a_en: "When subscribed to our dynamic Webcal feed, your calendar software contacts our server at regular intervals (typically every 12 to 24 hours). The feed generates rolling schedules based on precise solar coordinates for upcoming weeks."
                            },
                            {
                                q_ar: "هل يمكنني مزامنة صلوات معينة فقط (كالظهر والعصر) لتقويم العمل؟",
                                q_en: "Can I selectively sync only specific prayers, like Dhuhr and Asr, for my work calendar?",
                                a_ar: "نعم تماماً! يوفر PrayerSync ميزة 'الجدولة الانتقائية' من لوحة الإعدادات، حيث يمكنك إلغاء تفعيل الفجر والمغرب والعشاء من تقويم العمل والاحتفاظ فقط بصلاتي الظهر والعصر لحماية وقت عملك من الاجتماعات المتداخلة.",
                                a_en: "Yes! In the Settings dashboard under 'Smart Work Shield', you can selectively toggle off Fajr, Maghrib, or Isha and sync only Dhuhr and Asr to protect your office hours from meeting conflicts."
                            },
                            {
                                q_ar: "ما هو الفرق بين التنزيل كملف (.ics) والاشتراك برابط (Webcal)؟",
                                q_en: "What is the difference between downloading an (.ics) file and subscribing via (Webcal)?",
                                a_ar: "ملف (.ics) هو لقطة ثابتة (Snapshot) للأوقات في شهر معين؛ لا يتحدث تلقائياً بعد انتهائه. أما رابط (Webcal) فهو اشتراك ديناميكي متجدد تلقائياً يتحدث للأشهر القادمة بشكل مستمر دون الحاجة لإعادة تنزيل ملفات.",
                                a_en: "An (.ics) file is a static offline snapshot for a specific month that requires re-importing once the period ends. A Webcal feed is a dynamic live subscription that rolls forward automatically without manual intervention."
                            },
                            {
                                q_ar: "كيف يتعامل التطبيق مع التوقيت الصيفي (Daylight Saving Time)؟",
                                q_en: "Does PrayerSync automatically account for Daylight Saving Time (DST)?",
                                a_ar: "نعم، يتم ضبط إزاحات التوقيت الصيفي تلقائياً وفق التوقيت المحلي لبلدك ومنطقتك الزمنية (IANA Timezone)، وتتم الحسابات الفلكية للشمس وفق الإحداثيات الدقيقة بصرف النظر عن تقديم أو تأخير الساعة.",
                                a_en: "Yes. Our engine uses standard IANA timezone databases and local solar transit equations, ensuring that DST transitions are seamlessly applied without any manual clock corrections."
                            },
                            {
                                q_ar: "لماذا تختلف مواقيت الصلاة أحياناً بدقائق معدودة بين مساجد نفس المدينة؟",
                                q_en: "Why do prayer times sometimes differ by a few minutes between local mosques?",
                                a_ar: "يعود ذلك إما لاختلاف طريقة الحساب الفلكية المعتمدة (كزوايا الفجر والعشاء)، أو لاختلاف مذهب حساب وقت صلاة العصر (بين الجمهور والحنفية)، أو لإضافة دقائق أمان محلية (Offsets). يمكنك ضبط هذه الفروق يدوياً بدقة الدقيقة عبر صفحة الإعدادات.",
                                a_en: "Slight variances typically stem from differing twilight depression angles, Asr jurisprudence (standard vs Hanafi), or local administrative mosque buffers. PrayerSync allows you to fine-tune minute offsets per prayer in Settings."
                            }
                        ].map((faq, idx) => (
                            <div
                                key={idx}
                                style={{
                                    padding: "20px",
                                    borderRadius: "12px",
                                    backgroundColor: K ? "#111915" : "#f5faf9",
                                    border: K ? "1px solid rgba(63, 73, 69, 0.25)" : "1px solid #e1e8e6"
                                }}
                            >
                                <h3 style={{ margin: "0 0 8px 0", color: K ? "#ffe088" : "#004d38", fontSize: "1.1rem", fontWeight: "700" }}>
                                    {isarabic ? faq.q_ar : faq.q_en}
                                </h3>
                                <p style={{ margin: 0, color: K ? "#a0c4b8" : "#4a6660", lineHeight: "1.7", fontSize: "14px" }}>
                                    {isarabic ? faq.a_ar : faq.a_en}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 5: Featured Specialized Guides Hub */}
                <div style={{
                    backgroundColor: K ? "#0b0f0d" : "#ffffff",
                    border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #e1e8e6",
                    borderRadius: "16px",
                    padding: "36px 28px",
                    marginBottom: "40px",
                    boxShadow: K ? "none" : "0 4px 20px rgba(0, 56, 41, 0.04)"
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
                        <div>
                            <h2 style={{ margin: 0, color: K ? "#95d3ba" : "#003829", fontSize: "1.6rem", fontWeight: "800" }}>
                                📚 {isarabic ? "أدلة وشروحات PrayerSync التخصصية" : "Specialized In-Depth Knowledge Guides"}
                            </h2>
                            <p style={{ margin: "4px 0 0 0", color: K ? "#89938e" : "#5c726c", fontSize: "14px" }}>
                                {isarabic ? "مقالات فلكية وتقنية تفصيلية لتوسيع معرفتك بأوقات الصلاة والإنتاجية الإسلامية" : "Deep-dive astronomical and productivity articles written for Muslims worldwide"}
                            </p>
                        </div>
                        <Link
                            href="/guides"
                            style={{
                                padding: "10px 18px",
                                borderRadius: "8px",
                                backgroundColor: K ? "#95d3ba" : "#003829",
                                color: K ? "#0b0f0d" : "#ffffff",
                                textDecoration: "none",
                                fontWeight: "700",
                                fontSize: "13px"
                            }}
                        >
                            {isarabic ? "عرض كافة الأدلة ←" : "Explore All Guides →"}
                        </Link>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
                        {[
                            {
                                href: "/guides/prayer-calculation-methods",
                                title_ar: "طرق حساب مواقيت الصلاة الفلكية",
                                title_en: "Prayer Calculation Methods",
                                desc_ar: "مقارنة شاملة بين معايير أم القرى، رابطة العالم الإسلامي، و ISNA وزوايا الشفق.",
                                desc_en: "Deep dive into solar depression angles and astronomical twilight standards."
                            },
                            {
                                href: "/guides/calendar-sync-tutorial",
                                title_ar: "دليل مزامنة التقويم خطوة بخطوة",
                                title_en: "Calendar Sync Tutorial",
                                desc_ar: "خطوات تفصيلية مصورة لربط تقاويم Google و Apple و Outlook عبر Webcal.",
                                desc_en: "Visual step-by-step setup for iOS, Android, macOS and Windows."
                            },
                            {
                                href: "/guides/asr-calculation-difference",
                                title_ar: "فقه وفلك حساب وقت صلاة العصر",
                                title_en: "Asr Calculation Differences",
                                desc_ar: "الفارق بين مذهب الجمهور (ظل المثل) والمذهب الحنفي (ظل المثلين).",
                                desc_en: "Understanding shadow-length ratios between Standard and Hanafi schools."
                            },
                            {
                                href: "/guides/high-latitudes",
                                title_ar: "مواقيت الصلاة في خطوط العرض العليا",
                                title_en: "High-Latitude Prayer Times",
                                desc_ar: "حلول اختفاء الشفق وظاهرة شمس منتصف الليل في الدول الإسكندنافية وشمال أوروبا.",
                                desc_en: "Solutions for regions where twilight persists throughout summer nights."
                            },
                            {
                                href: "/guides/workplace-prayer-productivity",
                                title_ar: "الصلاة والإنتاجية في بيئات العمل الحديثة",
                                title_en: "Workplace Prayer Productivity",
                                desc_ar: "كيف تحمي أوقات صلاتك في الشركات وبيئات العمل وتمنع تعارض الاجتماعات.",
                                desc_en: "How professionals maintain spiritual focus during intense corporate schedules."
                            }
                        ].map((guide, idx) => (
                            <Link
                                key={idx}
                                href={guide.href}
                                style={{
                                    padding: "18px",
                                    borderRadius: "12px",
                                    backgroundColor: K ? "#111915" : "#f5faf9",
                                    border: K ? "1px solid rgba(149, 211, 186, 0.2)" : "1px solid #ddecde",
                                    textDecoration: "none",
                                    display: "block",
                                    transition: "transform 0.2s, border-color 0.2s"
                                }}
                            >
                                <div style={{ fontSize: "14px", fontWeight: "700", color: K ? "#95d3ba" : "#003829", marginBottom: "6px" }}>
                                    {isarabic ? guide.title_ar : guide.title_en}
                                </div>
                                <div style={{ fontSize: "12px", color: K ? "#89938e" : "#5c726c", lineHeight: "1.6" }}>
                                    {isarabic ? guide.desc_ar : guide.desc_en}
                                </div>
                                <div style={{ marginTop: "10px", fontSize: "12px", fontWeight: "700", color: K ? "#ffe088" : "#854d0e" }}>
                                    {isarabic ? "قراءة المقال ←" : "Read Article →"}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
