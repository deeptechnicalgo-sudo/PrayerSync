"use client";
import React from "react";
import Link from "next/link";
import "../App.css";
import "../subpage.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const guidesData = [
    {
        slug: "prayer-calculation-methods",
        href: "/guides/prayer-calculation-methods",
        title_ar: "دليل طرق الحساب الفلكية لمواقيت الصلاة (أم القرى، رابطة العالم، و ISNA)",
        title_en: "Islamic Prayer Calculation Methods: Umm Al-Qura, MWL & ISNA Compared",
        desc_ar: "شرح معمق لكيفية حساب مواقيت الصلاة فلكياً، زوايا الشفق (الفجر والعشاء)، والفروق الجوهرية بين الهيئات الإسلامية العالمية.",
        desc_en: "A comprehensive deep dive into astronomical twilight equations, solar depression angles, and organizational calculation standards.",
        readTime_ar: "٧ دقائق قراءة",
        readTime_en: "7 min read",
        category_ar: "فلك وفقه الحساب",
        category_en: "Astronomy & Fiqh",
        icon: "🕌",
        date: "2026-09-06",
    },
    {
        slug: "calendar-sync-tutorial",
        href: "/guides/calendar-sync-tutorial",
        title_ar: "الدليل العملي الشامل لمزامنة مواقيت الصلاة مع تقويم Google و Apple و Outlook",
        title_en: "Step-by-Step Calendar Sync Tutorial for Google, Apple & Outlook",
        desc_ar: "خطوات تفصيلية مصورة لربط مواقيت الصلاة تلقائياً عبر روابط Webcal أو تنزيل ملفات ICS على الآيفون والماك والأندرويد والويندوز.",
        desc_en: "Illustrated step-by-step walkthrough for configuring rolling Webcal feeds and ICS calendars on iOS, macOS, Android, and Windows.",
        readTime_ar: "٦ دقائق قراءة",
        readTime_en: "6 min read",
        category_ar: "شروحات تقنية",
        category_en: "Tech Tutorial",
        icon: "📲",
        date: "2026-09-06",
    },
    {
        slug: "asr-calculation-difference",
        href: "/guides/asr-calculation-difference",
        title_ar: "فقه وفلك صلاة العصر: الفرق بين مذهب الجمهور (ظل المثل) والمذهب الحنفي (ظل المثلين)",
        title_en: "Asr Prayer Calculation: Standard (Shafi'i) vs Hanafi Shadow Length Ratio",
        desc_ar: "دراسة فقهية وفلكية مقارنة لكيفية تحديد دخول وقت العصر عند الشافعية والمالكية والحنابلة مقارنة بالحنفية، وكيفية ضبطها برمجياً.",
        desc_en: "Astronomical and legal comparison between shadow ratio 1x (Jumhur) and 2x (Hanafi), and how to configure software offsets.",
        readTime_ar: "٥ دقائق قراءة",
        readTime_en: "5 min read",
        category_ar: "فقه وفلك",
        category_en: "Fiqh & Geometry",
        icon: "☀️",
        date: "2026-09-06",
    },
    {
        slug: "high-latitudes",
        href: "/guides/high-latitudes",
        title_ar: "حلول حساب مواقيت الصلاة في خطوط العرض العليا واختفاء الشفق الصيفي",
        title_en: "Prayer Times at High Latitudes: Twilight Persistence & Midnight Sun Solutions",
        desc_ar: "كيفية أداء وحساب الصلوات في الدول الإسكندنافية وشمال أوروبا وكندا عند اختفاء علامات الشفق الفلكي وقواعد التقدير الشرعية.",
        desc_en: "How Muslims in Scandinavia, the UK, and Canada calculate Fajr and Isha when solar twilight persists all night, using angle-based estimation rules.",
        readTime_ar: "٨ دقائق قراءة",
        readTime_en: "8 min read",
        category_ar: "جغرافيا فلكية",
        category_en: "Polar Geography",
        icon: "🌐",
        date: "2026-09-06",
    },
    {
        slug: "workplace-prayer-productivity",
        href: "/guides/workplace-prayer-productivity",
        title_ar: "الصلاة والإنتاجية: كيف تحمي أوقات عبادتك في بيئة العمل وتمنع تعارض الاجتماعات",
        title_en: "Workplace Prayer Productivity: Shielding Salah Blocks in Google Meet & Teams",
        desc_ar: "استراتيجيات عملية للمهنيين وأصحاب الأعمال لتنظيم أوقات الصلاة والسنن ضمن تقويم العمل وتفادي الإحراج أو تفويت أوقات الصلاة.",
        desc_en: "Practical techniques for Muslim professionals to block calendar availability in corporate settings, preventing meeting intrusions while maintaining top performance.",
        readTime_ar: "٦ دقائق قراءة",
        readTime_en: "6 min read",
        category_ar: "إنتاجية إسلامية",
        category_en: "Productivity",
        icon: "💼",
        date: "2026-09-06",
    },
];

