"use client";
import React from "react";
import Link from "next/link";
import "../App.css";
import "../subpage.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { guidesData } from "./guidesData";

export default function GuidesClient() {
    const { K } = useData();
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
    const badgeBg = K ? "rgba(243, 186, 66, 0.12)" : "#faede0";
    const badgeColor = K ? "#f3ba42" : "#b85d38";

    return (
        <div
            className="app-wrapper"
            dir={isarabic ? "rtl" : "ltr"}
            style={{
                backgroundColor: bg,
                color: text,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Header currentPath="/guides" />

            <main className="subpage-content" style={{ maxWidth: "1050px", margin: "0 auto", padding: "40px 20px", flex: 1, width: "100%", boxSizing: "border-box" }}>
                <div style={{ marginBottom: "36px", textAlign: isarabic ? "right" : "left" }}>
                    <div style={{ display: "inline-block", padding: "6px 14px", borderRadius: "16px", backgroundColor: badgeBg, color: badgeColor, fontSize: "13px", fontWeight: "700", marginBottom: "14px", border: `1px solid ${cardBorder}` }}>
                        📚 {isarabic ? "مركز المعرفة والأدلة التخصصية" : "Knowledge Base & Guides"}
                    </div>
                    <h1 className="subpage-title" style={{ color: title, fontSize: "2.5rem", fontWeight: "800", marginBottom: "12px", letterSpacing: "-0.02em" }}>
                        {isarabic ? "أدلة مواقيت الصلاة والتقويم الرقمي" : "Islamic Prayer Times & Calendar Guides"}
                    </h1>
                    <p className="subpage-subtitle" style={{ color: muted, fontSize: "1.1rem", lineHeight: "1.7", maxWidth: "800px" }}>
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
                                backgroundColor: cardBg,
                                border: `1px solid ${cardBorder}`,
                                borderRadius: "16px",
                                padding: "28px 24px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                boxShadow: K ? "0 4px 20px rgba(0, 0, 0, 0.25)" : "0 4px 16px rgba(36, 26, 21, 0.05)",
                                transition: "all 0.2s ease",
                            }}
                        >
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                                    <span style={{ fontSize: "2rem" }}>{guide.icon}</span>
                                    <span style={{ fontSize: "12px", fontWeight: "700", color: badgeColor, backgroundColor: badgeBg, padding: "4px 10px", borderRadius: "12px", border: `1px solid ${cardBorder}` }}>
                                        {isarabic ? guide.category_ar : guide.category_en}
                                    </span>
                                </div>
                                <h2 style={{ fontSize: "1.25rem", fontWeight: "800", color: title, marginBottom: "12px", lineHeight: "1.5" }}>
                                    <Link href={guide.href} style={{ color: "inherit", textDecoration: "none" }}>
                                        {isarabic ? guide.title_ar : guide.title_en}
                                    </Link>
                                </h2>
                                <p style={{ fontSize: "14px", color: muted, lineHeight: "1.7", marginBottom: "20px" }}>
                                    {isarabic ? guide.desc_ar : guide.desc_en}
                                </p>
                            </div>

                            <div style={{ borderTop: `1px solid ${cardBorder}`, paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: "12px", color: muted }}>
                                    ⏱ {isarabic ? guide.readTime_ar : guide.readTime_en}
                                </span>
                                <Link
                                    href={guide.href}
                                    style={{
                                        fontSize: "13px",
                                        fontWeight: "700",
                                        color: accent,
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
                        backgroundColor: inset,
                        border: `1px solid ${insetBorder}`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "16px"
                    }}
                >
                    <div>
                        <h3 style={{ margin: "0 0 6px 0", color: title, fontSize: "1.2rem", fontWeight: "700" }}>
                            {isarabic ? "هل أنت مستعد لمزامنة صلواتك مع تقويمك اليومي؟" : "Ready to synchronize your daily prayers?"}
                        </h3>
                        <p style={{ margin: 0, color: muted, fontSize: "14px" }}>
                            {isarabic ? "استخدم أداة PrayerSync المجانية للحساب الفوري والمزامنة التلقائية مع كافة أجهزتك." : "Use our free tool to compute astronomical schedules and integrate them with Google or Apple."}
                        </p>
                    </div>
                    <Link
                        href="/"
                        style={{
                            padding: "12px 24px",
                            borderRadius: "10px",
                            backgroundColor: accent,
                            color: K ? "#0b0f19" : "#ffffff",
                            textDecoration: "none",
                            fontWeight: "700",
                            fontSize: "14px",
                            boxShadow: K ? "0 4px 12px rgba(243, 186, 66, 0.25)" : "0 4px 12px rgba(184, 93, 56, 0.25)"
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
