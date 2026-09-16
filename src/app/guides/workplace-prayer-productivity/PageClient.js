"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../../App.css";
import "../../subpage.css";
import { useData } from "../../Context/DarklightContext";
import { useData2 } from "../../Context/Arabic";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function WorkplacePrayerPage() {
    const { K } = useData();
    const { isarabic } = useData2();
    const [expandedFaq, setExpandedFaq] = useState(null);

    const bg = K ? "#0f1412" : "#f5faf9";
    const text = K ? "#c8e8dc" : "#2c463f";
    const cardBg = K ? "#111915" : "#ffffff";
    const cardBorder = K ? "rgba(63,73,69,0.35)" : "#e2ede9";
    const accent = K ? "#95d3ba" : "#003829";
    const subText = K ? "#7a9e90" : "#5a7a72";
    const highlightBg = K ? "#162520" : "#eef8f3";

    const strategies = [
        {
            icon: "📅",
            title_en: "Block Prayer Times as Recurring Events",
            title_ar: "احجز أوقات الصلاة كأحداث متكررة",
            color: "#10b981",
            desc_en: "Add all five prayers to your work calendar as recurring 10–15 min events. Mark them as 'Busy' so colleagues see you're unavailable. With PrayerSync, import your prayer calendar directly into Google Calendar or Outlook — your prayer schedule updates automatically with the seasons.",
            desc_ar: "أضف الصلوات الخمس لتقويم عملك كأحداث متكررة لمدة 10–15 دقيقة. ضعها على وضع 'مشغول' حتى يرى زملاؤك أنك غير متاح. مع PrayerSync، استورد تقويم الصلاة مباشرة في Google Calendar أو Outlook — جدول صلاتك يُحدَّث تلقائياً مع الفصول.",
            tools_en: ["Google Calendar Block", "Outlook 'Busy' Status", "PrayerSync WebCal Sync"],
            tools_ar: ["حجب Google Calendar", "حالة 'مشغول' في Outlook", "مزامنة WebCal عبر PrayerSync"],
        },
        {
            icon: "🤝",
            title_en: "Communicate Early with Your Manager",
            title_ar: "تواصل مبكراً مع مديرك",
            color: "#3b82f6",
            desc_en: "Schedule a brief conversation with your line manager early in your employment or at Ramadan's start. Most workplaces legally accommodate religious obligations under employment law. Frame it as a scheduling preference, not a special request.",
            desc_ar: "رتب محادثة قصيرة مع مديرك المباشر في بداية عملك أو مع بداية رمضان. معظم بيئات العمل تستوعب الالتزامات الدينية قانونياً وفق قوانين العمل. قدّمها كتفضيل جدول وليس طلباً استثنائياً.",
            tools_en: ["Employment Rights Documentation", "Accommodation Request Email Template"],
            tools_ar: ["توثيق حقوق التوظيف", "قالب بريد طلب الاستيعاب"],
        },
        {
            icon: "🔄",
            title_en: "Flexible Scheduling & Prayer Combining",
            title_ar: "الجدولة المرنة وجمع الصلوات",
            color: "#8b5cf6",
            desc_en: "For intense meeting periods, consult a scholar about combining Dhuhr with Asr (Jam') when needed. Also consider adjusting your lunch break to cover one or two prayer windows. Many scholars permit combining for travelers and workers in necessity.",
            desc_ar: "لفترات الاجتماعات المكثفة، استشر عالماً حول جمع الظهر مع العصر عند الحاجة. فكّر أيضاً في تعديل استراحة الغداء لتغطية وقت صلاة أو اثنتين. كثير من العلماء يجيزون الجمع للمسافرين وأصحاب الضرورة.",
            tools_en: ["Dhuhr + Asr Combination", "Maghrib + Isha Combination", "Flexible Lunch Break"],
            tools_ar: ["جمع الظهر مع العصر", "جمع المغرب مع العشاء", "مرونة استراحة الغداء"],
        },
        {
            icon: "🚫",
            title_en: "Prevent Meeting Conflicts Automatically",
            title_ar: "منع تعارض الاجتماعات تلقائياً",
            color: "#f59e0b",
            desc_en: "When colleagues see blocked time in your calendar, they naturally schedule meetings around it. Share your prayer calendar (visible but private) with your team. Use Google Calendar's 'decline recurring conflicts' feature to automatically reject meetings that land on prayer blocks.",
            desc_ar: "حين يرى زملاؤك أوقاتاً محجوزة في تقويمك، يقومون تلقائياً بجدولة الاجتماعات حولها. شارك تقويم صلاتك (مرئياً لكن خاصاً) مع فريقك. استخدم ميزة 'رفض التعارضات المتكررة' في Google Calendar لرفض الاجتماعات التي تتعارض مع أوقات الصلاة تلقائياً.",
            tools_en: ["'Busy' Calendar Blocks", "Auto-decline Meeting Conflicts", "Team Calendar Sharing"],
            tools_ar: ["حجوزات 'مشغول' في التقويم", "الرفض التلقائي للتعارضات", "مشاركة التقويم مع الفريق"],
        },
    ];

    const prayerDurations = [
        { prayer_en: "Fajr", prayer_ar: "الفجر", duration_en: "5–8 minutes", duration_ar: "5–8 دقائق", note_en: "Before start of workday for most", note_ar: "قبل بداية يوم العمل لمعظم الناس" },
        { prayer_en: "Dhuhr", prayer_ar: "الظهر", duration_en: "10–12 minutes", duration_ar: "10–12 دقيقة", note_en: "Often overlaps with lunch break", note_ar: "غالباً يتزامن مع استراحة الغداء" },
        { prayer_en: "Asr", prayer_ar: "العصر", duration_en: "8–10 minutes", duration_ar: "8–10 دقائق", note_en: "Mid-afternoon, 2–5 PM roughly", note_ar: "منتصف فترة ما بعد الظهر، 2–5 مساءً تقريباً" },
        { prayer_en: "Maghrib", prayer_ar: "المغرب", duration_en: "5–8 minutes", duration_ar: "5–8 دقائق", note_en: "After sunset, typically after work", note_ar: "بعد الغروب، عادةً بعد العمل" },
        { prayer_en: "Isha", prayer_ar: "العشاء", duration_en: "10–12 minutes", duration_ar: "10–12 دقيقة", note_en: "Evening, rarely during work hours", note_ar: "المساء، نادراً خلال ساعات العمل" },
    ];

    const faqs = [
        {
            q_en: "Am I legally entitled to prayer breaks at work?",
            q_ar: "هل لديّ حق قانوني في استراحات الصلاة أثناء العمل؟",
            a_en: "In most Western countries (UK, US, EU, Canada), employers must make 'reasonable accommodations' for religious practices under employment discrimination law. This typically includes allowing short prayer breaks that don't significantly disrupt operations. Always check your country's specific employment laws.",
            a_ar: "في معظم الدول الغربية (المملكة المتحدة، الولايات المتحدة، الاتحاد الأوروبي، كندا)، يجب على أصحاب العمل إجراء 'تسهيلات معقولة' للممارسات الدينية بموجب قانون مكافحة التمييز في التوظيف. يشمل ذلك عادةً السماح باستراحات صلاة قصيرة لا تُعطّل العمليات بشكل كبير.",
        },
        {
            q_en: "What if a critical meeting lands on prayer time?",
            q_ar: "ماذا لو تزامن اجتماع مهم مع وقت الصلاة؟",
            a_en: "First, check if the meeting can be rescheduled by 15–30 minutes. If not, pray at the earliest possible moment after the meeting ends within the prayer's extended window. For Dhuhr, this window typically extends until Asr begins. Consult a scholar for your specific situation.",
            a_ar: "أولاً، تحقق إذا كان بالإمكان تأجيل الاجتماع 15–30 دقيقة. إذا تعذّر ذلك، صلّ في أقرب وقت ممكن بعد انتهاء الاجتماع ضمن الوقت الممتد للصلاة. لصلاة الظهر، يمتد هذا الوقت عادةً حتى دخول العصر. استشر عالماً في حالتك الخاصة.",
        },
        {
            q_en: "How do I find a prayer space at work?",
            q_ar: "كيف أجد مكاناً للصلاة في مكان العمل؟",
            a_en: "Ask HR about a 'quiet room', wellness room, or meditation space — these exist in many modern offices. A clean corner of a meeting room works perfectly. In a pinch, prayer can be performed sitting in a chair if the floor is not accessible.",
            a_ar: "اسأل HR عن 'غرفة هادئة' أو غرفة رفاهية أو مساحة تأمل — توجد في كثير من المكاتب الحديثة. زاوية نظيفة من غرفة اجتماعات تؤدي الغرض تماماً. عند الضرورة، يمكن الصلاة على كرسي إذا تعذّر الوصول للأرضية.",
        },
        {
            q_en: "How can PrayerSync help with work scheduling?",
            q_ar: "كيف يمكن لـ PrayerSync المساعدة في جدولة العمل؟",
            a_en: "PrayerSync generates a live ICS/WebCal feed that auto-updates prayer times seasonally. When synced to your work calendar (Google/Outlook), prayer times appear as blocked events that teammates can see when scheduling meetings. No manual updating needed — ever.",
            a_ar: "يُنشئ PrayerSync تغذية ICS/WebCal مباشرة تُحدّث مواقيت الصلاة تلقائياً مع الفصول. عند المزامنة مع تقويم العمل (Google/Outlook)، تظهر مواقيت الصلاة كأحداث محجوزة يمكن لزملاء الفريق رؤيتها عند جدولة الاجتماعات. لا حاجة للتحديث اليدوي أبداً.",
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
                        {isarabic ? "الصلاة في بيئة العمل" : "Workplace Prayer Guide"}
                    </span>
                </nav>

                {/* Header */}
                <div style={{ marginBottom: "40px" }}>
                    <div style={{ display: "inline-block", background: "#10b98122", border: "1px solid #10b98144", borderRadius: "8px", padding: "4px 12px", fontSize: "12px", fontWeight: "700", color: "#34d399", marginBottom: "16px", letterSpacing: "0.5px" }}>
                        {isarabic ? "💼 دليل المحترفين" : "💼 PROFESSIONAL GUIDE"}
                    </div>
                    <h1 style={{ fontSize: "2.4rem", fontWeight: "800", color: K ? "#ffffff" : "#001a13", lineHeight: 1.2, marginBottom: "16px" }}>
                        {isarabic
                            ? "الصلاة في بيئة العمل: دليل المحترفين والمديرين"
                            : "Prayer at Work: The Professional's Complete Guide"}
                    </h1>
                    <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: subText }}>
                        {isarabic
                            ? "دليل عملي شامل لأصحاب الأعمال والمهنيين المسلمين لتنظيم أوقات الصلاة في بيئة العمل، منع تعارض الاجتماعات، والتواصل المهني مع الزملاء والإدارة."
                            : "A comprehensive practical guide for Muslim professionals and business owners on organizing prayer times at work, preventing meeting conflicts, and professional communication with colleagues and management."}
                    </p>
                </div>

                {/* Prayer Duration Overview */}
                <section style={{ marginBottom: "36px" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: K ? "#ffffff" : "#001a13", marginBottom: "16px" }}>
                        {isarabic ? "⏱️ مدة كل صلاة في العمل" : "⏱️ How Long Does Each Prayer Take?"}
                    </h2>
                    <p style={{ color: subText, marginBottom: "20px", fontSize: "14px" }}>
                        {isarabic
                            ? "الصلاة الكاملة (وضوء + صلاة) تستغرق في المتوسط 10–15 دقيقة — أقل من استراحة القهوة:"
                            : "A complete prayer (ablution + prayer) takes on average 10–15 minutes — less than a coffee break:"}
                    </p>
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                            <thead>
                                <tr style={{ background: highlightBg }}>
                                    {[
                                        isarabic ? "الصلاة" : "Prayer",
                                        isarabic ? "المدة" : "Duration",
                                        isarabic ? "توقيت العمل" : "Work Impact"
                                    ].map((h, i) => (
                                        <th key={i} style={{ padding: "12px 16px", textAlign: "right", borderBottom: `2px solid ${cardBorder}`, color: accent, fontWeight: "700" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {prayerDurations.map((row, i) => (
                                    <tr key={i} style={{ background: i % 2 === 0 ? cardBg : "transparent" }}>
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${cardBorder}`, fontWeight: "600", color: accent }}>
                                            {isarabic ? row.prayer_ar : row.prayer_en}
                                        </td>
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${cardBorder}`, color: text }}>
                                            {isarabic ? row.duration_ar : row.duration_en}
                                        </td>
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${cardBorder}`, color: subText, fontSize: "13px" }}>
                                            {isarabic ? row.note_ar : row.note_en}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Strategies */}
                <section style={{ marginBottom: "40px" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: K ? "#ffffff" : "#001a13", marginBottom: "24px" }}>
                        {isarabic ? "🛡️ استراتيجيات عملية مجرّبة" : "🛡️ Proven Practical Strategies"}
                    </h2>
                    <div style={{ display: "grid", gap: "20px" }}>
                        {strategies.map((s, i) => (
                            <div key={i} style={{ background: cardBg, border: `2px solid ${s.color}33`, borderRadius: "14px", padding: "24px" }}>
                                <div style={{ display: "flex", gap: "14px", marginBottom: "14px", alignItems: "flex-start" }}>
                                    <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>{s.icon}</span>
                                    <h3 style={{ margin: 0, color: s.color, fontSize: "1.1rem", fontWeight: "700", lineHeight: 1.3 }}>
                                        {isarabic ? s.title_ar : s.title_en}
                                    </h3>
                                </div>
                                <p style={{ margin: "0 0 16px 0", color: text, lineHeight: "1.7", fontSize: "14.5px" }}>
                                    {isarabic ? s.desc_ar : s.desc_en}
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                    {(isarabic ? s.tools_ar : s.tools_en).map((tool, j) => (
                                        <span key={j} style={{ background: s.color + "15", border: `1px solid ${s.color}33`, color: s.color, borderRadius: "6px", padding: "4px 10px", fontSize: "12px", fontWeight: "600" }}>
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section style={{ marginBottom: "40px" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: K ? "#ffffff" : "#001a13", marginBottom: "20px" }}>
                        {isarabic ? "أسئلة شائعة" : "Frequently Asked Questions"}
                    </h2>
                    {faqs.map((faq, i) => (
                        <div key={i} style={{ marginBottom: "10px", border: `1px solid ${cardBorder}`, borderRadius: "12px", overflow: "hidden" }}>
                            <button
                                type="button"
                                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                style={{ width: "100%", textAlign: "left", background: cardBg, padding: "18px 20px", cursor: "pointer", color: accent, fontWeight: "600", fontSize: "14.5px", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}
                            >
                                {isarabic ? faq.q_ar : faq.q_en}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transform: expandedFaq === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>
                            {expandedFaq === i && (
                                <div style={{ padding: "16px 20px", background: highlightBg, borderTop: `1px solid ${cardBorder}`, color: text, lineHeight: "1.7", fontSize: "14px" }}>
                                    {isarabic ? faq.a_ar : faq.a_en}
                                </div>
                            )}
                        </div>
                    ))}
                </section>

                {/* CTA */}
                <div style={{ background: `linear-gradient(135deg, ${K ? "#0d2820" : "#eaf7f2"}, ${K ? "#162520" : "#d4f0e4"})`, border: `1px solid ${K ? "rgba(149,211,186,0.3)" : "#a8d9c8"}`, borderRadius: "16px", padding: "28px", textAlign: "center" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "12px" }}>📅</div>
                    <h3 style={{ color: accent, fontSize: "1.2rem", fontWeight: "700", marginTop: 0, marginBottom: "12px" }}>
                        {isarabic ? "أضف مواقيت الصلاة لتقويم عملك الآن" : "Add Prayer Times to Your Work Calendar Now"}
                    </h3>
                    <p style={{ color: subText, marginBottom: "20px", fontSize: "14px" }}>
                        {isarabic
                            ? "مزامنة تلقائية وسلسة مع Google Calendar وOutlook — مواقيت صلاتك تُحدَّث دائماً تلقائياً."
                            : "Seamless automatic sync with Google Calendar & Outlook — your prayer times always stay up to date."}
                    </p>
                    <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/" style={{ display: "inline-block", background: accent, color: K ? "#0b0f0d" : "#ffffff", padding: "12px 28px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "14px" }}>
                            {isarabic ? "ابدأ المزامنة ←" : "Start Syncing →"}
                        </Link>
                        <Link href="/guides/calendar-sync-tutorial" style={{ display: "inline-block", background: "transparent", border: `1px solid ${cardBorder}`, color: subText, padding: "12px 28px", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "14px" }}>
                            {isarabic ? "📖 دليل المزامنة" : "📖 Sync Tutorial"}
                        </Link>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
