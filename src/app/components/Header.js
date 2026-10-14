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
            href: "/faq",
            label: isarabic ? "الأسئلة الشائعة" : "FAQ",
            icon: "❓",
            active: currentPath === "/faq",
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
                backgroundColor: K ? "#0b0f19" : "#faf7f2",
                borderBottom: K ? "1px solid #1c273e" : "1px solid #ece4d9",
                position: "relative",
                zIndex: 100,
            }}
        >
            <div className="navbar-container">
                <Link
                    href="/"
                    className="navbar-logo"
                    style={{
                        color: K ? "#ffffff" : "#8e4324",
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    {K && <span className="navbar-logo-dot" style={{ backgroundColor: "#f3ba42" }} />}
                    {"PrayerConnect"}
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
                                            ? (K ? "#f3ba42" : "#8e4324")
                                            : (K ? "#94a3b8" : "#70645d"),
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
                            backgroundColor: K ? "#151e30" : "#f0e8df",
                            borderColor: K ? "#1e293b" : "#e5dbcf",
                            color: currentPath === "/Settings" ? (K ? "#f3ba42" : "#8e4324") : (K ? "#94a3b8" : "#70645d"),
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
                            backgroundColor: K ? "#151e30" : "#f0e8df",
                            borderColor: K ? "#1e293b" : "#e5dbcf",
                            color: currentPath === "/Contact" ? (K ? "#f3ba42" : "#8e4324") : (K ? "#94a3b8" : "#70645d"),
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
                            color: K ? "#ffffff" : "#8e4324",
                        }}
                    >
                        <span className={`hamburger-bar ${mobileMenuOpen ? "open" : ""}`} style={{ backgroundColor: K ? "#ffffff" : "#8e4324" }} />
                        <span className={`hamburger-bar ${mobileMenuOpen ? "open" : ""}`} style={{ backgroundColor: K ? "#ffffff" : "#8e4324" }} />
                        <span className={`hamburger-bar ${mobileMenuOpen ? "open" : ""}`} style={{ backgroundColor: K ? "#ffffff" : "#8e4324" }} />
                    </button>
                </div>
            </div>

            {/* Mobile Slide-Down Drawer */}
            <div
                className={`navbar-mobile-drawer ${mobileMenuOpen ? "open" : ""}`}
                style={{
                    backgroundColor: K ? "#0c121e" : "#ffffff",
                    borderColor: K ? "#1c273e" : "#ece4d9",
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
                                    ? (K ? "#f3ba42" : "#8e4324")
                                    : (K ? "#cbd5e1" : "#5c5048"),
                                backgroundColor: link.active
                                    ? (K ? "rgba(243, 186, 66, 0.12)" : "rgba(184, 93, 56, 0.08)")
                                    : "transparent",
                            }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="mobile-nav-icon">{link.icon}</span>
                            <span className="mobile-nav-label">{link.label}</span>
                            {link.active && <span className="mobile-active-dot" style={{ backgroundColor: K ? "#f3ba42" : "#b85d38" }} />}
                        </Link>
                    ))}

                    <div className="mobile-drawer-divider" style={{ backgroundColor: K ? "#1c273e" : "#ece4d9" }} />

                    <div className="mobile-drawer-footer">
                        <Link
                            href="/Settings"
                            className="mobile-drawer-secondary-link"
                            style={{ color: K ? "#94a3b8" : "#70645d" }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            ⚙️ {isarabic ? "مركز الإعدادات والإنتاجية" : "Settings & Preferences"}
                        </Link>
                        <Link
                            href="/Contact"
                            className="mobile-drawer-secondary-link"
                            style={{ color: K ? "#94a3b8" : "#70645d" }}
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
