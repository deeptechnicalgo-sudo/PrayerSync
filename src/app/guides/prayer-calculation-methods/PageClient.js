"use client";
import React from "react";
import Link from "next/link";
import "../../App.css";
import "../../subpage.css";
import { useData } from "../../Context/DarklightContext";
import { useData2 } from "../../Context/Arabic";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PrayerCalculationMethodsGuide() {
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
                flexDirection: "column",
            }}
        >
            <Header currentPath="/guides/prayer-calculation-methods" />

            <main className="subpage-content" style={{ maxWidth: "880px", margin: "0 auto", padding: "40px 20px", flex: 1, width: "100%", boxSizing: "border-box" }}>
                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" style={{ marginBottom: "20px", fontSize: "13px", color: K ? "#89938e" : "#6e827c" }}>
                    <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>{isarabic ? "الرئيسية" : "Home"}</Link>
                    <span style={{ margin: "0 8px" }}>/</span>
                    <Link href="/guides" style={{ color: "inherit", textDecoration: "none" }}>{isarabic ? "الأدلة" : "Guides"}</Link>
                    <span style={{ margin: "0 8px" }}>/</span>
                    <span style={{ color: K ? "#95d3ba" : "#003829", fontWeight: "600" }}>{isarabic ? "طرق الحساب الفلكية" : "Calculation Methods"}</span>
                </nav>

                <header style={{ marginBottom: "36px" }}>
                    <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: "14px", backgroundColor: K ? "rgba(255, 224, 136, 0.1)" : "#fef9c3", color: K ? "#ffe088" : "#854d0e", fontSize: "12px", fontWeight: "700", marginBottom: "12px" }}>
                        🕌 {isarabic ? "فلك وفقه الحساب" : "Astronomy & Fiqh"} • 7 min read
                    </div>
                    <h1 style={{ color: K ? "#95d3ba" : "#003829", fontSize: "2.3rem", fontWeight: "800", lineHeight: "1.3", marginBottom: "14px" }}>
                        {isarabic
                            ? "دليل طرق حساب مواقيت الصلاة الفلكية: مقارنة معايير أم القرى، رابطة العالم، و ISNA"
                            : "Islamic Prayer Calculation Methods: A Detailed Astronomical and Fiqh Guide"}
                    </h1>
                    <p style={{ color: K ? "#8fb8a7" : "#556b63", fontSize: "1.1rem", lineHeight: "1.7" }}>
                        {isarabic
                            ? "كيف تحدد الرياضيات الفلكية دخول أوقات الصلوات الخمس؟ وما هي الفروق العلمية بين زوايا الشفق المعتمدة من مختلف الهيئات الإسلامية العالمية؟"
                            : "How celestial mechanics determine the five daily prayers, and what scientific variations exist among global Islamic authorities."}
                    </p>
                </header>

                <article style={{ lineHeight: "1.8", fontSize: "15px", color: K ? "#c8e8dc" : "#2c463f" }}>
                    {/* Intro */}
                    <div style={{ padding: "24px", borderRadius: "14px", backgroundColor: K ? "#0b0f0d" : "#ffffff", border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #e1e8e6", marginBottom: "32px" }}>
                        <p style={{ margin: 0 }}>
                            {isarabic
                                ? "ارتبطت الشريعة الإسلامية منذ فجر الإسلام بالظواهر الكونية الطبيعية لتحديد أوقات الصلوات، مستندة إلى حركة الشمس الظاهرية في قبة السماء. ومع التطور الفلكي المعاصر، استبدل الرصد البصري اليومي بالمعادلات المثلثية الكروية (Spherical Trigonometry) التي تتيح التنبؤ الدقيق بمواقيت الصلاة لأي إحداثيات جغرافية على سطح الأرض."
                                : "Since classical antiquity, Islamic jurisprudence has keyed obligatory prayer times to observable solar events. With contemporary advances in spherical trigonometry and celestial mechanics, daily visual observation has been mathematically modeled into exact algorithms, computing solar altitude and azimuth for any coordinate on Earth."}
                        </p>
                    </div>

                    {/* Section 1: The Celestial Equation */}
                    <h2 style={{ color: K ? "#ffe088" : "#003829", fontSize: "1.5rem", fontWeight: "800", marginTop: "36px", marginBottom: "16px" }}>
                        {isarabic ? "١. المعادلة الرياضية الفلكية الأساسية (The Hour Angle Equation)" : "1. The Fundamental Astronomical Hour Angle Equation"}
                    </h2>
                    <p>
                        {isarabic
                            ? "تعتمد خوارزميات الحساب الفلكي (مثل خوارزمية PrayerSync ومكتبات Jean Meeus الفلكية) على حساب زاوية الساعة للشمس (Hour Angle 'H') عند وصول مركز قرص الشمس إلى ارتفاع أو انخفاض معين 'α' بالنسبة للأفق:"
                            : "Astronomical engines calculate the Sun's local Hour Angle (H) when the solar disc center reaches a designated altitude or depression angle (α) relative to the observer's horizon:"}
                    </p>
                    <div style={{ padding: "16px 20px", borderRadius: "10px", backgroundColor: K ? "#111915" : "#eef5f7", fontFamily: "monospace", fontSize: "14px", color: K ? "#95d3ba" : "#003829", direction: "ltr", textAlign: "center", margin: "16px 0", border: K ? "1px solid rgba(149, 211, 186, 0.2)" : "1px solid #c8ddd8" }}>
                        cos(H) = [ sin(α) - sin(φ) × sin(δ) ] / [ cos(φ) × cos(δ) ]
                    </div>
                    <p style={{ fontSize: "13px", color: K ? "#89938e" : "#6e827c" }}>
                        {isarabic
                            ? "حيث (φ) تمثل خط عرض الراصد الجغرافي، و (δ) تمثل زاوية ميل الشمس (Solar Declination)، و (α) الارتفاع الفلكي المطلوب للصلوات."
                            : "Where (φ) is observer latitude, (δ) is solar declination, and (α) is the specified altitude angle for twilight or transit."}
                    </p>

                    {/* Section 2: Breakdown of the 5 Prayers */}
                    <h2 style={{ color: K ? "#ffe088" : "#003829", fontSize: "1.5rem", fontWeight: "800", marginTop: "36px", marginBottom: "16px" }}>
                        {isarabic ? "٢. المعايير الفلكية للصلوات الخمس" : "2. Astronomical Definitions of the Five Daily Prayers"}
                    </h2>
                    
                    <div style={{ display: "grid", gap: "16px", marginBottom: "28px" }}>
                        <div style={{ padding: "18px", borderRadius: "12px", backgroundColor: K ? "#0b0f0d" : "#ffffff", border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1" }}>
                            <h3 style={{ margin: "0 0 8px 0", color: K ? "#95d3ba" : "#003829", fontSize: "1.15rem" }}>
                                🌅 {isarabic ? "صلاة الفجر (Fajr) والشروق (Sunrise)" : "Fajr (Dawn) & Sunrise"}
                            </h3>
                            <p style={{ margin: 0, fontSize: "14px", color: K ? "#a0c4b8" : "#4a6660" }}>
                                {isarabic
                                    ? "يدخل وقت الفجر مع ظهور الفجر الصادق (الضوء الأبيض المستطير في الأفق الشرقي). فلكياً، يتوافق هذا مع وصول الشمس إلى انخفاض يتراوح بين 15° إلى 19.5° تحت الأفق. أما الشروق، فيحسب بلحظة ملامسة الحافة العليا لقرص الشمس خط الأفق الهندسي مع احتساب الانكسار الجوي (حوالي 0.833°)."
                                    : "Fajr begins at true dawn (Subh Sadiq), defined as the appearance of a horizontal white light spreading across the eastern horizon. Astronomically, this corresponds to a solar depression angle between 15° and 19.5°. Sunrise is the instant the upper limb of the sun clears the horizon, factoring 34' of atmospheric refraction and 16' of semidiameter (total 50' or 0.833°)."}
                            </p>
                        </div>

                        <div style={{ padding: "18px", borderRadius: "12px", backgroundColor: K ? "#0b0f0d" : "#ffffff", border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1" }}>
                            <h3 style={{ margin: "0 0 8px 0", color: K ? "#95d3ba" : "#003829", fontSize: "1.15rem" }}>
                                ☀️ {isarabic ? "صلاة الظهر (Dhuhr / Solar Noon)" : "Dhuhr (Solar Noon Transit)"}
                            </h3>
                            <p style={{ margin: 0, fontSize: "14px", color: K ? "#a0c4b8" : "#4a6660" }}>
                                {isarabic
                                    ? "يدخل وقت الظهر الشرعي بزوال الشمس، أي بمجرد ميلها عن خط الزوال السماوي باتجاه الغرب بعد بلوغ أعلى نقطة لها في السماء. يضيف الفلكيون عادة هامش أمان بسيط (دقيقة إلى دقيقتين) بعد لحظة الزوال الفلكي التام للتأكد التام من دخول الوقت."
                                    : "Dhuhr commences the moment the Sun crosses the local celestial meridian (Zawaal) and tilts westward. Islamic software typically appends a small safety buffer (1-2 minutes) past astronomical transit to guarantee true meridian clearance."}
                            </p>
                        </div>

                        <div style={{ padding: "18px", borderRadius: "12px", backgroundColor: K ? "#0b0f0d" : "#ffffff", border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1" }}>
                            <h3 style={{ margin: "0 0 8px 0", color: K ? "#95d3ba" : "#003829", fontSize: "1.15rem" }}>
                                🌤️ {isarabic ? "صلاة العصر (Asr / Shadow Length)" : "Asr (Shadow Ratio Principle)"}
                            </h3>
                            <p style={{ margin: 0, fontSize: "14px", color: K ? "#a0c4b8" : "#4a6660" }}>
                                {isarabic
                                    ? "يدخل وقت العصر عندما يصبح ظل كل شيء مثله مضافاً إليه ظل الزوال (عند جمهور الفقهاء: الشافعية والمالكية والحنابلة)، أو عندما يصبح ظل كل شيء مثليه مضافاً إليه ظل الزوال (عند الإمام أبي حنيفة)."
                                    : "Asr begins when an object's shadow equals its length plus its minimum noon shadow (Standard Jumhur rule across Shafi'i, Maliki, Hanbali). In the Hanafi school, it begins when the shadow equals twice the object's height plus its noon shadow."}
                            </p>
                        </div>

                        <div style={{ padding: "18px", borderRadius: "12px", backgroundColor: K ? "#0b0f0d" : "#ffffff", border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1" }}>
                            <h3 style={{ margin: "0 0 8px 0", color: K ? "#95d3ba" : "#003829", fontSize: "1.15rem" }}>
                                🌇 {isarabic ? "صلاة المغرب والعشاء (Maghrib & Isha)" : "Maghrib (Sunset) & Isha (Night Twilight)"}
                            </h3>
                            <p style={{ margin: 0, fontSize: "14px", color: K ? "#a0c4b8" : "#4a6660" }}>
                                {isarabic
                                    ? "يدخل وقت المغرب بالاختفاء الكامل لقرص الشمس تحت الأفق الغربي. أما العشاء، فيدخل باختفاء الشفق الأحمر (عند الجمهور) أو الشفق الأبيض (عند أبي حنيفة)، وتُعبر عنه المنظمات بزاوية انخفاض بين 15° و 18°، أو بفترة زمنية محددة كتقويم أم القرى (90 دقيقة بعد المغرب)."
                                    : "Maghrib starts upon the complete disappearance of the solar disc below the Western horizon. Isha starts with the disappearance of post-sunset twilight (red twilight according to the majority, or white twilight in Hanafi jurisprudence). Angles range between 15° and 18°, or fixed intervals such as 90 minutes in Umm al-Qura."}
                            </p>
                        </div>
                    </div>

                    {/* Section 3: Comparative Analysis */}
                    <h2 style={{ color: K ? "#ffe088" : "#003829", fontSize: "1.5rem", fontWeight: "800", marginTop: "36px", marginBottom: "16px" }}>
                        {isarabic ? "٣. جدول المقارنة بين الهيئات الإسلامية العالمية" : "3. Comparative Table of Global Islamic Calculation Standards"}
                    </h2>
                    <p>
                        {isarabic
                            ? "يوضح الجدول التالي المعايير الرسمية التي يعتمدها تطبيق PrayerSync ويتيح لك التبديل بينها بضغطة زر واحدة من شاشة الإعدادات:"
                            : "Below is the official reference matrix implemented by PrayerSync, configurable from your settings toggle:"}
                    </p>

                    <div style={{ overflowX: "auto", margin: "20px 0" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: isarabic ? "right" : "left" }}>
                            <thead>
                                <tr style={{ backgroundColor: K ? "#111915" : "#eef5f7", borderBottom: K ? "2px solid #95d3ba" : "2px solid #003829" }}>
                                    <th style={{ padding: "10px 12px", color: K ? "#ffe088" : "#003829" }}>{isarabic ? "الاسم" : "Method"}</th>
                                    <th style={{ padding: "10px 12px", color: K ? "#ffe088" : "#003829" }}>{isarabic ? "زاوية الفجر" : "Fajr Angle"}</th>
                                    <th style={{ padding: "10px 12px", color: K ? "#ffe088" : "#003829" }}>{isarabic ? "معيار العشاء" : "Isha Method"}</th>
                                    <th style={{ padding: "10px 12px", color: K ? "#ffe088" : "#003829" }}>{isarabic ? "أبرز الدول" : "Region"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: "1px solid #d4dedc" }}>
                                    <td style={{ padding: "10px 12px", fontWeight: "700" }}>Umm Al-Qura (Makkah)</td>
                                    <td style={{ padding: "10px 12px" }}>18.5°</td>
                                    <td style={{ padding: "10px 12px" }}>+90 min (+120 Ramadan)</td>
                                    <td style={{ padding: "10px 12px" }}>Saudi Arabia, Gulf</td>
                                </tr>
                                <tr style={{ borderBottom: "1px solid #d4dedc" }}>
                                    <td style={{ padding: "10px 12px", fontWeight: "700" }}>Muslim World League (MWL)</td>
                                    <td style={{ padding: "10px 12px" }}>18.0°</td>
                                    <td style={{ padding: "10px 12px" }}>17.0°</td>
                                    <td style={{ padding: "10px 12px" }}>Europe, Asia, Americas</td>
                                </tr>
                                <tr style={{ borderBottom: "1px solid #d4dedc" }}>
                                    <td style={{ padding: "10px 12px", fontWeight: "700" }}>ISNA (North America)</td>
                                    <td style={{ padding: "10px 12px" }}>15.0°</td>
                                    <td style={{ padding: "10px 12px" }}>15.0°</td>
                                    <td style={{ padding: "10px 12px" }}>USA, Canada</td>
                                </tr>
                                <tr style={{ borderBottom: "1px solid #d4dedc" }}>
                                    <td style={{ padding: "10px 12px", fontWeight: "700" }}>Egyptian General Authority</td>
                                    <td style={{ padding: "10px 12px" }}>19.5°</td>
                                    <td style={{ padding: "10px 12px" }}>17.5°</td>
                                    <td style={{ padding: "10px 12px" }}>Egypt, Levant, North Africa</td>
                                </tr>
                                <tr style={{ borderBottom: "1px solid #d4dedc" }}>
                                    <td style={{ padding: "10px 12px", fontWeight: "700" }}>Karachi (Univ. Islamic Sciences)</td>
                                    <td style={{ padding: "10px 12px" }}>18.0°</td>
                                    <td style={{ padding: "10px 12px" }}>18.0°</td>
                                    <td style={{ padding: "10px 12px" }}>Pakistan, India, Bangladesh</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Advice Box */}
                    <div style={{ marginTop: "32px", padding: "24px", borderRadius: "14px", backgroundColor: K ? "#111915" : "#eef5f7", border: K ? "1px solid rgba(149, 211, 186, 0.3)" : "1px solid #c8ddd8" }}>
                        <h3 style={{ margin: "0 0 10px 0", color: K ? "#95d3ba" : "#003829", fontSize: "1.15rem" }}>
                            💡 {isarabic ? "كيف تختار الطريقة المناسبة لمدينتك؟" : "How to choose the ideal method for your location"}
                        </h3>
                        <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: K ? "#a0c4b8" : "#4a6660" }}>
                            {isarabic
                                ? "كقاعدة عامة، اختر دائماً الطريقة المعتمدة رسمياً من قِبل وزارة الأوقاف أو الهيئة الإسلامية العليا في بلدك لضمان تطابق تقويمك مع أذان المساجد المحلية. وإذا كنت تعيش في بلد غربي بدون هيئة رسمية، فإن طريقة رابطة العالم الإسلامي (MWL) أو ISNA تعتبران الأكثر أماناً وموثوقية."
                                : "As a standard recommendation, select the authority officially acknowledged by your local ministry of religious affairs or mosque council. In Western nations without centralized ministries, MWL or ISNA provide the most geographically balanced parameters."}
                        </p>
                        <Link
                            href="/Settings"
                            style={{
                                display: "inline-block",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                backgroundColor: K ? "#95d3ba" : "#003829",
                                color: K ? "#0b0f0d" : "#ffffff",
                                textDecoration: "none",
                                fontWeight: "700",
                                fontSize: "13px"
                            }}
                        >
                            {isarabic ? "تخصيص طريقة الحساب في الإعدادات ←" : "Configure Calculation Method in Settings →"}
                        </Link>
                    </div>
                </article>

                {/* Related Guides */}
                <div style={{ marginTop: "48px", borderTop: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #e1e8e6", paddingTop: "28px" }}>
                    <div style={{ fontWeight: "700", color: K ? "#95d3ba" : "#003829", marginBottom: "16px", fontSize: "16px" }}>
                        {isarabic ? "مقالات وأدلة ذات صلة:" : "Related Articles:"}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
                        <Link
                            href="/guides/asr-calculation-difference"
                            style={{
                                padding: "14px",
                                borderRadius: "10px",
                                backgroundColor: K ? "#0b0f0d" : "#ffffff",
                                border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1",
                                textDecoration: "none",
                                color: "inherit"
                            }}
                        >
                            <div style={{ fontWeight: "700", color: K ? "#ffe088" : "#003829", fontSize: "13px", marginBottom: "4px" }}>
                                {isarabic ? "فقه وفلك صلاة العصر" : "Asr Calculation Differences"}
                            </div>
                            <div style={{ fontSize: "12px", color: K ? "#89938e" : "#6e827c" }}>
                                {isarabic ? "الفرق بين ظل المثل وظل المثلين" : "Shadow length ratio comparisons"}
                            </div>
                        </Link>
                        <Link
                            href="/guides/calendar-sync-tutorial"
                            style={{
                                padding: "14px",
                                borderRadius: "10px",
                                backgroundColor: K ? "#0b0f0d" : "#ffffff",
                                border: K ? "1px solid rgba(63, 73, 69, 0.3)" : "1px solid #edf2f1",
                                textDecoration: "none",
                                color: "inherit"
                            }}
                        >
                            <div style={{ fontWeight: "700", color: K ? "#ffe088" : "#003829", fontSize: "13px", marginBottom: "4px" }}>
                                {isarabic ? "دليل مزامنة التقويم" : "Calendar Sync Tutorial"}
                            </div>
                            <div style={{ fontSize: "12px", color: K ? "#89938e" : "#6e827c" }}>
                                {isarabic ? "خطوات الربط مع Google و Apple" : "Step-by-step setup for iOS & Android"}
                            </div>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
