"use client";
import React, { useState, useEffect, useCallback } from "react";
import "./app.css";
import Link from "next/link";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";

const PRAYER_KEYS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

const PRAYER_NAMES = {
    Fajr: { en: "Fajr", ar: "الفجر" },
    Dhuhr: { en: "Dhuhr", ar: "الظهر" },
    Asr: { en: "Asr", ar: "العصر" },
    Maghrib: { en: "Maghrib", ar: "المغرب" },
    Isha: { en: "Isha", ar: "العشاء" },
};

const PRAYER_PERIODS = {
    Fajr: { en: "Dawn", ar: "الفجر" },
    Dhuhr: { en: "Noon", ar: "الظهيرة" },
    Asr: { en: "Afternoon", ar: "بعد الظهر" },
    Maghrib: { en: "Sunset", ar: "الغروب" },
    Isha: { en: "Night", ar: "الليل" },
};

function parseTimeStr(timeStr) {
    if (!timeStr) return null;
    const clean = timeStr.split(" ")[0];
    const [h, m] = clean.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return null;
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
}

export default function Ptime() {
    const { K, is12Hours, mounted: dataMounted } = useData();
    const { isarabic, mounted: arabicMounted } = useData2();

    const [timeString, setTimeString] = useState("");
    const [prayerData, setPrayerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [locationName, setLocationName] = useState("");
    const [countdown, setCountdown] = useState("");
    const [nextPrayerName, setNextPrayerName] = useState("");
    const [currentPrayerKey, setCurrentPrayerKey] = useState(null);
    const [now, setNow] = useState(null);

    useEffect(() => {
        setNow(new Date());
    }, []);

    const formatClock = useCallback(() => {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();

        if (is12Hours === false) {
            return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
        }

        const ampm = hours >= 12 ? (isarabic ? "م" : "PM") : (isarabic ? "ص" : "AM");
        hours = hours % 12;
        if (hours === 0) hours = 12;
        return `${hours}:${String(minutes).padStart(2, "0")} ${ampm}`;
    }, [is12Hours, isarabic]);

    useEffect(() => {
        setTimeString(formatClock());
        const interval = setInterval(() => {
            setTimeString(formatClock());
        }, 1000);
        return () => clearInterval(interval);
    }, [formatClock]);

    useEffect(() => {
        let cancelled = false;

        async function fetchPrayerTimes() {
            try {
                const position = await new Promise((resolve, reject) => {
                    if (!navigator.geolocation) {
                        reject(new Error("Geolocation not supported"));
                        return;
                    }
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: false,
                        timeout: 10000,
                    });
                });

                const { latitude, longitude } = position.coords;

                const today = new Date();
                const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

                const res = await fetch(
                    `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=4`
                );
                const data = await res.json();

                if (!cancelled && data?.data?.timings) {
                    setPrayerData(data.data.timings);
                    const meta = data.data?.meta;
                    if (meta?.timezone) {
                        setLocationName(meta.timezone.split("/").pop().replace(/_/g, " "));
                    }
                }
            } catch (err) {
                if (!cancelled) {
                    try {
                        const today = new Date();
                        const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
                        const res = await fetch(
                            `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=Riyadh&country=SA&method=4`
                        );
                        const data = await res.json();
                        if (data?.data?.timings) {
                            setPrayerData(data.data.timings);
                            setLocationName(isarabic ? "الرياض" : "Riyadh");
                        }
                    } catch (fallbackErr) {
                        console.error("Failed to fetch prayer times:", fallbackErr);
                    }
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchPrayerTimes();
        return () => { cancelled = true; };
    }, [isarabic]);

    const formatPrayerTime = useCallback((rawTime) => {
        if (!rawTime) return "--:--";
        const clean = rawTime.split(" ")[0];
        const parts = clean.split(":");
        if (parts.length < 2) return clean;
        let hours = parseInt(parts[0], 10);
        const minutes = parts[1];
        if (isNaN(hours)) return clean;

        if (is12Hours === false) {
            return `${String(hours).padStart(2, "0")}:${minutes}`;
        }

        const ampm = hours >= 12 ? (isarabic ? "م" : "PM") : (isarabic ? "ص" : "AM");
        hours = hours % 12;
        if (hours === 0) hours = 12;
        return `${hours}:${minutes} ${ampm}`;
    }, [is12Hours, isarabic]);

    const computeCurrentAndNext = useCallback(() => {
        if (!prayerData) return;

        const curr = new Date();
        const times = PRAYER_KEYS.map((key) => ({
            key,
            date: parseTimeStr(prayerData[key]),
        })).filter((t) => t.date !== null);

        if (times.length === 0) return;

        let currentKey = null;
        for (let i = times.length - 1; i >= 0; i--) {
            if (curr >= times[i].date) {
                currentKey = times[i].key;
                break;
            }
        }

        let nextPrayer = null;
        for (let i = 0; i < times.length; i++) {
            if (times[i].date > curr) {
                nextPrayer = times[i];
                break;
            }
        }

        if (!nextPrayer) {
            const tomorrowFajr = parseTimeStr(prayerData.Fajr);
            if (tomorrowFajr) {
                tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
                nextPrayer = { key: "Fajr", date: tomorrowFajr };
            }
            if (!currentKey) currentKey = "Isha";
        }

        setCurrentPrayerKey(currentKey);

        if (nextPrayer) {
            const diff = nextPrayer.date - curr;
            const totalMins = Math.max(0, Math.floor(diff / 60000));
            const hours = Math.floor(totalMins / 60);
            const mins = totalMins % 60;

            const prayerNameDisplay = isarabic
                ? PRAYER_NAMES[nextPrayer.key].ar
                : PRAYER_NAMES[nextPrayer.key].en;

            let timeLeft;
            if (hours > 0) {
                timeLeft = isarabic
                    ? `${prayerNameDisplay} بعد ${hours} س ${mins} د`
                    : `${prayerNameDisplay} in ${hours}h ${mins}m`;
            } else {
                timeLeft = isarabic
                    ? `${prayerNameDisplay} بعد ${mins} د`
                    : `${prayerNameDisplay} in ${mins}m`;
            }

            setCountdown(timeLeft);
            setNextPrayerName(nextPrayer.key);
        }
    }, [prayerData, isarabic]);

    useEffect(() => {
        computeCurrentAndNext();
        const interval = setInterval(computeCurrentAndNext, 30000);
        return () => clearInterval(interval);
    }, [computeCurrentAndNext]);

    const date = now || new Date(0);
    const Day = now ? date.getDate() : null;
    const Month = now ? date.toLocaleString(isarabic ? "ar" : "default", { month: "long" }) : null;
    const Year = now ? date.getFullYear() : null;

    const openSubpage = (path) => {
        window.open(path, "_blank", "width=800,height=650");
    };

    const prayerList = PRAYER_KEYS.map((key) => ({
        key,
        name: isarabic ? PRAYER_NAMES[key].ar : PRAYER_NAMES[key].en,
        period: isarabic ? PRAYER_PERIODS[key].ar : PRAYER_PERIODS[key].en,
        time: formatPrayerTime(prayerData?.[key]),
        isCurrent: key === currentPrayerKey,
        isNext: key === nextPrayerName,
    }));

    return (
        <div
            className={`ptime-wrapper ${K ? "dark" : "light"}`}
            dir={isarabic ? "rtl" : "ltr"}
            style={{
                backgroundColor: K ? "#0f1412" : "#f5faf9",
                minHeight: "100vh",
            }}
        >
            <header
                className="top-app-bar"
                style={{
                    backgroundColor: K ? "#0f1412" : "#f5faf9",
                    borderBottomColor: K ? "rgba(63,73,69,0.3)" : "#eef5f7",
                }}
            >
                <div className="top-app-bar__layout">
                    <Link
                        href="/"
                        className="top-app-bar__brand"
                        style={{ color: K ? "#95d3ba" : "#003829" }}
                    >
                        {isarabic ? "مزامنة الصلاة" : "Prayer Sync"}
                    </Link>
                    <nav className="top-app-bar__nav">
                        <Link
                            href="/"
                            className="nav-link"
                            style={{ color: K ? "#6b8a7e" : "#6e827c" }}
                        >
                            {isarabic ? "الرئيسة" : "Home"}
                        </Link>
                        <span
                            className="nav-link active"
                            style={{
                                color: K ? "#ffe088" : "#003829",
                                borderBottomColor: K ? "#ffe088" : "#b19e68",
                            }}
                        >
                            {isarabic ? "المواقيت" : "Schedule"}
                        </span>
                        <Link
                            href="/About"
                            className="nav-link"
                            style={{ color: K ? "#6b8a7e" : "#6e827c" }}
                        >
                            {isarabic ? "عن التطبيق" : "About"}
                        </Link>
                    </nav>
                    <div className="top-app-bar__actions">
                        <Link href="/Settings">
                            <button
                                className="icon-btn"
                                style={{ color: K ? "#6b8a7e" : "#003829" }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                </svg>
                            </button>
                        </Link>
                        <button
                            className="icon-btn"
                            style={{ color: K ? "#6b8a7e" : "#003829" }}
                            onClick={() => openSubpage("/Contact")}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <section className="time-header">
                    <div
                        className="current-time"
                        suppressHydrationWarning
                        style={{ color: K ? "#95d3ba" : "#003829" }}
                    >
                        {timeString}
                    </div>
                    {countdown && (
                        <div
                            className="next-prayer-countdown"
                            suppressHydrationWarning
                            style={{
                                backgroundColor: K ? "rgba(255,224,136,0.12)" : "#ffe088",
                                color: K ? "#ffe088" : "#735c00",
                            }}
                        >
                            {countdown}
                        </div>
                    )}
                    {locationName && (
                        <div
                            className="location-badge"
                            style={{
                                color: K ? "#5a7a70" : "#5c726c",
                                marginTop: "12px",
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 12 14" fill="currentColor" style={{ verticalAlign: "middle", marginInlineEnd: "6px" }}>
                                <path d="M6 0C2.68629 0 0 2.68629 0 6C0 9.75 6 14 6 14C6 14 12 9.75 12 6C12 2.68629 9.31371 0 6 0ZM6 8.25C4.75736 8.25 3.75 7.24264 3.75 6C3.75 4.75736 4.75736 3.75 6 3.75C7.24264 3.75 8.25 4.75736 8.25 6C8.25 7.24264 7.24264 8.25 6 8.25Z" />
                            </svg>
                            {locationName}
                        </div>
                    )}
                </section>

                <section
                    className="schedule-container"
                    style={{
                        backgroundColor: K ? "#0b0f0d" : "#ffffff",
                        border: K ? "1px solid rgba(63,73,69,0.3)" : "1px solid rgba(0,53,39,0.1)",
                    }}
                >
                    <div className="schedule-header-row">
                        <h2
                            className="schedule-title"
                            style={{
                                color: K ? "#95d3ba" : "#003829",
                                borderBottomColor: K ? "rgba(63,73,69,0.3)" : "#eef5f7",
                            }}
                        >
                            {isarabic ? "مواقيت الصلاة اليوم" : "Today's Schedule"}
                        </h2>
                        {now && (
                            <div
                                className="date-badge-pill"
                                suppressHydrationWarning
                                style={{
                                    backgroundColor: K ? "#1a2520" : "#e3ebec",
                                    color: K ? "#95d3ba" : "#2c463f",
                                }}
                            >
                                {`${Month} ${Day}, ${Year}`}
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <div className="loading-state" style={{ color: K ? "#5a7a70" : "#6e827c" }}>
                            <div className="loading-spinner"></div>
                            {isarabic ? "جارٍ تحميل المواقيت..." : "Loading prayer times..."}
                        </div>
                    ) : (
                        <div className="prayer-list">
                            {prayerList.map((prayer) => (
                                <div
                                    key={prayer.key}
                                    className={`prayer-item ${prayer.isCurrent ? "active" : ""} ${prayer.isNext ? "next" : ""}`}
                                    suppressHydrationWarning
                                    style={{
                                        backgroundColor: prayer.isCurrent
                                            ? (K ? "rgba(149,211,186,0.06)" : "rgba(0,53,39,0.03)")
                                            : "transparent",
                                        borderInlineStartColor: prayer.isCurrent ? "#b19e68" : "transparent",
                                    }}
                                >
                                    <div className="prayer-info">
                                        <span
                                            className="prayer-name"
                                            style={{
                                                color: prayer.isCurrent
                                                    ? (K ? "#95d3ba" : "#003829")
                                                    : (K ? "#6b8a7e" : "#003527"),
                                            }}
                                        >
                                            {prayer.name}
                                        </span>
                                        <span
                                            className="prayer-period"
                                            style={{
                                                color: K ? "#4d6b62" : "#404944",
                                            }}
                                        >
                                            {prayer.period}
                                        </span>
                                    </div>
                                    <div className="prayer-time-row">
                                        {prayer.isCurrent && (
                                            <span
                                                className="current-badge"
                                                style={{
                                                    backgroundColor: K ? "rgba(255,224,136,0.12)" : "#eadecc",
                                                    color: K ? "#ffe088" : "#8b753a",
                                                }}
                                            >
                                                {isarabic ? "الآن" : "Current"}
                                            </span>
                                        )}
                                        <span
                                            className="prayer-time"
                                            style={{
                                                color: prayer.isCurrent
                                                    ? (K ? "#ffe088" : "#735c00")
                                                    : (K ? "#c8e8dc" : "#003527"),
                                            }}
                                        >
                                            {prayer.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <footer
                className="footer"
                style={{
                    backgroundColor: K ? "#080c0a" : "#e2e8e7",
                    borderTop: K ? "1px solid rgba(63,73,69,0.3)" : "1px solid #d4dedc",
                }}
            >
                <div className="footer__layout">
                    <div className="footer__copyright" suppressHydrationWarning style={{ color: K ? "#4d6b62" : "#5c726c" }}>
                        &copy; {now ? Year : ""} {isarabic ? "موسى محمد. جميع الحقوق محفوظة." : "Musa Mohammed. All rights reserved."}
                    </div>
                    <div className="footer__links">
                        <a
                            className="footer__link"
                            href="#"
                            style={{ color: K ? "#4d6b62" : "#5c726c" }}
                            onClick={(e) => { e.preventDefault(); openSubpage("/Priacypolicy"); }}
                        >
                            {isarabic ? "سياسة الخصوصية" : "Privacy Policy"}
                        </a>
                        <a
                            className="footer__link"
                            href="#"
                            style={{ color: K ? "#4d6b62" : "#5c726c" }}
                            onClick={(e) => { e.preventDefault(); openSubpage("/terms"); }}
                        >
                            {isarabic ? "شروط الخدمة" : "Terms of Service"}
                        </a>
                        <a
                            className="footer__link"
                            href="#"
                            style={{ color: K ? "#4d6b62" : "#5c726c" }}
                            onClick={(e) => { e.preventDefault(); openSubpage("/Contact"); }}
                        >
                            {isarabic ? "تواصل معنا" : "Contact Us"}
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
