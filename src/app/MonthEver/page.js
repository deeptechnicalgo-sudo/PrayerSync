"use client";
import React from "react";
import "../subpage.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";

export default function MonthEverPage() {
    const { K, monthEver, setMonth } = useData();
    const { isarabic } = useData2();

    const handleBack = () => {
        if (typeof window !== "undefined") {
            if (window.opener) {
                window.close();
            } else if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = "/";
            }
        }
    };

    const toggleMonthEver = () => {
        setMonth(!monthEver);
    };

    return (
        <div
            className="subpage-wrapper"
            dir={isarabic ? "rtl" : "ltr"}
            style={{
                backgroundColor: K ? "#0f1412" : "#f5faf9",
                color: K ? "#c8e8dc" : "#2c463f",
                minHeight: "100vh",
            }}
        >
            {/* Top Bar */}
            <div
                className="subpage-topbar"
                style={{
                    backgroundColor: K ? "#0f1412" : "#f5faf9",
                    borderBottomColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1",
                }}
            >
                <button
                    type="button"
                    onClick={handleBack}
                    className="subpage-back-btn"
                    style={{
                        backgroundColor: K ? "#1a2520" : "#ffffff",
                        color: K ? "#95d3ba" : "#003829",
                        borderColor: K ? "rgba(63,73,69,0.4)" : "#e1e8e6",
                    }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    {isarabic ? "رجوع" : "Back"}
                </button>
            </div>

            {/* Content Area */}
            <div className="subpage-content">
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                    <span style={{ fontSize: "28px" }}>⚡</span>
                    <h1 className="subpage-title" style={{ color: K ? "#95d3ba" : "#003829", margin: 0 }}>
                        {isarabic ? "وضع الشهر بالكامل (MonthEver)" : "MonthEver Mode"}
                    </h1>
                </div>

                <p className="subpage-subtitle" style={{ color: K ? "#6b8a7e" : "#8c9e99" }}>
                    {isarabic
                        ? "الميزة السرية لتنزيل مواقيت الصلاة للشهر بأكمله في ملف تقويم واحد (.ics)"
                        : "Secret feature to export full-month prayer schedules directly into your calendar (.ics)"}
                </p>

                {/* Main Toggle Card */}
                <div
                    style={{
                        backgroundColor: K ? "#111915" : "#ffffff",
                        border: K ? "1px solid rgba(149, 211, 186, 0.25)" : "1px solid #e1e8e6",
                        borderRadius: "16px",
                        padding: "28px",
                        marginBottom: "28px",
                        boxShadow: K ? "0 8px 24px rgba(0,0,0,0.3)" : "0 8px 24px rgba(0, 56, 41, 0.05)",
                        transition: "all 0.3s ease",
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <h2 style={{ fontSize: "18px", fontWeight: "700", color: K ? "#95d3ba" : "#003829", margin: 0 }}>
                                    {isarabic ? "تفعيل تنزيل الشهر بالكامل" : "Enable Full Month Export"}
                                </h2>
                                <span
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        fontSize: "12px",
                                        fontWeight: "700",
                                        padding: "3px 10px",
                                        borderRadius: "20px",
                                        backgroundColor: monthEver
                                            ? (K ? "rgba(149, 211, 186, 0.2)" : "#d1fae5")
                                            : (K ? "rgba(255, 255, 255, 0.08)" : "#f1f5f9"),
                                        color: monthEver ? (K ? "#95d3ba" : "#065f46") : (K ? "#89938e" : "#64748b"),
                                    }}
                                >
                                    {monthEver ? (isarabic ? "مفعّل ✅" : "Active ✅") : (isarabic ? "معطّل ❌" : "Disabled ❌")}
                                </span>
                            </div>
                            <p style={{ fontSize: "14px", color: K ? "#89938e" : "#6e827c", marginTop: "6px" }}>
                                {isarabic
                                    ? "عند التفعيل، سيقوم زر «أضف إلى التقويم» في الصفحة الرئيسية بإنشاء تقويم لجميع أيام الشهر بدلاً من اليوم فقط."
                                    : "When active, the «Add to Calendar» button on the home page downloads events for every day of the month."}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={toggleMonthEver}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "12px 24px",
                                borderRadius: "12px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "700",
                                fontSize: "15px",
                                transition: "all 0.2s ease",
                                backgroundColor: monthEver ? (K ? "#95d3ba" : "#003829") : (K ? "#23332c" : "#e2ece9"),
                                color: monthEver ? (K ? "#0b0f0d" : "#ffffff") : (K ? "#89938e" : "#2c463f"),
                                boxShadow: monthEver ? "0 4px 14px rgba(149, 211, 186, 0.3)" : "none",
                            }}
                        >
                            <span>{monthEver ? "⚡" : "⚙️"}</span>
                            <span>
                                {isarabic
                                    ? (monthEver ? "تعطيل الميزة" : "تفعيل الميزة الآن")
                                    : (monthEver ? "Disable MonthEver" : "Enable MonthEver")}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Instructions Section */}
                <div className="subpage-section">
                    <div className="subpage-section-title" style={{ color: K ? "#ffe088" : "#8c9e99" }}>
                        {isarabic ? "كيفية الاستخدام" : "How It Works"}
                    </div>
                    <div
                        style={{
                            backgroundColor: K ? "#111915" : "#ffffff",
                            border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #e1e8e6",
                            borderRadius: "12px",
                            padding: "20px",
                            fontSize: "14px",
                            lineHeight: "1.7",
                            color: K ? "#a0c4b8" : "#4a6660",
                        }}
                    >
                        <ol style={{ paddingLeft: isarabic ? "0" : "20px", paddingRight: isarabic ? "20px" : "0", margin: 0 }}>
                            <li style={{ marginBottom: "10px" }}>
                                {isarabic
                                    ? "قم بتفعيل الميزة من الزر أعلاه (ستبقى محفوظة في متصفحك)."
                                    : "Enable the feature using the button above (your choice is saved locally)."}
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                {isarabic
                                    ? "ارجع إلى الصفحة الرئيسية واختر الدولة والمدينة المرغوبة."
                                    : "Return to the Home page and select your desired country and city."}
                            </li>
                            <li>
                                {isarabic
                                    ? "اضغط على زر «أضف إلى التقويم» وسيتم تنزيل ملف .ics يحتوي على مواقيت الصلاة لكامل أيام الشهر الحالي تلقائياً!"
                                    : "Click «Add to Calendar» to download a complete .ics file with every prayer for all days in the current month!"}
                            </li>
                        </ol>
                    </div>
                </div>

                {/* Shortcut note */}
                <div style={{ marginTop: "24px", textAlign: "center" }}>
                    <span
                        style={{
                            fontSize: "12px",
                            color: K ? "#5a7a70" : "#8c9e99",
                            padding: "6px 14px",
                            borderRadius: "20px",
                            backgroundColor: K ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                        }}
                    >
                        {isarabic
                            ? "اختصار لوحة المفاتيح: اضغط Ctrl + C في الصفحة الرئيسية لفتح نافذة الأوامر السريعة"
                            : "Keyboard shortcut: Press Ctrl + C on the home page to access the Secret Command prompt"}
                    </span>
                </div>
            </div>
        </div>
    );
}