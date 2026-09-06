"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../../App.css";
import "../../subpage.css";
import { useData } from "../../Context/DarklightContext";
import { useData2 } from "../../Context/Arabic";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function CalendarSyncTutorialPage() {
    const { K } = useData();
    const { isarabic } = useData2();
    const [activeStep, setActiveStep] = useState(null);

    const bg = K ? "#0f1412" : "#f5faf9";
    const text = K ? "#c8e8dc" : "#2c463f";
    const cardBg = K ? "#111915" : "#ffffff";
    const cardBorder = K ? "rgba(63,73,69,0.35)" : "#e2ede9";
    const accent = K ? "#95d3ba" : "#003829";
    const subText = K ? "#7a9e90" : "#5a7a72";
    const stepBg = K ? "#0d1613" : "#f0f7f4";
    const highlightBg = K ? "#162520" : "#e8f5f0";

    const platforms = [
        {
            id: "google",
            icon: "📅",
            name_en: "Google Calendar",
            name_ar: "تقويم جوجل",
            color: "#4285F4",
            steps_en: [
                "Open the PrayerSync homepage and configure your city and calculation method.",
                "Click the 'Sync to Google Calendar' button in the sync panel.",
                "You'll be redirected to Google's OAuth consent screen — click 'Allow'.",
                "PrayerSync will automatically create a dedicated 'Prayer Times' calendar in your Google account.",
                "All five daily prayers will appear as recurring events with notification alerts.",
                "Future prayer time updates are synced automatically — no action needed.",
            ],
            steps_ar: [
                "افتح الصفحة الرئيسية لـ PrayerSync وحدد مدينتك وطريقة الحساب المفضلة.",
                "اضغط على زر 'مزامنة مع تقويم جوجل' في لوحة التزامن.",
                "ستُحوَّل إلى شاشة موافقة Google OAuth — اضغط 'السماح'.",
                "سيقوم PrayerSync بإنشاء تقويم مخصص 'Prayer Times' في حسابك تلقائياً.",
                "ستظهر الصلوات الخمس كأحداث متكررة مع تنبيهات تذكيرية.",
                "تحديثات مواقيت الصلاة المستقبلية تُزامَن تلقائياً دون أي إجراء إضافي.",
            ],
        },
        {
            id: "apple",
            icon: "🍎",
            name_en: "Apple Calendar (iCal/iPhone)",
            name_ar: "تقويم Apple (iPhone / Mac)",
            color: "#FF6B6B",
            steps_en: [
                "On PrayerSync, select your city and method, then click 'Subscribe via WebCal'.",
                "iOS/macOS will ask 'Open in Calendar?' — tap 'Subscribe'.",
                "In the subscription dialog, choose how often to auto-refresh (recommended: Every Day).",
                "Tap 'Add' — your prayer times now appear in Apple Calendar as a live subscription.",
                "The calendar updates automatically when prayer times shift seasonally.",
                "You can assign a color, turn on/off alerts in Calendar Settings → Calendars.",
            ],
            steps_ar: [
                "في PrayerSync، حدد مدينتك وطريقة الحساب، ثم اضغط 'اشترك عبر WebCal'.",
                "سيسألك iOS/macOS 'فتح في التقويم؟' — اضغط 'اشتراك'.",
                "في نافذة الاشتراك، اختر تكرار التحديث التلقائي (يوصى بـ: كل يوم).",
                "اضغط 'إضافة' — ستظهر مواقيت الصلاة في تقويم Apple كاشتراك مباشر.",
                "يُحدَّث التقويم تلقائياً عند تغير مواقيت الصلاة بتغير الفصول.",
                "يمكنك تخصيص اللون وإعداد التنبيهات من إعدادات التقويم ← التقاويم.",
            ],
        },
        {
            id: "outlook",
            icon: "📧",
            name_en: "Microsoft Outlook / Office 365",
            name_ar: "Microsoft Outlook / Office 365",
            color: "#0078D4",
            steps_en: [
                "Copy the WebCal/ICS feed URL from the PrayerSync sync panel.",
                "In Outlook web (outlook.com), go to Calendar → Add calendar → Subscribe from web.",
                "Paste the ICS URL and name the calendar 'Prayer Times'.",
                "Set the 'Update calendar' frequency to 'Daily' and click 'Import'.",
                "In Outlook desktop app: File → Account Settings → Internet Calendars → New.",
                "Paste the URL and configure update frequency — your prayers are now in Outlook.",
            ],
            steps_ar: [
                "انسخ رابط WebCal/ICS من لوحة التزامن في PrayerSync.",
                "في Outlook على الويب، اذهب لـ التقويم ← إضافة تقويم ← الاشتراك من الويب.",
                "الصق رابط ICS وسمّ التقويم 'Prayer Times'.",
                "اضبط تكرار التحديث على 'يومياً' ثم اضغط 'استيراد'.",
                "في تطبيق Outlook المكتبي: ملف ← إعدادات الحساب ← تقاويم الإنترنت ← جديد.",
                "الصق الرابط واضبط تكرار التحديث — ستظهر مواقيت صلاتك الآن في Outlook.",
            ],
        },
    ];

    const troubleshooting = [
        {
            q_en: "Events appear at wrong times in my calendar.",
            q_ar: "الأحداث تظهر في أوقات خاطئة في تقويمي.",
            a_en: "Ensure your device timezone is set correctly. Also, verify you selected the right city in PrayerSync. For Google Calendar, check that the 'Prayer Times' calendar uses your local timezone, not UTC.",
            a_ar: "تأكد من ضبط المنطقة الزمنية على جهازك بشكل صحيح. تحقق أيضاً من اختيار المدينة الصحيحة في PrayerSync. لتقويم Google، تأكد أن تقويم 'Prayer Times' يستخدم منطقتك الزمنية المحلية وليس UTC.",
        },
        {
            q_en: "Apple Calendar doesn't show updated times after DST change.",
            q_ar: "تقويم Apple لا يُحدِّث المواقيت بعد تغيير التوقيت الصيفي.",
            a_en: "Force-refresh by going to Calendar App → Calendars → tap the prayer calendar → Remove Calendar, then re-subscribe using the same WebCal URL.",
            a_ar: "أجبر على التحديث عبر: تطبيق التقويم ← التقاويم ← اضغط على تقويم الصلاة ← حذف التقويم، ثم أعد الاشتراك باستخدام نفس رابط WebCal.",
        },
        {
            q_en: "Outlook says 'Calendar URL is not valid'.",
            q_ar: "Outlook يقول 'رابط التقويم غير صالح'.",
            a_en: "Replace 'webcal://' with 'https://' in the URL. Outlook's web version requires HTTPS URLs. The ICS content remains identical.",
            a_ar: "استبدل 'webcal://' بـ 'https://' في الرابط. النسخة الويب من Outlook تتطلب روابط HTTPS. محتوى ICS يبقى نفسه.",
        },
        {
            q_en: "Prayer notifications don't trigger on iPhone.",
            q_ar: "تنبيهات الصلاة لا تُفعَّل على iPhone.",
            a_en: "Go to Settings → Notifications → Calendar → Allow Notifications. Also in Calendar → Calendars → tap 'Prayer Times' → enable Alerts.",
            a_ar: "اذهب إلى الإعدادات ← الإشعارات ← التقويم ← السماح بالإشعارات. أيضاً في التقويم ← التقاويم ← اضغط 'Prayer Times' ← فعّل التنبيهات.",
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
                        {isarabic ? "دليل مزامنة التقويم" : "Calendar Sync Tutorial"}
                    </span>
                </nav>

                {/* Header */}
                <div style={{ marginBottom: "40px" }}>
                    <div style={{ display: "inline-block", background: "linear-gradient(135deg, #667eea44, #764ba244)", border: "1px solid #667eea55", borderRadius: "8px", padding: "4px 12px", fontSize: "12px", fontWeight: "700", color: "#a78bfa", marginBottom: "16px", letterSpacing: "0.5px" }}>
                        {isarabic ? "📅 دليل عملي" : "📅 STEP-BY-STEP TUTORIAL"}
                    </div>
                    <h1 style={{ fontSize: "2.4rem", fontWeight: "800", color: K ? "#ffffff" : "#001a13", lineHeight: 1.2, marginBottom: "16px" }}>
                        {isarabic
                            ? "دليل مزامنة تقويم الصلاة الشامل"
                            : "Complete Calendar Sync Tutorial"}
                    </h1>
                    <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: subText }}>
                        {isarabic
                            ? "دليلك المرجعي لمزامنة مواقيت الصلاة تلقائياً مع Google Calendar وApple Calendar وMicrosoft Outlook — على جميع أجهزتك خطوة بخطوة."
                            : "Your complete reference guide for automatically syncing Islamic prayer times with Google Calendar, Apple Calendar, and Microsoft Outlook across all your devices."}
                    </p>
                    <div style={{ display: "flex", gap: "16px", marginTop: "20px", flexWrap: "wrap" }}>
                        {[
                            { icon: "⏱️", text: isarabic ? "8 دقائق قراءة" : "8 min read" },
                            { icon: "📱", text: isarabic ? "Android & iOS" : "Works on Android & iOS" },
                            { icon: "💻", text: isarabic ? "Windows & Mac" : "Windows & Mac" },
                        ].map((tag, i) => (
                            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", color: subText, background: highlightBg, padding: "4px 12px", borderRadius: "20px", border: `1px solid ${cardBorder}` }}>
                                {tag.icon} {tag.text}
                            </span>
                        ))}
                    </div>
                </div>

                {/* What is WebCal */}
                <section style={{ background: highlightBg, border: `1px solid ${K ? "rgba(149,211,186,0.25)" : "#b8dfd3"}`, borderRadius: "14px", padding: "24px", marginBottom: "32px" }}>
                    <h2 style={{ color: accent, fontSize: "1.2rem", fontWeight: "700", marginTop: 0, marginBottom: "12px" }}>
                        {isarabic ? "🔗 ما هو WebCal وICS؟" : "🔗 What is WebCal / ICS?"}
                    </h2>
                    <p style={{ lineHeight: "1.7", color: text, margin: 0 }}>
                        {isarabic
                            ? "WebCal هو بروتوكول اشتراك تقويم مفتوح المعايير (RFC 5545) يتيح لأي تطبيق تقويم على أي نظام تشغيل الاشتراك في تغذية أحداث حية. ICS هو صيغة الملف المستخدمة. كل مرة تفتح فيها تطبيق التقويم، يتحقق من الرابط ويُحدِّث الأحداث تلقائياً."
                            : "WebCal is an open-standard calendar subscription protocol (RFC 5545) that lets any calendar app on any OS subscribe to a live event feed. ICS is the file format used. Every time you open your calendar app, it checks the URL and auto-updates events. PrayerSync generates a dynamic ICS feed tailored to your exact city, calculation method, and timezone."}
                    </p>
                </section>

                {/* Platform Tabs */}
                <div style={{ marginBottom: "40px" }}>
                    <h2 style={{ fontSize: "1.6rem", fontWeight: "700", color: K ? "#ffffff" : "#001a13", marginBottom: "8px" }}>
                        {isarabic ? "اختر تطبيق تقويمك" : "Choose Your Calendar App"}
                    </h2>
                    <p style={{ color: subText, marginBottom: "24px", fontSize: "14px" }}>
                        {isarabic ? "تعليمات مفصلة لكل منصة:" : "Detailed step-by-step instructions for each platform:"}
                    </p>

                    {platforms.map((platform) => (
                        <div key={platform.id} style={{ marginBottom: "24px" }}>
                            <button
                                type="button"
                                onClick={() => setActiveStep(activeStep === platform.id ? null : platform.id)}
                                style={{
                                    width: "100%", textAlign: "left", background: cardBg, border: `2px solid ${activeStep === platform.id ? platform.color : cardBorder}`, borderRadius: "12px", padding: "20px 24px", cursor: "pointer", color: text, display: "flex", alignItems: "center", gap: "16px", transition: "all 0.2s ease"
                                }}
                            >
                                <span style={{ fontSize: "2rem" }}>{platform.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: "700", fontSize: "1.1rem", color: activeStep === platform.id ? platform.color : (K ? "#ffffff" : "#001a13") }}>
                                        {isarabic ? platform.name_ar : platform.name_en}
                                    </div>
                                    <div style={{ fontSize: "13px", color: subText, marginTop: "2px" }}>
                                        {isarabic ? "اضغط لعرض الخطوات" : "Click to view step-by-step guide"}
                                    </div>
                                </div>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={subText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: activeStep === platform.id ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>

                            {activeStep === platform.id && (
                                <div style={{ background: stepBg, border: `1px solid ${cardBorder}`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: "24px" }}>
                                    <ol style={{ margin: 0, padding: isarabic ? "0 20px 0 0" : "0 0 0 20px", listStyle: "none", counterReset: "step-counter" }}>
                                        {(isarabic ? platform.steps_ar : platform.steps_en).map((step, i) => (
                                            <li key={i} style={{ display: "flex", gap: "14px", marginBottom: "16px", alignItems: "flex-start" }}>
                                                <span style={{ minWidth: "28px", height: "28px", background: platform.color + "22", border: `1px solid ${platform.color}55`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: platform.color, flexShrink: 0, marginTop: "1px" }}>
                                                    {i + 1}
                                                </span>
                                                <span style={{ lineHeight: "1.6", color: text, fontSize: "14.5px" }}>{step}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Troubleshooting */}
                <section style={{ marginBottom: "40px" }}>
                    <h2 style={{ fontSize: "1.6rem", fontWeight: "700", color: K ? "#ffffff" : "#001a13", marginBottom: "8px" }}>
                        {isarabic ? "🔧 استكشاف الأخطاء وإصلاحها" : "🔧 Troubleshooting Common Issues"}
                    </h2>
                    <p style={{ color: subText, marginBottom: "24px", fontSize: "14px" }}>
                        {isarabic ? "حلول للمشاكل الأكثر شيوعاً:" : "Solutions to the most frequently reported issues:"}
                    </p>
                    <div style={{ display: "grid", gap: "16px" }}>
                        {troubleshooting.map((item, i) => (
                            <div key={i} style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "12px", padding: "20px" }}>
                                <div style={{ fontWeight: "600", color: K ? "#ffe088" : "#5c3c00", marginBottom: "8px", fontSize: "14.5px" }}>
                                    ❓ {isarabic ? item.q_ar : item.q_en}
                                </div>
                                <div style={{ color: text, lineHeight: "1.6", fontSize: "14px" }}>
                                    ✅ {isarabic ? item.a_ar : item.a_en}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <div style={{ background: `linear-gradient(135deg, ${K ? "#0d2820" : "#eaf7f2"}, ${K ? "#162520" : "#d4f0e4"})`, border: `1px solid ${K ? "rgba(149,211,186,0.3)" : "#a8d9c8"}`, borderRadius: "16px", padding: "32px", textAlign: "center" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "12px" }}>⚡</div>
                    <h3 style={{ color: accent, fontSize: "1.3rem", fontWeight: "700", marginTop: 0, marginBottom: "12px" }}>
                        {isarabic ? "ابدأ المزامنة الآن" : "Start Syncing Now"}
                    </h3>
                    <p style={{ color: subText, marginBottom: "20px", fontSize: "14px" }}>
                        {isarabic
                            ? "يستغرق إعداد مزامنة تقويم الصلاة أقل من دقيقة واحدة."
                            : "Setting up your prayer calendar sync takes less than one minute."}
                    </p>
                    <Link href="/" style={{ display: "inline-block", background: accent, color: K ? "#0b0f0d" : "#ffffff", padding: "12px 28px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "14px" }}>
                        {isarabic ? "الذهاب إلى PrayerSync ←" : "Go to PrayerSync →"}
                    </Link>
                </div>

            </main>
            <Footer />
        </div>
    );
}
