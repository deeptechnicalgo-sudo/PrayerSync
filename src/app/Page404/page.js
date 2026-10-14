"use client";
import React from "react";
import Link from "next/link";
import "../App.css";
import "../subpage.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Page404() {
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

    return (
        <div
            className="app-wrapper"
            dir={isarabic ? "rtl" : "ltr"}
            style={{
                backgroundColor: bg,
                color: text,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Header currentPath="/Page404" />

            <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 20px" }}>
                <div style={{
                    maxWidth: "540px",
                    width: "100%",
                    textAlign: "center",
                    backgroundColor: cardBg,
                    border: `1px solid ${cardBorder}`,
                    borderRadius: "16px",
                    padding: "48px 24px",
                    boxShadow: K ? "0 20px 40px rgba(0,0,0,0.5)" : "0 10px 30px rgba(36,26,21,0.06)"
                }}>
                    <span style={{ fontSize: "3.5rem", display: "block", marginBottom: "16px" }}>🧭</span>
                    <h1 style={{ color: title, fontSize: "2rem", fontWeight: "800", marginBottom: "12px" }}>
                        {isarabic ? "الصفحة غير موجودة (404)" : "Page Not Found (404)"}
                    </h1>
                    <p style={{ color: muted, lineHeight: "1.7", marginBottom: "28px", fontSize: "15px" }}>
                        {isarabic
                            ? "عذراً، الرابط الذي طلبته غير متوفر أو ربما تم نقله. يمكنك العودة إلى الصفحة الرئيسية لمتابعة مواقيت الصلاة، أو استكشاف الأدلة والشروحات التقنية."
                            : "Sorry, the page you are looking for does not exist or has been moved. You can return to the homepage to access prayer times or explore our technical guides."}
                    </p>
                    <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link
                            href="/"
                            style={{
                                display: "inline-block",
                                textDecoration: "none",
                                padding: "12px 24px",
                                borderRadius: "8px",
                                fontWeight: "700",
                                fontSize: "14px",
                                backgroundColor: accent,
                                color: K ? "#0b0f19" : "#ffffff",
                                transition: "all 0.2s"
                            }}
                        >
                            {isarabic ? "← العودة للرئيسية" : "← Return to Homepage"}
                        </Link>
                        <Link
                            href="/guides"
                            style={{
                                display: "inline-block",
                                textDecoration: "none",
                                padding: "12px 24px",
                                borderRadius: "8px",
                                fontWeight: "700",
                                fontSize: "14px",
                                backgroundColor: inset,
                                color: title,
                                border: `1px solid ${insetBorder}`,
                            }}
                        >
                            {isarabic ? "تصفح الأدلة" : "Browse Guides"}
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}