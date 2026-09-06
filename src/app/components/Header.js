"use client";
import React from "react";
import Link from "next/link";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";

export default function Header({ currentPath = "" }) {
    const { K } = useData();
    const { isarabic } = useData2();

    return (
        <header
            className="navbar"
            style={{
                backgroundColor: K ? "#0f1412" : "#f5faf9",
            }}
        >
            <Link
                href="/"
                className="navbar-logo"
                style={{
                    color: K ? "#95d3ba" : "#003829",
                }}
            >
                {isarabic ? "مزامنة الصلاة" : "PrayerSync"}
            </Link>

            <nav>
                <ul className="navbar-links">
                    <li>
                        <Link
                            href="/"
                            className={`navbar-link ${currentPath === "/" ? "active" : ""}`}
                            style={{
                                color: currentPath === "/" ? (K ? "#ffe088" : "#003829") : (K ? "#89938e" : "#6e827c"),
                            }}
                        >
                            {isarabic ? "الصفحة الرئيسة" : "Home"}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/PTime"
                            className={`navbar-link ${currentPath === "/PTime" ? "active" : ""}`}
                            style={{
                                color: currentPath === "/PTime" ? (K ? "#ffe088" : "#003829") : (K ? "#89938e" : "#6e827c"),
                            }}
                        >
                            {isarabic ? "مواقيت الصلاة" : "Schedule"}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/guides"
                            className={`navbar-link ${currentPath.startsWith("/guides") ? "active" : ""}`}
                            style={{
                                color: currentPath.startsWith("/guides") ? (K ? "#ffe088" : "#003829") : (K ? "#89938e" : "#6e827c"),
                            }}
                        >
                            {isarabic ? "الأدلة والشروحات" : "Guides"}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/About"
                            className={`navbar-link ${currentPath === "/About" ? "active" : ""}`}
                            style={{
                                color: currentPath === "/About" ? (K ? "#ffe088" : "#003829") : (K ? "#89938e" : "#6e827c"),
                            }}
                        >
                            {isarabic ? "عن المطور والتطبيق" : "About Me"}
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="navbar-actions">
                <Link
                    href="/Settings"
                    className="navbar-icon-btn"
                    aria-label="Settings"
                    style={{
                        color: currentPath === "/Settings" ? (K ? "#ffe088" : "#003829") : (K ? "#89938e" : "#6e827c"),
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                    }}
                >
                    <svg
                        className="navbar-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                </Link>

                <Link
                    href="/Contact"
                    className="navbar-icon-btn"
                    aria-label="Contact"
                    style={{
                        color: currentPath === "/Contact" ? (K ? "#ffe088" : "#003829") : (K ? "#89938e" : "#6e827c"),
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                    }}
                >
                    <svg
                        className="navbar-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                </Link>
            </div>
        </header>
    );
}
