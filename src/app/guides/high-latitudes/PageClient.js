"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../../App.css";
import "../../subpage.css";
import { useData } from "../../Context/DarklightContext";
import { useData2 } from "../../Context/Arabic";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function HighLatitudesPage() {
    const { K } = useData();
    const { isarabic } = useData2();
    const [activeMethod, setActiveMethod] = useState("middle-of-night");

    const bg = K ? "#0f1412" : "#f5faf9";
    const text = K ? "#c8e8dc" : "#2c463f";
    const cardBg = K ? "#111915" : "#ffffff";
    const cardBorder = K ? "rgba(63,73,69,0.35)" : "#e2ede9";
    const accent = K ? "#95d3ba" : "#003829";
    const subText = K ? "#7a9e90" : "#5a7a72";
    const highlightBg = K ? "#162520" : "#eef8f3";

    const problemCountries = [
        { flag: "🇳🇴", country_en: "Norway", country_ar: "النرويج", lat: "58–71°N", issue_en: "Midnight sun in summer, polar night in winter", issue_ar: "شمس منتصف الليل صيفاً، وليل قطبي شتاءً" },
        { flag: "🇫🇮", country_en: "Finland", country_ar: "فنلندا", lat: "60–70°N", issue_en: "Fajr & Isha vanish for weeks in summer", issue_ar: "يختفي الفجر والعشاء لأسابيع في الصيف" },
        { flag: "🇸🇪", country_en: "Sweden", country_ar: "السويد", lat: "55–69°N", issue_en: "Extended twilight; dawn & dusk overlap", issue_ar: "شفق ممتد؛ تداخل بين الفجر والشفق" },
        { flag: "🇨🇦", country_en: "Canada (North)", country_ar: "كندا (الشمال)", lat: "55–83°N", issue_en: "Arctic communities face continuous daylight", issue_ar: "مجتمعات القطب الشمالي تواجه نهاراً مستمراً" },
        { flag: "🇬🇧", country_en: "UK (Scotland)", country_ar: "المملكة المتحدة (اسكتلندا)", lat: "55–60°N", issue_en: "Very short Isha window in summer", issue_ar: "نافذة قصيرة جداً للعشاء في الصيف" },
        { flag: "🇩🇪", country_en: "Germany", country_ar: "ألمانيا", lat: "47–55°N", issue_en: "Early Fajr / late Isha in summer", issue_ar: "فجر مبكر جداً / عشاء متأخر جداً في الصيف" },
    ];

    const hlMethods = [
        {
            id: "middle-of-night",
            name_en: "Middle of the Night",
            name_ar: "منتصف الليل",
            color: "#6366f1",
            desc_en: "Divides the night (sunset to sunrise) into two equal halves. Isha ends at the first half, Fajr begins at the second half. Most balanced approach for high latitudes.",
            desc_ar: "يقسم الليل (من الغروب إلى الشروق) إلى نصفين متساويين. تنتهي صلاة العشاء عند النصف الأول وتبدأ صلاة الفجر عند النصف الثاني. الأسلوب الأكثر توازناً لخطوط العرض العليا.",
            recommended: true,
            example_en: "If sunset is 22:00 and sunrise is 04:00, midnight = 01:00. Isha ends ~01:00, Fajr begins ~01:00.",
            example_ar: "إذا كان الغروب 22:00 والشروق 04:00، فإن منتصف الليل = 01:00. تنتهي العشاء ~ 01:00 ويبدأ الفجر ~01:00.",
        },
        {
            id: "angle-based",
            name_en: "Angle-Based Method",
            name_ar: "الطريقة القائمة على الزاوية",
            color: "#0ea5e9",
            desc_en: "Uses a fixed twilight angle (typically 18°, 15°, or 12° below horizon). When the sun never reaches this angle below the horizon, an alternative calculation is applied. Suitable for mid-high latitudes.",
            desc_ar: "تستخدم زاوية شفق ثابتة (عادةً 18° أو 15° أو 12° تحت الأفق). حين لا تصل الشمس لهذه الزاوية، تُطبَّق حسابات بديلة. مناسبة لخطوط العرض المتوسطة-العالية.",
            recommended: false,
            example_en: "If Fajr requires 18° below horizon but the sun only dips to 15°, the method uses a ratio of night length to estimate the time.",
            example_ar: "إذا كان الفجر يتطلب 18° تحت الأفق لكن الشمس لا تنزل إلا 15°، تستخدم الطريقة نسبة طول الليل لتقدير الوقت.",
        },
        {
            id: "nearest-city",
            name_en: "Nearest City Method",
            name_ar: "طريقة أقرب مدينة",
            color: "#f59e0b",
            desc_en: "Borrows prayer times from the nearest city where twilight calculations are valid (typically below 45° latitude). Common in some European fatwa councils.",
            desc_ar: "تستعير مواقيت الصلاة من أقرب مدينة تصح فيها حسابات الشفق (عادةً ما دون 45° خط عرض). شائعة في بعض مجالس الفتوى الأوروبية.",
            recommended: false,
            example_en: "A Muslim in Tromsø (Norway, 69°N) uses prayer times from Oslo (59°N) instead.",
            example_ar: "مسلم في ترومسو (النرويج، 69°شمالاً) يستخدم مواقيت أوسلو (59°شمالاً) بدلاً من ذلك.",
        },
        {
            id: "one-seventh-night",
            name_en: "One-Seventh of Night",
            name_ar: "سُبع الليل",
            color: "#ec4899",
            desc_en: "Assigns 1/7 of the night duration to Isha (from sunset) and 1/7 before sunrise for Fajr. A classical scholarly opinion derived from hadith interpretations.",
            desc_ar: "يخصص سُبع مدة الليل للعشاء (من الغروب) وسُبع آخر قبل الشروق للفجر. رأي فقهي تقليدي مستند لتفسيرات الحديث النبوي.",
            recommended: false,
            example_en: "Night = 6 hours. Isha = sunset + 51 min (1/7 × 360 min). Fajr = sunrise − 51 min.",
            example_ar: "الليل = 6 ساعات. العشاء = الغروب + 51 دقيقة (1/7 × 360 دقيقة). الفجر = الشروق − 51 دقيقة.",
        },
    ];

    const tips = [
        {
            icon: "🕐",
            title_en: "Set a prayer reminder 15 min before Fajr",
            title_ar: "اضبط تذكيراً 15 دقيقة قبل الفجر",
            desc_en: "In high latitudes during summer, Fajr can be very early (as early as 2:30 AM). Use PrayerSync's calendar alerts to stay on schedule.",
            desc_ar: "في خطوط العرض العليا أثناء الصيف، يمكن أن يكون الفجر مبكراً جداً (حتى 2:30 صباحاً). استخدم تنبيهات تقويم PrayerSync للبقاء في الموعد.",
        },
        {
            icon: "📱",
            title_en: "Combine Dhuhr & Asr on very short days",
            title_ar: "جمع الظهر والعصر في الأيام القصيرة جداً",
            desc_en: "During polar winter with very short daylight, consulting your local Islamic council about combining prayers (Jama') is recommended.",
            desc_ar: "خلال الشتاء القطبي مع النهار القصير جداً، يُنصح بالتشاور مع مجلسك الإسلامي المحلي حول جمع الصلوات.",
        },
        {
            icon: "🌙",
            title_en: "Use Mecca time as fallback",
            title_ar: "استخدم توقيت مكة المكرمة كبديل",
            desc_en: "Many scholars permit following Mecca prayer times (or nearest Muslim country) when local calculation is astronomically impossible.",
            desc_ar: "كثير من العلماء يُجيزون اتباع مواقيت مكة المكرمة (أو أقرب بلد مسلم) حين يكون الحساب المحلي مستحيلاً فلكياً.",
        },
    ];

    return (
        <div
            className="app-wrapper"
            dir={isarabic ? "rtl" : "ltr"}
            style={{ backgroundColor: bg, color: text, minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
            <Header currentPath="/guides" />

            <main style={{ flex: 1, maxWidth: "860px", margin: "0 auto", padding: "40px 20px", width: "100%", boxSizing: "border-box" }}>

                {/* Breadcrumb */}
                <nav style={{ marginBottom: "24px", fontSize: "13px", color: subText }}>
                    <Link href="/" style={{ color: subText, textDecoration: "none" }}>Home</Link>
                    {" / "}
                    <Link href="/guides" style={{ color: subText, textDecoration: "none" }}>Guides</Link>
                    {" / "}
                    <span style={{ color: accent }}>
                        {isarabic ? "مناطق خطوط العرض العليا" : "High Latitude Prayer Times"}
                    </span>
                </nav>

                {/* Header */}
                <div style={{ marginBottom: "40px" }}>
                    <div style={{ display: "inline-block", background: "#6366f122", border: "1px solid #6366f144", borderRadius: "8px", padding: "4px 12px", fontSize: "12px", fontWeight: "700", color: "#818cf8", marginBottom: "16px", letterSpacing: "0.5px" }}>
                        {isarabic ? "🌐 خطوط العرض العليا" : "🌐 HIGH LATITUDE GUIDE"}
                    </div>
                    <h1 style={{ fontSize: "2.4rem", fontWeight: "800", color: K ? "#ffffff" : "#001a13", lineHeight: 1.2, marginBottom: "16px" }}>
                        {isarabic
                            ? "مواقيت الصلاة في خطوط العرض العليا"
                            : "Prayer Times at High Latitudes"}
                    </h1>
                    <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: subText }}>
                        {isarabic
                            ? "حلول علمية وفقهية لحساب مواقيت الصلاة في الدول الإسكندنافية وكندا والمناطق التي يختفي فيها الفجر والشفق، مع شرح الطرق المعتمدة عالمياً."
                            : "Scientific and jurisprudential solutions for calculating prayer times in Scandinavian countries, Canada, and regions where Fajr and Isha twilight disappears — with explanations of globally adopted methods."}
                    </p>
                </div>

                {/* Why it's a problem */}
                <section style={{ background: K ? "#1a0505" : "#fff5f5", border: `1px solid ${K ? "rgba(239,68,68,0.3)" : "#fca5a5"}`, borderRadius: "14px", padding: "24px", marginBottom: "36px" }}>
                    <h2 style={{ color: "#ef4444", fontSize: "1.2rem", fontWeight: "700", marginTop: 0, marginBottom: "12px" }}>
                        {isarabic ? "⚠️ لماذا تختفي مواقيت الصلاة؟" : "⚠️ Why Do Prayer Times Disappear?"}
                    </h2>
                    <p style={{ lineHeight: "1.7", color: text, margin: "0 0 12px 0" }}>
                        {isarabic
                            ? "تعتمد صلاتا الفجر والعشاء على اختفاء الشفق (الضوء المتبقي بعد الغروب أو قبل الشروق عند زاوية 18° أو 15° تحت الأفق). في خطوط العرض العالية (فوق 49° تقريباً)، لا تصل الشمس في أشهر الصيف إلى هذه الزاوية أبداً أسفل الأفق، مما يجعل الحساب الفلكي التقليدي مستحيلاً."
                            : "Fajr and Isha prayers depend on twilight (residual light after sunset or before sunrise) at 18° or 15° below the horizon. At high latitudes (approximately above 49°N), the sun never drops below this angle during summer months, making traditional astronomical calculation impossible."}
                    </p>
                    <p style={{ lineHeight: "1.7", color: text, margin: 0 }}>
                        {isarabic
                            ? "هذا يُعرَف بـ 'مشكلة الشفق المستمر' أو 'ظاهرة الليل الأبيض'. العلماء المسلمون طوروا عدة طرق بديلة للتعامل مع هذه الظاهرة الفلكية."
                            : "This is known as the 'continuous twilight problem' or 'white night phenomenon'. Muslim scholars have developed several alternative methods to address this astronomical reality."}
                    </p>
                </section>

                {/* Affected Countries */}
                <section style={{ marginBottom: "36px" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: K ? "#ffffff" : "#001a13", marginBottom: "20px" }}>
                        {isarabic ? "🌍 الدول المتأثرة" : "🌍 Affected Countries & Regions"}
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px" }}>
                        {problemCountries.map((c, i) => (
                            <div key={i} style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "12px", padding: "16px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                                    <span style={{ fontSize: "1.5rem" }}>{c.flag}</span>
                                    <div>
                                        <div style={{ fontWeight: "700", color: accent }}>{isarabic ? c.country_ar : c.country_en}</div>
                                        <div style={{ fontSize: "12px", color: subText }}>{c.lat}</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: "13px", color: text, lineHeight: "1.5" }}>
                                    {isarabic ? c.issue_ar : c.issue_en}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* High Latitude Methods */}
                <section style={{ marginBottom: "40px" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: K ? "#ffffff" : "#001a13", marginBottom: "8px" }}>
                        {isarabic ? "الطرق المعتمدة عالمياً" : "Globally Recognized Calculation Methods"}
                    </h2>
                    <p style={{ color: subText, marginBottom: "20px", fontSize: "14px" }}>
                        {isarabic ? "اضغط على كل طريقة لمعرفة تفاصيلها:" : "Click each method to see details:"}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
                        {hlMethods.map((m) => (
                            <button
                                key={m.id}
                                type="button"
                                onClick={() => setActiveMethod(m.id)}
                                style={{
                                    padding: "8px 18px", borderRadius: "20px", border: `2px solid ${activeMethod === m.id ? m.color : cardBorder}`, background: activeMethod === m.id ? m.color + "22" : cardBg, color: activeMethod === m.id ? m.color : subText, fontWeight: "600", fontSize: "13px", cursor: "pointer", transition: "all 0.2s"
                                }}
                            >
                                {isarabic ? m.name_ar : m.name_en}
                                {m.recommended && <span style={{ marginLeft: "6px", fontSize: "11px" }}>⭐</span>}
                            </button>
                        ))}
                    </div>
                    {hlMethods.filter(m => m.id === activeMethod).map((method) => (
                        <div key={method.id} style={{ background: cardBg, border: `2px solid ${method.color}44`, borderRadius: "14px", padding: "24px" }}>
                            {method.recommended && (
                                <div style={{ display: "inline-block", background: method.color + "22", border: `1px solid ${method.color}44`, borderRadius: "6px", padding: "3px 10px", fontSize: "11px", fontWeight: "700", color: method.color, marginBottom: "12px" }}>
                                    ⭐ {isarabic ? "الأكثر توصية" : "MOST RECOMMENDED"}
                                </div>
                            )}
                            <p style={{ lineHeight: "1.7", color: text, margin: "0 0 16px 0" }}>
                                {isarabic ? method.desc_ar : method.desc_en}
                            </p>
                            <div style={{ background: highlightBg, borderRadius: "10px", padding: "14px", border: `1px solid ${cardBorder}` }}>
                                <div style={{ fontWeight: "600", color: K ? "#ffe088" : "#5c3c00", marginBottom: "6px", fontSize: "13px" }}>
                                    📐 {isarabic ? "مثال:" : "Example:"}
                                </div>
                                <div style={{ color: text, fontSize: "14px", lineHeight: "1.6" }}>
                                    {isarabic ? method.example_ar : method.example_en}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Practical Tips */}
                <section style={{ marginBottom: "40px" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: K ? "#ffffff" : "#001a13", marginBottom: "20px" }}>
                        {isarabic ? "💡 نصائح عملية للمسلمين في المناطق المتأثرة" : "💡 Practical Tips for Muslims in Affected Regions"}
                    </h2>
                    <div style={{ display: "grid", gap: "14px" }}>
                        {tips.map((tip, i) => (
                            <div key={i} style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "12px", padding: "20px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                                <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>{tip.icon}</span>
                                <div>
                                    <div style={{ fontWeight: "700", color: accent, marginBottom: "6px", fontSize: "15px" }}>
                                        {isarabic ? tip.title_ar : tip.title_en}
                                    </div>
                                    <div style={{ color: text, lineHeight: "1.6", fontSize: "14px" }}>
                                        {isarabic ? tip.desc_ar : tip.desc_en}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Settings CTA */}
                <div style={{ background: `linear-gradient(135deg, ${K ? "#0d1a2e" : "#eef4ff"}, ${K ? "#111925" : "#e0eaff"})`, border: `1px solid ${K ? "rgba(99,102,241,0.3)" : "#a5b4fc"}`, borderRadius: "16px", padding: "28px", textAlign: "center" }}>
                    <h3 style={{ color: "#6366f1", fontSize: "1.2rem", fontWeight: "700", marginTop: 0, marginBottom: "12px" }}>
                        {isarabic ? "اضبط طريقة خطوط العرض العليا في PrayerSync" : "Set Your High Latitude Method in PrayerSync"}
                    </h3>
                    <p style={{ color: subText, marginBottom: "20px", fontSize: "14px" }}>
                        {isarabic
                            ? "يدعم PrayerSync جميع طرق خطوط العرض العليا. غيّر الإعداد من صفحة الإعدادات."
                            : "PrayerSync supports all high latitude methods. Change the setting from the Settings page."}
                    </p>
                    <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/Settings" style={{ display: "inline-block", background: "#6366f1", color: "#ffffff", padding: "11px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "13px" }}>
                            {isarabic ? "⚙️ افتح الإعدادات" : "⚙️ Open Settings"}
                        </Link>
                        <Link href="/guides" style={{ display: "inline-block", background: "transparent", border: `1px solid ${cardBorder}`, color: subText, padding: "11px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "13px" }}>
                            {isarabic ? "← كل الأدلة" : "← All Guides"}
                        </Link>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
