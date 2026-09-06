"use client";
import React from "react";
import Link from "next/link";
import "../App.css";
import "../subpage.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TermsPage() {
    const { K } = useData();
    const { isarabic } = useData2();

    const termsList = [
        {
            en_title: "1. Acceptance of Terms",
            ar_title: "١. الموافقة والالتزام بالشروط",
            en_body: "By accessing or using PrayerSync, you agree to be bound by these Terms of Service. If you do not agree to all terms and conditions, you must discontinue using our services immediately.",
            ar_body: "باستخدامك لمنصة وتطبيق PrayerSync، فإنك تُقر وتوافق على الالتزام الكامل بشروط الخدمة هذه. إذا كنت لا توافق على أي بند منها، فيرجى التوقف عن استخدام خدماتنا فوراً.",
        },
        {
            en_title: "2. Intellectual Property & Code Integrity",
            ar_title: "٢. الملكية الفكرية وحماية الكود المصدري",
            en_body: "All intellectual property rights, trademarks, algorithms, UI designs, graphics, branding, and proprietary logic powering PrayerSync belong exclusively to Musa Mohammed and authorized maintainers. You may not copy, reverse-engineer, redistribute, or commercially exploit any part without prior written authorization.",
            ar_body: "كافة حقوق الملكية الفكرية، والعلامات التجارية، والخوارزميات الفلكية، وتصاميم واجهة المستخدم والكود المصدري لمنصة PrayerSync هي ملكية حصرية للمطور موسى محمد والقائمين على المشروع. يحظر نسخ أو تفكيك أو إعادة توزيع أو استغلال أي جزء من النظام تجارياً دون إذن كتابي مسبق.",
        },
        {
            en_title: "3. Calendar Services & Data Reliability",
            ar_title: "٣. خدمات مزامنة التقويم ودقة الحسابات",
            en_body: "PrayerSync calculates prayer times using established astronomical algorithms and published regional conventions (e.g. Umm al-Qura, Muslim World League). While we take extreme measures to ensure astronomical precision, users are encouraged to verify mosque-specific Iqama times in their local communities.",
            ar_body: "تعتمد منصة PrayerSync في حساب مواقيت الصلاة على أدق المعادلات الفلكية المعتمدة عالمياً (مثل تقويم أم القرى ورابطة العالم الإسلامي). ورغم حرصنا التام على الدقة الفلكية المتناهية، يُنصح دائماً بمراعاة أوقات الإقامة الفعلية المعتمدة في مسجد حيك أو مدينتك.",
        },
        {
            en_title: "4. Permitted Use & Fair Consumption",
            ar_title: "٤. الاستخدام المشروع والتغذية التقنية (Webcal)",
            en_body: "You are granted a revocable, non-exclusive license to use our web interface and subscribe to Webcal feeds for personal, non-commercial productivity. Abusive automated hammering of our calendar generation endpoints is strictly prohibited.",
            ar_body: "يُمنح المستخدم ترخيصاً شخصياً غير حصري لاستخدام المنصة والاشتراك في روابط التغذية التقنية (Webcal) لتنظيم العبادات والإنتاجية الشخصية. يحظر تماماً محاولة إغراق الخوادم بالطلبات البرمجية الضارة أو التحميل العشوائي المفرط.",
        },
        {
            en_title: "5. Modifications & Updates",
            ar_title: "٥. تحديث وتعديل شروط الخدمة",
            en_body: "We reserve the right to revise these Terms of Service at any time to reflect legal changes or technical updates. Continued use of PrayerSync after changes are posted constitutes full acceptance of revised terms.",
            ar_body: "نحتفظ بالحق في تعديل شروط الخدمة هذه عند الضرورة لملائمة التحديثات القانونية أو التقنية. استمرارك في استخدام المنصة بعد نشر الشروط المحدثة يُعد قبولاً ضمنياً ومباشراً لها.",
        },
    ];

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
            <Header currentPath="/terms" />

            <main className="subpage-content" style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 20px", flex: 1, width: "100%", boxSizing: "border-box" }}>
                <div style={{ marginBottom: "32px", textAlign: isarabic ? "right" : "left" }}>
                    <h1 className="subpage-title" style={{ color: K ? "#95d3ba" : "#003829", fontSize: "2.4rem", fontWeight: "800", marginBottom: "8px" }}>
                        {isarabic ? "شروط وأحكام الخدمة" : "Terms of Service"}
                    </h1>
                    <p className="subpage-subtitle" style={{ color: K ? "#6b8a7e" : "#8c9e99", fontSize: "1.1rem", lineHeight: "1.6" }}>
                        {isarabic
                            ? "تحكم هذه الشروط استخدامك لتطبيق ومنصة PrayerSync وميزات التزامن الفلكي والتقويم."
                            : "These Terms of Service govern your access to PrayerSync, astronomical calculations, and calendar sync services."}
                    </p>
                </div>

                <div style={{ display: "grid", gap: "20px", marginBottom: "40px" }}>
                    {termsList.map((item, i) => (
                        <div
                            className="subpage-card"
                            key={i}
                            style={{
                                backgroundColor: K ? "#0b0f0d" : "#ffffff",
                                borderColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1",
                                padding: "24px",
                                borderRadius: "14px",
                                border: "1px solid",
                                boxShadow: K ? "none" : "0 4px 12px rgba(0,0,0,0.03)"
                            }}
                        >
                            <h2 style={{ color: K ? "#ffe088" : "#004d38", fontSize: "1.2rem", fontWeight: "700", marginTop: 0, marginBottom: "10px" }}>
                                {isarabic ? item.ar_title : item.en_title}
                            </h2>
                            <p style={{ margin: 0, color: K ? "#a0c4b8" : "#4a6660", lineHeight: "1.7", fontSize: "14px" }}>
                                {isarabic ? item.ar_body : item.en_body}
                            </p>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        padding: "20px",
                        borderRadius: "12px",
                        backgroundColor: K ? "#111915" : "#eef5f7",
                        border: K ? "1px solid rgba(149, 211, 186, 0.2)" : "1px solid #c8ddd8",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "12px"
                    }}
                >
                    <div style={{ fontSize: "13px", color: K ? "#89938e" : "#5c726c" }}>
                        {isarabic
                            ? "للاطلاع على كيفية معالجة ملفات تعريف الارتباط والإعلانات، تفضل بزيارة سياسة الخصوصية."
                            : "For full disclosures regarding cookies, advertising, and data safety, review our Privacy Policy."}
                    </div>
                    <Link
                        href="/Priacypolicy"
                        style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            backgroundColor: K ? "#95d3ba" : "#003829",
                            color: K ? "#0b0f0d" : "#ffffff",
                            textDecoration: "none",
                            fontWeight: "700",
                            fontSize: "13px"
                        }}
                    >
                        {isarabic ? "سياسة الخصوصية ←" : "Privacy Policy →"}
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}