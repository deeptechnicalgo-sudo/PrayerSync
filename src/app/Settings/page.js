"use client";
import React from "react";
import "../App.css";
import "./app.css";
import Switch from "react-switch";
import Link from "next/link";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";

export default function SettingsPage() {
    const { K, setk, nightLight, setNightLight, is12Hours, setIs12Hours } = useData();
    const { isarabic, setArabic } = useData2();

    const openSubpage = (path) => {
        window.open(path, "_blank", "width=800,height=650");
    };

    return (
        <div className="app-wrapper" dir={isarabic ? "rtl" : "ltr"} style={{ backgroundColor: K ? "#0f1412" : "#f5faf9", minHeight: "100vh" }}>
            {/* ── Navbar ── */}
            <header className="navbar" style={{ backgroundColor: K ? "#0f1412" : "#f5faf9" }}>
                <Link href="/" className="navbar-logo" style={{ color: K ? "#95d3ba" : "#003829" }}>
                    {isarabic ? "مزامنة الصلاة" : "PrayerSync"}
                </Link>
                <nav>
                    <ul className="navbar-links">
                        <li>
                            <Link href="/" className="navbar-link" style={{ color: K ? "#89938e" : "#6e827c" }}>
                                {isarabic ? "الصفحة الرئيسة" : "Home"}
                            </Link>
                        </li>
                        <li>
                            <Link href="/PTime" className="navbar-link" style={{ color: K ? "#89938e" : "#6e827c" }}>
                                {isarabic ? "مواقيت الصلاة" : "Schedule"}
                            </Link>
                        </li>
                        <li>
                            <Link href="/About" className="navbar-link" style={{ color: K ? "#89938e" : "#6e827c" }}>
                                {isarabic ? "عن المطور والتطبيق" : "About Me"}
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="navbar-actions">
                    <button className="navbar-icon-btn" aria-label="Settings" style={{ color: K ? "#ffe088" : "#003829" }}>
                        <Link href="/Settings">
                            <svg className="navbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                            </svg>
                        </Link>
                    </button>
                    <button className="navbar-icon-btn" aria-label="Help" style={{ color: K ? "#89938e" : "#6e827c" }} onClick={() => openSubpage("/Contact")}>
                        <svg className="navbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </header>

            {/* ── Main Content ── */}
            <main className="main-content" style={{ backgroundColor: K ? "#0f1412" : "#f5faf9", color: K ? "#c8e8dc" : "#161d1f" }}>
                <div className="page-header">
                    <h1 className="page-title" style={{ color: K ? "#95d3ba" : "#003829" }}>
                        {isarabic ? "الإعدادات" : "Settings"}
                    </h1>
                    <p className="page-description" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                        {isarabic ? "خصّص تفضيلات رحلتك الروحية ومظهر التطبيق." : "Customize your spiritual journey preferences and application appearance."}
                    </p>
                </div>

                <div className="settings-layout">
                    {/* Sidebar Navigation */}
                    <div className="sidebar">
                        <nav className="sidebar-nav">
                            <a className="sidebar-link active" href="#general" style={{ backgroundColor: K ? "#1a2520" : undefined, color: K ? "#95d3ba" : "#003829" }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="4" y1="6" x2="20" y2="6"></line>
                                    <line x1="4" y1="12" x2="20" y2="12"></line>
                                    <line x1="4" y1="18" x2="20" y2="18"></line>
                                    <circle cx="8" cy="6" r="2"></circle>
                                    <circle cx="16" cy="12" r="2"></circle>
                                    <circle cx="10" cy="18" r="2"></circle>
                                </svg>
                                {isarabic ? "التفضيلات العامة" : "General Preferences"}
                            </a>
                            <a className="sidebar-link" href="#appearance" style={{ color: K ? "#89938e" : undefined }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5"></circle>
                                    <line x1="12" y1="1" x2="12" y2="3"></line>
                                    <line x1="12" y1="21" x2="12" y2="23"></line>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                    <line x1="1" y1="12" x2="3" y2="12"></line>
                                    <line x1="21" y1="12" x2="23" y2="12"></line>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                </svg>
                                {isarabic ? "المظهر" : "Appearance"}
                            </a>
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="settings-content">
                        {/* General Preferences Section */}
                        <section className="settings-section" id="general" style={{ backgroundColor: K ? "#0b0f0d" : "#ffffff", border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1" }}>
                            <h2 className="section-header" style={{ color: K ? "#95d3ba" : "#003829", borderBottomColor: K ? "rgba(63, 73, 69, 0.3)" : undefined }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={K ? "#ffe088" : "#735c00"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="4" y1="6" x2="20" y2="6"></line>
                                    <line x1="4" y1="12" x2="20" y2="12"></line>
                                    <line x1="4" y1="18" x2="20" y2="18"></line>
                                    <circle cx="8" cy="6" r="2"></circle>
                                    <circle cx="16" cy="12" r="2"></circle>
                                    <circle cx="10" cy="18" r="2"></circle>
                                </svg>
                                {isarabic ? "التفضيلات العامة" : "General Preferences"}
                            </h2>
                            <div className="settings-group">
                                {/* Time Format (12 hours / 24 hours) */}
                                <div className="setting-item">
                                    <div className="setting-info">
                                        <h3 className="setting-title" style={{ color: K ? "#c8e8dc" : "#161d1f" }}>
                                            {isarabic ? "صيغة الوقت" : "Time Format"}
                                        </h3>
                                        <p className="setting-desc" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                                            {isarabic ? "اختر طريقة عرض الساعة (١٢ ساعة / ٢٤ ساعة)." : "Select your preferred clock display (12 Hour / 24 Hour)."}
                                        </p>
                                    </div>
                                    <div className="toggle-group" style={{ backgroundColor: K ? "#111915" : "#eef5f7", borderColor: K ? "rgba(63, 73, 69, 0.4)" : undefined }}>
                                        <button
                                            type="button"
                                            className={`toggle-btn ${is12Hours !== false ? "active" : ""}`}
                                            onClick={() => setIs12Hours(true)}
                                            style={is12Hours !== false ? { backgroundColor: K ? "#1a2520" : "#ffffff", color: K ? "#95d3ba" : "#003829" } : { color: K ? "#6b8a7e" : "#6e827c" }}
                                        >
                                            {isarabic ? "١٢ ساعة" : "12 Hour"}
                                        </button>
                                        <button
                                            type="button"
                                            className={`toggle-btn ${is12Hours === false ? "active" : ""}`}
                                            onClick={() => setIs12Hours(false)}
                                            style={is12Hours === false ? { backgroundColor: K ? "#1a2520" : "#ffffff", color: K ? "#95d3ba" : "#003829" } : { color: K ? "#6b8a7e" : "#6e827c" }}
                                        >
                                            {isarabic ? "٢٤ ساعة" : "24 Hour"}
                                        </button>
                                    </div>
                                </div>

                                {/* Language */}
                                <div className="setting-item">
                                    <div className="setting-info">
                                        <h3 className="setting-title" style={{ color: K ? "#c8e8dc" : "#161d1f" }}>
                                            {isarabic ? "اللغة" : "Language"}
                                        </h3>
                                        <p className="setting-desc" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                                            {isarabic ? "لغة واجهة التطبيق والتقويم." : "Interface language for the application and calendar."}
                                        </p>
                                    </div>
                                    <div className="toggle-group" style={{ backgroundColor: K ? "#111915" : "#eef5f7", borderColor: K ? "rgba(63, 73, 69, 0.4)" : undefined }}>
                                        <button
                                            type="button"
                                            className={`toggle-btn ${!isarabic ? "active" : ""}`}
                                            onClick={() => setArabic(false)}
                                            style={!isarabic ? { backgroundColor: K ? "#1a2520" : "#ffffff", color: K ? "#95d3ba" : "#003829" } : { color: K ? "#6b8a7e" : "#6e827c" }}
                                        >
                                            English
                                        </button>
                                        <button
                                            type="button"
                                            className={`toggle-btn ${isarabic ? "active" : ""}`}
                                            onClick={() => setArabic(true)}
                                            style={isarabic ? { backgroundColor: K ? "#1a2520" : "#ffffff", color: K ? "#95d3ba" : "#003829" } : { color: K ? "#6b8a7e" : "#6e827c" }}
                                        >
                                            العربية
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Appearance Section */}
                        <section className="settings-section" id="appearance" style={{ backgroundColor: K ? "#0b0f0d" : "#ffffff", border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1" }}>
                            <h2 className="section-header" style={{ color: K ? "#95d3ba" : "#003829", borderBottomColor: K ? "rgba(63, 73, 69, 0.3)" : undefined }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={K ? "#ffe088" : "#735c00"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5"></circle>
                                    <line x1="12" y1="1" x2="12" y2="3"></line>
                                    <line x1="12" y1="21" x2="12" y2="23"></line>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                    <line x1="1" y1="12" x2="3" y2="12"></line>
                                    <line x1="21" y1="12" x2="23" y2="12"></line>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                </svg>
                                {isarabic ? "المظهر" : "Appearance"}
                            </h2>
                            <div className="settings-group">
                                {/* Setting 1: Dark Mode / Night Vision */}
                                <div className="setting-item">
                                    <div className="setting-info">
                                        <h3 className="setting-title" style={{ color: K ? "#c8e8dc" : "#161d1f" }}>
                                            {isarabic ? "الوضع الداكن" : "Dark Mode"}
                                        </h3>
                                        <p className="setting-desc" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                                            {isarabic ? "التبديل بين الوضع الداكن والوضع الفاتح الأنيق." : "Toggle between dark and light aesthetic themes."}
                                        </p>
                                    </div>
                                    <Switch
                                        checked={K}
                                        onChange={setk}
                                        onColor="#003829"
                                        offColor="#d1dbd8"
                                        checkedIcon={false}
                                        uncheckedIcon={false}
                                        height={24}
                                        width={44}
                                    />
                                </div>

                                {/* Setting 2: Night Light Mode (Blue-light filter) */}
                                <div className="setting-item">
                                    <div className="setting-info">
                                        <h3 className="setting-title" style={{ color: K ? "#c8e8dc" : "#161d1f" }}>
                                            {isarabic ? "مرشح الإضاءة المريحة (Night Light)" : "Night Light Filter"}
                                        </h3>
                                        <p className="setting-desc" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                                            {isarabic ? "تطبيق إضاءة دافئة لتخفيف إجهاد العين أثناء التصفح الليلي." : "Apply a warm amber tint to reduce eye strain and blue light."}
                                        </p>
                                    </div>
                                    <Switch
                                        checked={nightLight}
                                        onChange={setNightLight}
                                        onColor="#b19e68"
                                        offColor="#d1dbd8"
                                        checkedIcon={false}
                                        uncheckedIcon={false}
                                        height={24}
                                        width={44}
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* ── Footer ── */}
            <footer className="footer" style={{ backgroundColor: K ? "#080c0a" : "#e2e8e7", borderTop: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #d4dedc" }}>
                <div className="footer-content">
                    <div className="footer-left" style={{ color: K ? "#4d6b62" : "#5c726c" }}>
                        &copy; {new Date().getFullYear()} {isarabic ? "موسى محمد. جميع الحقوق محفوظة." : "Musa Mohammed. All rights reserved."}
                    </div>
                    <div className="footer-right">
                        <a href="#" className="footer-link" style={{ color: K ? "#4d6b62" : "#5c726c" }} onClick={(e) => { e.preventDefault(); openSubpage("/Priacypolicy"); }}>
                            {isarabic ? "سياسة الخصوصية" : "Privacy Policy"}
                        </a>
                        <a href="#" className="footer-link" style={{ color: K ? "#4d6b62" : "#5c726c" }} onClick={(e) => { e.preventDefault(); openSubpage("/terms"); }}>
                            {isarabic ? "شروط الخدمة" : "Terms of Service"}
                        </a>
                        <a href="#" className="footer-link" style={{ color: K ? "#4d6b62" : "#5c726c" }} onClick={(e) => { e.preventDefault(); openSubpage("/Contact"); }}>
                            {isarabic ? "تواصل معنا" : "Contact Us"}
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}