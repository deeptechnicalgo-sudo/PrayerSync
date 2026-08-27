"use client";
import "../subpage.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";

export default function TermsPage() {
    const { K } = useData();
    const { isarabic } = useData2();

    return (
        <div className="subpage-wrapper" style={{ backgroundColor: K ? "#0f1412" : "#ffffff", color: K ? "#c8e8dc" : "#2c463f" }}>
            {/* Top bar */}
            <div className="subpage-topbar" style={{ backgroundColor: K ? "#0f1412" : "#ffffff", borderBottomColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1" }}>
                <button
                    type="button"
                    onClick={() => window.close()}
                    className="subpage-back-btn"
                    style={{
                        backgroundColor: K ? "#1a2520" : "#f4f7f6",
                        color: K ? "#95d3ba" : "#003829",
                        borderColor: K ? "rgba(63,73,69,0.4)" : "#e1e8e6",
                    }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    {isarabic ? "رجوع" : "Back"}
                </button>
            </div>

            {/* Content */}
            <div className="subpage-content">
                <h1 className="subpage-title" style={{ color: K ? "#95d3ba" : "#003829" }}>
                    {isarabic ? "شروط الخدمة" : "Terms of Service"}
                </h1>
                <p className="subpage-subtitle" style={{ color: K ? "#6b8a7e" : "#8c9e99" }}>
                    {isarabic
                        ? "باستخدام هذا التطبيق، فإنك توافق على هذه الشروط."
                        : "By accessing or using this application, you agree to these Terms of Service."}
                </p>

                {[
                    {
                        en_title: "1. Changes to These Terms",
                        ar_title: "١. التغييرات على هذه الشروط",
                        en_body: "We reserve the right to change, update, or modify these Terms of Service at any time without prior approval from users. Your continued use of the application after changes are published constitutes acceptance of the updated Terms.",
                        ar_body: "نحتفظ بالحق في تغيير أو تحديث أو تعديل شروط الخدمة هذه في أي وقت دون موافقة مسبقة من المستخدمين. استمرارك في استخدام التطبيق بعد نشر التغييرات يُعد قبولاً للشروط المحدّثة.",
                    },
                    {
                        en_title: "2. Ownership and Copyright",
                        ar_title: "٢. الملكية وحقوق النشر",
                        en_body: "This application and its original materials are our property or are used under appropriate authorization. This includes: source code, software, user interface, designs, graphics, logos and branding, and text. All such materials are protected by applicable copyright and intellectual property laws.",
                        ar_body: "هذا التطبيق ومواده الأصلية ملكنا أو تُستخدم بموجب تصريح مناسب. يشمل ذلك: الكود المصدري، البرمجيات، واجهة المستخدم، التصاميم، الرسومات، الشعارات والعلامات التجارية، والنصوص. جميع هذه المواد محمية بموجب قوانين حقوق النشر والملكية الفكرية.",
                    },
                    {
                        en_title: "3. Prohibited Copying",
                        ar_title: "٣. النسخ المحظور",
                        en_body: "You may not copy, reproduce, duplicate, modify, distribute, publish, sell, or redistribute the source code or any substantial portion of the source code of this application without our prior written permission.",
                        ar_body: "لا يجوز لك نسخ أو إعادة إنتاج أو تعديل أو توزيع أو نشر أو بيع الكود المصدري أو أي جزء جوهري منه دون إذن كتابي مسبق منا.",
                    },
                    {
                        en_title: "4. Legal Enforcement",
                        ar_title: "٤. التطبيق القانوني",
                        en_body: "If you violate these Terms or unlawfully use our copyrighted materials or source code, we reserve the right to take appropriate legal action and seek any remedies available under applicable law.",
                        ar_body: "إذا انتهكت هذه الشروط أو استخدمت موادنا المحمية بحقوق النشر بشكل غير قانوني، نحتفظ بالحق في اتخاذ الإجراءات القانونية المناسبة.",
                    },
                    {
                        en_title: "5. Acceptance",
                        ar_title: "٥. القبول",
                        en_body: "By using this application, you acknowledge that you have read and agreed to these Terms of Service. If you do not agree to these Terms, you must not use the application.",
                        ar_body: "باستخدامك لهذا التطبيق، فإنك تُقر بأنك قد قرأت ووافقت على شروط الخدمة هذه. إذا كنت لا توافق على هذه الشروط، يجب عليك عدم استخدام التطبيق.",
                    },
                ].map((item, i) => (
                    <div className="subpage-section" key={i}>
                        <div className="subpage-section-title" style={{ color: K ? "#ffe088" : "#8c9e99" }}>
                            {isarabic ? item.ar_title : item.en_title}
                        </div>
                        <div className="subpage-card" style={{ backgroundColor: K ? "#0b0f0d" : "#f9fbfb", borderColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1" }}>
                            <p className="subpage-body" style={{ margin: 0, color: K ? "#a0c4b8" : "#4a6660" }}>
                                {isarabic ? item.ar_body : item.en_body}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}