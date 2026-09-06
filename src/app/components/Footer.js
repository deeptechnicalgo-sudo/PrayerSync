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
                backgroundColor: K ? "#080c0a" : "#e2e8e7",
                borderTop: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #d4dedc",
                marginTop: "auto",
            }}
        >
            <div className="footer-content">
                <div
                    className="footer-left"
                    suppressHydrationWarning
                    style={{ color: K ? "#4d6b62" : "#5c726c" }}
                >
                    &copy; {year}{" "}
                    {isarabic
                        ? "موسى محمد. جميع الحقوق محفوظة."
                        : "Musa Mohammed. All rights reserved."}
                </div>

                <div className="footer-right">
                    <Link
                        href="/guides"
                        className="footer-link"
                        style={{ color: K ? "#4d6b62" : "#5c726c" }}
                    >
                        {isarabic ? "الأدلة والشروحات" : "Guides"}
                    </Link>
                    <Link
                        href="/Priacypolicy"
                        className="footer-link"
                        style={{ color: K ? "#4d6b62" : "#5c726c" }}
                    >
                        {isarabic ? "سياسة الخصوصية" : "Privacy Policy"}
                    </Link>
                    <Link
                        href="/terms"
                        className="footer-link"
                        style={{ color: K ? "#4d6b62" : "#5c726c" }}
                    >
                        {isarabic ? "شروط الخدمة" : "Terms of Service"}
                    </Link>
                    <Link
                        href="/Contact"
                        className="footer-link"
                        style={{ color: K ? "#4d6b62" : "#5c726c" }}
                    >
                        {isarabic ? "تواصل معنا" : "Contact Us"}
                    </Link>
                </div>
            </div>
        </footer>
    );
}
