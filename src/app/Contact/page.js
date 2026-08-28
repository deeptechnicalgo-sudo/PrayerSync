"use client";
import React, { useState } from "react";
import "../subpage.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";

export default function ContactPage() {
    const { K } = useData();
    const { isarabic } = useData2();
    const [copiedIndex, setCopiedIndex] = useState(null);

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

    const copyToClipboard = (text, idx) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(idx);
        setTimeout(() => {
            setCopiedIndex(null);
        }, 2000);
    };

    const contacts = [
        {
            title_en: "Customer Support & Suggestions",
            title_ar: "خدمة العملاء والاقتراحات",
            desc_en: "For customer support, questions, feedback, or suggestions:",
            desc_ar: "للدعم الفني والأسئلة والملاحظات والاقتراحات:",
            display: "PrayerSync-Reply@outlook.com",
            email: "PrayerSync-Reply@outlook.com",
        },
        {
            title_en: "Creator & Developer",
            title_ar: "المطوّر والمنشئ",
            desc_en: "For matters related to the creator and developer of PrayerSync:",
            desc_ar: "للأمور المتعلقة بمنشئ ومطور PrayerSync:",
            display: "Musa Mohammed — deep.technical.go@gmail.com",
            email: "deep.technical.go@gmail.com",
        },
        {
            title_en: "Technical Development",
            title_ar: "التطوير التقني",
            desc_en: "For technical or development-related matters:",
            desc_ar: "للأمور التقنية والتطويرية البرمجية:",
            display: "karn.moussa@gmail.com",
            email: "karn.moussa@gmail.com",
        },
    ];

    return (
        <div className="subpage-wrapper" dir={isarabic ? "rtl" : "ltr"} style={{ backgroundColor: K ? "#0f1412" : "#f5faf9", color: K ? "#c8e8dc" : "#2c463f" }}>
            {/* Top bar */}
            <div className="subpage-topbar" style={{ backgroundColor: K ? "#0f1412" : "#f5faf9", borderBottomColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1" }}>
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

            {/* Content */}
            <div className="subpage-content">
                <h1 className="subpage-title" style={{ color: K ? "#95d3ba" : "#003829" }}>
                    {isarabic ? "تواصل معنا" : "Contact Us"}
                </h1>
                <p className="subpage-subtitle" style={{ color: K ? "#6b8a7e" : "#8c9e99" }}>
                    {isarabic
                        ? "يسعدنا دائماً سماعك! سواء كان لديك استفسار، أو تحتاج إلى مساعدة ودعم، أو ترغب في مشاركة اقتراحاتك لتطوير التطبيق."
                        : "We'd love to hear from you! Whether you have a question, need support, or want to share feedback."}
                </p>

                {contacts.map((contact, idx) => (
                    <div className="subpage-section" key={idx}>
                        <div className="subpage-section-title" style={{ color: K ? "#ffe088" : "#8c9e99" }}>
                            {isarabic ? contact.title_ar : contact.title_en}
                        </div>
                        <div className="subpage-card" style={{ backgroundColor: K ? "#0b0f0d" : "#ffffff", borderColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1" }}>
                            <p className="subpage-body" style={{ margin: 0, color: K ? "#a0c4b8" : "#4a6660" }}>
                                {isarabic ? contact.desc_ar : contact.desc_en}
                            </p>
                            <div className="contact-card-actions">
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="contact-email"
                                    style={{
                                        backgroundColor: K ? "#1a2520" : "#f0f7f4",
                                        color: K ? "#95d3ba" : "#003829",
                                        borderColor: K ? "rgba(63,73,69,0.5)" : "#c8ddd8",
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
                                    className="contact-copy-btn"
                                    style={{
                                        backgroundColor: copiedIndex === idx ? (K ? "#064e3b" : "#003829") : (K ? "#1a2520" : "#f4f7f6"),
                                        color: copiedIndex === idx ? "#ffffff" : (K ? "#95d3ba" : "#003829"),
                                        border: K ? "1px solid rgba(63,73,69,0.5)" : "1px solid #e1e8e6",
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
                    </div>
                ))}
            </div>
        </div>
    );
}