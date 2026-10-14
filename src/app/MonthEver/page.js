"use client";
import React from "react";
import "../subpage.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";

export default function MonthEverPage() {
    const { K, monthEver, setMonth } = useData();
    const { isarabic } = useData2();

    const bg = K ? "#0b0f19" : "#faf7f2";
    const text = K ? "#ccd6e6" : "#4a3c31";
    const title = K ? "#ffffff" : "#241a15";
    const accent = K ? "#f3ba42" : "#b85d38";
    const muted = K ? "#8b9cb5" : "#7c6b5e";
    const cardBg = K ? "#121a2b" : "#ffffff";
    const cardBorder = K ? "#1c273e" : "#ece4d9";
    const inset = K ? "#0c121e" : "#f6f0e8";
    const insetBorder = K ? "#1c273e" : "#ddd4c8";

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
                backgroundColor: bg,
                color: text,
                minHeight: "100vh",
            }}
        >
            {/* Top Bar */}
            <div
                className="subpage-topbar"
                style={{
                    backgroundColor: bg,
                    borderBottomColor: cardBorder,
                }}
            >
                <button
                    type="button"
                    onClick={handleBack}
                    className="subpage-back-btn"
                    style={{
                        backgroundColor: cardBg,
                        color: accent,
                        borderColor: cardBorder,
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
                    <h1 className="subpage-title" style={{ color: title, margin: 0 }}>
                        {isarabic ? "وضع الشهر بالكامل (MonthEver)" : "MonthEver Mode"}
                    </h1>
                </div>

                <p className="subpage-subtitle" style={{ color: muted }}>
                    {isarabic
                        ? "الميزة السرية لتنزيل مواقيت الصلاة للشهر بأكمله في ملف تقويم واحد (.ics)"
                        : "Secret feature to export full-month prayer schedules directly into your calendar (.ics)"}
                </p>

                {/* Main Toggle Card */}
                <div
                    style={{
                        backgroundColor: cardBg,
                        border: `1px solid ${cardBorder}`,
                        borderRadius: "16px",
                        padding: "28px",
                        marginBottom: "28px",
                        boxShadow: K ? "0 8px 24px rgba(0,0,0,0.3)" : "0 8px 24px rgba(36, 26, 21, 0.05)",
                        transition: "all 0.3s ease",
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <h2 style={{ fontSize: "18px", fontWeight: "700", color: title, margin: 0 }}>
                                    {isarabic ? "تفعيل تنزيل الشهر بالكامل" : "Enable Full Month Export"}
                                </h2>
                                <span
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        fontSize: "12px",
                                        fontWeight: "700",
                                        padding: "4px 12px",
                                        borderRadius: "20px",
                                        backgroundColor: monthEver
                                            ? (K ? "rgba(243, 186, 66, 0.15)" : "#fdede6")
                                            : (K ? "rgba(255, 255, 255, 0.06)" : "#f1f5f9"),
                                        color: monthEver ? accent : muted,
                                        border: `1px solid ${cardBorder}`,
                                    }}
                                >
                                    {monthEver ? (isarabic ? "مفعّل ✅" : "Active ✅") : (isarabic ? "معطّل ❌" : "Disabled ❌")}
                                </span>
                            </div>
                            <p style={{ fontSize: "14px", color: muted, marginTop: "6px" }}>
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
                                backgroundColor: monthEver ? accent : inset,
                                color: monthEver ? (K ? "#0b0f19" : "#ffffff") : muted,
                                border: monthEver ? "none" : `1px solid ${insetBorder}`,
                                boxShadow: monthEver ? (K ? "0 4px 14px rgba(243, 186, 66, 0.3)" : "0 4px 14px rgba(184, 93, 56, 0.3)") : "none",
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
                    <div className="subpage-section-title" style={{ color: title }}>
                        {isarabic ? "كيفية الاستخدام" : "How It Works"}
                    </div>
                    <div
                        style={{
                            backgroundColor: cardBg,
                            border: `1px solid ${cardBorder}`,
                            borderRadius: "12px",
                            padding: "20px",
                            fontSize: "14px",
                            lineHeight: "1.7",
                            color: text,
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
                            color: muted,
                            padding: "6px 14px",
                            borderRadius: "20px",
                            backgroundColor: inset,
                            border: `1px solid ${insetBorder}`,
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