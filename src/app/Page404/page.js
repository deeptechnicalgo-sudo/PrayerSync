"use client";
import "../subpage.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";

export default function Page404() {
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
        <div className="subpage-wrapper" dir={isarabic ? "rtl" : "ltr"} style={{ backgroundColor: K ? "#0f1412" : "#f5faf9", color: K ? "#c8e8dc" : "#2c463f", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <div className="subpage-content" style={{ margin: "auto", paddingTop: 80, textAlign: "center" }}>
                <span className="not-found-icon">🕌</span>
                <h1 className="not-found-title" style={{ color: K ? "#95d3ba" : "#003829" }}>
                    {isarabic ? "هذه الصفحة غير متاحة حالياً" : "This Page Is Not Available"}
                </h1>
                <p className="not-found-body" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                    {isarabic
                        ? "نحن ما زلنا نعمل على هذه الصفحة وسنقوم بتوفيرها قريباً إن شاء الله."
                        : "We are still working on this page. Please check back later."}
                </p>
                <button
                    type="button"
                    onClick={handleBack}
                    className="not-found-btn"
                    style={{
                        backgroundColor: K ? "#95d3ba" : "#003829",
                        color: K ? "#0b0f0d" : "#ffffff",
                    }}
                >
                    {isarabic ? "حسناً" : "Got it"}
                </button>
            </div>
        </div>
    );
}