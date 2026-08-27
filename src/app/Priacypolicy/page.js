"use client";
import "../subpage.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";

export default function PolicyPage() {
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
                    {isarabic ? "سياسة الخصوصية" : "Privacy & Policy"}
                </h1>
                <p className="subpage-subtitle" style={{ color: K ? "#6b8a7e" : "#8c9e99" }}>
                    {isarabic ? "آخر تحديث: ٢٠٢٤" : "Last updated: 2024"}
                </p>

                <p className="subpage-body" style={{ color: K ? "#a0c4b8" : "#4a6660" }}>
                    {isarabic
                        ? "خصوصيتك تهمنا. نحن ملتزمون بالحفاظ على معلوماتك وبالشفافية فيما يتعلق بكيفية التعامل مع بياناتك."
                        : "Your privacy matters to us. We are committed to keeping your information safe and being transparent about how your data is handled."}
                </p>

                <div className="subpage-section">
                    <div className="subpage-section-title" style={{ color: K ? "#ffe088" : "#8c9e99" }}>
                        {isarabic ? "ما نتعامل معه" : "What We Handle"}
                    </div>
                    <div className="subpage-card" style={{ backgroundColor: K ? "#0b0f0d" : "#f9fbfb", borderColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1" }}>
                        <ul className="subpage-list">
                            <li style={{ color: K ? "#a0c4b8" : "#4a6660" }}>
                                <strong className="subpage-strong" style={{ color: K ? "#95d3ba" : "#003829" }}>
                                    {isarabic ? "موقعك الجغرافي: " : "Your location: "}
                                </strong>
                                {isarabic ? "لا نسرق موقعك أو نبيعه أو نجمعه سراً، بل يُستخدم فقط لحساب أوقات الصلاة." : "We do not steal, sell, or secretly collect your location. It is only used to calculate prayer times."}
                            </li>
                            <li style={{ color: K ? "#a0c4b8" : "#4a6660" }}>
                                <strong className="subpage-strong" style={{ color: K ? "#95d3ba" : "#003829" }}>
                                    {isarabic ? "بياناتك: " : "Your data: "}
                                </strong>
                                {isarabic ? "نستخدم فقط المعلومات الضرورية لتقديم ميزات هذا الموقع." : "We only use information that is necessary to provide the features of this website."}
                            </li>
                            <li style={{ color: K ? "#a0c4b8" : "#4a6660" }}>
                                <strong className="subpage-strong" style={{ color: K ? "#95d3ba" : "#003829" }}>
                                    {isarabic ? "عدم البيع: " : "No selling: "}
                                </strong>
                                {isarabic ? "لا نبيع معلوماتك الشخصية لأي أطراف ثالثة إطلاقاً." : "We do not sell your personal information to third parties."}
                            </li>
                            <li style={{ color: K ? "#a0c4b8" : "#4a6660" }}>
                                <strong className="subpage-strong" style={{ color: K ? "#95d3ba" : "#003829" }}>
                                    {isarabic ? "تحكمك الكامل: " : "Your control: "}
                                </strong>
                                {isarabic ? "يمكنك التوقف عن استخدام الموقع في أي وقت." : "You can stop using the website at any time."}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="subpage-divider" style={{ backgroundColor: K ? "rgba(63,73,69,0.3)" : "#edf2f1" }} />

                <p className="subpage-body" style={{ color: K ? "#a0c4b8" : "#4a6660" }}>
                    {isarabic
                        ? "نتخذ تدابير معقولة لحماية المعلومات التي تتعامل معها خدمتنا ونهدف إلى الحفاظ على أمان بياناتك دائماً."
                        : "We take reasonable measures to protect the information handled by our service and aim to keep your data secure."}
                </p>
            </div>
        </div>
    );
}