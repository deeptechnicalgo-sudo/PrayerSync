"use client";

import React, { useState } from "react";
import Link from "next/link";
import "../App.css";
import "../subpage.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { faqItems } from "./faqData";

export default function FaqClient() {
    const { K } = useData();
    const { isarabic } = useData2();
    const [openIdx, setOpenIdx] = useState(0);

    const bg = K ? "#0b0f19" : "#faf7f2";
    const text = K ? "#ccd6e6" : "#4a3c31";
    const cardBg = K ? "#121a2b" : "#ffffff";
    const cardBorder = K ? "#1c273e" : "#ece4d9";
    const accent = K ? "#f3ba42" : "#b85d38";
    const subText = K ? "#8b9cb5" : "#7c6b5e";
    const highlightBg = K ? "#0c121e" : "#f6f0e8";

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
            <Header currentPath="/faq" />

            <main
                className="subpage-content"
                style={{
                    maxWidth: "880px",
                    margin: "0 auto",
                    padding: "40px 20px",
                    flex: 1,
                    width: "100%",
                    boxSizing: "border-box",
                }}
            >
                {/* Breadcrumb */}
                <nav style={{ marginBottom: "24px", fontSize: "13px", color: subText }}>
                    <Link href="/" style={{ color: subText, textDecoration: "none" }}>Home</Link>
                    {" / "}
                    <span style={{ color: accent }}>
                        {isarabic ? "الأسئلة الشائعة" : "FAQ"}
                    </span>
                </nav>

                {/* Hero Header */}
                <div style={{ marginBottom: "36px", textAlign: isarabic ? "right" : "left" }}>
                    <div
                        style={{
                            display: "inline-block",
                            padding: "4px 12px",
                            borderRadius: "16px",
                            backgroundColor: K ? "rgba(243, 186, 66, 0.15)" : "#f6ede4",
                            color: accent,
                            fontSize: "12px",
                            fontWeight: "700",
                            marginBottom: "12px",
                        }}
                    >
                        ❓ {isarabic ? "مركز المساعدة والأسئلة الشائعة" : "Frequently Asked Questions"}
                    </div>
                    <h1
                        style={{
                            color: K ? "#ffffff" : "#241a15",
                            fontSize: "2.4rem",
                            fontWeight: "800",
                            lineHeight: 1.25,
                            marginBottom: "14px",
                        }}
                    >
                        {isarabic
                            ? "الأسئلة الشائعة حول مواقيت الصلاة والمزامنة"
                            : "Frequently Asked Questions about Prayer Times & Calendar Sync"}
                    </h1>
                    <p
                        style={{
                            color: subText,
                            fontSize: "1.05rem",
                            lineHeight: "1.7",
                            maxWidth: "750px",
                            margin: 0,
                        }}
                    >
                        {isarabic
                            ? "إجابات شاملة ومفصلة حول الطرق الفلكية، مزامنة التقويم مع الهواتف والحواسيب، أحكام خطوط العرض العليا، وأفضل الممارسات لبيئة العمل."
                            : "Comprehensive answers covering astronomical methods, calendar synchronization on iOS & Android, high-latitude fiqh solutions, and workplace productivity."}
                    </p>
                </div>

                {/* Accordion List */}
                <section style={{ marginBottom: "48px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {faqItems.map((item, idx) => {
                            const isOpen = openIdx === idx;
                            return (
                                <div
                                    key={idx}
                                    style={{
                                        backgroundColor: cardBg,
                                        border: `1px solid ${isOpen ? accent : cardBorder}`,
                                        borderRadius: "14px",
                                        overflow: "hidden",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenIdx(isOpen ? null : idx)}
                                        aria-expanded={isOpen}
                                        style={{
                                            width: "100%",
                                            textAlign: isarabic ? "right" : "left",
                                            background: "transparent",
                                            padding: "20px 22px",
                                            cursor: "pointer",
                                            border: "none",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: "16px",
                                        }}
                                    >
                                        <div>
                                            <span
                                                style={{
                                                    fontSize: "11px",
                                                    fontWeight: "700",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.5px",
                                                    color: accent,
                                                    display: "block",
                                                    marginBottom: "4px",
                                                }}
                                            >
                                                {isarabic ? item.category_ar : item.category_en}
                                            </span>
                                            <h2
                                                style={{
                                                    margin: 0,
                                                    fontSize: "1.1rem",
                                                    fontWeight: "700",
                                                    color: K ? "#ffffff" : "#241a15",
                                                    lineHeight: "1.4",
                                                }}
                                            >
                                                {isarabic ? item.q_ar : item.q_en}
                                            </h2>
                                        </div>

                                        <span
                                            style={{
                                                fontSize: "1.4rem",
                                                color: accent,
                                                transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                                                transition: "transform 0.2s ease",
                                                flexShrink: 0,
                                            }}
                                        >
                                            +
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div
                                            style={{
                                                padding: "0 22px 22px 22px",
                                                borderTop: `1px solid ${cardBorder}`,
                                                background: highlightBg,
                                                color: text,
                                                lineHeight: "1.8",
                                                fontSize: "15px",
                                            }}
                                        >
                                            <p style={{ marginTop: "16px", marginBottom: 0 }}>
                                                {isarabic ? item.a_ar : item.a_en}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Related Guides Links */}
                <section
                    style={{
                        padding: "28px",
                        backgroundColor: cardBg,
                        border: `1px solid ${cardBorder}`,
                        borderRadius: "16px",
                        marginBottom: "40px",
                    }}
                >
                    <h3
                        style={{
                            margin: "0 0 16px 0",
                            fontSize: "1.2rem",
                            fontWeight: "800",
                            color: accent,
                        }}
                    >
                        📚 {isarabic ? "أدلة مقترحة لقراءة أعمق" : "Recommended Deep-Dive Guides"}
                    </h3>
                    <ul
                        style={{
                            margin: 0,
                            paddingLeft: isarabic ? 0 : "20px",
                            paddingRight: isarabic ? "20px" : 0,
                            lineHeight: "1.9",
                            color: subText,
                        }}
                    >
                        <li>
                            <Link
                                href="/guides/prayer-calculation-methods"
                                style={{ color: accent, fontWeight: "600", textDecoration: "none" }}
                            >
                                {isarabic
                                    ? "دليل طرق الحساب الفلكية (أم القرى، رابطة العالم الإسلامي، و ISNA)"
                                    : "Islamic Prayer Calculation Methods: Umm Al-Qura, MWL & ISNA Compared"}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/guides/calendar-sync-tutorial"
                                style={{ color: accent, fontWeight: "600", textDecoration: "none" }}
                            >
                                {isarabic
                                    ? "الدليل المصور لمزامنة تقويم Google و Apple و Outlook"
                                    : "Step-by-Step Calendar Sync Tutorial for Google, Apple & Outlook"}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/guides/asr-calculation-difference"
                                style={{ color: accent, fontWeight: "600", textDecoration: "none" }}
                            >
                                {isarabic
                                    ? "فقه وفلك صلاة العصر: الفرق بين مذهب الجمهور والمذهب الحنفي"
                                    : "Asr Prayer Calculation: Standard (Shafi'i) vs Hanafi Shadow Length Ratio"}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/guides/high-latitudes"
                                style={{ color: accent, fontWeight: "600", textDecoration: "none" }}
                            >
                                {isarabic
                                    ? "حلول حساب مواقيت الصلاة في خطوط العرض العليا والدول الإسكندنافية"
                                    : "Prayer Times at High Latitudes: Twilight Persistence & Midnight Sun Solutions"}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/guides/workplace-prayer-productivity"
                                style={{ color: accent, fontWeight: "600", textDecoration: "none" }}
                            >
                                {isarabic
                                    ? "الصلاة في بيئة العمل: دليل تنظيم الأوقات ومنع التعارضات المهنية"
                                    : "Prayer at Work: Practical Scheduling & Productivity Guide for Professionals"}
                            </Link>
                        </li>
                    </ul>
                </section>

                {/* Bottom Callout */}
                <div
                    style={{
                        padding: "28px",
                        borderRadius: "16px",
                        background: K
                            ? "linear-gradient(135deg, #0c121e, #121a2b)"
                            : "linear-gradient(135deg, #f6ede4, #faf7f2)",
                        border: `1px solid ${cardBorder}`,
                        textAlign: "center",
                    }}
                >
                    <h3
                        style={{
                            margin: "0 0 8px 0",
                            color: accent,
                            fontSize: "1.3rem",
                            fontWeight: "800",
                        }}
                    >
                        {isarabic ? "هل لديك سؤال آخر؟" : "Have more questions?"}
                    </h3>
                    <p
                        style={{
                            color: subText,
                            marginBottom: "20px",
                            fontSize: "14px",
                        }}
                    >
                        {isarabic
                            ? "تواصل معنا مباشرة عبر صفحة التواصل أو ابدأ بمزامنة تقويمك الآن مجاناً."
                            : "Reach out directly through our contact page or start syncing your prayer schedule now for free."}
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "12px",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <Link
                            href="/"
                            style={{
                                display: "inline-block",
                                background: accent,
                                color: K ? "#0b0f19" : "#ffffff",
                                padding: "12px 28px",
                                borderRadius: "8px",
                                textDecoration: "none",
                                fontWeight: "700",
                                fontSize: "14px",
                            }}
                        >
                            {isarabic ? "ابدأ المزامنة الآن ←" : "Start Syncing Now →"}
                        </Link>
                        <Link
                            href="/Contact"
                            style={{
                                display: "inline-block",
                                background: "transparent",
                                border: `1px solid ${cardBorder}`,
                                color: subText,
                                padding: "12px 28px",
                                borderRadius: "8px",
                                textDecoration: "none",
                                fontWeight: "600",
                                fontSize: "14px",
                            }}
                        >
                            {isarabic ? "اتصل بنا" : "Contact Us"}
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
