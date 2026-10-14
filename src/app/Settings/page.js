"use client";
import React, { useState, useEffect } from "react";
import "../App.css";
import "./app.css";
import Switch from "react-switch";
import Link from "next/link";
import { useData, CALCULATION_METHODS } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";
import { signIn, signOut, useSession } from "next-auth/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

    // Standardized palette tokens matching the site design system
    const bg = K ? "#0b0f19" : "#faf7f2";
    const text = K ? "#ccd6e6" : "#4a3c31";
    const title = K ? "#ffffff" : "#241a15";
    const accent = K ? "#f3ba42" : "#b85d38";
    const muted = K ? "#8b9cb5" : "#7c6b5e";
    const cardBg = K ? "#121a2b" : "#ffffff";
    const cardBorder = K ? "#1c273e" : "#ece4d9";
    const inset = K ? "#0c121e" : "#f6f0e8";
    const insetBorder = K ? "#1c273e" : "#ddd4c8";
    const activeTabBg = K ? "rgba(243, 186, 66, 0.12)" : "#faede0";
    const activeTabColor = K ? "#f3ba42" : "#8d4427";

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
        } catch (e) { }
    }, []);

    const toggleHabit = (key) => {
        const updated = { ...dailyHabits, [key]: !dailyHabits[key] };
        setDailyHabits(updated);
        try {
            const todayStr = new Date().toISOString().split("T")[0];
            localStorage.setItem(`prayersync_habits_${todayStr}`, JSON.stringify(updated));
        } catch (e) { }
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
        try { localStorage.setItem("prayersync_spiritual_tasks", JSON.stringify(updated)); } catch (e) { }
    };

    const toggleTask = (id) => {
        const updated = tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t);
        setTasks(updated);
        try { localStorage.setItem("prayersync_spiritual_tasks", JSON.stringify(updated)); } catch (e) { }
    };

    const deleteTask = (id) => {
        const updated = tasks.filter((t) => t.id !== id);
        setTasks(updated);
        try { localStorage.setItem("prayersync_spiritual_tasks", JSON.stringify(updated)); } catch (e) { }
    };

    const updateQuranPages = (delta) => {
        const val = Math.max(0, quranPages + delta);
        setQuranPages(val);
        try { localStorage.setItem("prayersync_quran_pages", String(val)); } catch (e) { }
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

    const tabsList = [
        { id: "smart", icon: "🛡️", labelAr: "حماية العمل", labelEn: "Work Shield" },
        { id: "habits", icon: "📿", labelAr: "السنن والأذكار", labelEn: "Sunnah & Habits" },
        { id: "islamic", icon: "🌙", labelAr: "المناسبات الهجرية", labelEn: "Islamic Events" },
        { id: "tasks", icon: "📖", labelAr: "القرآن والمهام", labelEn: "Quran & Tasks" },
        { id: "fiqh", icon: "🕌", labelAr: "طرق الحساب", labelEn: "Calculations" },
        { id: "family", icon: "👨‍👩‍👧‍👦", labelAr: "مزامنة العائلة", labelEn: "Family & Webcal" },
        { id: "general", icon: "⚙️", labelAr: "إعدادات عامة", labelEn: "General" },
    ];

    return (
        <div className="app-wrapper" dir={isarabic ? "rtl" : "ltr"} style={{ backgroundColor: bg, color: text, minHeight: "100vh" }}>
            <Header currentPath="/Settings" />

            <main className="main-content" style={{ backgroundColor: bg, color: text }}>
                <div className="page-header">
                    <h1 className="page-title" style={{ color: title }}>
                        {isarabic ? "مركز الإعدادات والإنتاجية الإسلامية" : "Settings & Islamic Productivity"}
                    </h1>
                    <p className="page-description" style={{ color: muted }}>
                        {isarabic
                            ? "تتبع العبادات اليومية، المناسبات الهجرية، حماية أوقات العمل، والتزامن مع Google Calendar."
                            : "Track Sunnah habits, Islamic holidays, protect your calendar during work, and customize Fiqh calculations."}
                    </p>
                </div>

                {/* Mobile / Tablet Horizontal Tab Scroller (< 1024px) */}
                <div className="settings-mobile-tabs-container">
                    <div className="settings-mobile-tabs" role="tablist" aria-label="Settings Categories">
                        {tabsList.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={activeTab === tab.id}
                                className={`mobile-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    backgroundColor: activeTab === tab.id ? activeTabBg : inset,
                                    color: activeTab === tab.id ? accent : muted,
                                    borderColor: activeTab === tab.id ? accent : insetBorder,
                                    boxShadow: activeTab === tab.id ? (K ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(184, 93, 56, 0.12)") : "none",
                                }}
                            >
                                <span className="mobile-tab-icon">{tab.icon}</span>
                                <span className="mobile-tab-label">{isarabic ? tab.labelAr : tab.labelEn}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="settings-layout">
                    <div className="sidebar">
                        <nav className="sidebar-nav">
                            <button
                                type="button"
                                className={`sidebar-link ${activeTab === "smart" ? "active" : ""}`}
                                onClick={() => setActiveTab("smart")}
                                style={{
                                    backgroundColor: activeTab === "smart" ? activeTabBg : "transparent",
                                    color: activeTab === "smart" ? accent : muted,
                                    border: activeTab === "smart" ? `1px solid ${accent}` : "1px solid transparent",
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
                                    backgroundColor: activeTab === "habits" ? activeTabBg : "transparent",
                                    color: activeTab === "habits" ? accent : muted,
                                    border: activeTab === "habits" ? `1px solid ${accent}` : "1px solid transparent",
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
                                    backgroundColor: activeTab === "islamic" ? activeTabBg : "transparent",
                                    color: activeTab === "islamic" ? accent : muted,
                                    border: activeTab === "islamic" ? `1px solid ${accent}` : "1px solid transparent",
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
                                    backgroundColor: activeTab === "tasks" ? activeTabBg : "transparent",
                                    color: activeTab === "tasks" ? accent : muted,
                                    border: activeTab === "tasks" ? `1px solid ${accent}` : "1px solid transparent",
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
                                    backgroundColor: activeTab === "fiqh" ? activeTabBg : "transparent",
                                    color: activeTab === "fiqh" ? accent : muted,
                                    border: activeTab === "fiqh" ? `1px solid ${accent}` : "1px solid transparent",
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
                                    backgroundColor: activeTab === "family" ? activeTabBg : "transparent",
                                    color: activeTab === "family" ? accent : muted,
                                    border: activeTab === "family" ? `1px solid ${accent}` : "1px solid transparent",
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
                                    backgroundColor: activeTab === "general" ? activeTabBg : "transparent",
                                    color: activeTab === "general" ? accent : muted,
                                    border: activeTab === "general" ? `1px solid ${accent}` : "1px solid transparent",
                                    textAlign: isarabic ? "right" : "left",
                                    width: "100%", cursor: "pointer"
                                }}
                            >
                                <span style={{ fontSize: "18px" }}>⚙️</span>
                                {isarabic ? "إعدادات عامة والتقويم" : "General & Calendar"}
                            </button>
                        </nav>
                    </div>

                    {/* Main Content Area */}
                    <div className="settings-content">
                        {activeTab === "smart" && (
                            <section className="settings-section" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                                <h2 className="section-header" style={{ color: title, borderBottomColor: cardBorder }}>
                                    <span>🛡️</span>
                                    {isarabic ? "الجدولة الذكية وحماية أوقات العمل" : "Smart Scheduling & Work Shield"}
                                </h2>
                                <div className="settings-group">
                                    <div className="setting-item" style={{ alignItems: "flex-start" }}>
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: title }}>
                                                {isarabic ? "اختيار الصلوات المراد مزامنتها" : "Selective Prayer Syncing"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: muted }}>
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
                                                                backgroundColor: isChecked ? (K ? "rgba(243, 186, 66, 0.15)" : "#b85d38") : inset,
                                                                color: isChecked ? (K ? "#f3ba42" : "#ffffff") : muted,
                                                                border: isChecked ? (K ? "1px solid #f3ba42" : "1px solid #b85d38") : "1px solid transparent"
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
                                            <h3 className="setting-title" style={{ color: title }}>
                                                {isarabic ? "فترة الاستعداد والوضوء (Pre-Prayer Buffer)" : "Pre-Prayer Preparation Buffer"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: muted }}>
                                                {isarabic
                                                    ? "بدء موعد التقويم قبل الأذان بدقائق للاستعداد والوضوء ومنع الاجتماعات."
                                                    : "Start calendar block minutes before Azan for Wudu and preparation."}
                                            </p>
                                        </div>
                                        <div className="toggle-group" style={{ backgroundColor: inset, border: `1px solid ${insetBorder}` }}>
                                            {[0, 5, 10, 15].map((m) => (
                                                <button
                                                    key={m}
                                                    type="button"
                                                    className={`toggle-btn ${preBuffer === m ? "active" : ""}`}
                                                    onClick={() => setPreBuffer(m)}
                                                    style={preBuffer === m ? { backgroundColor: cardBg, color: accent } : { color: muted }}
                                                >
                                                    {m === 0 ? (isarabic ? "لا يوجد" : "None") : `+${m}m`}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: title }}>
                                                {isarabic ? "مدة حجز وقت الصلاة والإقامة" : "Prayer Duration & Iqama Block"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: muted }}>
                                                {isarabic
                                                    ? "إجمالي المدة المحجوزة في التقويم لأداء الصلاة والسنن والأذكار."
                                                    : "Total time reserved in calendar for congregational prayer, Sunnah, and Azkar."}
                                            </p>
                                        </div>
                                        <div className="toggle-group" style={{ backgroundColor: inset, border: `1px solid ${insetBorder}` }}>
                                            {[15, 20, 30, 45, 60].map((m) => (
                                                <button
                                                    key={m}
                                                    type="button"
                                                    className={`toggle-btn ${postBuffer === m ? "active" : ""}`}
                                                    onClick={() => setPostBuffer(m)}
                                                    style={postBuffer === m ? { backgroundColor: cardBg, color: accent } : { color: muted }}
                                                >
                                                    {m}m
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: title }}>
                                                {isarabic ? "حجز الحالة كـ «مشغول» في التقويم" : "Mark Status as «Busy»"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: muted }}>
                                                {isarabic
                                                    ? "حجز وقت الصلاة في Teams وGoogle Meet لمنع الزملاء من تحديد اجتماعات أثناء الصلاة."
                                                    : "Blocks time in Teams & Google Meet to prevent coworkers from booking meetings over prayer."}
                                            </p>
                                        </div>
                                        <Switch
                                            checked={eventBusy !== false}
                                            onChange={(val) => setEventBusy(val)}
                                            onColor={K ? "#f3ba42" : "#b85d38"}
                                            offColor={K ? "#1c273e" : "#ece4d9"}
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
                            <section className="settings-section" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                                <h2 className="section-header" style={{ color: title, borderBottomColor: cardBorder }}>
                                    <span>📿</span>
                                    {isarabic ? "متابعة السنن الرواتب والأذكار اليومية" : "Sunnah Rawatib & Azkar Tracker"}
                                </h2>

                                <div style={{ padding: "16px", borderRadius: "14px", backgroundColor: inset, border: `1px solid ${insetBorder}`, marginBottom: "20px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                                        <span style={{ fontSize: "14px", fontWeight: "700", color: title }}>
                                            {isarabic ? `إنجاز عبادات اليوم: ${habitsPercent}%` : `Today's Progress: ${habitsPercent}%`}
                                        </span>
                                        <span style={{ fontSize: "12px", fontWeight: "700", padding: "3px 10px", borderRadius: "12px", backgroundColor: K ? "rgba(243, 186, 66, 0.15)" : "#faede0", color: accent }}>
                                            🔥 {isarabic ? `سلسلة الالتزام: ${habitStreak} أيام` : `Streak: ${habitStreak} Days`}
                                        </span>
                                    </div>
                                    <div style={{ height: "8px", borderRadius: "4px", backgroundColor: K ? "#162137" : "#ece4d9", overflow: "hidden" }}>
                                        <div style={{ width: `${habitsPercent}%`, height: "100%", backgroundColor: habitsPercent === 100 ? "#10b981" : accent, transition: "width 0.3s ease" }}></div>
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
                                                        backgroundColor: isDone ? (K ? "rgba(243, 186, 66, 0.12)" : "#faede0") : (K ? "#151e30" : "#ffffff"),
                                                        border: isDone ? (K ? "1px solid #f3ba42" : "1px solid #b85d38") : `1px solid ${cardBorder}`,
                                                        transition: "all 0.2s"
                                                    }}
                                                >
                                                    <span style={{ fontSize: "16px" }}>{isDone ? "✅" : "⭕"}</span>
                                                    <span style={{ fontSize: "13px", fontWeight: isDone ? "700" : "500", textDecoration: isDone ? "line-through" : "none", color: isDone ? accent : text }}>
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
                            <section className="settings-section" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                                <h2 className="section-header" style={{ color: title, borderBottomColor: cardBorder }}>
                                    <span>🌙</span>
                                    {isarabic ? "المناسبات والأعياد الإسلامية بالتقويم الهجري" : "Islamic Events & Hijri Holidays"}
                                </h2>
                                <p className="section-description" style={{ color: muted }}>
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
                                                backgroundColor: inset,
                                                border: `1px solid ${insetBorder}`,
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                                gap: "8px"
                                            }}
                                        >
                                            <div>
                                                <div style={{ fontSize: "14px", fontWeight: "700", color: title }}>
                                                    {isarabic ? ev.nameAr : ev.nameEn}
                                                </div>
                                                <div style={{ fontSize: "12px", color: muted, marginTop: "2px" }}>
                                                    {isarabic ? ev.descAr : ev.descEn}
                                                </div>
                                            </div>
                                            <span style={{ fontSize: "12px", fontWeight: "700", padding: "4px 10px", borderRadius: "8px", backgroundColor: K ? "rgba(243, 186, 66, 0.15)" : "#faede0", color: accent, border: `1px solid ${K ? "rgba(243, 186, 66, 0.3)" : "#ece4d9"}` }}>
                                                📅 {ev.hijri}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeTab === "tasks" && (
                            <section className="settings-section" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                                <h2 className="section-header" style={{ color: title, borderBottomColor: cardBorder }}>
                                    <span>📖</span>
                                    {isarabic ? "متابعة تلاوة القرآن والمهام الإيمانية" : "Daily Quran & Spiritual Tasks"}
                                </h2>

                                <div style={{ padding: "18px", borderRadius: "12px", backgroundColor: inset, border: `1px solid ${insetBorder}`, marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                                    <div>
                                        <div style={{ fontSize: "15px", fontWeight: "700", color: title }}>
                                            📖 {isarabic ? "ورد التلاوة اليومي" : "Daily Quran Pages Goal"}
                                        </div>
                                        <div style={{ fontSize: "12px", color: muted }}>
                                            {isarabic ? `الهدف: ${quranTarget} صفحة (جزء كامل)` : `Target: ${quranTarget} pages (1 Juz)`}
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <button onClick={() => updateQuranPages(-1)} style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: cardBg, color: text, fontWeight: "bold", cursor: "pointer", border: `1px solid ${cardBorder}` }}>-</button>
                                        <span style={{ fontSize: "16px", fontWeight: "800", minWidth: "40px", textAlign: "center", color: accent }}>
                                            {quranPages} {isarabic ? "ص" : "p"}
                                        </span>
                                        <button onClick={() => updateQuranPages(1)} style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: cardBg, color: text, fontWeight: "bold", cursor: "pointer", border: `1px solid ${cardBorder}` }}>+</button>
                                    </div>
                                </div>

                                <div className="settings-group">
                                    <h3 style={{ fontSize: "15px", fontWeight: "700", color: title, margin: "0 0 10px 0" }}>
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
                                                backgroundColor: cardBg,
                                                color: text,
                                                border: `1px solid ${cardBorder}`,
                                                fontSize: "13px"
                                            }}
                                        />
                                        <button
                                            type="submit"
                                            style={{
                                                padding: "10px 18px", borderRadius: "8px",
                                                backgroundColor: accent,
                                                color: K ? "#0b0f19" : "#ffffff",
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
                                                    backgroundColor: t.done ? (K ? "rgba(243, 186, 66, 0.08)" : "#faede0") : cardBg,
                                                    border: `1px solid ${cardBorder}`
                                                }}
                                            >
                                                <div onClick={() => toggleTask(t.id)} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", flex: 1 }}>
                                                    <span>{t.done ? "✅" : "⭕"}</span>
                                                    <span style={{ fontSize: "13px", textDecoration: t.done ? "line-through" : "none", color: t.done ? muted : text }}>
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
                            <section className="settings-section" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                                <h2 className="section-header" style={{ color: title, borderBottomColor: cardBorder }}>
                                    <span>🕌</span>
                                    {isarabic ? "الهيئة الفقهية وطريقة الحساب" : "Fiqh & Calculation Method"}
                                </h2>
                                <div className="settings-group">
                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: title }}>
                                                {isarabic ? "طريقة الحساب المعتمدة" : "Calculation Body"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: muted }}>
                                                {isarabic ? "اختر الهيئة أو المنظمة المتبعة لحساب زوايا الفجر والعشاء." : "Select the Islamic authority used for Fajr and Isha angles."}
                                            </p>
                                        </div>
                                        <div className="select-wrapper">
                                            <select
                                                value={calcMethod}
                                                onChange={(e) => setCalcMethod(e.target.value)}
                                                className="select-input"
                                                style={{
                                                    backgroundColor: inset,
                                                    border: `1px solid ${cardBorder}`,
                                                    color: text,
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
                                            <h3 className="setting-title" style={{ color: title }}>
                                                {isarabic ? "فقه صلاة العصر (المذهب)" : "Asr Jurisprudence (School)"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: muted }}>
                                                {isarabic ? "الجمهور (شافعي، مالكي، حنبلي) بمثل الظل، أو الحنفي بمثلي الظل." : "Standard (Shafi'i, Maliki, Hanbali) vs Hanafi."}
                                            </p>
                                        </div>
                                        <div className="toggle-group" style={{ backgroundColor: inset, border: `1px solid ${insetBorder}` }}>
                                            <button
                                                type="button"
                                                className={`toggle-btn ${asrSchool === 0 ? "active" : ""}`}
                                                onClick={() => setAsrSchool(0)}
                                                style={asrSchool === 0 ? { backgroundColor: cardBg, color: accent } : { color: muted }}
                                            >
                                                {isarabic ? "الجمهور (قياسي)" : "Standard (Shafi'i)"}
                                            </button>
                                            <button
                                                type="button"
                                                className={`toggle-btn ${asrSchool === 1 ? "active" : ""}`}
                                                onClick={() => setAsrSchool(1)}
                                                style={asrSchool === 1 ? { backgroundColor: cardBg, color: accent } : { color: muted }}
                                            >
                                                {isarabic ? "حنفي" : "Hanafi"}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="setting-item" style={{ alignItems: "flex-start" }}>
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: title }}>
                                                {isarabic ? "التعديل اليدوي بالدقائق (+/- دقيقة)" : "Manual Minute Adjustments (+/- min)"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: muted }}>
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
                                                                backgroundColor: inset,
                                                                textAlign: "center",
                                                                border: `1px solid ${cardBorder}`
                                                            }}
                                                        >
                                                            <div style={{ fontSize: "12px", fontWeight: "700", marginBottom: "6px", color: title }}>
                                                                {isarabic ? p.nameAr : p.nameEn}
                                                            </div>
                                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                                                <button type="button" onClick={() => setMinuteOffsets(p.key, val - 1)} style={{ width: "26px", height: "26px", borderRadius: "50%", backgroundColor: cardBg, color: text, border: `1px solid ${cardBorder}`, cursor: "pointer", fontWeight: "bold" }}>-</button>
                                                                <span style={{ fontSize: "13px", fontWeight: "700", minWidth: "28px", color: accent }}>{val > 0 ? `+${val}` : val}</span>
                                                                <button type="button" onClick={() => setMinuteOffsets(p.key, val + 1)} style={{ width: "26px", height: "26px", borderRadius: "50%", backgroundColor: cardBg, color: text, border: `1px solid ${cardBorder}`, cursor: "pointer", fontWeight: "bold" }}>+</button>
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
                            <section className="settings-section" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                                <h2 className="section-header" style={{ color: title, borderBottomColor: cardBorder }}>
                                    <span>👨‍👩‍👧‍👦</span>
                                    {isarabic ? "مزامنة العائلة والاشتراك المباشر" : "Family & Webcal Sync"}
                                </h2>
                                <div className="settings-group">
                                    <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: inset, border: `1px solid ${insetBorder}` }}>
                                        <div style={{ fontSize: "14px", fontWeight: "700", color: title, marginBottom: "6px" }}>
                                            👨‍👩‍👧‍👦 {isarabic ? "رابط مزامنة إعدادات العائلة وفريق العمل:" : "Family & Team Preconfigured Link:"}
                                        </div>
                                        <div style={{ fontSize: "12px", color: muted, marginBottom: "10px" }}>
                                            {isarabic ? "شارك هذا الرابط مع أفراد عائلتك لضبط مدينتكم ومسجدكم وتوقيتات الصلاة بضغطة واحدة." : "Share this link with family members to synchronize their app to the exact same mosque offsets & city."}
                                        </div>
                                        <div style={{ padding: "8px", borderRadius: "6px", backgroundColor: cardBg, border: `1px solid ${cardBorder}`, fontSize: "11px", fontFamily: "monospace", wordBreak: "break-all", color: accent, marginBottom: "10px" }}>
                                            {familySyncUrl}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard(familySyncUrl, "family")}
                                            style={{
                                                padding: "8px 16px", borderRadius: "8px",
                                                backgroundColor: accent,
                                                color: K ? "#0b0f19" : "#ffffff",
                                                fontWeight: "700", fontSize: "13px", cursor: "pointer", border: "none"
                                            }}
                                        >
                                            {copiedFamily ? (isarabic ? "تم النسخ! ✓" : "Copied! ✓") : (isarabic ? "نسخ رابط العائلة" : "Copy Family Sync Link")}
                                        </button>
                                    </div>

                                    <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: inset, border: `1px solid ${insetBorder}` }}>
                                        <div style={{ fontSize: "14px", fontWeight: "700", color: title, marginBottom: "6px" }}>
                                            📡 {isarabic ? "رابط الاشتراك التلقائي في التقويم (Webcal Feed):" : "Dynamic Webcal Feed URL:"}
                                        </div>
                                        <div style={{ padding: "8px", borderRadius: "6px", backgroundColor: cardBg, border: `1px solid ${cardBorder}`, fontSize: "11px", fontFamily: "monospace", wordBreak: "break-all", color: accent, marginBottom: "10px" }}>
                                            {webcalUrl}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard(webcalUrl, "feed")}
                                            style={{
                                                padding: "8px 16px", borderRadius: "8px",
                                                backgroundColor: accent,
                                                color: K ? "#0b0f19" : "#ffffff",
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
                            <section className="settings-section" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                                <h2 className="section-header" style={{ color: title, borderBottomColor: cardBorder }}>
                                    <span>⚙️</span>
                                    {isarabic ? "التفضيلات العامة وحساب Google" : "General Preferences & Google Setup"}
                                </h2>
                                <div className="settings-group">
                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: title }}>
                                                {isarabic ? "صيغة الوقت" : "Time Format"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: muted }}>
                                                {isarabic ? "اختر طريقة عرض الساعة (١٢ ساعة / ٢٤ ساعة)." : "Select clock display (12 Hour / 24 Hour)."}
                                            </p>
                                        </div>
                                        <div className="toggle-group" style={{ backgroundColor: inset, border: `1px solid ${insetBorder}` }}>
                                            <button
                                                type="button"
                                                className={`toggle-btn ${is12Hours !== false ? "active" : ""}`}
                                                onClick={() => setIs12Hours(true)}
                                                style={is12Hours !== false ? { backgroundColor: cardBg, color: accent } : { color: muted }}
                                            >
                                                {isarabic ? "١٢ ساعة" : "12 Hour"}
                                            </button>
                                            <button
                                                type="button"
                                                className={`toggle-btn ${is12Hours === false ? "active" : ""}`}
                                                onClick={() => setIs12Hours(false)}
                                                style={is12Hours === false ? { backgroundColor: cardBg, color: accent } : { color: muted }}
                                            >
                                                {isarabic ? "٢٤ ساعة" : "24 Hour"}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: title }}>
                                                {isarabic ? "اللغة" : "Language"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: muted }}>
                                                {isarabic ? "لغة واجهة التطبيق والتقويم." : "Interface language for the application."}
                                            </p>
                                        </div>
                                        <div className="toggle-group" style={{ backgroundColor: inset, border: `1px solid ${insetBorder}` }}>
                                            <button
                                                type="button"
                                                className={`toggle-btn ${!isarabic ? "active" : ""}`}
                                                onClick={() => setArabic(false)}
                                                style={!isarabic ? { backgroundColor: cardBg, color: accent } : { color: muted }}
                                            >
                                                English
                                            </button>
                                            <button
                                                type="button"
                                                className={`toggle-btn ${isarabic ? "active" : ""}`}
                                                onClick={() => setArabic(true)}
                                                style={isarabic ? { backgroundColor: cardBg, color: accent } : { color: muted }}
                                            >
                                                العربية
                                            </button>
                                        </div>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: title }}>
                                                {isarabic ? "الوضع الداكن" : "Dark Mode"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: muted }}>
                                                {isarabic ? "التبديل بين الوضع الداكن والفاتح الأنيق." : "Toggle between dark and light themes."}
                                            </p>
                                        </div>
                                        <Switch
                                            checked={Boolean(K)}
                                            onChange={setk}
                                            onColor={K ? "#f3ba42" : "#b85d38"}
                                            offColor={K ? "#1c273e" : "#ece4d9"}
                                            checkedIcon={false}
                                            uncheckedIcon={false}
                                            height={24}
                                            width={44}
                                        />
                                    </div>

                                    <div className="setting-item" style={{ alignItems: "flex-start" }}>
                                        <div className="setting-info">
                                            <h3 className="setting-title" style={{ color: title }}>
                                                {isarabic ? "اتصال حساب Google وأدوات التقويم" : "Google Account & Calendar Tools"}
                                            </h3>
                                            <p className="setting-desc" style={{ color: muted }}>
                                                {isarabic ? "اربط حسابك للمزامنة المباشرة بضغطة زر أو تنظيف المواعيد المكررة." : "Connect your Google account for direct sync or clean up duplicate events."}
                                            </p>

                                            {session?.user && (
                                                <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <span style={{ fontSize: "13px", fontWeight: "700", color: accent }}>
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
                                                            backgroundColor: cardBg,
                                                            color: accent,
                                                            border: `1px solid ${accent}`,
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
                                                        backgroundColor: cardBg,
                                                        color: accent,
                                                        border: `1px solid ${cardBorder}`,
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
            <Footer />
        </div>
    );
}