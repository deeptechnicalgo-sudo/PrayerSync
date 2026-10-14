"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";

export default function Footer() {
    const { K } = useData();
    const { isarabic } = useData2();
    const [year, setYear] = useState(2026);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer
            className="footer"
            style={{
                backgroundColor: K ? "#0b0f19" : "#faf7f2",
                borderTop: K ? "1px solid #182236" : "1px solid #ece4d9",
                marginTop: "auto",
            }}
        >
            <div className="footer-content">
                <div
                    className="footer-left"
                    suppressHydrationWarning
                    style={{ color: K ? "#64748b" : "#70645d" }}
                >
                    &copy; {year}{" "}
                    {isarabic
                        ? "PrayerConnect. جميع الحقوق محفوظة."
                        : "PrayerConnect. All rights reserved."}
                </div>

                <div className="footer-right">
                    <Link
                        href="/guides"
                        className="footer-link"
                        style={{ color: K ? "#64748b" : "#70645d" }}
                    >
                        {isarabic ? "الأدلة والشروحات" : "Guides"}
                    </Link>
                    <Link
                        href="/faq"
                        className="footer-link"
                        style={{ color: K ? "#64748b" : "#70645d" }}
                    >
                        {isarabic ? "الأسئلة الشائعة" : "FAQ"}
                    </Link>
                    <Link
                        href="/Priacypolicy"
                        className="footer-link"
                        style={{ color: K ? "#64748b" : "#70645d" }}
                    >
                        {isarabic ? "سياسة الخصوصية" : "Privacy Policy"}
                    </Link>
                    <Link
                        href="/terms"
                        className="footer-link"
                        style={{ color: K ? "#64748b" : "#70645d" }}
                    >
                        {isarabic ? "شروط الخدمة" : "Terms of Service"}
                    </Link>
                    <Link
                        href="/Contact"
                        className="footer-link"
                        style={{ color: K ? "#64748b" : "#70645d" }}
                    >
                        {isarabic ? "تواصل معنا" : "Contact Us"}
                    </Link>
                </div>
            </div>
        </footer>
    );
}
