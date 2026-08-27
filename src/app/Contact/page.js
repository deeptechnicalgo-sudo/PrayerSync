"use client";
import "../subpage.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";

export default function ContactPage() {
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
                    {isarabic ? "تواصل معنا" : "Contact Us"}
                </h1>
                <p className="subpage-subtitle" style={{ color: K ? "#6b8a7e" : "#8c9e99" }}>
                    {isarabic
                        ? "يسعدنا دائماً سماعك! سواء كان لديك سؤال، أو تحتاج إلى مساعدة ودعم، أو ترغب في مشاركة اقتراحاتك."
                        : "We'd love to hear from you! Whether you have a question, need support, or want to share feedback."}
                </p>

                <div className="subpage-section">
                    <div className="subpage-section-title" style={{ color: K ? "#ffe088" : "#8c9e99" }}>
                        {isarabic ? "خدمة العملاء والاقتراحات" : "Customer Service & Suggestions"}
                    </div>
                    <div className="subpage-card" style={{ backgroundColor: K ? "#0b0f0d" : "#f9fbfb", borderColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1" }}>
                        <p className="subpage-body" style={{ margin: 0, color: K ? "#a0c4b8" : "#4a6660" }}>
                            {isarabic
                                ? "للدعم الفني والأسئلة والملاحظات والاقتراحات:"
                                : "For customer support, questions, feedback, or suggestions:"}
                        </p>
                        <span
                            className="contact-email"
                            style={{
                                backgroundColor: K ? "#1a2520" : "#f0f7f4",
                                color: K ? "#95d3ba" : "#003829",
                                borderColor: K ? "rgba(63,73,69,0.5)" : "#c8ddd8",
                            }}
                        >
                            PrayerSync-Reply@outlook.com
                        </span>
                    </div>
                </div>

                <div className="subpage-section">
                    <div className="subpage-section-title" style={{ color: K ? "#ffe088" : "#8c9e99" }}>
                        {isarabic ? "المطوّر والمنشئ" : "Creator & Developer"}
                    </div>
                    <div className="subpage-card" style={{ backgroundColor: K ? "#0b0f0d" : "#f9fbfb", borderColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1" }}>
                        <p className="subpage-body" style={{ margin: 0, color: K ? "#a0c4b8" : "#4a6660" }}>
                            {isarabic
                                ? "للأمور المتعلقة بمنشئ ومطور PrayerSync:"
                                : "For matters related to the creator and developer of PrayerSync:"}
                        </p>
                        <span
                            className="contact-email"
                            style={{
                                backgroundColor: K ? "#1a2520" : "#f0f7f4",
                                color: K ? "#95d3ba" : "#003829",
                                borderColor: K ? "rgba(63,73,69,0.5)" : "#c8ddd8",
                            }}
                        >
                            Musa Mohammed — deep.technical.go@gmail.com
                        </span>
                    </div>
                </div>

                <div className="subpage-section">
                    <div className="subpage-section-title" style={{ color: K ? "#ffe088" : "#8c9e99" }}>
                        {isarabic ? "التطوير التقني" : "Technical Development"}
                    </div>
                    <div className="subpage-card" style={{ backgroundColor: K ? "#0b0f0d" : "#f9fbfb", borderColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1" }}>
                        <p className="subpage-body" style={{ margin: 0, color: K ? "#a0c4b8" : "#4a6660" }}>
                            {isarabic
                                ? "للأمور التقنية والتطويرية:"
                                : "For technical or development-related matters:"}
                        </p>
                        <span
                            className="contact-email"
                            style={{
                                backgroundColor: K ? "#1a2520" : "#f0f7f4",
                                color: K ? "#95d3ba" : "#003829",
                                borderColor: K ? "rgba(63,73,69,0.5)" : "#c8ddd8",
                            }}
                        >
                            karn.moussa@gmail.com
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}