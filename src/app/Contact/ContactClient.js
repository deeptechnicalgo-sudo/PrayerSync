"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../App.css";
import "../subpage.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactClient() {
    const { K } = useData();
    const { isarabic } = useData2();
    const [copiedIndex, setCopiedIndex] = useState(null);

    // New palette tokens
    const bg         = K ? "#0b0f19" : "#faf7f2";
    const text       = K ? "#ccd6e6" : "#4a3c31";
    const title      = K ? "#ffffff" : "#241a15";
    const accent     = K ? "#f3ba42" : "#b85d38";
    const muted      = K ? "#8b9cb5" : "#7c6b5e";
    const cardBg     = K ? "#121a2b" : "#ffffff";
    const cardBorder = K ? "#1c273e" : "#ece4d9";
    const inset      = K ? "#0c121e" : "#f6f0e8";

    const contacts = [
        {
            title_ar: "خدمة المستفيدين والدعم الفني",
            title_en: "Customer Support & Feedback",
            desc_ar: "لأي استفسارات حول مزامنة التقويم، التوافق مع الهواتف، اقتراحات الميزات، أو الإبلاغ عن مشكلة تقنية.",
            desc_en: "For inquiries regarding calendar sync, device compatibility, feature suggestions, or bug reports.",
            email: "PrayerConnect-Reply@outlook.com",
            display: "PrayerConnect-Reply@outlook.com",
        },
        {
            title_ar: "مؤسس ومطور المشروع",
            title_en: "Creator & Lead Developer",
            desc_ar: "للمسائل الهندسية، الشراكات، والتعاون التقني في مجال التطبيقات والحلول الإسلامية.",
            desc_en: "For engineering inquiries, partnerships, and technical collaboration in Islamic software tools.",
            email: "deep.technical.go@gmail.com",
            display: "Musa Mohammed — deep.technical.go@gmail.com",
        },
        {
            title_ar: "فريق التطوير والبرمجة",
            title_en: "Technical Development Team",
            desc_ar: "للملاحظات البرمجية، واجهات برمجة التطبيقات (APIs)، والمساهمة في تطوير كود التقويم.",
            desc_en: "For direct technical review, API integration assistance, and open calendar format discussion.",
            email: "karn.moussa@gmail.com",
            display: "karn.moussa@gmail.com",
        },
    ];

    const copyToClipboard = (email, idx) => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(email);
            setCopiedIndex(idx);
            setTimeout(() => setCopiedIndex(null), 2500);
        }
    };

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
            <Header currentPath="/Contact" />

            <main className="subpage-content" style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 20px", flex: 1, width: "100%", boxSizing: "border-box" }}>
                <div style={{ marginBottom: "32px", textAlign: isarabic ? "right" : "left" }}>
                    <h1 className="subpage-title" style={{ color: title, fontSize: "2.4rem", fontWeight: "800", marginBottom: "8px" }}>
                        {isarabic ? "تواصل معنا والدعم الفني" : "Contact & Technical Support"}
                    </h1>
                    <p className="subpage-subtitle" style={{ color: muted, fontSize: "1.1rem", lineHeight: "1.6" }}>
                        {isarabic
                            ? "يسعدنا دائماً الاستماع إلى استفساراتكم واقتراحاتكم لتطوير منصة PrayerConnect وتقديم أفضل تجربة لمواقيت الصلاة ومزامنة التقويم."
                            : "We would love to hear from you! Whether you need technical assistance, have questions regarding calendar sync, or want to suggest new features."}
                    </p>
                </div>

                <div style={{ display: "grid", gap: "20px", marginBottom: "40px" }}>
                    {contacts.map((contact, idx) => (
                        <div
                            key={idx}
                            className="subpage-card"
                            style={{
                                backgroundColor: cardBg,
                                border: `1px solid ${cardBorder}`,
                                padding: "24px",
                                borderRadius: "14px",
                                boxShadow: K ? "none" : "0 4px 12px rgba(0,0,0,0.03)"
                            }}
                        >
                            <h2 style={{ color: accent, fontSize: "1.25rem", fontWeight: "700", marginTop: 0, marginBottom: "8px" }}>
                                {isarabic ? contact.title_ar : contact.title_en}
                            </h2>
                            <p style={{ margin: "0 0 16px 0", color: text, lineHeight: "1.6", fontSize: "14px" }}>
                                {isarabic ? contact.desc_ar : contact.desc_en}
                            </p>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                                <a
                                    href={`mailto:${contact.email}`}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        padding: "10px 18px",
                                        borderRadius: "8px",
                                        backgroundColor: inset,
                                        color: accent,
                                        border: `1px solid ${cardBorder}`,
                                        textDecoration: "none",
                                        fontWeight: "600",
                                        fontSize: "13px"
                                    }}
                                    title={isarabic ? "إرسال بريد إلكتروني" : "Send email"}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                    {contact.display}
                                </a>
                                <button
                                    type="button"
                                    onClick={() => copyToClipboard(contact.email, idx)}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        padding: "10px 16px",
                                        borderRadius: "8px",
                                        backgroundColor: copiedIndex === idx ? accent : inset,
                                        color: copiedIndex === idx ? (K ? "#0b0f19" : "#ffffff") : text,
                                        border: `1px solid ${cardBorder}`,
                                        fontWeight: "600",
                                        fontSize: "13px",
                                        cursor: "pointer"
                                    }}
                                >
                                    {copiedIndex === idx ? (
                                        <>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            {isarabic ? "تم النسخ!" : "Copied!"}
                                        </>
                                    ) : (
                                        <>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                            </svg>
                                            {isarabic ? "نسخ البريد" : "Copy Email"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        padding: "20px",
                        borderRadius: "12px",
                        backgroundColor: inset,
                        border: `1px solid ${cardBorder}`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "12px"
                    }}
                >
                    <div>
                        <div style={{ fontWeight: "700", color: title, marginBottom: "4px" }}>
                            {isarabic ? "هل تبحث عن إجابات سريعة؟" : "Looking for instant answers?"}
                        </div>
                        <div style={{ fontSize: "13px", color: muted }}>
                            {isarabic ? "راجع أدلتنا وشروحاتنا المفصلة لطرق الحساب والمزامنة." : "Check our in-depth guides for calculation methods and calendar tutorials."}
                        </div>
                    </div>
                    <Link
                        href="/guides"
                        style={{
                            padding: "10px 20px",
                            borderRadius: "8px",
                            backgroundColor: accent,
                            color: K ? "#0b0f19" : "#ffffff",
                            textDecoration: "none",
                            fontWeight: "700",
                            fontSize: "13px"
                        }}
                    >
                        {isarabic ? "تصفح الأدلة الشاملة ←" : "Explore Guides →"}
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
