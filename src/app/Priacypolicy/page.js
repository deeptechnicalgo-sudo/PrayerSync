"use client";
import React from "react";
import Link from "next/link";
import "../App.css";
import "../subpage.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PolicyPage() {
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
            <Header currentPath="/Priacypolicy" />

            <main className="subpage-content" style={{ maxWidth: "880px", margin: "0 auto", padding: "40px 20px", flex: 1, width: "100%", boxSizing: "border-box" }}>
                <div style={{ marginBottom: "32px", textAlign: isarabic ? "right" : "left" }}>
                    <h1 className="subpage-title" style={{ color: K ? "#95d3ba" : "#003829", fontSize: "2.4rem", fontWeight: "800", marginBottom: "8px" }}>
                        {isarabic ? "سياسة الخصوصية وملفات تعريف الارتباط (AdSense & GDPR)" : "Privacy & Cookie Policy"}
                    </h1>
                    <p className="subpage-subtitle" style={{ color: K ? "#6b8a7e" : "#8c9e99", fontSize: "1.05rem" }}>
                        {isarabic ? "تاريخ السريان وآخر تحديث: سبتمبر ٢٠٢٦" : "Effective & Last Updated: September 2026"}
                    </p>
                </div>

                <div className="subpage-body" style={{ color: K ? "#a0c4b8" : "#4a6660", lineHeight: "1.8", fontSize: "1.05rem", marginBottom: "28px" }}>
                    {isarabic
                        ? "نحن في PrayerSync نضع خصوصية مستخدمينا في قمة أولوياتنا. توضح هذه الوثيقة بشفافية تامة كيفية معالجة البيانات، ملفات تعريف الارتباط (Cookies)، الامتثال لسياسات برنامج Google AdSense، حماية حقوق الخصوصية للمستخدمين طبقاً للائحة الأوروبية العامة لحماية البيانات (GDPR) وقانون خصوصية المستهلك في كاليفورنيا (CCPA)."
                        : "At PrayerSync, safeguarding your digital privacy and transparency regarding data collection is our highest commitment. This Privacy Policy details our practices concerning information collection, local processing, cookie technologies, compliance with Google AdSense program policies, and adherence to international regulations including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA/CPRA)."}
                </div>

                {/* Section 1: Data Collection & Processing */}
                <div className="subpage-section" style={{ marginBottom: "32px" }}>
                    <h2 className="subpage-section-title" style={{ color: K ? "#ffe088" : "#004d38", fontSize: "1.35rem", fontWeight: "700", marginBottom: "12px" }}>
                        {isarabic ? "١. البيانات التي نجمعها ونعالجها (Data Collection & Processing)" : "1. Information We Collect and How We Use It"}
                    </h2>
                    <div className="subpage-card" style={{ backgroundColor: K ? "#0b0f0d" : "#ffffff", borderColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1", padding: "24px", borderRadius: "14px", border: "1px solid" }}>
                        <ul className="subpage-list" style={{ lineHeight: "1.8", paddingInlineStart: "20px", margin: 0 }}>
                            <li style={{ color: K ? "#a0c4b8" : "#4a6660", marginBottom: "14px" }}>
                                <strong style={{ color: K ? "#95d3ba" : "#003829" }}>
                                    {isarabic ? "بيانات الموقع الجغرافي (Geolocation): " : "Geographic Location Coordinates: "}
                                </strong>
                                {isarabic
                                    ? "يطلب التطبيق إذن المتصفح للحصول على إحداثيات خط العرض وخط الطول فقط لحساب مواقيت الصلاة الفلكية الدقيقة لمدينتك في الوقت الفعلي. تتم هذه العملية في متصفحك، ولا نقوم بتخزين أو تتبع أو بيع سجل تحركاتك الجغرافية على أي خوادم خارجية إطلاقاً."
                                    : "With your explicit browser permission, latitude and longitude are utilized exclusively to calculate local solar positions and astronomical prayer times. Coordinates are processed client-side or sent ephemerally to generate prayer calendars; we do not store, track, or monetize location history."}
                            </li>
                            <li style={{ color: K ? "#a0c4b8" : "#4a6660", marginBottom: "14px" }}>
                                <strong style={{ color: K ? "#95d3ba" : "#003829" }}>
                                    {isarabic ? "التفضيلات المحفوظة محلياً (Local Storage): " : "Local Storage Preferences: "}
                                </strong>
                                {isarabic
                                    ? "يتم حفظ تفضيلاتك (مثل طريقة الحساب الفلكية، مذهب صلاة العصر، التعديلات بالدقائق، الوضع الداكن/الفاتح، واللغة) داخل وحدة التخزين المحلية لمتصفحك (localStorage) لتحسين تجربة استخدامك دون الحاجة لتسجيل حساب أو نقل بياناتك لخوادم طرف ثالث."
                                    : "User configurations—such as astronomical calculation method, Asr jurisprudence (Shafi'i vs Hanafi), minute adjustments, dark mode toggles, and language choice—are stored locally in your browser's localStorage. No profiling occurs on remote databases."}
                            </li>
                            <li style={{ color: K ? "#a0c4b8" : "#4a6660" }}>
                                <strong style={{ color: K ? "#95d3ba" : "#003829" }}>
                                    {isarabic ? "مزامنة التقويم وحسابات Google و Microsoft: " : "Calendar Synchronization & OAuth 2.0: "}
                                </strong>
                                {isarabic
                                    ? "عند استخدام ميزة المزامنة المباشرة بضغطة زر مع تقويم Google أو Outlook، نطلب فقط الحد الأدنى من الصلاحيات (أذونات إنشاء وتعديل أحداث مواقيت الصلاة في التقويم المحدد). لا نطلع على رسائل بريدك الإلكتروني، ولا نقرأ مواعيدك الشخصية السابقة أو الخاصة، وتُدار رموز التفويض عبر بروتوكولات الأمان القياسية OAuth 2.0."
                                    : "When you authenticate via Google or Microsoft for direct calendar export, our integration requests minimal scopes strictly restricted to creating and cleaning prayer schedule events. We do not access, read, or retain your emails, personal contacts, or private calendar agendas."}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Section 2: Google AdSense and DoubleClick Cookie Disclosures */}
                <div className="subpage-section" style={{ marginBottom: "32px" }}>
                    <h2 className="subpage-section-title" style={{ color: K ? "#ffe088" : "#004d38", fontSize: "1.35rem", fontWeight: "700", marginBottom: "12px" }}>
                        {isarabic ? "٢. إفصاحات Google AdSense وملفات تعريف الارتباط DoubleClick DART" : "2. Google AdSense & DoubleClick DART Cookies Disclosure"}
                    </h2>
                    <div className="subpage-card" style={{ backgroundColor: K ? "#0b0f0d" : "#ffffff", borderColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1", padding: "24px", borderRadius: "14px", border: "1px solid" }}>
                        <p style={{ color: K ? "#a0c4b8" : "#4a6660", lineHeight: "1.7", marginBottom: "16px" }}>
                            {isarabic
                                ? "يشارك موقع PrayerSync في برنامج Google AdSense الإعلاني. بموجب سياسات الإعلانات الرسمية لشركة Google، نلتزم بتوضيح ما يلي لجميع الزوار:"
                                : "PrayerSync participates in the Google AdSense program to support our platform infrastructure. Pursuant to Google's mandatory publisher policies, we provide the following disclosures:"}
                        </p>
                        <ul className="subpage-list" style={{ lineHeight: "1.8", paddingInlineStart: "20px", margin: "0 0 16px 0" }}>
                            <li style={{ color: K ? "#a0c4b8" : "#4a6660", marginBottom: "12px" }}>
                                <strong style={{ color: K ? "#95d3ba" : "#003829" }}>
                                    {isarabic ? "استخدام موردي الجهات الخارجية: " : "Third-Party Vendor Participation: "}
                                </strong>
                                {isarabic
                                    ? "يستخدم الموردون التابعون لجهات خارجية، بما في ذلك Google، ملفات تعريف الارتباط لعرض الإعلانات استناداً إلى زيارات المستخدم السابقة لهذا الموقع أو لمواقع أخرى على شبكة الإنترنت."
                                    : "Third-party vendors, including Google, employ cookies to deliver advertisements based on a user's prior visits to this website or other sites on the World Wide Web."}
                            </li>
                            <li style={{ color: K ? "#a0c4b8" : "#4a6660", marginBottom: "12px" }}>
                                <strong style={{ color: K ? "#95d3ba" : "#003829" }}>
                                    {isarabic ? "ملفات تعريف ارتباط DoubleClick: " : "DoubleClick DART Cookies: "}
                                </strong>
                                {isarabic
                                    ? "يساعد استخدام Google لملف تعريف الارتباط DoubleClick شركاءها على عرض إعلانات للمستخدمين استناداً إلى زيارتهم لهذا الموقع أو مواقع أخرى عبر الإنترنت."
                                    : "Google's use of advertising cookies enables it and its certified advertising partners to serve targeted ads to users based on their browsing visits to PrayerSync and other digital domains."}
                            </li>
                            <li style={{ color: K ? "#a0c4b8" : "#4a6660" }}>
                                <strong style={{ color: K ? "#95d3ba" : "#003829" }}>
                                    {isarabic ? "حق وخيارات إلغاء الاشتراك (Opting Out): " : "Opt-Out Mechanisms & Advertising Controls: "}
                                </strong>
                                {isarabic
                                    ? "يمكن للمستخدمين في أي وقت إلغاء الاشتراك في استخدام ملف تعريف الارتباط للإعلانات المخصصة (Personalized Ads) عبر الروابط المعتمدة التالية:"
                                    : "Users may opt out of personalized advertising at any time by configuring their preferences through the following recognized industry resources:"}
                            </li>
                        </ul>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginTop: "16px" }}>
                            <a
                                href="https://www.google.com/settings/ads"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    padding: "12px",
                                    borderRadius: "8px",
                                    backgroundColor: K ? "#111915" : "#f0f7f4",
                                    border: K ? "1px solid rgba(149, 211, 186, 0.3)" : "1px solid #c8ddd8",
                                    color: K ? "#95d3ba" : "#003829",
                                    textDecoration: "none",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >
                                <span>Google Ads Settings</span>
                                <span>↗</span>
                            </a>
                            <a
                                href="https://www.aboutads.info/choices/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    padding: "12px",
                                    borderRadius: "8px",
                                    backgroundColor: K ? "#111915" : "#f0f7f4",
                                    border: K ? "1px solid rgba(149, 211, 186, 0.3)" : "1px solid #c8ddd8",
                                    color: K ? "#95d3ba" : "#003829",
                                    textDecoration: "none",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >
                                <span>AboutAds Choice Portal</span>
                                <span>↗</span>
                            </a>
                            <a
                                href="https://www.youronlinechoices.eu/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    padding: "12px",
                                    borderRadius: "8px",
                                    backgroundColor: K ? "#111915" : "#f0f7f4",
                                    border: K ? "1px solid rgba(149, 211, 186, 0.3)" : "1px solid #c8ddd8",
                                    color: K ? "#95d3ba" : "#003829",
                                    textDecoration: "none",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >
                                <span>Your Online Choices (EU)</span>
                                <span>↗</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Section 3: Web Analytics */}
                <div className="subpage-section" style={{ marginBottom: "32px" }}>
                    <h2 className="subpage-section-title" style={{ color: K ? "#ffe088" : "#004d38", fontSize: "1.35rem", fontWeight: "700", marginBottom: "12px" }}>
                        {isarabic ? "٣. تحليلات الأداء و Google Analytics 4" : "3. Web Analytics & Usage Statistics"}
                    </h2>
                    <div className="subpage-card" style={{ backgroundColor: K ? "#0b0f0d" : "#ffffff", borderColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1", padding: "24px", borderRadius: "14px", border: "1px solid" }}>
                        <p style={{ color: K ? "#a0c4b8" : "#4a6660", lineHeight: "1.7", margin: 0 }}>
                            {isarabic
                                ? "يستخدم الموقع خدمة Google Analytics (معرف التتبع القياسي G-JVM4SDFJZK) لجمع مقاييس مجمعة مجهولة الهوية مثل عدد الزيارات، أكثر المتصفحات استخداماً، وأوقات الاستجابة لمراقبة الأداء التقني للخوادم. لا نقوم بربط أي بيانات شخصية مباشرة ببيانات التحليلات. يمكنك تعطيل التتبع بواسطة إضافة متصفح Google Analytics الرسمية."
                                : "We implement Google Analytics (measurement ID G-JVM4SDFJZK) to capture anonymized aggregate behavioral data, page visit volumes, and server response speeds to improve platform stability. No personally identifiable data is coupled with analytics streams. Users may install the official Google Analytics Opt-out Browser Add-on."}
                        </p>
                    </div>
                </div>

                {/* Section 4: GDPR & CCPA Compliance */}
                <div className="subpage-section" style={{ marginBottom: "32px" }}>
                    <h2 className="subpage-section-title" style={{ color: K ? "#ffe088" : "#004d38", fontSize: "1.35rem", fontWeight: "700", marginBottom: "12px" }}>
                        {isarabic ? "٤. الامتثال للوائح حماية البيانات (GDPR & CCPA/CPRA)" : "4. Data Subject Rights (GDPR & CCPA/CPRA)"}
                    </h2>
                    <div className="subpage-card" style={{ backgroundColor: K ? "#0b0f0d" : "#ffffff", borderColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1", padding: "24px", borderRadius: "14px", border: "1px solid" }}>
                        <p style={{ color: K ? "#a0c4b8" : "#4a6660", lineHeight: "1.7", marginBottom: "12px" }}>
                            {isarabic
                                ? "وفقاً للائحة العامة لحماية البيانات في الاتحاد الأوروبي (GDPR) وقانون خصوصية المستهلك في كاليفورنيا (CCPA)، يتمتع كل مستخدم بالحقوق الآتية:"
                                : "In alignment with the General Data Protection Regulation and the California Consumer Privacy Act, users hold comprehensive legal rights:"}
                        </p>
                        <ul className="subpage-list" style={{ lineHeight: "1.8", paddingInlineStart: "20px", margin: 0 }}>
                            <li style={{ color: K ? "#a0c4b8" : "#4a6660" }}>
                                <strong style={{ color: K ? "#95d3ba" : "#003829" }}>{isarabic ? "حق الوصول والمعرفة: " : "Right to Access & Portability: "}</strong>
                                {isarabic ? "معرفة أية بيانات مؤقتة تم جمعها." : "Request full verification of any personal records or logs."}
                            </li>
                            <li style={{ color: K ? "#a0c4b8" : "#4a6660" }}>
                                <strong style={{ color: K ? "#95d3ba" : "#003829" }}>{isarabic ? "حق المحو والحذف الكامل: " : "Right to Erasure (Right to be Forgotten): "}</strong>
                                {isarabic ? "مسح كافة البيانات المحلية من متصفحك أو طلب إلغاء الأحداث المزامنة عبر أداة تنظيف التقويم المدمجة في الإعدادات." : "Clear all cached parameters or execute our one-click Calendar Cleanup tool in Settings."}
                            </li>
                            <li style={{ color: K ? "#a0c4b8" : "#4a6660" }}>
                                <strong style={{ color: K ? "#95d3ba" : "#003829" }}>{isarabic ? "عدم بيع البيانات الشخصية: " : "Do Not Sell or Share My Information: "}</strong>
                                {isarabic ? "نحن نؤكد التزامنا التام بعدم بيع أو تأجير أي بيانات تخص مستخدمينا لأي طرف ثالث." : "PrayerSync never sells, rents, or leases personal data to commercial brokers or third parties."}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Section 5: Contact & Inquiries */}
                <div className="subpage-section">
                    <h2 className="subpage-section-title" style={{ color: K ? "#ffe088" : "#004d38", fontSize: "1.35rem", fontWeight: "700", marginBottom: "12px" }}>
                        {isarabic ? "٥. الاستفسارات ومسؤول حماية البيانات" : "5. Privacy Inquiries & Contact Details"}
                    </h2>
                    <div className="subpage-card" style={{ backgroundColor: K ? "#0b0f0d" : "#ffffff", borderColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1", padding: "24px", borderRadius: "14px", border: "1px solid" }}>
                        <p style={{ color: K ? "#a0c4b8" : "#4a6660", lineHeight: "1.7", marginBottom: "16px" }}>
                            {isarabic
                                ? "لأي استفسارات قانونية أو طلبات خاصة بسياسة الخصوصية وملفات تعريف الارتباط، يمكنكم مراسلتنا عبر البريد الإلكتروني الرسمي:"
                                : "For questions, clarifications, or requests concerning this Privacy Policy, please contact our data governance team:"}
                        </p>
                        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                            <a
                                href="mailto:PrayerSync-Reply@outlook.com"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "10px 18px",
                                    borderRadius: "8px",
                                    backgroundColor: K ? "#1a2520" : "#f0f7f4",
                                    color: K ? "#95d3ba" : "#003829",
                                    border: K ? "1px solid rgba(63,73,69,0.5)" : "1px solid #c8ddd8",
                                    textDecoration: "none",
                                    fontWeight: "600",
                                    fontSize: "13px"
                                }}
                            >
                                ✉ PrayerSync-Reply@outlook.com
                            </a>
                            <Link
                                href="/Contact"
                                style={{
                                    padding: "10px 18px",
                                    borderRadius: "8px",
                                    backgroundColor: K ? "#95d3ba" : "#003829",
                                    color: K ? "#0b0f0d" : "#ffffff",
                                    textDecoration: "none",
                                    fontWeight: "600",
                                    fontSize: "13px"
                                }}
                            >
                                {isarabic ? "صفحة اتصل بنا الرسمية ←" : "Official Contact Page →"}
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}