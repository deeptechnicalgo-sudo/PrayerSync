
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../App.css";
import "./App.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";

export default function AboutPage() {
    const { K } = useData();
    const { isarabic } = useData2();
    const [now, setNow] = useState(null);

    useEffect(() => {
        setNow(new Date());
    }, []);

    const Year = now ? now.getFullYear() : new Date().getFullYear();

    const openSubpage = (path) => {
        window.open(path, "_blank", "width=800,height=650");
    };

    return (
        <div
            className="app-wrapper"
            dir={isarabic ? "rtl" : "ltr"}
            style={{
                backgroundColor: K ? "#0f1412" : "#f5faf9",
                color: K ? "#c8e8dc" : "#2c463f",
                minHeight: "100vh",
            }}
        >
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
                                className="navbar-link"
                                style={{
                                    color: K ? "#89938e" : "#6e827c",
                                }}
                            >
                                {isarabic ? "الصفحة الرئيسة" : "Home"}
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/PTime"
                                className="navbar-link"
                                style={{
                                    color: K ? "#89938e" : "#6e827c",
                                }}
                            >
                                {isarabic ? "مواقيت الصلاة" : "Schedule"}
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/About"
                                className="navbar-link active"
                                style={{
                                    color: K ? "#ffe088" : "#003829",
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
                            color: K ? "#89938e" : "#6e827c",
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

                    <button
                        className="navbar-icon-btn"
                        aria-label="Help"
                        style={{
                            color: K ? "#89938e" : "#6e827c",
                        }}
                        onClick={() => openSubpage("/Contact")}
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
                    </button>
                </div>
            </header>

            <main className="about-main">

                <section className="about-hero">
                    <h1
                        className="about-hero-title"
                        style={{
                            color: K ? "#95d3ba" : "#003829",
                        }}
                    >
                        {isarabic
                            ? "الصلاة جزء من يومك."
                            : "Prayer is part of your day."}
                    </h1>

                    <p
                        className="about-hero-subtitle"
                        style={{
                            color: K ? "#6b8a7e" : "#6e827c",
                        }}
                    >
                        {isarabic
                            ? "صُمم PrayerSync لمساعدتك على تنظيم مواقيت الصلاة مع جدولك اليومي، من خلال إضافتها مباشرةً إلى تقويمك إلى جانب اجتماعاتك ومواعيدك."
                            : "PrayerSync was created to help you organize your prayer times alongside your daily schedule by adding them directly to your calendar with your meetings and appointments."}
                    </p>
                </section>




                <div className="about-grid">
                    <div
                        className="about-card about-story-card"
                        style={{
                            backgroundColor: K ? "#111915" : "#ffffff",
                            border: K
                                ? "1px solid rgba(63, 73, 69, 0.4)"
                                : "1px solid #e1e8e6",
                            boxShadow: K
                                ? "0 4px 20px rgba(0,0,0,0.25)"
                                : "0 4px 20px rgba(0, 56, 41, 0.04)",
                        }}
                    >
                        <h2
                            className="about-card-title"
                            style={{
                                color: K ? "#95d3ba" : "#003829",
                            }}
                        >
                            <span
                                className="about-card-icon"
                                style={{
                                    backgroundColor: K
                                        ? "rgba(149, 211, 186, 0.15)"
                                        : "#e2ece9",
                                    color: K ? "#ffe088" : "#003829",
                                }}
                            >
                                ✨
                            </span>
                            {isarabic ? "قصتنا" : "Our Story"}
                        </h2>

                        <p
                            className="about-card-body"
                            style={{
                                color: K ? "#a0c4b8" : "#4a6660",
                            }}
                        >
                            {isarabic
                                ? "كان أبي لديه جدول مليء بالاجتماعات والعمل. لكن في كثير من الأحيان، كانت مواعيد الاجتماعات تتعارض مع أوقات الصلاة."
                                : "My father had a schedule filled with meetings and work. But many times, his meetings would conflict with prayer times."}
                        </p>

                        <p
                            className="about-card-body"
                            style={{
                                color: K ? "#a0c4b8" : "#4a6660",
                            }}
                        >
                            {isarabic
                                ? "كان يريد أن يحافظ على صلاته في وقتها، وفي نفس الوقت يريد أن يعرف زملاؤه في العمل متى سيكون غير متاح بسبب الصلاة، حتى لا يظن أحد أنه يتجاهل اجتماعًا أو رسالة."
                                : "He wanted to maintain his prayers on time while also letting his colleagues know when he would be unavailable for prayer, so no one would think he was ignoring a meeting or a message."}
                        </p>

                        <p
                            className="about-card-body"
                            style={{
                                color: K ? "#c8e8dc" : "#243b34",
                            }}
                        >
                            <strong>
                                {isarabic
                                    ? "\"ماذا لو كانت أوقات الصلاة موجودة مباشرة في تقويمي، مثل أي موعد آخر؟\""
                                    : "\"What if prayer times were directly in my calendar, just like any other appointment?\""}
                            </strong>
                        </p>

                        <p
                            className="about-card-body"
                            style={{
                                color: K ? "#a0c4b8" : "#4a6660",
                            }}
                        >
                            {isarabic
                                ? "ومن هنا بدأت فكرة PrayerSync. يساعدك PrayerSync على إضافة مواقيت الصلاة المحلية إلى تقويمك، حتى تظهر بجانب اجتماعاتك ومواعيدك اليومية."
                                : "And that is where the idea of PrayerSync began. PrayerSync helps you add your local prayer times to your calendar, allowing them to appear alongside your meetings and daily plans."}
                        </p>

                        <p
                            className="about-card-body"
                            style={{
                                color: K ? "#a0c4b8" : "#4a6660",
                            }}
                        >
                            <strong>
                                {isarabic
                                    ? "PrayerSync — لأن صلاتك جزء من جدول يومك."
                                    : "PrayerSync — Because prayer is part of your daily schedule."}
                            </strong>
                        </p>
                    </div>

                    <div
                        className="about-card about-developer-card"
                        style={{
                            backgroundColor: K
                                ? "rgba(149, 211, 186, 0.08)"
                                : "#e2ece9",
                            border: K
                                ? "1px solid rgba(149, 211, 186, 0.25)"
                                : "1px solid #c9dcd6",
                        }}
                    >
                        <h2
                            className="about-card-title"
                            style={{
                                color: K ? "#95d3ba" : "#003829",
                            }}
                        >
                            <span
                                className="about-card-icon"
                                style={{
                                    backgroundColor: K
                                        ? "rgba(255, 224, 136, 0.15)"
                                        : "#d0e2dc",
                                    color: K ? "#ffe088" : "#003829",
                                }}
                            >
                                💻
                            </span>
                            {isarabic ? "عن المطور" : "The Developer"}
                        </h2>

                        <p
                            className="about-card-body"
                            style={{
                                color: K ? "#c8e8dc" : "#243b34",
                            }}
                        >
                            {isarabic
                                ? "تم تطوير PrayerSync من قبل Musa Mohammed — Deep Technical Go، بدافع من فكرة بسيطة: كيف يمكن للتكنولوجيا أن تساعدنا على تنظيم حياتنا اليومية دون أن تجعلنا نغفل عن صلاتنا؟"
                                : "PrayerSync was developed by Musa Mohammed — Deep Technical Go, driven by a simple idea: how can technology help us organize our daily lives without making us lose sight of our prayers?"}
                        </p>

                        <p
                            className="about-card-body"
                            style={{
                                color: K ? "#c8e8dc" : "#243b34",
                            }}
                        >
                            {isarabic
                                ? "بدأ المشروع من موقف واقعي داخل العائلة، عندما كانت اجتماعات العمل تتعارض أحيانًا مع أوقات الصلاة. ومن هنا جاءت فكرة دمج مواقيت الصلاة مباشرةً مع التقويم، بحيث تصبح الصلاة جزءًا واضحًا من الجدول اليومي."
                                : "The project began with a real situation within the family, where work meetings would sometimes conflict with prayer times. This led to the idea of integrating prayer times directly into calendars, making prayer a clear part of the daily schedule."}
                        </p>

                        <p
                            className="about-card-body"
                            style={{
                                color: K ? "#c8e8dc" : "#243b34",
                            }}
                        >
                            {isarabic
                                ? "تم بناء PrayerSync ليكون بسيطًا، عمليًا، وسهل الاستخدام، مع التركيز على تجربة المستخدم وربط مواقيت الصلاة بالتقويمات الرقمية التي يعتمد عليها الناس يوميًا."
                                : "PrayerSync was built to be simple, practical, and easy to use, with a focus on user experience and connecting prayer times with the digital calendars people rely on every day."}
                        </p>

                        <p
                            className="about-card-body"
                            style={{
                                color: K ? "#c8e8dc" : "#243b34",
                            }}
                        >
                            <strong>
                                {isarabic
                                    ? "صُنع بفكرة بسيطة، بهدف مفيد."
                                    : "Built from a simple idea, with a meaningful purpose."}
                            </strong>
                        </p>

                        <div
                            className="developer-badge"
                            style={{
                                backgroundColor: K ? "#1a2520" : "#ffffff",
                                color: K ? "#95d3ba" : "#003829",
                                border: K
                                    ? "1px solid rgba(149, 211, 186, 0.3)"
                                    : "1px solid #b8cec7",
                            }}
                        >
                            <span>👤</span>
                            <span>
                                {isarabic
                                    ? "موسى محمد — المطور ومنشئ PrayerSync"
                                    : "Musa Mohammed — Developer & Creator of PrayerSync"}
                            </span>
                        </div>
                    </div>

                    <div
                        className="about-card about-mission-card"
                        style={{
                            backgroundColor: K ? "#111915" : "#ffffff",
                            border: K
                                ? "1px solid rgba(63, 73, 69, 0.4)"
                                : "1px solid #e1e8e6",
                            boxShadow: K
                                ? "0 4px 20px rgba(0,0,0,0.25)"
                                : "0 4px 20px rgba(0, 56, 41, 0.04)",
                        }}
                    >
                        <div
                            className="mission-icon-wrap"
                            style={{
                                backgroundColor: K
                                    ? "rgba(149, 211, 186, 0.12)"
                                    : "#e2ece9",
                                color: K ? "#95d3ba" : "#003829",
                                border: K
                                    ? "1px solid rgba(149, 211, 186, 0.2)"
                                    : "1px solid #d4dedc",
                            }}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                            </svg>
                        </div>

                        <h2
                            className="about-card-title"
                            style={{
                                color: K ? "#95d3ba" : "#003829",
                            }}
                        >
                            {isarabic ? "رسالتنا" : "Our Mission"}
                        </h2>

                        <p
                            className="about-card-body"
                            style={{
                                color: K ? "#a0c4b8" : "#4a6660",
                                fontSize: "16px",
                            }}
                        >
                            {isarabic
                                ? "نسعى إلى بناء أدوات رقمية بسيطة وعملية تساعد الناس على تنظيم أوقاتهم مع الحفاظ على صلاتهم كجزء أساسي من يومهم."
                                : "Our mission is to build simple and practical digital tools that help people organize their time while keeping prayer as an essential part of their day."}
                        </p>

                        <p
                            className="about-card-body"
                            style={{
                                color: K ? "#a0c4b8" : "#4a6660",
                                fontSize: "16px",
                            }}
                        >
                            {isarabic
                                ? "نؤمن بأن التكنولوجيا يجب أن تدعم أهدافنا ونوايانا، لا أن تشتت انتباهنا عنها. لذلك صُمم PrayerSync ليكون جسرًا بين حياتنا الرقمية وعبادتنا اليومية."
                                : "We believe technology should support our goals and intentions rather than distract us from them. PrayerSync was designed to be a bridge between our digital lives and daily worship."}
                        </p>
                    </div>
                </div>


            </main>

            <footer
                className="footer"
                style={{
                    backgroundColor: K ? "#080c0a" : "#e2e8e7",
                    borderTop: K
                        ? "1px solid rgba(63, 73, 69, 0.3)"
                        : "1px solid #d4dedc",
                }}
            >
                <div className="footer-content">
                    <div
                        className="footer-left"
                        suppressHydrationWarning
                        style={{
                            color: K ? "#4d6b62" : "#5c726c",
                        }}
                    >
                        &copy; {now ? Year : ""}{" "}
                        {isarabic
                            ? "موسى محمد. جميع الحقوق محفوظة."
                            : "Musa Mohammed. All rights reserved."}
                    </div>

                    <div className="footer-right">
                        <a
                            href="#"
                            className="footer-link"
                            style={{
                                color: K ? "#4d6b62" : "#5c726c",
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                openSubpage("/Priacypolicy");
                            }}
                        >
                            {isarabic ? "سياسة الخصوصية" : "Privacy Policy"}
                        </a>

                        <a
                            href="#"
                            className="footer-link"
                            style={{
                                color: K ? "#4d6b62" : "#5c726c",
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                openSubpage("/terms");
                            }}
                        >
                            {isarabic ? "شروط الخدمة" : "Terms of Service"}
                        </a>

                        <a
                            href="#"
                            className="footer-link"
                            style={{
                                color: K ? "#4d6b62" : "#5c726c",
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                openSubpage("/Contact");
                            }}
                        >
                            {isarabic ? "تواصل معنا" : "Contact Us"}
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

