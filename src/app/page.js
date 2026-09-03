"use client";
import React, { useContext, useEffect } from "react";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import ar from "i18n-iso-countries/langs/ar.json";
import "./App.css";
import Link from "next/link";
import { useData } from "./Context/DarklightContext";
import { useData2 } from "./Context/Arabic";

countries.registerLocale(en);
countries.registerLocale(ar);

export default function Home() {
    const apikeyforcountry = "b721f60ec45901c4df9158699cdddf564ad21360a80c12885e2556a3c25cec58";

    const [PrayerData, SetApi] = React.useState({});
    const [CountryData, SetCountry] = React.useState([]);
    const [selecter, setsec] = React.useState("");
    const [sel2, set2] = React.useState("");
    const [State, setSate] = React.useState([]);
    const [now, setNow] = React.useState(null);

    const { K, setk, is12Hours, monthEver } = useData();
    const { isarabic, setArabic } = useData2();

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
            .then((coun) => SetCountry(Array.isArray(coun) ? coun : []));
    }, []);

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

    React.useEffect(() => {
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
                if (!res.ok) {
                    throw new Error(`States request failed: ${res.status}`);
                }
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

    React.useEffect(() => {
        if (!sel2 || !selecter) return;

        fetch(
            `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=${sel2}&country=${selecter}&method=4`
        )
            .then((res) => res.json())
            .then((time) => SetApi(time));
    }, [sel2, selecter, formattedDate]);

    const fajrStart = formatToISO(FajrInt);
    const dhuhrStart = formatToISO(DhuhrInt);
    const asrStart = formatToISO(AsrInt);
    const maghribStart = formatToISO(MaghribInt);
    const ishaStart = formatToISO(IshaInt);

    const isDataValid =
        fajrStart && dhuhrStart && asrStart && maghribStart && ishaStart;

    const events = isDataValid
        ? [
            { title: isarabic ? "صلاة الفجر" : "Fajr Prayer", start: fajrStart, raw: FajrInt },
            { title: isarabic ? "صلاة الظهر" : "Dhuhr Prayer", start: dhuhrStart, raw: DhuhrInt },
            { title: isarabic ? "صلاة العصر" : "Asr Prayer", start: asrStart, raw: AsrInt },
            { title: isarabic ? "صلاة المغرب" : "Maghrib Prayer", start: maghribStart, raw: MaghribInt },
            { title: isarabic ? "صلاة العشاء" : "Isha Prayer", start: ishaStart, raw: IshaInt },
        ]
        : null;

    function toICSDate(d) {
        return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    }

    function buildICS(eventsList) {
        const lines = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//PrayerTimes//EN",
            "CALSCALE:GREGORIAN",
        ];

        eventsList.forEach((ev, idx) => {
            const endDate = new Date(ev.start.getTime() + 40 * 60000);
            lines.push(
                "BEGIN:VEVENT",
                `UID:${idx}-${ev.start.getTime()}@prayertimes`,
                `DTSTAMP:${toICSDate(new Date())}`,
                `DTSTART:${toICSDate(ev.start)}`,
                `DTEND:${toICSDate(endDate)}`,
                `SUMMARY:${ev.title}`,
                `DESCRIPTION:${ev.title} Time: ${ev.raw}`,
                `LOCATION:${sel2}`,
                "END:VEVENT"
            );
        });

        lines.push("END:VCALENDAR");
        return lines.join("\r\n");
    }

    const openSubpage = (path) => {
        window.open(path, "_blank", "width=800,height=650");
    };

    // Global KeyDown listener for Secret Command Prompt
    useEffect(() => {
        function handleGlobalKeyDown(event) {
            // Check for Ctrl + C or Ctrl + M or Cmd + C
            if ((event.ctrlKey || event.metaKey) && (event.key.toLowerCase() === "c" || event.key.toLowerCase() === "m")) {
                const selection = typeof window !== "undefined" && window.getSelection ? window.getSelection().toString() : "";
                // If user selected text to copy, let Ctrl+C perform normal copy
                if (event.key.toLowerCase() === "c" && selection.length > 0) {
                    return;
                }

                event.preventDefault();
                const promptValue = prompt(isarabic ? "أدخل الأمر السري:" : "Enter Command:");
                if (promptValue && promptValue.trim().toLowerCase() === "monthever") {
                    openSubpage("/MonthEver");
                }
            }
        }

        window.addEventListener("keydown", handleGlobalKeyDown);
        return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, [isarabic]);

    async function downloadICS() {
        if (!events) return;

        if (monthEver) {
            try {
                const curYear = date.getFullYear();
                const curMonth = date.getMonth() + 1;
                const response = await fetch(
                    `https://api.aladhan.com/v1/calendarByCity/${curYear}/${curMonth}?city=${encodeURIComponent(sel2)}&country=${encodeURIComponent(selecter)}&method=4`
                );
                const monthData = await response.json();

                if (monthData?.data && Array.isArray(monthData.data) && monthData.data.length > 0) {
                    const monthEvents = [];

                    monthData.data.forEach((dayItem) => {
                        const dateParts = dayItem.date?.gregorian?.date?.split("-"); // DD-MM-YYYY
                        if (!dateParts || dateParts.length < 3) return;

                        const dayNum = parseInt(dateParts[0], 10);
                        const monthNum = parseInt(dateParts[1], 10) - 1;
                        const yearNum = parseInt(dateParts[2], 10);

                        const parseDayPrayer = (timeString) => {
                            if (!timeString) return null;
                            const cleanTime = timeString.split(" ")[0];
                            const [h, m] = cleanTime.split(":").map(Number);
                            const d = new Date(yearNum, monthNum, dayNum, h, m, 0, 0);
                            return d;
                        };

                        const timings = dayItem.timings || {};
                        const dayFajr = parseDayPrayer(timings.Fajr);
                        const dayDhuhr = parseDayPrayer(timings.Dhuhr);
                        const dayAsr = parseDayPrayer(timings.Asr);
                        const dayMaghrib = parseDayPrayer(timings.Maghrib);
                        const dayIsha = parseDayPrayer(timings.Isha);

                        if (dayFajr) monthEvents.push({ title: isarabic ? "صلاة الفجر" : "Fajr Prayer", start: dayFajr, raw: timings.Fajr });
                        if (dayDhuhr) monthEvents.push({ title: isarabic ? "صلاة الظهر" : "Dhuhr Prayer", start: dayDhuhr, raw: timings.Dhuhr });
                        if (dayAsr) monthEvents.push({ title: isarabic ? "صلاة العصر" : "Asr Prayer", start: dayAsr, raw: timings.Asr });
                        if (dayMaghrib) monthEvents.push({ title: isarabic ? "صلاة المغرب" : "Maghrib Prayer", start: dayMaghrib, raw: timings.Maghrib });
                        if (dayIsha) monthEvents.push({ title: isarabic ? "صلاة العشاء" : "Isha Prayer", start: dayIsha, raw: timings.Isha });
                    });

                    if (monthEvents.length > 0) {
                        const icsContent = buildICS(monthEvents);
                        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = `prayer-times-month-${curYear}-${String(curMonth).padStart(2, "0")}.ics`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(url);
                        return;
                    }
                }
            } catch (err) {
                console.error("MonthEver full-month export error:", err);
            }
        } else {
            // Standard Single-Day Export
            const icsContent = buildICS(events);
            const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `prayer-times-${formattedDate}.ics`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    }

const Day = now ? date.getDate() : null;
const Month = now ? date.toLocaleString(isarabic ? "ar" : "default", { month: "long" }) : null;
const Year = now ? date.getFullYear() : null;

function formatPrayerDisplayTime(rawTime) {
    if (!rawTime) return "--:--";
    const cleanTime = rawTime.split(" ")[0];
    const parts = cleanTime.split(":");
    if (parts.length < 2) return cleanTime;
    let hours = parseInt(parts[0], 10);
    const minutes = parts[1];
    if (isNaN(hours)) return cleanTime;

    if (is12Hours === false) {
        return `${String(hours).padStart(2, "0")}:${minutes}`;
    }

    const ampm = hours >= 12 ? (isarabic ? "م" : "PM") : (isarabic ? "ص" : "AM");
    hours = hours % 12;
    if (hours === 0) hours = 12;
    return `${hours}:${minutes} ${ampm}`;
}

function getCurrentPrayerKey() {
    if (!PrayerData.data?.timings) return null;

    const curr = new Date();
    const parseTime = (timeStr) => {
        if (!timeStr) return null;
        const cleanTime = timeStr.split(" ")[0];
        const [hours, minutes] = cleanTime.split(":").map(Number);
        const d = new Date(curr);
        d.setHours(hours, minutes, 0, 0);
        return d;
    };

    const timings = PrayerData.data.timings;
    const fajr = parseTime(timings.Fajr);
    const dhuhr = parseTime(timings.Dhuhr);
    const asr = parseTime(timings.Asr);
    const maghrib = parseTime(timings.Maghrib);
    const isha = parseTime(timings.Isha);

    if (!fajr || !dhuhr || !asr || !maghrib || !isha) return null;

    if (curr >= fajr && curr < dhuhr) {
        return "Fajr";
    } else if (curr >= dhuhr && curr < asr) {
        return "Dhuhr";
    } else if (curr >= asr && curr < maghrib) {
        return "Asr";
    } else if (curr >= maghrib && curr < isha) {
        return "Maghrib";
    } else {
        return "Isha";
    }
}

const currentPrayerKey = getCurrentPrayerKey();

const prayerList = [
    { key: "Fajr", name: isarabic ? "الفجر" : "Fajr", displayTime: formatPrayerDisplayTime(PrayerData.data?.timings?.Fajr) },
    { key: "Dhuhr", name: isarabic ? "الظهر" : "Dhuhr", displayTime: formatPrayerDisplayTime(PrayerData.data?.timings?.Dhuhr) },
    { key: "Asr", name: isarabic ? "العصر" : "Asr", displayTime: formatPrayerDisplayTime(PrayerData.data?.timings?.Asr) },
    { key: "Maghrib", name: isarabic ? "المغرب" : "Maghrib", displayTime: formatPrayerDisplayTime(PrayerData.data?.timings?.Maghrib) },
    { key: "Isha", name: isarabic ? "العشاء" : "Isha", displayTime: formatPrayerDisplayTime(PrayerData.data?.timings?.Isha) },
];

const countryName = selecter ? (isarabic ? (countries.getName(selecter, "ar") || selecter) : countries.getName(selecter, "en")) : "";
const locationText = sel2 ? (countryName ? `${sel2}, ${countryName}` : sel2) : (isarabic ? "يرجى تحديد الموقع" : "Choose location");

return (
    <div className="app-wrapper" dir={isarabic ? "rtl" : "ltr"} style={{ backgroundColor: K ? "#0f1412" : "#f5faf9", minHeight: "100vh" }}>
        <header className="navbar" style={{ backgroundColor: K ? "#0f1412" : "#f5faf9" }}>
            <a href="#" className="navbar-logo" style={{ color: K ? "#95d3ba" : "#003829" }}>
                {isarabic ? "مزامنة الصلاة" : "PrayerSync"}
            </a>
            <nav>
                <ul className="navbar-links">
                    <li>
                        <a href="#" className="navbar-link active" style={{ color: K ? "#ffe088" : "#003829" }}>
                            {isarabic ? "الصفحة الرئيسة" : "Home"}
                        </a>
                    </li>
                    <li>
                        <Link href="/PTime" className="navbar-link" style={{ color: K ? "#89938e" : "#6e827c" }}>
                            {isarabic ? "مواقيت الصلاة" : "Schedule"}
                        </Link>
                    </li>
                    <li>
                        <Link href="/About" className="navbar-link" style={{ color: K ? "#89938e" : "#6e827c" }}>
                            {isarabic ? "عن المطور والتطبيق" : "About Me"}
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
                <button className="navbar-icon-btn" aria-label="Help" style={{ color: K ? "#89938e" : "#6e827c" }} onClick={() => openSubpage("/Contact")}>
                    <svg className="navbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                </button>
            </div>
        </header>


        <main className="hero-section">
            <h1 className="hero-title" style={{ color: K ? "#95d3ba" : "#003829" }}>
                {isarabic ? "أضف أوقات الصلاة إلى التقويم الخاص بك." : "Add the prayer time to your Calendar."}
            </h1>
            <p className="hero-subtitle" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                {isarabic
                    ? "قم بتنزيل أوقات صلاتك المحلية مباشرة إلى تقويم Outlook أو Google الخاص بك. تأكد من أنك لن تفوت لحظة واحدة من التأمل، بغض النظر عن المكان الذي يأخذك إليه يومك."
                    : "Download your local prayer times directly to your Outlook or Google Calendar. Ensure you never miss a moment of reflection, no matter where your day takes you."}
            </p>
        </main>

        <div className="dashboard-container">
            <div className="location-card" style={{ backgroundColor: K ? "#0b0f0d" : "#f4f7f6", border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #e1e8e6" }}>
                <h2 className="location-card-title" style={{ color: K ? "#95d3ba" : "#003829" }}>
                    {isarabic ? "ابحث عن موقعك" : "Find Your Location"}
                </h2>

                <div className="input-group">
                    <span className="input-label" style={{ color: K ? "#5a7a70" : "#8c9e99" }}>
                        {isarabic ? "اختر الدولة" : "Select Country"}
                    </span>
                    <div className="select-wrapper" style={{ width: "100%", minWidth: "100%" }}>
                        <svg className="select-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: K ? "#5a7a70" : "#8c9e99" }}>
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <select
                            value={selecter}
                            onChange={(e) => setsec(e.target.value)}
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
                        {isarabic ? "اختر المنطقة/المدينة" : "Select State/City"}
                    </span>
                    <div className="select-wrapper" style={{ width: "100%", minWidth: "100%" }}>
                        <svg className="select-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: K ? "#5a7a70" : "#8c9e99" }}>
                            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                            <line x1="9" y1="22" x2="9" y2="16"></line>
                            <line x1="15" y1="22" x2="15" y2="16"></line>
                            <line x1="9" y1="16" x2="15" y2="16"></line>
                            <path d="M9 6h6M9 10h6M9 14h6"></path>
                        </svg>
                        <select
                            value={sel2}
                            onChange={(e) => set2(e.target.value)}
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

                {events ? (
                    <button
                        onClick={downloadICS}
                        className="calendar-button"
                        style={{
                            backgroundColor: K ? "#95d3ba" : "#003829",
                            color: K ? "#0b0f0d" : "#ffffff",
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                            <path d="M8 14h8M12 14v4"></path>
                        </svg>
                        {isarabic
                            ? (monthEver ? "أضف مواقيت الشهر للتقويم" : "أضف إلى التقويم")
                            : (monthEver ? "Add Month to Calendar" : "Add to Calendar")}
                    </button>
                ) : (
                    <button
                        className="calendar-button"
                        disabled
                        style={{
                            backgroundColor: K ? "#1a2520" : "#cdd8d5",
                            color: K ? "#3d5a52" : "#8c9e99",
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {isarabic
                            ? (monthEver ? "أضف مواقيت الشهر للتقويم" : "أضف إلى التقويم")
                            : (monthEver ? "Add Month to Calendar" : "Add to Calendar")}
                    </button>
                )}
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
                    {prayerList.map((prayer) => {
                        const isCurrent = prayer.key === currentPrayerKey;
                        return (
                            <div
                                key={prayer.key}
                                className={`prayer-card ${isCurrent ? 'current' : ''}`}
                                suppressHydrationWarning
                                style={{
                                    backgroundColor: K ? "#111915" : "#ffffff",
                                    borderLeftColor: isCurrent ? "#b19e68" : "transparent",
                                }}
                            >
                                <span
                                    className="prayer-name"
                                    style={{
                                        color: isCurrent ? (K ? "#95d3ba" : "#003829") : (K ? "#6b8a7e" : "#70807c"),
                                        fontWeight: isCurrent ? 700 : 500,
                                    }}
                                >
                                    {prayer.name}
                                </span>
                                <div className="prayer-time-container">
                                    {isCurrent && <span className="current-badge">{isarabic ? "الآن" : "Current"}</span>}
                                    <span className="prayer-time" style={{ color: K ? "#c8e8dc" : "#0e1f1a" }}>
                                        {prayer.displayTime}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    
<script src="https://pl31170217.profitableratecpmnetwork.com/b2/0c/9b/b20c9b27034926a92f7a52f983a6b915.js"></script>

                    
<script>
  atOptions = {
    'key' : '3822992078ebe3c6fb821c88d91d587b',
    'format' : 'iframe',
    'height' : 50,
    'width' : 320,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/3822992078ebe3c6fb821c88d91d587b/invoke.js"></script>

</script>
<script src="https://www.highrevenueformat.com/3822992078ebe3c6fb821c88d91d587b/invoke.js"></script>


        <footer
            className="footer"
            style={{
                backgroundColor: K ? "#080c0a" : "#e2e8e7",
                borderTop: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #d4dedc",
            }}
        >
            <div className="footer-content">
                <div className="footer-left" suppressHydrationWarning style={{ color: K ? "#4d6b62" : "#5c726c" }}>
                    &copy; {now ? Year : ""} {isarabic ? "موسى محمد. جميع الحقوق محفوظة." : "Musa Mohammed. All rights reserved."}
                </div>
                <div className="footer-right">
                    <a
                        href="#"
                        className="footer-link"
                        style={{ color: K ? "#4d6b62" : "#5c726c" }}
                        onClick={(e) => {
                            e.preventDefault();
                            openSubpage("/Priacypolicy");
                        }}
                    >
                        {isarabic ? "سياسة الخصوصية" : "Privacy Policy"}
                    </a>
                    <a
                        href="#"
                        className="footer-link"
                        style={{ color: K ? "#4d6b62" : "#5c726c" }}
                        onClick={(e) => {
                            e.preventDefault();
                            openSubpage("/terms");
                        }}
                    >
                        {isarabic ? "شروط الخدمة" : "Terms of Service"}
                    </a>
                    <a
                        href="#"
                        className="footer-link"
                        style={{ color: K ? "#4d6b62" : "#5c726c" }}
                        onClick={(e) => {
                            e.preventDefault();
                            openSubpage("/Contact");
                        }}
                    >
                        {isarabic ? "تواصل معنا" : "Contact Us"}
                    </a>
                </div>

            </div>
        </footer>
    </div>
);
}


