"use client";
import "../subpage.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";

export default function PolicyPage() {
    const { K } = useData();
    const { isarabic } = useData2();

    const handleBack = () => {
        if (typeof window !== "undefined") {
            if (window.opener) {
                window.close();
            } else if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = "/";
            }
        }
    };

    return (
        <div className="subpage-wrapper" dir={isarabic ? "rtl" : "ltr"} style={{ backgroundColor: K ? "#0f1412" : "#f5faf9", color: K ? "#c8e8dc" : "#2c463f" }}>
            {/* Top bar */}
            <div className="subpage-topbar" style={{ backgroundColor: K ? "#0f1412" : "#f5faf9", borderBottomColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1" }}>
                <button
                    type="button"
                    onClick={handleBack}
                    className="subpage-back-btn"
                    style={{
                        backgroundColor: K ? "#1a2520" : "#ffffff",
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
                    {isarabic ? "سياسة الخصوصية" : "Privacy Policy"}
                </h1>
                <p className="subpage-subtitle" style={{ color: K ? "#6b8a7e" : "#8c9e99" }}>
                    {isarabic ? "آخر تحديث: ٢٠٢٦" : "Last updated: 2026"}
                </p>

                <p className="subpage-body" style={{ color: K ? "#a0c4b8" : "#4a6660" }}>
                    {isarabic
                        ? "خصوصيتك تهمنا للغاية. نحن ملتزمون بحماية معلوماتك وبالشفافية التامة فيما يتعلق بكيفية التعامل مع بياناتك."
                        : "Your privacy matters to us. We are committed to keeping your information safe and being transparent about how your data is handled."}
                </p>

                <div className="subpage-section">
                    <div className="subpage-section-title" style={{ color: K ? "#ffe088" : "#8c9e99" }}>
                        {isarabic ? "ما نتعامل معه" : "What We Handle"}
                    </div>
                    <div className="subpage-card" style={{ backgroundColor: K ? "#0b0f0d" : "#ffffff", borderColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1" }}>
                        <ul className="subpage-list">
                            <li style={{ color: K ? "#a0c4b8" : "#4a6660" }}>
                                <strong className="subpage-strong" style={{ color: K ? "#95d3ba" : "#003829" }}>
                                    {isarabic ? "موقعك الجغرافي: " : "Your Location: "}
                                </strong>
                                {isarabic ? "لا نقوم بجمع موقعك سراً أو بيعه أو مشاركته مع أي طرف. يتم استخدامه فقط محلياً لحساب وتنزيل أوقات الصلاة الصحيحة." : "We do not track, sell, or secretly collect your location. It is solely used to calculate accurate prayer times."}
                            </li>
                            <li style={{ color: K ? "#a0c4b8" : "#4a6660" }}>
                                <strong className="subpage-strong" style={{ color: K ? "#95d3ba" : "#003829" }}>
                                    {isarabic ? "بيانات التفضيلات: " : "Preference Data: "}
                                </strong>
                                {isarabic ? "يتم حفظ تفضيلاتك (الوضع الداكن، الإضاءة الليلية، اللغة، صيغة الوقت) محلياً داخل متصفحك فقط لراحتك." : "Your preferences (dark mode, night light, language, time format) are saved locally on your browser only."}
                            </li>
                            <li style={{ color: K ? "#a0c4b8" : "#4a6660" }}>
                                <strong className="subpage-strong" style={{ color: K ? "#95d3ba" : "#003829" }}>
                                    {isarabic ? "عدم بيع البيانات: " : "No Selling of Data: "}
                                </strong>
                                {isarabic ? "لا نبيع أو نؤجر أي بيانات شخصية لأي أطراف ثالثة أو معلنين على الإطلاق." : "We never sell, rent, or trade any personal information to third parties or advertisers."}
                            </li>
                            <li style={{ color: K ? "#a0c4b8" : "#4a6660" }}>
                                <strong className="subpage-strong" style={{ color: K ? "#95d3ba" : "#003829" }}>
                                    {isarabic ? "تحكمك الكامل: " : "Your Control: "}
                                </strong>
                                {isarabic ? "يمكنك مسح بياناتك أو التوقف عن استخدام الموقع في أي وقت بحرية تامة." : "You are in full control and can clear your browser data or cease using the service at any time."}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="subpage-divider" style={{ backgroundColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1" }} />

                <p className="subpage-body" style={{ color: K ? "#a0c4b8" : "#4a6660" }}>
                    {isarabic
                        ? "نتخذ أفضل التدابير الفنية لحماية المعلومات والخدمة ونهدف دائماً إلى تقديم تجربة آمنة ومريحة لجميع المستخدمين."
                        : "We take rigorous measures to protect the information handled by our service and aim to provide a safe, secure experience."}
                </p>
            </div>
        </div>
    );
}