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

    return (
        <div
            className="app-wrapper"
            dir={isarabic ? "rtl" : "ltr"}
            style={{
                backgroundColor: K ? "#0f1412" : "#f5faf9",
                color: K ? "#c8e8dc" : "#2c463f",
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
                    backgroundColor: K ? "#0b0f0d" : "#ffffff",
                    border: K ? "1px solid rgba(63, 73, 69, 0.4)" : "1px solid #e1e8e6",
                    borderRadius: "16px",
                    padding: "48px 24px",
                    boxShadow: K ? "0 20px 40px rgba(0,0,0,0.5)" : "0 10px 30px rgba(0,56,41,0.06)"
                }}>
                    <span style={{ fontSize: "3.5rem", display: "block", marginBottom: "16px" }}>🧭</span>
                    <h1 style={{ color: K ? "#95d3ba" : "#003829", fontSize: "2rem", fontWeight: "800", marginBottom: "12px" }}>
                        {isarabic ? "الصفحة غير موجودة (404)" : "Page Not Found (404)"}
                    </h1>
                    <p style={{ color: K ? "#8fb8a7" : "#556b63", lineHeight: "1.7", marginBottom: "28px", fontSize: "15px" }}>
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
                                backgroundColor: K ? "#95d3ba" : "#003829",
                                color: K ? "#0b0f0d" : "#ffffff",
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
                                backgroundColor: K ? "#1a2520" : "#eef5f7",
                                color: K ? "#95d3ba" : "#003829",
                                border: K ? "1px solid #95d3ba" : "1px solid #c8d6d2",
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