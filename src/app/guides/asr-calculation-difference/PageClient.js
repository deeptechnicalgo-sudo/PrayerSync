"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../../App.css";
import "../../subpage.css";
import { useData } from "../../Context/DarklightContext";
import { useData2 } from "../../Context/Arabic";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AsrCalculationPage() {
    const { K } = useData();
    const { isarabic } = useData2();
    const [expanded, setExpanded] = useState(null);

    const bg = K ? "#0f1412" : "#f5faf9";
    const text = K ? "#c8e8dc" : "#2c463f";
    const cardBg = K ? "#111915" : "#ffffff";
    const cardBorder = K ? "rgba(63,73,69,0.35)" : "#e2ede9";
    const accent = K ? "#95d3ba" : "#003829";
    const subText = K ? "#7a9e90" : "#5a7a72";
    const highlightBg = K ? "#162520" : "#eef8f3";

    const methods = [
        {
            id: "shafi",
            name_en: "Standard (Majority of Schools)",
            name_ar: "الحساب القياسي (جمهور الفقهاء)",
            schools_en: "Shafi'i, Maliki, Hanbali",
            schools_ar: "الشافعية، المالكية، الحنابلة",
            color: "#10b981",
            rule_en: "Asr begins when the shadow of an object equals its own height (1× shadow factor), plus the shadow it already had at solar noon.",
            rule_ar: "يبدأ وقت العصر حين يصير ظل كل شيء مثله (معامل الظل 1×)، زائداً ظله وقت الزوال (نصف النهار).",
            example_en: "A 1-meter pole at noon has a 0.4 m shadow. Asr starts when the shadow reaches 1.0 + 0.4 = 1.4 m.",
            example_ar: "عمود بمتر واحد ظله عند الظهر 0.4 م. يبدأ العصر حين يصل الظل إلى 1.0 + 0.4 = 1.4 م.",
            quran: "وَهُوَ الَّذِي جَعَلَ اللَّيْلَ وَالنَّهَارَ خِلْفَةً لِّمَنْ أَرَادَ أَن يَذَّكَّرَ",
        },
        {
            id: "hanafi",
            name_en: "Hanafi Method",
            name_ar: "الحساب الحنفي",
            schools_en: "Hanafi school",
            schools_ar: "المذهب الحنفي",
            color: "#f59e0b",
            rule_en: "Asr begins when the shadow of an object is twice its height (2× shadow factor), plus the noon shadow.",
            rule_ar: "يبدأ وقت العصر حين يصير ظل كل شيء مثليه (معامل الظل 2×)، زائداً ظله وقت الزوال.",
            example_en: "Same 1-meter pole. Asr starts when shadow = 2.0 + 0.4 = 2.4 m. This can be 20–90 minutes later than the standard method.",
            example_ar: "نفس العمود. يبدأ العصر حين يصل الظل إلى 2.0 + 0.4 = 2.4 م. قد يكون هذا بعد 20–90 دقيقة من الوقت القياسي.",
            note_en: "The Hanafi opinion is based on a narration by Imam Abu Yusuf, though Imam Abu Hanifa's most well-known opinion agrees with the majority.",
            note_ar: "القول الحنفي مبني على رواية الإمام أبي يوسف، وإن كان القول الأشهر عن الإمام أبي حنيفة موافقاً للجمهور.",
        },
    ];

    const comparison = [
        { lat: "0° (Equator)", std: "15:45", hanafi: "16:05", diff: "+20 min" },
        { lat: "21° (Mecca)", std: "15:30", hanafi: "15:55", diff: "+25 min" },
        { lat: "40° (New York)", std: "14:50", hanafi: "15:40", diff: "+50 min" },
        { lat: "51° (London, Summer)", std: "17:15", hanafi: "18:45", diff: "+90 min" },
    ];

    const faqs = [
        {
            q_en: "Which method should I follow?",
            q_ar: "أي طريقة يجب أن أتبع؟",
            a_en: "Follow the school of jurisprudence you adhere to (madhab). If you are Hanafi, use the Hanafi method. If you follow Shafi'i, Maliki, or Hanbali, use the Standard method. PrayerSync lets you choose under Settings → Asr Calculation.",
            a_ar: "اتبع المذهب الفقهي الذي تنتمي إليه. إذا كنت حنفياً، استخدم الطريقة الحنفية. إذا كنت شافعياً أو مالكياً أو حنبلياً، استخدم الطريقة القياسية. يمكنك الاختيار في PrayerSync تحت الإعدادات ← حساب العصر.",
        },
        {
            q_en: "Does the difference matter in countries near the equator?",
            q_ar: "هل يهم الفرق في الدول القريبة من خط الاستواء؟",
            a_en: "Near the equator, the difference is typically 15–25 minutes. At higher latitudes (London, Scandinavia, Canada), the gap can exceed 90 minutes during summer, making the choice very significant.",
            a_ar: "قرب خط الاستواء، الفرق يكون عادةً 15–25 دقيقة. عند خطوط العرض الأعلى (لندن، السكندنافية، كندا)، يمكن أن يتجاوز الفارق 90 دقيقة في الصيف، مما يجعل الاختيار ذا أثر كبير.",
        },
        {
            q_en: "What does PrayerSync use by default?",
            q_ar: "ماذا يستخدم PrayerSync افتراضياً؟",
            a_en: "PrayerSync defaults to the Standard (Shafi'i) method (1× shadow). You can switch to Hanafi (2× shadow) in the Settings page under Asr Calculation Method.",
            a_ar: "يستخدم PrayerSync افتراضياً الطريقة القياسية (الشافعية) بمعامل الظل 1×. يمكنك التحويل للطريقة الحنفية (2×) في صفحة الإعدادات تحت طريقة حساب العصر.",
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
                        {isarabic ? "الفرق في حساب العصر" : "Asr Calculation Difference"}
                    </span>
                </nav>

                {/* Header */}
                <div style={{ marginBottom: "40px" }}>
                    <div style={{ display: "inline-block", background: "#f59e0b22", border: "1px solid #f59e0b44", borderRadius: "8px", padding: "4px 12px", fontSize: "12px", fontWeight: "700", color: "#f59e0b", marginBottom: "16px", letterSpacing: "0.5px" }}>
                        {isarabic ? "🕌 فقه ومواقيت" : "🕌 JURISPRUDENCE & ASTRONOMY"}
                    </div>
                    <h1 style={{ fontSize: "2.4rem", fontWeight: "800", color: K ? "#ffffff" : "#001a13", lineHeight: 1.2, marginBottom: "16px" }}>
                        {isarabic
                            ? "الفرق الفقهي والفلكي في حساب وقت صلاة العصر"
                            : "The Jurisprudential & Astronomical Difference in Asr Prayer Time"}
                    </h1>
                    <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: subText }}>
                        {isarabic
                            ? "تفسير علمي وفقهي للخلاف التاريخي بين جمهور الفقهاء والمذهب الحنفي في تحديد بداية وقت صلاة العصر، والأثر الفلكي لهذا الاختلاف على مواقيت الصلاة العالمية."
                            : "A scholarly and astronomical explanation of the historical jurisprudential difference between the majority of Islamic scholars and the Hanafi school regarding the Asr prayer time, and its real-world impact on global prayer schedules."}
                    </p>
                </div>

                {/* Two Methods */}
                <section style={{ marginBottom: "40px" }}>
                    <h2 style={{ fontSize: "1.6rem", fontWeight: "700", color: K ? "#ffffff" : "#001a13", marginBottom: "24px" }}>
                        {isarabic ? "الطريقتان الفقهيتان" : "The Two Jurisprudential Methods"}
                    </h2>
                    <div style={{ display: "grid", gap: "20px" }}>
                        {methods.map((method) => (
                            <div key={method.id} style={{ background: cardBg, border: `2px solid ${method.color}44`, borderRadius: "14px", padding: "24px" }}>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
                                    <div>
                                        <h3 style={{ margin: 0, color: method.color, fontSize: "1.15rem", fontWeight: "700" }}>
                                            {isarabic ? method.name_ar : method.name_en}
                                        </h3>
                                        <div style={{ fontSize: "12px", color: subText, marginTop: "4px" }}>
                                            {isarabic ? method.schools_ar : method.schools_en}
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: "auto", background: method.color + "22", border: `1px solid ${method.color}44`, borderRadius: "8px", padding: "6px 14px", fontSize: "13px", fontWeight: "700", color: method.color }}>
                                        {method.id === "shafi" ? "1× Shadow" : "2× Shadow"}
                                    </div>
                                </div>
                                <div style={{ background: highlightBg, borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
                                    <div style={{ fontWeight: "600", color: accent, marginBottom: "8px", fontSize: "13px" }}>
                                        {isarabic ? "القاعدة الفقهية:" : "The Rule:"}
                                    </div>
                                    <p style={{ margin: 0, lineHeight: "1.7", color: text, fontSize: "14.5px" }}>
                                        {isarabic ? method.rule_ar : method.rule_en}
                                    </p>
                                </div>
                                <div style={{ background: K ? "#0b1810" : "#f7fdf9", border: `1px solid ${cardBorder}`, borderRadius: "10px", padding: "14px" }}>
                                    <div style={{ fontWeight: "600", color: K ? "#ffe088" : "#5c3c00", marginBottom: "6px", fontSize: "13px" }}>
                                        {isarabic ? "📐 مثال عملي:" : "📐 Practical Example:"}
                                    </div>
                                    <p style={{ margin: 0, color: text, fontSize: "14px", lineHeight: "1.6" }}>
                                        {isarabic ? method.example_ar : method.example_en}
                                    </p>
                                </div>
                                {method.note_en && (
                                    <div style={{ marginTop: "12px", fontSize: "13px", color: subText, fontStyle: "italic", borderTop: `1px solid ${cardBorder}`, paddingTop: "12px" }}>
                                        ℹ️ {isarabic ? method.note_ar : method.note_en}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Comparison Table */}
                <section style={{ marginBottom: "40px" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: K ? "#ffffff" : "#001a13", marginBottom: "8px" }}>
                        {isarabic ? "🌍 الفارق الزمني حسب خط العرض" : "🌍 Time Difference by Latitude"}
                    </h2>
                    <p style={{ color: subText, marginBottom: "20px", fontSize: "14px" }}>
                        {isarabic
                            ? "كلما زاد خط العرض (ابتعدت عن خط الاستواء) كلما اتسع الفارق بين الطريقتين:"
                            : "The further from the equator, the wider the gap between the two methods:"}
                    </p>
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                            <thead>
                                <tr style={{ background: highlightBg }}>
                                    {[
                                        isarabic ? "الموقع" : "Location",
                                        isarabic ? "الطريقة القياسية" : "Standard (1×)",
                                        isarabic ? "الطريقة الحنفية" : "Hanafi (2×)",
                                        isarabic ? "الفارق" : "Difference"
                                    ].map((h, i) => (
                                        <th key={i} style={{ padding: "12px 16px", textAlign: "center", borderBottom: `2px solid ${cardBorder}`, color: accent, fontWeight: "700", whiteSpace: "nowrap" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {comparison.map((row, i) => (
                                    <tr key={i} style={{ background: i % 2 === 0 ? cardBg : "transparent" }}>
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${cardBorder}`, color: text }}>{row.lat}</td>
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${cardBorder}`, color: "#10b981", textAlign: "center", fontWeight: "600" }}>{row.std}</td>
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${cardBorder}`, color: "#f59e0b", textAlign: "center", fontWeight: "600" }}>{row.hanafi}</td>
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${cardBorder}`, color: K ? "#ffe088" : "#c05500", textAlign: "center", fontWeight: "700" }}>{row.diff}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* FAQ */}
                <section style={{ marginBottom: "40px" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: K ? "#ffffff" : "#001a13", marginBottom: "24px" }}>
                        {isarabic ? "أسئلة شائعة" : "Frequently Asked Questions"}
                    </h2>
                    {faqs.map((faq, i) => (
                        <div key={i} style={{ marginBottom: "12px", border: `1px solid ${cardBorder}`, borderRadius: "12px", overflow: "hidden" }}>
                            <button
                                type="button"
                                onClick={() => setExpanded(expanded === i ? null : i)}
                                style={{ width: "100%", textAlign: "left", background: cardBg, padding: "18px 20px", cursor: "pointer", color: accent, fontWeight: "600", fontSize: "14.5px", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}
                            >
                                {isarabic ? faq.q_ar : faq.q_en}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transform: expanded === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>
                            {expanded === i && (
                                <div style={{ padding: "16px 20px", background: highlightBg, borderTop: `1px solid ${cardBorder}`, color: text, lineHeight: "1.7", fontSize: "14px" }}>
                                    {isarabic ? faq.a_ar : faq.a_en}
                                </div>
                            )}
                        </div>
                    ))}
                </section>

                {/* CTA */}
                <div style={{ background: `linear-gradient(135deg, ${K ? "#1a1200" : "#fef8e7"}, ${K ? "#1a1500" : "#fdf3cc"})`, border: `1px solid ${K ? "rgba(255,224,136,0.2)" : "#f0d070"}`, borderRadius: "16px", padding: "28px", textAlign: "center" }}>
                    <h3 style={{ color: "#f59e0b", fontSize: "1.2rem", fontWeight: "700", marginTop: 0, marginBottom: "12px" }}>
                        {isarabic ? "غيّر طريقة حساب العصر في PrayerSync" : "Change Your Asr Method in PrayerSync"}
                    </h3>
                    <p style={{ color: subText, marginBottom: "20px", fontSize: "14px" }}>
                        {isarabic
                            ? "يدعم PrayerSync كلتا الطريقتين. اذهب إلى الإعدادات لتغيير طريقة حساب العصر."
                            : "PrayerSync supports both methods. Go to Settings to switch your Asr calculation preference."}
                    </p>
                    <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/Settings" style={{ display: "inline-block", background: "#f59e0b", color: "#1a0a00", padding: "11px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "13px" }}>
                            {isarabic ? "⚙️ الإعدادات" : "⚙️ Open Settings"}
                        </Link>
                        <Link href="/guides" style={{ display: "inline-block", background: "transparent", border: `1px solid ${cardBorder}`, color: subText, padding: "11px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "13px" }}>
                            {isarabic ? "← الأدلة" : "← All Guides"}
                        </Link>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
