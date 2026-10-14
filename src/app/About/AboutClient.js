"use client";

import React from "react";
import Link from "next/link";
import "../App.css";
import "./App.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutClient() {
    const { K } = useData();
    const { isarabic } = useData2();

    // New palette tokens
    const bg   = K ? "#0b0f19" : "#faf7f2";
    const text  = K ? "#ccd6e6" : "#4a3c31";
    const title = K ? "#ffffff" : "#241a15";
    const accent= K ? "#f3ba42" : "#b85d38";
    const muted = K ? "#8b9cb5" : "#7c6b5e";
    const cardBg= K ? "#121a2b" : "#ffffff";
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
            }}
        >
            <Header currentPath="/About" />

            <main className="about-main">

                <section className="about-hero">
                    <h1
                        className="about-hero-title"
                        style={{ color: title }}
                    >
                        {isarabic
                            ? "الصلاة جزء من يومك."
                            : "Prayer is part of your day."}
                    </h1>

                    <p
                        className="about-hero-subtitle"
                        style={{ color: muted }}
                    >
                        {isarabic
                            ? "صُمم PrayerConnect لمساعدتك على تنظيم مواقيت الصلاة مع جدولك اليومي، من خلال إضافتها مباشرةً إلى تقويمك إلى جانب اجتماعاتك ومواعيدك."
                            : "PrayerConnect was created to help you organize your prayer times alongside your daily schedule by adding them directly to your calendar with your meetings and appointments."}
                    </p>
                </section>

                <div className="about-grid">
                    <div
                        className="about-card about-story-card"
                        style={{
                            backgroundColor: cardBg,
                            border: `1px solid ${cardBorder}`,
                            boxShadow: K
                                ? "0 4px 20px rgba(0,0,0,0.25)"
                                : "0 4px 20px rgba(184, 93, 56, 0.05)",
                        }}
                    >
                        <h2
                            className="about-card-title"
                            style={{ color: title }}
                        >
                            <span
                                className="about-card-icon"
                                style={{
                                    backgroundColor: K
                                        ? "rgba(243, 186, 66, 0.15)"
                                        : "#f6ede4",
                                    color: accent,
                                }}
                            >
                                ✨
                            </span>
                            {isarabic ? "قصتنا" : "Our Story"}
                        </h2>

                        <p className="about-card-body" style={{ color: text }}>
                            {isarabic
                                ? "كان أبي لديه جدول مليء بالاجتماعات والعمل. لكن في كثير من الأحيان، كانت مواعيد الاجتماعات تتعارض مع أوقات الصلاة."
                                : "My father had a schedule filled with meetings and work. But many times, his meetings would conflict with prayer times."}
                        </p>

                        <p className="about-card-body" style={{ color: text }}>
                            {isarabic
                                ? "كان يريد أن يحافظ على صلاته في وقتها، وفي نفس الوقت يريد أن يعرف زملاؤه في العمل متى سيكون غير متاح بسبب الصلاة، حتى لا يظن أحد أنه يتجاهل اجتماعًا أو رسالة."
                                : "He wanted to maintain his prayers on time while also letting his colleagues know when he would be unavailable for prayer, so no one would think he was ignoring a meeting or a message."}
                        </p>

                        <p className="about-card-body" style={{ color: title }}>
                            <strong>
                                {isarabic
                                    ? "\"ماذا لو كانت أوقات الصلاة موجودة مباشرة في تقويمي، مثل أي موعد آخر?\""
                                    : "\"What if prayer times were directly in my calendar, just like any other appointment?\""}
                            </strong>
                        </p>

                        <p className="about-card-body" style={{ color: text }}>
                            {isarabic
                                ? "ومن هنا بدأت فكرة PrayerConnect. يساعدك PrayerConnect على إضافة مواقيت الصلاة المحلية إلى تقويمك، حتى تظهر بجانب اجتماعاتك ومواعيدك اليومية."
                                : "And that is where the idea of PrayerConnect began. PrayerConnect helps you add your local prayer times to your calendar, allowing them to appear alongside your meetings and daily plans."}
                        </p>

                        <p className="about-card-body" style={{ color: text }}>
                            <strong style={{ color: accent }}>
                                {isarabic
                                    ? "PrayerConnect — لأن صلاتك جزء من جدول يومك."
                                    : "PrayerConnect — Because prayer is part of your daily schedule."}
                            </strong>
                        </p>
                    </div>

                    <div
                        className="about-card about-developer-card"
                        style={{
                            backgroundColor: inset,
                            border: `1px solid ${insetBorder}`,
                        }}
                    >
                        <h2
                            className="about-card-title"
                            style={{ color: title }}
                        >
                            <span
                                className="about-card-icon"
                                style={{
                                    backgroundColor: K
                                        ? "rgba(243, 186, 66, 0.15)"
                                        : "#f6ede4",
                                    color: accent,
                                }}
                            >
                                💻
                            </span>
                            {isarabic ? "عن المطور" : "The Developer"}
                        </h2>

                        <p className="about-card-body" style={{ color: text }}>
                            {isarabic
                                ? "تم تطوير PrayerConnect من قبل Musa Mohammed — Deep Technical Go، بدافع من فكرة بسيطة: كيف يمكن للتكنولوجيا أن تساعدنا على تنظيم حياتنا اليومية دون أن تجعلنا نغفل عن صلاتنا؟"
                                : "PrayerConnect was developed by Musa Mohammed — Deep Technical Go, driven by a simple idea: how can technology help us organize our daily lives without making us lose sight of our prayers?"}
                        </p>

                        <p className="about-card-body" style={{ color: text }}>
                            {isarabic
                                ? "بدأ المشروع من موقف واقعي داخل العائلة، عندما كانت اجتماعات العمل تتعارض أحيانًا مع أوقات الصلاة. ومن هنا جاءت فكرة دمج مواقيت الصلاة مباشرةً مع التقويم، بحيث تصبح الصلاة جزءًا واضحًا من الجدول اليومي."
                                : "The project began with a real situation within the family, where work meetings would sometimes conflict with prayer times. This led to the idea of integrating prayer times directly into calendars, making prayer a clear part of the daily schedule."}
                        </p>

                        <p className="about-card-body" style={{ color: text }}>
                            {isarabic
                                ? "تم بناء PrayerConnect ليكون بسيطًا، عمليًا، وسهل الاستخدام، مع التركيز على تجربة المستخدم وربط مواقيت الصلاة بالتقويمات الرقمية التي يعتمد عليها الناس يوميًا."
                                : "PrayerConnect was built to be simple, practical, and easy to use, with a focus on user experience and connecting prayer times with the digital calendars people rely on every day."}
                        </p>

                        <p className="about-card-body" style={{ color: title }}>
                            <strong>
                                {isarabic
                                    ? "صُنع بفكرة بسيطة، بهدف مفيد."
                                    : "Built from a simple idea, with a meaningful purpose."}
                            </strong>
                        </p>

                        <div
                            className="developer-badge"
                            style={{
                                backgroundColor: cardBg,
                                color: accent,
                                border: `1px solid ${cardBorder}`,
                            }}
                        >
                            <span>👤</span>
                            <span>
                                {isarabic
                                    ? "موسى محمد — المطور ومنشئ PrayerConnect"
                                    : "Musa Mohammed — Developer & Creator of PrayerConnect"}
                            </span>
                        </div>
                    </div>

                    <div
                        className="about-card about-mission-card"
                        style={{
                            backgroundColor: cardBg,
                            border: `1px solid ${cardBorder}`,
                            boxShadow: K
                                ? "0 4px 20px rgba(0,0,0,0.25)"
                                : "0 4px 20px rgba(184, 93, 56, 0.05)",
                        }}
                    >
                        <div
                            className="mission-icon-wrap"
                            style={{
                                backgroundColor: K
                                    ? "rgba(243, 186, 66, 0.12)"
                                    : "#f6ede4",
                                color: accent,
                                border: `1px solid ${insetBorder}`,
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
                            style={{ color: title }}
                        >
                            {isarabic ? "رسالتنا" : "Our Mission"}
                        </h2>

                        <p
                            className="about-card-body"
                            style={{ color: text, fontSize: "16px" }}
                        >
                            {isarabic
                                ? "نسعى إلى بناء أدوات رقمية بسيطة وعملية تساعد الناس على تنظيم أوقاتهم مع الحفاظ على صلاتهم كجزء أساسي من يومهم."
                                : "Our mission is to build simple and practical digital tools that help people organize their time while keeping prayer as an essential part of their day."}
                        </p>

                        <p
                            className="about-card-body"
                            style={{ color: text, fontSize: "16px" }}
                        >
                            {isarabic
                                ? "نؤمن بأن التكنولوجيا يجب أن تدعم أهدافنا ونوايانا، لا أن تشتت انتباهنا عنها. لذلك صُمم PrayerConnect ليكون جسرًا بين حياتنا الرقمية وعبادتنا اليومية."
                                : "We believe technology should support our goals and intentions rather than distract us from them. PrayerConnect was designed to be a bridge between our digital lives and daily worship."}
                        </p>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
