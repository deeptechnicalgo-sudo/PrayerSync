"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";

export default function Header({ currentPath = "" }) {
    const { K } = useData();
    const { isarabic } = useData2();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navRef = useRef(null);

    // Close mobile menu on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setMobileMenuOpen(false);
            }
        };
        if (mobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [mobileMenuOpen]);

    const navLinks = [
        {
            href: "/",
            label: isarabic ? "الصفحة الرئيسة" : "Home",
            icon: "🏠",
            active: currentPath === "/",
        },
        {
            href: "/PTime",
            label: isarabic ? "مواقيت الصلاة" : "Schedule",
            icon: "⏱️",
            active: currentPath === "/PTime",
        },
        {
            href: "/guides",
            label: isarabic ? "الأدلة والشروحات" : "Guides",
            icon: "📚",
            active: currentPath.startsWith("/guides"),
        },
        {
            href: "/About",
            label: isarabic ? "عن المطور والتطبيق" : "About Me",
            icon: "👤",
            active: currentPath === "/About",
        },
    ];

    return (
        <header
            ref={navRef}
            className="navbar"
            style={{
                backgroundColor: K ? "#0f1412" : "#f5faf9",
                borderBottom: K ? "1px solid rgba(63, 73, 69, 0.25)" : "1px solid rgba(0, 56, 41, 0.06)",
                position: "relative",
                zIndex: 100,
            }}
        >
            <div className="navbar-container">
                <Link
                    href="/"
                    className="navbar-logo"
                    style={{
                        color: K ? "#95d3ba" : "#003829",
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    {isarabic ? "مزامنة الصلاة" : "PrayerSync"}
                </Link>

                {/* Desktop navigation */}
                <nav className="navbar-nav-desktop" aria-label="Main Navigation">
                    <ul className="navbar-links">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`navbar-link ${link.active ? "active" : ""}`}
                                    style={{
                                        color: link.active
                                            ? (K ? "#ffe088" : "#003829")
                                            : (K ? "#89938e" : "#6e827c"),
                                    }}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Action buttons + Hamburger toggle */}
                <div className="navbar-actions">
                    <Link
                        href="/Settings"
                        className="navbar-icon-btn"
                        aria-label="Settings"
                        title={isarabic ? "الإعدادات والإنتاجية" : "Settings & Productivity"}
                        style={{
                            color: currentPath === "/Settings" ? (K ? "#ffe088" : "#003829") : (K ? "#89938e" : "#6e827c"),
                        }}
                        onClick={() => setMobileMenuOpen(false)}
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
                        title={isarabic ? "تواصل معنا" : "Contact"}
                        style={{
                            color: currentPath === "/Contact" ? (K ? "#ffe088" : "#003829") : (K ? "#89938e" : "#6e827c"),
                        }}
                        onClick={() => setMobileMenuOpen(false)}
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

                    {/* Mobile Hamburger Button */}
                    <button
                        type="button"
                        className="navbar-hamburger"
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        style={{
                            color: K ? "#95d3ba" : "#003829",
                        }}
                    >
                        <span className={`hamburger-bar ${mobileMenuOpen ? "open" : ""}`} style={{ backgroundColor: K ? "#95d3ba" : "#003829" }} />
                        <span className={`hamburger-bar ${mobileMenuOpen ? "open" : ""}`} style={{ backgroundColor: K ? "#95d3ba" : "#003829" }} />
                        <span className={`hamburger-bar ${mobileMenuOpen ? "open" : ""}`} style={{ backgroundColor: K ? "#95d3ba" : "#003829" }} />
                    </button>
                </div>
            </div>

            {/* Mobile Slide-Down Drawer */}
            <div
                className={`navbar-mobile-drawer ${mobileMenuOpen ? "open" : ""}`}
                style={{
                    backgroundColor: K ? "#0b100e" : "#ffffff",
                    borderColor: K ? "rgba(63, 73, 69, 0.4)" : "#e1e8e6",
                }}
            >
                <nav className="mobile-nav-list" aria-label="Mobile Navigation">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`mobile-nav-item ${link.active ? "active" : ""}`}
                            style={{
                                color: link.active
                                    ? (K ? "#ffe088" : "#003829")
                                    : (K ? "#b5c7c0" : "#4a6660"),
                                backgroundColor: link.active
                                    ? (K ? "rgba(255, 224, 136, 0.08)" : "rgba(0, 56, 41, 0.05)")
                                    : "transparent",
                            }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="mobile-nav-icon">{link.icon}</span>
                            <span className="mobile-nav-label">{link.label}</span>
                            {link.active && <span className="mobile-active-dot" style={{ backgroundColor: K ? "#ffe088" : "#b19e68" }} />}
                        </Link>
                    ))}
                    
                    <div className="mobile-drawer-divider" style={{ backgroundColor: K ? "rgba(63, 73, 69, 0.4)" : "#edf2f1" }} />
                    
                    <div className="mobile-drawer-footer">
                        <Link
                            href="/Settings"
                            className="mobile-drawer-secondary-link"
                            style={{ color: K ? "#89938e" : "#6e827c" }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            ⚙️ {isarabic ? "مركز الإعدادات والإنتاجية" : "Settings & Preferences"}
                        </Link>
                        <Link
                            href="/Contact"
                            className="mobile-drawer-secondary-link"
                            style={{ color: K ? "#89938e" : "#6e827c" }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            💬 {isarabic ? "المساعدة والدعم" : "Contact & Support"}
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
