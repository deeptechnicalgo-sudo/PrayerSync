"use client";
import React, { useState, useEffect, useCallback } from "react";
import "./app.css";
import Link from "next/link";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

export default function PtimeClient() {
    const { K, is12Hours } = useData();
    const { isarabic } = useData2();

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
                const day = String(today.getDate()).padStart(2, "0");
                const month = String(today.getMonth() + 1).padStart(2, "0");
                const dateStr = `${day}-${month}-${today.getFullYear()}`;

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
                        const day = String(today.getDate()).padStart(2, "0");
                        const month = String(today.getMonth() + 1).padStart(2, "0");
                        const dateStr = `${day}-${month}-${today.getFullYear()}`;
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
        }

        if (!currentKey) {
            currentKey = "Isha";
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
            className={`ptime-wrapper app-wrapper ${K ? "dark" : "light"}`}
            dir={isarabic ? "rtl" : "ltr"}
            style={{
                backgroundColor: K ? "#0b0f19" : "#faf7f2",
                minHeight: "100vh",
            }}
        >
            <Header currentPath="/PTime" />

            <main className="main-content">
                <section className="time-header">
                    <div
                        className="current-time"
                        suppressHydrationWarning
                        style={{ color: K ? "#ffffff" : "#241a15" }}
                    >
                        {timeString}
                    </div>
                    {countdown && (
                        <div
                            className="next-prayer-countdown"
                            suppressHydrationWarning
                            style={{
                                backgroundColor: K ? "rgba(243, 186, 66, 0.15)" : "#faede0",
                                color: K ? "#f3ba42" : "#8d4427",
                                border: K ? "1px solid rgba(243, 186, 66, 0.35)" : "1px solid #c8764b",
                            }}
                        >
                            {countdown}
                        </div>
                    )}
                    {locationName && (
                        <div
                            className="location-badge"
                            style={{
                                color: K ? "#8290a6" : "#70645d",
                                marginTop: "12px",
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 12 14" fill="currentColor" style={{ verticalAlign: "middle", marginInlineEnd: "6px", color: K ? "#f3ba42" : "#b85d38" }}>
                                <path d="M6 0C2.68629 0 0 2.68629 0 6C0 9.75 6 14 6 14C6 14 12 9.75 12 6C12 2.68629 9.31371 0 6 0ZM6 8.25C4.75736 8.25 3.75 7.24264 3.75 6C3.75 4.75736 4.75736 3.75 6 3.75C7.24264 3.75 8.25 4.75736 8.25 6C8.25 7.24264 7.24264 8.25 6 8.25Z" />
                            </svg>
                            {locationName}
                        </div>
                    )}
                </section>

                <section
                    className="schedule-container"
                    style={{
                        backgroundColor: K ? "#121a2b" : "#ffffff",
                        border: K ? "1px solid #1c273e" : "1px solid #ece4d9",
                        boxShadow: K ? "0 10px 40px rgba(0, 0, 0, 0.4)" : "0 10px 30px rgba(90, 60, 40, 0.04)",
                    }}
                >
                    <div className="schedule-header-row" style={{ borderBottomColor: K ? "#1c273e" : "#ece4d9" }}>
                        <h2
                            className="schedule-title"
                            style={{
                                color: K ? "#ffffff" : "#241a15",
                            }}
                        >
                            {isarabic ? "مواقيت الصلاة اليوم" : "Today's Schedule"}
                        </h2>
                        {now && (
                            <div
                                className="date-badge-pill"
                                suppressHydrationWarning
                                style={{
                                    backgroundColor: K ? "#151e30" : "#f5ede4",
                                    color: K ? "#cbd5e1" : "#8d5738",
                                    border: K ? "1px solid #23314d" : "1px solid #ece4d9",
                                }}
                            >
                                {`${Month} ${Day}, ${Year}`}
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <div className="loading-state" style={{ color: K ? "#8290a6" : "#70645d" }}>
                            <div className="loading-spinner" style={{ borderTopColor: K ? "#f3ba42" : "#b85d38" }}></div>
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
                                            ? (K ? "#162137" : "#faede0")
                                            : (K ? "#0c121e" : "#f6f0ea"),
                                        border: prayer.isCurrent
                                            ? (K ? "1px solid #f3ba42" : "1px solid #c8764b")
                                            : (K ? "1px solid #182236" : "1px solid transparent"),
                                        borderInlineStart: prayer.isCurrent
                                            ? (K ? "4px solid #f3ba42" : "4px solid #c8764b")
                                            : "4px solid transparent",
                                        boxShadow: prayer.isCurrent
                                            ? (K ? "0 0 16px rgba(243, 186, 66, 0.2)" : "0 4px 16px rgba(184, 93, 56, 0.12)")
                                            : "none",
                                    }}
                                >
                                    <div className="prayer-info">
                                        <span
                                            className="prayer-name"
                                            style={{
                                                color: prayer.isCurrent
                                                    ? (K ? "#e2e8f0" : "#8d4427")
                                                    : (K ? "#94a3b8" : "#241a15"),
                                                fontWeight: prayer.isCurrent ? 700 : 600,
                                            }}
                                        >
                                            {prayer.name}
                                        </span>
                                        <span
                                            className="prayer-period"
                                            style={{
                                                color: K ? "#8290a6" : "#8a7d75",
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
                                                    backgroundColor: K ? "#f3ba42" : "#a64d29",
                                                    color: K ? "#0b0f19" : "#ffffff",
                                                }}
                                            >
                                                {isarabic ? "الآن" : "Current"}
                                            </span>
                                        )}
                                        <span
                                            className="prayer-time"
                                            style={{
                                                color: prayer.isCurrent
                                                    ? (K ? "#f3ba42" : "#a64d29")
                                                    : (K ? "#ffffff" : "#b85d38"),
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

            <Footer />
        </div>
    );
}