export default function GuidesIndexPage() {
    const { K } = useData();
    const { isarabic } = useData2();

    return (
        <div
            className="app-wrapper"
            dir={isarabic ? "rtl" : "ltr"}
            style={{
                backgroundColor: K ? "#0f1412" : "#f5faf9",
                color: K ? "#c8e8dc" : "#2c463f",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Header currentPath="/guides" />

            <main className="subpage-content" style={{ maxWidth: "1050px", margin: "0 auto", padding: "40px 20px", flex: 1, width: "100%", boxSizing: "border-box" }}>
                <div style={{ marginBottom: "36px", textAlign: isarabic ? "right" : "left" }}>
                    <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: "16px", backgroundColor: K ? "rgba(149, 211, 186, 0.15)" : "#e1f5ee", color: K ? "#95d3ba" : "#004d38", fontSize: "12px", fontWeight: "700", marginBottom: "12px" }}>
                        📚 {isarabic ? "مركز المعرفة والأدلة التخصصية" : "Knowledge Base & Guides"}
                    </div>
                    <h1 className="subpage-title" style={{ color: K ? "#95d3ba" : "#003829", fontSize: "2.5rem", fontWeight: "800", marginBottom: "12px" }}>
                        {isarabic ? "أدلة مواقيت الصلاة والتقويم الرقمي" : "Islamic Prayer Times & Calendar Guides"}
                    </h1>
                    <p className="subpage-subtitle" style={{ color: K ? "#6b8a7e" : "#8c9e99", fontSize: "1.1rem", lineHeight: "1.7", maxWidth: "800px" }}>
                        {isarabic
                            ? "مقالات موثوقة ومفصلة تجمع بين الدقة الفلكية المعاصرة والأحكام الفقهية المعتمدة، مع شروحات عملية للربط الرقمي والإنتاجية اليومية."
                            : "Comprehensive, authoritative articles bridging celestial mechanics, classic Islamic jurisprudence, and modern calendar productivity."}
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginBottom: "48px" }}>
                    {guidesData.map((guide, idx) => (
                        <article
                            key={idx}
                            style={{
                                backgroundColor: K ? "#0b0f0d" : "#ffffff",
                                border: K ? "1px solid rgba(63, 73, 69, 0.35)" : "1px solid #e1e8e6",
                                borderRadius: "16px",
                                padding: "28px 24px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                boxShadow: K ? "none" : "0 4px 16px rgba(0, 56, 41, 0.04)",
                                transition: "all 0.2s ease",
                            }}
                        >
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                                    <span style={{ fontSize: "2rem" }}>{guide.icon}</span>
                                    <span style={{ fontSize: "12px", fontWeight: "700", color: K ? "#ffe088" : "#854d0e", backgroundColor: K ? "rgba(255, 224, 136, 0.1)" : "#fef9c3", padding: "4px 10px", borderRadius: "12px" }}>
                                        {isarabic ? guide.category_ar : guide.category_en}
                                    </span>
                                </div>
                                <h2 style={{ fontSize: "1.25rem", fontWeight: "800", color: K ? "#95d3ba" : "#003829", marginBottom: "12px", lineHeight: "1.5" }}>
                                    <Link href={guide.href} style={{ color: "inherit", textDecoration: "none" }}>
                                        {isarabic ? guide.title_ar : guide.title_en}
                                    </Link>
                                </h2>
                                <p style={{ fontSize: "14px", color: K ? "#a0c4b8" : "#556b63", lineHeight: "1.7", marginBottom: "20px" }}>
                                    {isarabic ? guide.desc_ar : guide.desc_en}
                                </p>
                            </div>

                            <div style={{ borderTop: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: "12px", color: K ? "#89938e" : "#8c9e99" }}>
                                    ⏱ {isarabic ? guide.readTime_ar : guide.readTime_en}
                                </span>
                                <Link
                                    href={guide.href}
                                    style={{
                                        fontSize: "13px",
                                        fontWeight: "700",
                                        color: K ? "#95d3ba" : "#003829",
                                        textDecoration: "none",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "4px"
                                    }}
                                >
                                    {isarabic ? "اقرأ المقال كاملة ←" : "Read Full Guide →"}
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Bottom Callout */}
                <div
                    style={{
                        padding: "28px",
                        borderRadius: "16px",
                        backgroundColor: K ? "#111915" : "#eef5f7",
                        border: K ? "1px solid rgba(149, 211, 186, 0.3)" : "1px solid #c8ddd8",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "16px"
                    }}
                >
                    <div>
                        <h3 style={{ margin: "0 0 6px 0", color: K ? "#95d3ba" : "#003829", fontSize: "1.2rem", fontWeight: "700" }}>
                            {isarabic ? "هل أنت مستعد لمزامنة صلواتك مع تقويمك اليومي؟" : "Ready to synchronize your daily prayers?"}
                        </h3>
                        <p style={{ margin: 0, color: K ? "#89938e" : "#5c726c", fontSize: "14px" }}>
                            {isarabic ? "استخدم أداة PrayerSync المجانية للحساب الفوري والمزامنة التلقائية مع كافة أجهزتك." : "Use our free tool to compute astronomical schedules and integrate them with Google or Apple."}
                        </p>
                    </div>
                    <Link
                        href="/"
                        style={{
                            padding: "12px 24px",
                            borderRadius: "10px",
                            backgroundColor: K ? "#95d3ba" : "#003829",
                            color: K ? "#0b0f0d" : "#ffffff",
                            textDecoration: "none",
                            fontWeight: "700",
                            fontSize: "14px"
                        }}
                    >
                        {isarabic ? "الانتقال للأداة الرئيسية ←" : "Open PrayerSync Tool →"}
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
