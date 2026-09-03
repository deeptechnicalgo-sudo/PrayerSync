"use client";
import React, { useState, useEffect } from "react";
import "../App.css";
import "./app.css";
import Switch from "react-switch";
import Link from "next/link";
import { useData, CALCULATION_METHODS } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SettingsPage() {
    const {
        K, setk,
        nightLight, setNightLight,
        is12Hours, setIs12Hours,
        eventBusy, setEventBusy,
        calcMethod, setCalcMethod,
        asrSchool, setAsrSchool,
        preBuffer, setPreBuffer,
        postBuffer, setPostBuffer,
        selectedPrayers, setSelectedPrayers,
        minuteOffsets, setMinuteOffsets,
    } = useData();

    const { isarabic, setArabic } = useData2();
    const { data: session } = useSession();

    const [activeTab, setActiveTab] = useState("smart");
    const [copiedFeed, setCopiedFeed] = useState(false);
    const [copiedFamily, setCopiedFamily] = useState(false);
    const [isCleaning, setIsCleaning] = useState(false);
    const [cleanResult, setCleanResult] = useState(null);

    const [habitDate, setHabitDate] = useState("");
    const [dailyHabits, setDailyHabits] = useState({
        fajrSunnah: false,
        dhuhrSunnahPre: false,
        dhuhrSunnahPost: false,
        maghribSunnah: false,
        ishaSunnah: false,
        witr: false,
        duha: false,
        morningAzkar: false,
        eveningAzkar: false,
        sleepAzkar: false,
    });
    const [habitStreak, setHabitStreak] = useState(1);

    const [quranPages, setQuranPages] = useState(4);
    const [quranTarget, setQuranTarget] = useState(20);
    const [fastingMonThu, setFastingMonThu] = useState(true);
    const [fastingWhiteDays, setFastingWhiteDays] = useState(true);

    const [tasks, setTasks] = useState([
        { id: 1, text: "قراءة سورة الكهف يوم الجمعة", textEn: "Read Surah Al-Kahf on Friday", done: false },
        { id: 2, text: "إخراج صدقة يومية ولو يسيرة", textEn: "Give daily charity (Sadaqah)", done: true },
        { id: 3, text: "الدعاء للوالدين والأمة في السجود", textEn: "Make Dua for parents in Sujood", done: false },
    ]);
    const [newTaskText, setNewTaskText] = useState("");

    useEffect(() => {
        try {
            const todayStr = new Date().toISOString().split("T")[0];
            setHabitDate(todayStr);

            const savedHabits = localStorage.getItem(`prayersync_habits_${todayStr}`);
            if (savedHabits) setDailyHabits(JSON.parse(savedHabits));

            const savedStreak = localStorage.getItem("prayersync_streak");
            if (savedStreak) setHabitStreak(Number(savedStreak));

            const savedQuran = localStorage.getItem("prayersync_quran_pages");
            if (savedQuran) setQuranPages(Number(savedQuran));

            const savedTasks = localStorage.getItem("prayersync_spiritual_tasks");
            if (savedTasks) setTasks(JSON.parse(savedTasks));
        } catch (e) {}
    }, []);

    const toggleHabit = (key) => {
        const updated = { ...dailyHabits, [key]: !dailyHabits[key] };
        setDailyHabits(updated);
        try {
            const todayStr = new Date().toISOString().split("T")[0];
            localStorage.setItem(`prayersync_habits_${todayStr}`, JSON.stringify(updated));
        } catch (e) {}
    };

    const addSpiritualTask = (e) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;
        const updated = [
            ...tasks,
            { id: Date.now(), text: newTaskText.trim(), textEn: newTaskText.trim(), done: false }
        ];
        setTasks(updated);
        setNewTaskText("");
        try { localStorage.setItem("prayersync_spiritual_tasks", JSON.stringify(updated)); } catch (e) {}
    };

    const toggleTask = (id) => {
        const updated = tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t);
        setTasks(updated);
        try { localStorage.setItem("prayersync_spiritual_tasks", JSON.stringify(updated)); } catch (e) {}
    };

    const deleteTask = (id) => {
        const updated = tasks.filter((t) => t.id !== id);
        setTasks(updated);
        try { localStorage.setItem("prayersync_spiritual_tasks", JSON.stringify(updated)); } catch (e) {}
    };

    const updateQuranPages = (delta) => {
        const val = Math.max(0, quranPages + delta);
        setQuranPages(val);
        try { localStorage.setItem("prayersync_quran_pages", String(val)); } catch (e) {}
    };

    const openSubpage = (path) => {
        window.open(path, "_blank", "width=800,height=650");
    };

    const baseUrl = "https://prayer-sync.vercel.app";
    const prayersQuery = Object.keys(selectedPrayers || {})
        .filter((k) => selectedPrayers[k])
        .join(",");
    const offsetsQuery = Object.entries(minuteOffsets || {})
        .map(([k, v]) => `${k}:${v}`)
        .join(",");

    const feedUrl = `${baseUrl}/api/calendar/feed?method=${calcMethod}&school=${asrSchool}&preBuffer=${preBuffer}&postBuffer=${postBuffer}&busy=${eventBusy !== false}&prayers=${prayersQuery}&offsets=${offsetsQuery}&lang=${isarabic ? "ar" : "en"}`;
    const webcalUrl = feedUrl.replace(/^https?:\/\//, "webcal://");

    const familySyncUrl = `${baseUrl}?method=${calcMethod}&school=${asrSchool}&preBuffer=${preBuffer}&postBuffer=${postBuffer}&busy=${eventBusy !== false}&offsets=${offsetsQuery}`;

    const copyToClipboard = (text, type = "feed") => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
            if (type === "feed") {
                setCopiedFeed(true);
                setTimeout(() => setCopiedFeed(false), 2500);
            } else {
                setCopiedFamily(true);
                setTimeout(() => setCopiedFamily(false), 2500);
            }
        }
    };

    const handleWipeAndReset = async () => {
        if (!session?.accessToken) {
            alert(isarabic ? "يرجى تسجيل الدخول بحساب Google أولاً." : "Please connect your Google account first.");
            return;
        }

        const confirmWipe = window.confirm(
            isarabic
                ? "هل أنت متأكد من رغبتك في حذف جميع مواقيت الصلاة المنشأة بواسطة التطبيق من تقويم Google؟"
                : "Are you sure you want to remove all prayer events generated by PrayerSync from your Google Calendar?"
        );

        if (!confirmWipe) return;

        setIsCleaning(true);
        setCleanResult(null);

        try {
            const res = await fetch("/api/calendar/clean", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ accessToken: session.accessToken }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setCleanResult({
                    type: "success",
                    text: isarabic
                        ? `تم تنظيف التقويم بنجاح! تم حذف ${data.deletedCount} موعد صلاة.`
                        : `Calendar reset complete! Deleted ${data.deletedCount} prayer event(s).`,
                });
            } else {
                setCleanResult({
                    type: "error",
                    text: data.message || (isarabic ? "فشل تنظيف التقويم." : "Failed to clean calendar."),
                });
            }
        } catch (err) {
            setCleanResult({
                type: "error",
                text: isarabic ? "حدث خطأ أثناء تنظيف التقويم." : "An error occurred during calendar cleanup.",
            });
        } finally {
            setIsCleaning(false);
        }
    };

    const prayerKeys = [
        { key: "Fajr", nameEn: "Fajr", nameAr: "الفجر" },
        { key: "Dhuhr", nameEn: "Dhuhr", nameAr: "الظهر" },
        { key: "Asr", nameEn: "Asr", nameAr: "العصر" },
        { key: "Maghrib", nameEn: "Maghrib", nameAr: "المغرب" },
        { key: "Isha", nameEn: "Isha", nameAr: "العشاء" },
    ];

    const islamicEventsList = [
        { hijri: "1 Muharram", nameAr: "رأس السنة الهجرية", nameEn: "Islamic New Year", descAr: "بداية العام الهجري الجديد 1448 هـ", descEn: "Beginning of the new Hijri year" },
        { hijri: "10 Muharram", nameAr: "يوم عاشوراء", nameEn: "Day of Ashura", descAr: "صيام يوم عاشوراء وتكفير ذنوب سنة ماضية", descEn: "Sunnah fast of Ashura" },
        { hijri: "12 Rabi' al-Awwal", nameAr: "المولد النبوي الشريف", nameEn: "Mawlid an-Nabi", descAr: "ذكرى مولد رسول الله ﷺ", descEn: "Prophet Muhammad's Birthday commemoration" },
        { hijri: "27 Rajab", nameAr: "الإسراء والمعراج", nameEn: "Isra and Mi'raj", descAr: "معجزة الإسراء والمعراج وفرض الصلوات الخمس", descEn: "Night journey and ascension of the Prophet" },
        { hijri: "15 Sha'ban", nameAr: "ليلة النصف من شعبان", nameEn: "Mid-Sha'ban", descAr: "ليلة مباركة والاستعداد لشهر رمضان", descEn: "Night of forgiveness and Ramadan preparation" },
        { hijri: "1 Ramadan", nameAr: "أول أيام شهر رمضان المبارك", nameEn: "First Day of Ramadan", descAr: "شهر الصيام والقيام ونزول القرآن", descEn: "Beginning of the Holy month of fasting" },
        { hijri: "27 Ramadan", nameAr: "ليلة القدر المباركة (المحتملة)", nameEn: "Laylat al-Qadr (Estimated)", descAr: "خير من ألف شهر وتنزل الملائكة", descEn: "Night of Power & Decree (better than 1000 months)" },
        { hijri: "1 Shawwal", nameAr: "عيد الفطر المبارك", nameEn: "Eid al-Fitr", descAr: "أول أيام الفطر بعد انقضاء شهر رمضان", descEn: "Celebration after the completion of Ramadan" },
        { hijri: "9 Dhul Hijjah", nameAr: "يوم عرفة", nameEn: "Day of Arafah", descAr: "أعظم أيام السنة وصيام يكفر سنتين", descEn: "Greatest day of Hajj & recommended fast" },
        { hijri: "10 Dhul Hijjah", nameAr: "عيد الأضحى المبارك", nameEn: "Eid al-Adha", descAr: "يوم النحر وذبح الأضاحي وتكبيرات العيد", descEn: "Feast of Sacrifice and Hajj celebrations" },
    ];

    const habitsCount = Object.values(dailyHabits).filter(Boolean).length;
    const habitsPercent = Math.round((habitsCount / Object.keys(dailyHabits).length) * 100);

    return (
        <div className="app-wrapper" dir={isarabic ? "rtl" : "ltr"} style={{ backgroundColor: K ? "#0f1412" : "#f5faf9", minHeight: "100vh" }}>
            <header className="navbar" style={{ backgroundColor: K ? "#0f1412" : "#f5faf9" }}>
                <Link href="/" className="navbar-logo" style={{ color: K ? "#95d3ba" : "#003829" }}>
                    {isarabic ? "مزامنة الصلاة" : "PrayerSync"}
                </Link>
                <nav>
                    <ul className="navbar-links">
                        <li>
                            <Link href="/" className="navbar-link" style={{ color: K ? "#89938e" : "#6e827c" }}>
                                {isarabic ? "الصفحة الرئيسة" : "Home"}
                            </Link>
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
                    <Link href="/Settings" className="navbar-icon-btn" aria-label="Settings" style={{ color: K ? "#ffe088" : "#003829", display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
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

            <main className="main-content" style={{ backgroundColor: K ? "#0f1412" : "#f5faf9", color: K ? "#c8e8dc" : "#161d1f" }}>
                <div className="page-header">
                    <h1 className="page-title" style={{ color: K ? "#95d3ba" : "#003829" }}>
                        {isarabic ? "مركز الإعدادات والإنتاجية الإسلامية" : "Settings & Islamic Productivity"}
                    </h1>
                    <p className="page-description" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                        {isarabic
                            ? "تتبع العبادات اليومية، المناسبات الهجرية، حماية أوقات العمل، والتزامن مع Google Calendar."
                            : "Track Sunnah habits, Islamic holidays, protect your calendar during work, and customize Fiqh calculations."}
                    </p>
                </div>

                <div className="settings-layout">
                    <div className="sidebar">
                        <nav className="sidebar-nav">
                            <button
                                type="button"
                                className={`sidebar-link ${activeTab === "smart" ? "active" : ""}`}
                                onClick={() => setActiveTab("smart")}
                                style={{
                                    backgroundColor: activeTab === "smart" ? (K ? "#1a2520" : "#e2e9ec") : "transparent",
                                    color: activeTab === "smart" ? (K ? "#95d3ba" : "#003829") : (K ? "#89938e" : undefined),
                                    textAlign: isarabic ? "right" : "left",
                                    width: "100%", cursor: "pointer"
                                }}
                            >
                                <span style={{ fontSize: "18px" }}>🛡️</span>
                                {isarabic ? "الجدولة وحماية العمل" : "Smart Work Shield"}
                            </button>

                            <button
                                type="button"
                                className={`sidebar-link ${activeTab === "habits" ? "active" : ""}`}
                                onClick={() => setActiveTab("habits")}
                                style={{
                                    backgroundColor: activeTab === "habits" ? (K ? "#1a2520" : "#e2e9ec") : "transparent",
                                    color: activeTab === "habits" ? (K ? "#95d3ba" : "#003829") : (K ? "#89938e" : undefined),
                                    textAlign: isarabic ? "right" : "left",
                                    width: "100%", cursor: "pointer"
                                }}
                            >
                                <span style={{ fontSize: "18px" }}>📿</span>
                                {isarabic ? "تتبع السنن والأذكار" : "Sunnah & Azkar Tracker"}
                            </button>

                            <button
                                type="button"
                                className={`sidebar-link ${activeTab === "islamic" ? "active" : ""}`}
                                onClick={() => setActiveTab("islamic")}
                                style={{
                                    backgroundColor: activeTab === "islamic" ? (K ? "#1a2520" : "#e2e9ec") : "transparent",
                                    color: activeTab === "islamic" ? (K ? "#95d3ba" : "#003829") : (K ? "#89938e" : undefined),
                                    textAlign: isarabic ? "right" : "left",
                                    width: "100%", cursor: "pointer"
                                }}
                            >
                                <span style={{ fontSize: "18px" }}>🌙</span>
                                {isarabic ? "المناسبات الإسلامية والهجرية" : "Islamic Calendar Events"}
                            </button>

                            <button
                                type="button"
                                className={`sidebar-link ${activeTab === "tasks" ? "active" : ""}`}
                                onClick={() => setActiveTab("tasks")}
                                style={{
                                    backgroundColor: activeTab === "tasks" ? (K ? "#1a2520" : "#e2e9ec") : "transparent",
                                    color: activeTab === "tasks" ? (K ? "#95d3ba" : "#003829") : (K ? "#89938e" : undefined),
                                    textAlign: isarabic ? "right" : "left",
                                    width: "100%", cursor: "pointer"
                                }}
                            >
                                <span style={{ fontSize: "18px" }}>📖</span>
                                {isarabic ? "ورد القرآن والمهام الإيمانية" : "Quran & Spiritual Tasks"}
                            </button>

                            <button
                                type="button"
                                className={`sidebar-link ${activeTab === "fiqh" ? "active" : ""}`}
                                onClick={() => setActiveTab("fiqh")}
                                style={{
                                    backgroundColor: activeTab === "fiqh" ? (K ? "#1a2520" : "#e2e9ec") : "transparent",
                                    color: activeTab === "fiqh" ? (K ? "#95d3ba" : "#003829") : (K ? "#89938e" : undefined),
                                    textAlign: isarabic ? "right" : "left",
                                    width: "100%", cursor: "pointer"
                                }}
                            >
                                <span style={{ fontSize: "18px" }}>🕌</span>
                                {isarabic ? "طرق الحساب والفقه" : "Fiqh & Calculations"}
                            </button>

                            <button
                                type="button"
                                className={`sidebar-link ${activeTab === "family" ? "active" : ""}`}
                                onClick={() => setActiveTab("family")}
                                style={{
                                    backgroundColor: activeTab === "family" ? (K ? "#1a2520" : "#e2e9ec") : "transparent",
                                    color: activeTab === "family" ? (K ? "#95d3ba" : "#003829") : (K ? "#89938e" : undefined),
                                    textAlign: isarabic ? "right" : "left",
                                    width: "100%", cursor: "pointer"
                                }}
                            >
                                <span style={{ fontSize: "18px" }}>👨‍👩‍👧‍👦</span>
                                {isarabic ? "مزامنة العائلة ورابط Webcal" : "Family & Webcal Sync"}
                            </button>

                            <button
                                type="button"
                                className={`sidebar-link ${activeTab === "general" ? "active" : ""}`}
                                onClick={() => setActiveTab("general")}
                                style={{
                                    backgroundColor: activeTab === "general" ? (K ? "#1a2520" : "#e2e9ec") : "transparent",
                                    color: activeTab === "general" ? (K ? "#95d3ba" : "#003829") : (K ? "#89938e" : undefined),
                                    textAlign: isarabic ? "right" : "left",
                                    width: "100%", cursor: "pointer"
                                }}
                            >
                                <span style={{ fontSize: "18px" }}>⚙️</span>
                                {isarabic ? "التفضيلات العامة وحساب Google" : "General & Google"}
                            </button>
                        </nav>
                    </div>

                    <div className="settings-content">
                        {activeTab === "smart" && (
                            <section className="settings-section" style={{ backgroundColor: K ? "#0b0f0d" : "#ffffff", border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1" }}>
                                <h2 className="section-header" style={{ color: K ? "#95d3ba" : "#003829", borderBottomColor: K ? "rgba(63, 73, 69, 0.3)" : undefined }}>
                                    <span>🛡️</span>
                                    {isarabic ? "الجدولة الذكية وحماية أوقات الصلاة" : "Smart Work & Meeting Protection"}
                                </h2>
                                <div className="settings-group">
                                    <div className="setting-item" style={{ alignItems: "flex-start" }}>
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: K ? "#c8e8dc" : "#161d1f" }}>
                                                {isarabic ? "اختيار الصلوات المراد مزامنتها" : "Selective Prayer Syncing"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                                                {isarabic
                                                    ? "حدد الصلوات التي تريد ظهورها في التقويم (مثال: الظهر والعصر فقط لتقويم العمل)."
                                                    : "Choose which prayers to sync (e.g. sync only Dhuhr & Asr for corporate office hours)."}
                                            </p>
                                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "12px" }}>
                                                {prayerKeys.map((p) => {
                                                    const isChecked = selectedPrayers ? selectedPrayers[p.key] !== false : true;
                                                    return (
                                                        <button
                                                            key={p.key}
                                                            type="button"
                                                            onClick={() => setSelectedPrayers(p.key, !isChecked)}
                                                            style={{
                                                                padding: "8px 16px",
                                                                borderRadius: "20px",
                                                                fontSize: "13px",
                                                                fontWeight: "700",
                                                                cursor: "pointer",
                                                                backgroundColor: isChecked ? (K ? "#1a2520" : "#003829") : (K ? "rgba(255,255,255,0.05)" : "#eef5f7"),
                                                                color: isChecked ? (K ? "#95d3ba" : "#ffffff") : (K ? "#89938e" : "#6e827c"),
                                                                border: isChecked ? (K ? "1px solid #95d3ba" : "1px solid #003829") : "1px solid transparent"
                                                            }}
                                                        >
                                                            {isChecked ? "✓ " : "+ "}
                                                            {isarabic ? p.nameAr : p.nameEn}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: K ? "#c8e8dc" : "#161d1f" }}>
                                                {isarabic ? "فترة الاستعداد والوضوء (Pre-Prayer Buffer)" : "Pre-Prayer Preparation Buffer"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                                                {isarabic
                                                    ? "بدء موعد التقويم قبل الأذان بدقائق للاستعداد والوضوء ومنع الاجتماعات."
                                                    : "Start calendar block minutes before Azan for Wudu and preparation."}
                                            </p>
                                        </div>
                                        <div className="toggle-group" style={{ backgroundColor: K ? "#111915" : "#eef5f7" }}>
                                            {[0, 5, 10, 15].map((m) => (
                                                <button
                                                    key={m}
                                                    type="button"
                                                    className={`toggle-btn ${preBuffer === m ? "active" : ""}`}
                                                    onClick={() => setPreBuffer(m)}
                                                    style={preBuffer === m ? { backgroundColor: K ? "#1a2520" : "#ffffff", color: K ? "#95d3ba" : "#003829" } : { color: K ? "#6b8a7e" : "#6e827c" }}
                                                >
                                                    {m === 0 ? (isarabic ? "لا يوجد" : "None") : `+${m}m`}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: K ? "#c8e8dc" : "#161d1f" }}>
                                                {isarabic ? "مدة حجز وقت الصلاة والإقامة" : "Prayer Duration & Iqama Block"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                                                {isarabic
                                                    ? "إجمالي المدة المحجوزة في التقويم لأداء الصلاة والسنن والأذكار."
                                                    : "Total time reserved in calendar for congregational prayer, Sunnah, and Azkar."}
                                            </p>
                                        </div>
                                        <div className="toggle-group" style={{ backgroundColor: K ? "#111915" : "#eef5f7" }}>
                                            {[15, 20, 30, 45, 60].map((m) => (
                                                <button
                                                    key={m}
                                                    type="button"
                                                    className={`toggle-btn ${postBuffer === m ? "active" : ""}`}
                                                    onClick={() => setPostBuffer(m)}
                                                    style={postBuffer === m ? { backgroundColor: K ? "#1a2520" : "#ffffff", color: K ? "#95d3ba" : "#003829" } : { color: K ? "#6b8a7e" : "#6e827c" }}
                                                >
                                                    {m}m
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: K ? "#c8e8dc" : "#161d1f" }}>
                                                {isarabic ? "حجز الحالة كـ «مشغول» في التقويم" : "Mark Status as «Busy»"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                                                {isarabic
                                                    ? "حجز وقت الصلاة في Teams وGoogle Meet لمنع الزملاء من تحديد اجتماعات أثناء الصلاة."
                                                    : "Blocks time in Teams & Google Meet to prevent coworkers from booking meetings over prayer."}
                                            </p>
                                        </div>
                                        <Switch
                                            checked={eventBusy !== false}
                                            onChange={(val) => setEventBusy(val)}
                                            onColor="#003829"
                                            offColor="#d1dbd8"
                                            checkedIcon={false}
                                            uncheckedIcon={false}
                                            height={24}
                                            width={44}
                                        />
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeTab === "habits" && (
                            <section className="settings-section" style={{ backgroundColor: K ? "#0b0f0d" : "#ffffff", border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1" }}>
                                <h2 className="section-header" style={{ color: K ? "#95d3ba" : "#003829", borderBottomColor: K ? "rgba(63, 73, 69, 0.3)" : undefined }}>
                                    <span>📿</span>
                                    {isarabic ? "متابعة السنن الرواتب والأذكار اليومية" : "Sunnah Rawatib & Azkar Tracker"}
                                </h2>

                                <div style={{ padding: "16px", borderRadius: "14px", backgroundColor: K ? "#111915" : "#eef5f7", marginBottom: "20px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                                        <span style={{ fontSize: "14px", fontWeight: "700", color: K ? "#95d3ba" : "#003829" }}>
                                            {isarabic ? `إنجاز عبادات اليوم: ${habitsPercent}%` : `Today's Progress: ${habitsPercent}%`}
                                        </span>
                                        <span style={{ fontSize: "12px", fontWeight: "700", padding: "3px 10px", borderRadius: "12px", backgroundColor: K ? "rgba(149, 211, 186, 0.2)" : "#d1fae5", color: K ? "#95d3ba" : "#065f46" }}>
                                            🔥 {isarabic ? `سلسلة الالتزام: ${habitStreak} أيام` : `Streak: ${habitStreak} Days`}
                                        </span>
                                    </div>
                                    <div style={{ height: "8px", borderRadius: "4px", backgroundColor: K ? "#1a2520" : "#dde4e6", overflow: "hidden" }}>
                                        <div style={{ width: `${habitsPercent}%`, height: "100%", backgroundColor: habitsPercent === 100 ? "#10b981" : (K ? "#95d3ba" : "#003829"), transition: "width 0.3s ease" }}></div>
                                    </div>
                                </div>

                                <div className="settings-group">
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
                                        {[
                                            { key: "fajrSunnah", labelAr: "ركعتا سنة الفجر القبلية", labelEn: "2 Rak'ahs Fajr Sunnah" },
                                            { key: "dhuhrSunnahPre", labelAr: "٤ ركعات سنة الظهر القبلية", labelEn: "4 Rak'ahs Dhuhr Pre-Sunnah" },
                                            { key: "dhuhrSunnahPost", labelAr: "ركعتا سنة الظهر البعدية", labelEn: "2 Rak'ahs Dhuhr Post-Sunnah" },
                                            { key: "maghribSunnah", labelAr: "ركعتا سنة المغرب البعدية", labelEn: "2 Rak'ahs Maghrib Sunnah" },
                                            { key: "ishaSunnah", labelAr: "ركعتا سنة العشاء البعدية", labelEn: "2 Rak'ahs Isha Sunnah" },
                                            { key: "witr", labelAr: "صلاة الوتر وقيام الليل", labelEn: "Witr & Night Prayer" },
                                            { key: "duha", labelAr: "صلاة الضحى (صلاة الأوابين)", labelEn: "Duha Prayer" },
                                            { key: "morningAzkar", labelAr: "أذكار الصباح", labelEn: "Morning Azkar" },
                                            { key: "eveningAzkar", labelAr: "أذكار المساء", labelEn: "Evening Azkar" },
                                            { key: "sleepAzkar", labelAr: "أذكار النوم وسورة الملك", labelEn: "Sleep Azkar & Surah Al-Mulk" },
                                        ].map((item) => {
                                            const isDone = dailyHabits[item.key];
                                            return (
                                                <div
                                                    key={item.key}
                                                    onClick={() => toggleHabit(item.key)}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "12px",
                                                        padding: "12px 16px",
                                                        borderRadius: "10px",
                                                        cursor: "pointer",
                                                        backgroundColor: isDone ? (K ? "rgba(149, 211, 186, 0.15)" : "#e6f4ea") : (K ? "#111915" : "#f8fafc"),
                                                        border: isDone ? (K ? "1px solid #95d3ba" : "1px solid #34a853") : (K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #e2e8f0"),
                                                        transition: "all 0.2s"
                                                    }}
                                                >
                                                    <span style={{ fontSize: "16px" }}>{isDone ? "✅" : "⭕"}</span>
                                                    <span style={{ fontSize: "13px", fontWeight: isDone ? "700" : "500", textDecoration: isDone ? "line-through" : "none", color: isDone ? (K ? "#95d3ba" : "#137333") : (K ? "#c8e8dc" : "#1e293b") }}>
                                                        {isarabic ? item.labelAr : item.labelEn}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeTab === "islamic" && (
                            <section className="settings-section" style={{ backgroundColor: K ? "#0b0f0d" : "#ffffff", border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1" }}>
                                <h2 className="section-header" style={{ color: K ? "#95d3ba" : "#003829", borderBottomColor: K ? "rgba(63, 73, 69, 0.3)" : undefined }}>
                                    <span>🌙</span>
                                    {isarabic ? "المناسبات والأعياد الإسلامية بالتقويم الهجري" : "Islamic Events & Hijri Holidays"}
                                </h2>
                                <p className="section-description" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                                    {isarabic
                                        ? "دليل المناسبات الدينية وأيام الفضل السنوية لمتابعتها وإضافتها لتقويمك الشخصي."
                                        : "Comprehensive schedule of annual Islamic holidays, recommended fasts, and spiritual seasons."}
                                </p>

                                <div style={{ display: "grid", gap: "10px" }}>
                                    {islamicEventsList.map((ev, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                padding: "14px",
                                                borderRadius: "10px",
                                                backgroundColor: K ? "#111915" : "#eef5f7",
                                                border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #e1e8e6",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                                gap: "8px"
                                            }}
                                        >
                                            <div>
                                                <div style={{ fontSize: "14px", fontWeight: "700", color: K ? "#95d3ba" : "#003829" }}>
                                                    {isarabic ? ev.nameAr : ev.nameEn}
                                                </div>
                                                <div style={{ fontSize: "12px", color: K ? "#89938e" : "#6e827c", marginTop: "2px" }}>
                                                    {isarabic ? ev.descAr : ev.descEn}
                                                </div>
                                            </div>
                                            <span style={{ fontSize: "12px", fontWeight: "700", padding: "4px 10px", borderRadius: "8px", backgroundColor: K ? "#1a2520" : "#ffffff", color: K ? "#ffe088" : "#854d0e", border: "1px solid rgba(250, 204, 21, 0.4)" }}>
                                                📅 {ev.hijri}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeTab === "tasks" && (
                            <section className="settings-section" style={{ backgroundColor: K ? "#0b0f0d" : "#ffffff", border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1" }}>
                                <h2 className="section-header" style={{ color: K ? "#95d3ba" : "#003829", borderBottomColor: K ? "rgba(63, 73, 69, 0.3)" : undefined }}>
                                    <span>📖</span>
                                    {isarabic ? "متابعة تلاوة القرآن والمهام الإيمانية" : "Daily Quran & Spiritual Tasks"}
                                </h2>

                                <div style={{ padding: "18px", borderRadius: "12px", backgroundColor: K ? "#111915" : "#eef5f7", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                                    <div>
                                        <div style={{ fontSize: "15px", fontWeight: "700", color: K ? "#95d3ba" : "#003829" }}>
                                            📖 {isarabic ? "ورد التلاوة اليومي" : "Daily Quran Pages Goal"}
                                        </div>
                                        <div style={{ fontSize: "12px", color: K ? "#89938e" : "#6e827c" }}>
                                            {isarabic ? `الهدف: ${quranTarget} صفحة (جزء كامل)` : `Target: ${quranTarget} pages (1 Juz)`}
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <button onClick={() => updateQuranPages(-1)} style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: K ? "#1a2520" : "#ffffff", fontWeight: "bold", cursor: "pointer", border: "1px solid #dde4e6" }}>-</button>
                                        <span style={{ fontSize: "16px", fontWeight: "800", minWidth: "40px", textAlign: "center", color: K ? "#95d3ba" : "#003829" }}>
                                            {quranPages} {isarabic ? "ص" : "p"}
                                        </span>
                                        <button onClick={() => updateQuranPages(1)} style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: K ? "#1a2520" : "#ffffff", fontWeight: "bold", cursor: "pointer", border: "1px solid #dde4e6" }}>+</button>
                                    </div>
                                </div>

                                <div className="settings-group">
                                    <h3 style={{ fontSize: "15px", fontWeight: "700", color: K ? "#c8e8dc" : "#161d1f", margin: "0 0 10px 0" }}>
                                        ✅ {isarabic ? "قائمة المهام والنوايا الإيمانية" : "Spiritual To-Do List"}
                                    </h3>

                                    <form onSubmit={addSpiritualTask} style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                                        <input
                                            type="text"
                                            value={newTaskText}
                                            onChange={(e) => setNewTaskText(e.target.value)}
                                            placeholder={isarabic ? "أضف نية أو عملاً صالحاً..." : "Add a spiritual task or good deed..."}
                                            style={{
                                                flex: 1, padding: "10px 14px", borderRadius: "8px",
                                                backgroundColor: K ? "#111915" : "#ffffff",
                                                color: K ? "#c8e8dc" : "#161d1f",
                                                border: K ? "1px solid rgba(63, 73, 69, 0.4)" : "1px solid #dde4e6",
                                                fontSize: "13px"
                                            }}
                                        />
                                        <button
                                            type="submit"
                                            style={{
                                                padding: "10px 18px", borderRadius: "8px",
                                                backgroundColor: K ? "#95d3ba" : "#003829",
                                                color: K ? "#0b0f0d" : "#ffffff",
                                                fontWeight: "700", fontSize: "13px", cursor: "pointer", border: "none"
                                            }}
                                        >
                                            {isarabic ? "إضافة +" : "Add +"}
                                        </button>
                                    </form>

                                    <div style={{ display: "grid", gap: "8px" }}>
                                        {tasks.map((t) => (
                                            <div
                                                key={t.id}
                                                style={{
                                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                                    padding: "10px 14px", borderRadius: "8px",
                                                    backgroundColor: t.done ? (K ? "rgba(149, 211, 186, 0.1)" : "#f0fdf4") : (K ? "#111915" : "#ffffff"),
                                                    border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #e1e8e6"
                                                }}
                                            >
                                                <div onClick={() => toggleTask(t.id)} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", flex: 1 }}>
                                                    <span>{t.done ? "✅" : "⭕"}</span>
                                                    <span style={{ fontSize: "13px", textDecoration: t.done ? "line-through" : "none", color: t.done ? "#89938e" : (K ? "#c8e8dc" : "#161d1f") }}>
                                                        {isarabic ? t.text : (t.textEn || t.text)}
                                                    </span>
                                                </div>
                                                <button onClick={() => deleteTask(t.id)} style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}>×</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeTab === "fiqh" && (
                            <section className="settings-section" style={{ backgroundColor: K ? "#0b0f0d" : "#ffffff", border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1" }}>
                                <h2 className="section-header" style={{ color: K ? "#95d3ba" : "#003829", borderBottomColor: K ? "rgba(63, 73, 69, 0.3)" : undefined }}>
                                    <span>🕌</span>
                                    {isarabic ? "الهيئة الفقهية وطريقة الحساب" : "Fiqh & Calculation Method"}
                                </h2>
                                <div className="settings-group">
                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: K ? "#c8e8dc" : "#161d1f" }}>
                                                {isarabic ? "طريقة الحساب المعتمدة" : "Calculation Body"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                                                {isarabic ? "اختر الهيئة أو المنظمة المتبعة لحساب زوايا الفجر والعشاء." : "Select the Islamic authority used for Fajr and Isha angles."}
                                            </p>
                                        </div>
                                        <div className="select-wrapper">
                                            <select
                                                value={calcMethod}
                                                onChange={(e) => setCalcMethod(e.target.value)}
                                                className="select-input"
                                                style={{
                                                    backgroundColor: K ? "#111915" : "#ffffff",
                                                    color: K ? "#95d3ba" : "#003829",
                                                }}
                                            >
                                                {CALCULATION_METHODS.map((m) => (
                                                    <option key={m.id} value={m.id}>
                                                        {isarabic ? m.nameAr : m.nameEn}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: K ? "#c8e8dc" : "#161d1f" }}>
                                                {isarabic ? "فقه صلاة العصر (المذهب)" : "Asr Jurisprudence (School)"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                                                {isarabic ? "الجمهور (شافعي، مالكي، حنبلي) بمثل الظل، أو الحنفي بمثلي الظل." : "Standard (Shafi'i, Maliki, Hanbali) vs Hanafi."}
                                            </p>
                                        </div>
                                        <div className="toggle-group" style={{ backgroundColor: K ? "#111915" : "#eef5f7" }}>
                                            <button
                                                type="button"
                                                className={`toggle-btn ${asrSchool === 0 ? "active" : ""}`}
                                                onClick={() => setAsrSchool(0)}
                                                style={asrSchool === 0 ? { backgroundColor: K ? "#1a2520" : "#ffffff", color: K ? "#95d3ba" : "#003829" } : { color: K ? "#6b8a7e" : "#6e827c" }}
                                            >
                                                {isarabic ? "الجمهور (قياسي)" : "Standard (Shafi'i)"}
                                            </button>
                                            <button
                                                type="button"
                                                className={`toggle-btn ${asrSchool === 1 ? "active" : ""}`}
                                                onClick={() => setAsrSchool(1)}
                                                style={asrSchool === 1 ? { backgroundColor: K ? "#1a2520" : "#ffffff", color: K ? "#95d3ba" : "#003829" } : { color: K ? "#6b8a7e" : "#6e827c" }}
                                            >
                                                {isarabic ? "حنفي" : "Hanafi"}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="setting-item" style={{ alignItems: "flex-start" }}>
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: K ? "#c8e8dc" : "#161d1f" }}>
                                                {isarabic ? "التعديل اليدوي بالدقائق (+/- دقيقة)" : "Manual Minute Adjustments (+/- min)"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                                                {isarabic ? "عدّل دقائق أي صلاة لمطابقة توقيت مسجد حيك بدقة." : "Fine-tune individual prayer times to match your local masjid."}
                                            </p>
                                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px", marginTop: "14px" }}>
                                                {prayerKeys.map((p) => {
                                                    const val = minuteOffsets ? minuteOffsets[p.key] || 0 : 0;
                                                    return (
                                                        <div
                                                            key={p.key}
                                                            style={{
                                                                padding: "10px", borderRadius: "8px",
                                                                backgroundColor: K ? "#111915" : "#eef5f7",
                                                                textAlign: "center",
                                                                border: K ? "1px solid rgba(63, 73, 69, 0.4)" : "1px solid #dde4e6"
                                                            }}
                                                        >
                                                            <div style={{ fontSize: "12px", fontWeight: "700", marginBottom: "6px" }}>
                                                                {isarabic ? p.nameAr : p.nameEn}
                                                            </div>
                                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                                                <button type="button" onClick={() => setMinuteOffsets(p.key, val - 1)} style={{ width: "26px", height: "26px", borderRadius: "50%", backgroundColor: K ? "#1a2520" : "#ffffff", cursor: "pointer", fontWeight: "bold" }}>-</button>
                                                                <span style={{ fontSize: "13px", fontWeight: "700", minWidth: "28px" }}>{val > 0 ? `+${val}` : val}</span>
                                                                <button type="button" onClick={() => setMinuteOffsets(p.key, val + 1)} style={{ width: "26px", height: "26px", borderRadius: "50%", backgroundColor: K ? "#1a2520" : "#ffffff", cursor: "pointer", fontWeight: "bold" }}>+</button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeTab === "family" && (
                            <section className="settings-section" style={{ backgroundColor: K ? "#0b0f0d" : "#ffffff", border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1" }}>
                                <h2 className="section-header" style={{ color: K ? "#95d3ba" : "#003829", borderBottomColor: K ? "rgba(63, 73, 69, 0.3)" : undefined }}>
                                    <span>👨‍👩‍👧‍👦</span>
                                    {isarabic ? "مزامنة العائلة والاشتراك المباشر" : "Family & Webcal Sync"}
                                </h2>
                                <div className="settings-group">
                                    <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: K ? "#111915" : "#eef5f7" }}>
                                        <div style={{ fontSize: "14px", fontWeight: "700", color: K ? "#95d3ba" : "#003829", marginBottom: "6px" }}>
                                            👨‍👩‍👧‍👦 {isarabic ? "رابط مزامنة إعدادات العائلة وفريق العمل:" : "Family & Team Preconfigured Link:"}
                                        </div>
                                        <div style={{ fontSize: "12px", color: K ? "#89938e" : "#5c726c", marginBottom: "10px" }}>
                                            {isarabic ? "شارك هذا الرابط مع أفراد عائلتك لضبط مدينتكم ومسجدكم وتوقيتات الصلاة بضغطة واحدة." : "Share this link with family members to synchronize their app to the exact same mosque offsets & city."}
                                        </div>
                                        <div style={{ padding: "8px", borderRadius: "6px", backgroundColor: K ? "#0b0f0d" : "#ffffff", fontSize: "11px", fontFamily: "monospace", wordBreak: "break-all", color: K ? "#95d3ba" : "#065f46", marginBottom: "10px" }}>
                                            {familySyncUrl}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard(familySyncUrl, "family")}
                                            style={{
                                                padding: "8px 16px", borderRadius: "8px",
                                                backgroundColor: K ? "#95d3ba" : "#003829",
                                                color: K ? "#0b0f0d" : "#ffffff",
                                                fontWeight: "700", fontSize: "13px", cursor: "pointer", border: "none"
                                            }}
                                        >
                                            {copiedFamily ? (isarabic ? "تم النسخ! ✓" : "Copied! ✓") : (isarabic ? "نسخ رابط العائلة" : "Copy Family Sync Link")}
                                        </button>
                                    </div>

                                    <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: K ? "#111915" : "#eef5f7" }}>
                                        <div style={{ fontSize: "14px", fontWeight: "700", color: K ? "#95d3ba" : "#003829", marginBottom: "6px" }}>
                                            📡 {isarabic ? "رابط الاشتراك التلقائي في التقويم (Webcal Feed):" : "Dynamic Webcal Feed URL:"}
                                        </div>
                                        <div style={{ padding: "8px", borderRadius: "6px", backgroundColor: K ? "#0b0f0d" : "#ffffff", fontSize: "11px", fontFamily: "monospace", wordBreak: "break-all", color: K ? "#95d3ba" : "#065f46", marginBottom: "10px" }}>
                                            {webcalUrl}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard(webcalUrl, "feed")}
                                            style={{
                                                padding: "8px 16px", borderRadius: "8px",
                                                backgroundColor: K ? "#95d3ba" : "#003829",
                                                color: K ? "#0b0f0d" : "#ffffff",
                                                fontWeight: "700", fontSize: "13px", cursor: "pointer", border: "none"
                                            }}
                                        >
                                            {copiedFeed ? (isarabic ? "تم النسخ! ✓" : "Copied! ✓") : (isarabic ? "نسخ رابط الاشتراك" : "Copy Subscription URL")}
                                        </button>
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeTab === "general" && (
                            <section className="settings-section" style={{ backgroundColor: K ? "#0b0f0d" : "#ffffff", border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1" }}>
                                <h2 className="section-header" style={{ color: K ? "#95d3ba" : "#003829", borderBottomColor: K ? "rgba(63, 73, 69, 0.3)" : undefined }}>
                                    <span>⚙️</span>
                                    {isarabic ? "التفضيلات العامة وحساب Google" : "General Preferences & Google Setup"}
                                </h2>
                                <div className="settings-group">
                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: K ? "#c8e8dc" : "#161d1f" }}>
                                                {isarabic ? "صيغة الوقت" : "Time Format"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                                                {isarabic ? "اختر طريقة عرض الساعة (١٢ ساعة / ٢٤ ساعة)." : "Select clock display (12 Hour / 24 Hour)."}
                                            </p>
                                        </div>
                                        <div className="toggle-group" style={{ backgroundColor: K ? "#111915" : "#eef5f7" }}>
                                            <button
                                                type="button"
                                                className={`toggle-btn ${is12Hours !== false ? "active" : ""}`}
                                                onClick={() => setIs12Hours(true)}
                                                style={is12Hours !== false ? { backgroundColor: K ? "#1a2520" : "#ffffff", color: K ? "#95d3ba" : "#003829" } : { color: K ? "#6b8a7e" : "#6e827c" }}
                                            >
                                                {isarabic ? "١٢ ساعة" : "12 Hour"}
                                            </button>
                                            <button
                                                type="button"
                                                className={`toggle-btn ${is12Hours === false ? "active" : ""}`}
                                                onClick={() => setIs12Hours(false)}
                                                style={is12Hours === false ? { backgroundColor: K ? "#1a2520" : "#ffffff", color: K ? "#95d3ba" : "#003829" } : { color: K ? "#6b8a7e" : "#6e827c" }}
                                            >
                                                {isarabic ? "٢٤ ساعة" : "24 Hour"}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: K ? "#c8e8dc" : "#161d1f" }}>
                                                {isarabic ? "اللغة" : "Language"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                                                {isarabic ? "لغة واجهة التطبيق والتقويم." : "Interface language for the application."}
                                            </p>
                                        </div>
                                        <div className="toggle-group" style={{ backgroundColor: K ? "#111915" : "#eef5f7" }}>
                                            <button
                                                type="button"
                                                className={`toggle-btn ${!isarabic ? "active" : ""}`}
                                                onClick={() => setArabic(false)}
                                                style={!isarabic ? { backgroundColor: K ? "#1a2520" : "#ffffff", color: K ? "#95d3ba" : "#003829" } : { color: K ? "#6b8a7e" : "#6e827c" }}
                                            >
                                                English
                                            </button>
                                            <button
                                                type="button"
                                                className={`toggle-btn ${isarabic ? "active" : ""}`}
                                                onClick={() => setArabic(true)}
                                                style={isarabic ? { backgroundColor: K ? "#1a2520" : "#ffffff", color: K ? "#95d3ba" : "#003829" } : { color: K ? "#6b8a7e" : "#6e827c" }}
                                            >
                                                العربية
                                            </button>
                                        </div>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: K ? "#c8e8dc" : "#161d1f" }}>
                                                {isarabic ? "الوضع الداكن" : "Dark Mode"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                                                {isarabic ? "التبديل بين الوضع الداكن والفاتح الأنيق." : "Toggle between dark and light themes."}
                                            </p>
                                        </div>
                                        <Switch
                                            checked={Boolean(K)}
                                            onChange={setk}
                                            onColor="#003829"
                                            offColor="#d1dbd8"
                                            checkedIcon={false}
                                            uncheckedIcon={false}
                                            height={24}
                                            width={44}
                                        />
                                    </div>

                                    <div className="setting-item" style={{ alignItems: "flex-start" }}>
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: K ? "#c8e8dc" : "#161d1f" }}>
                                                {isarabic ? "اتصال حساب Google وأدوات التقويم" : "Google Account & Calendar Tools"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                                                {isarabic ? "اربط حسابك للمزامنة المباشرة بضغطة زر أو تنظيف المواعيد المكررة." : "Connect your Google account for direct sync or clean up duplicate events."}
                                            </p>

                                            {session?.user && (
                                                <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <span style={{ fontSize: "13px", fontWeight: "700", color: K ? "#95d3ba" : "#003829" }}>
                                                        {session.user.name || session.user.email} (Connected ✓)
                                                    </span>
                                                </div>
                                            )}

                                            {cleanResult && (
                                                <div style={{ marginTop: "10px", fontSize: "13px", color: cleanResult.type === "success" ? "#10b981" : "#ef4444" }}>
                                                    {cleanResult.text}
                                                </div>
                                            )}
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                            {session?.user ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={() => signOut()}
                                                        style={{
                                                            padding: "8px 16px", borderRadius: "8px",
                                                            backgroundColor: K ? "rgba(239, 68, 68, 0.15)" : "#fee2e2",
                                                            color: K ? "#f87171" : "#b91c1c",
                                                            fontSize: "13px", fontWeight: "700", cursor: "pointer", border: "none"
                                                        }}
                                                    >
                                                        {isarabic ? "قطع الاتصال" : "Disconnect"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={isCleaning}
                                                        onClick={handleWipeAndReset}
                                                        style={{
                                                            padding: "8px 16px", borderRadius: "8px",
                                                            backgroundColor: K ? "#1a2520" : "#ffffff",
                                                            color: K ? "#ffe088" : "#854d0e",
                                                            border: "1px solid #facc15",
                                                            fontSize: "13px", fontWeight: "700", cursor: "pointer"
                                                        }}
                                                    >
                                                        {isCleaning ? (isarabic ? "جاري الحذف..." : "Cleaning...") : (isarabic ? "🧹 حذف مواقيت الصلاة السابقة" : "🧹 Wipe & Reset Calendar")}
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => signIn("google")}
                                                    style={{
                                                        padding: "10px 18px", borderRadius: "8px",
                                                        backgroundColor: K ? "#1a2520" : "#ffffff",
                                                        color: K ? "#95d3ba" : "#003829",
                                                        border: K ? "1px solid rgba(149, 211, 186, 0.4)" : "1px solid #c8d6d2",
                                                        fontWeight: "700", cursor: "pointer"
                                                    }}
                                                >
                                                    {isarabic ? "اتصل بحساب Google" : "Connect Google Account"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </main>

            <footer className="footer" style={{ backgroundColor: K ? "#080c0a" : "#e2e8e7", borderTop: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #d4dedc" }}>
                <div className="footer-content">
                    <div className="footer-left" style={{ color: K ? "#4d6b62" : "#5c726c" }}>
                        &copy; {new Date().getFullYear()} {isarabic ? "موسى محمد. جميع الحقوق محفوظة." : "Musa Mohammed. All rights reserved."}
                    </div>
                    <div className="footer-right">
                        <a href="#" className="footer-link" style={{ color: K ? "#4d6b62" : "#5c726c" }} onClick={(e) => { e.preventDefault(); openSubpage("/Priacypolicy"); }}>
                            {isarabic ? "سياسة الخصوصية" : "Privacy Policy"}
                        </a>
                        <a href="#" className="footer-link" style={{ color: K ? "#4d6b62" : "#5c726c" }} onClick={(e) => { e.preventDefault(); openSubpage("/terms"); }}>
                            {isarabic ? "شروط الخدمة" : "Terms of Service"}
                        </a>
                        <a href="#" className="footer-link" style={{ color: K ? "#4d6b62" : "#5c726c" }} onClick={(e) => { e.preventDefault(); openSubpage("/Contact"); }}>
                            {isarabic ? "تواصل معنا" : "Contact Us"}
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}