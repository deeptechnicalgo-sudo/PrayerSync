"use client";
import "../subpage.css";
import { useData } from "../Context/DarklightContext";
import { useData2 } from "../Context/Arabic";

export default function Page404() {
    const { K } = useData();
    const { isarabic } = useData2();

    return (
        <div className="subpage-wrapper" style={{ backgroundColor: K ? "#0f1412" : "#ffffff", color: K ? "#c8e8dc" : "#2c463f", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <div className="subpage-content" style={{ margin: "auto", paddingTop: 80, textAlign: "center" }}>
                <span className="not-found-icon">🕌</span>
                <h1 className="not-found-title" style={{ color: K ? "#95d3ba" : "#003829" }}>
                    {isarabic ? "هذه الصفحة غير متاحة" : "This Page Is Not Available"}
                </h1>
                <p className="not-found-body" style={{ color: K ? "#6b8a7e" : "#6e827c" }}>
                    {isarabic
                        ? "نحن مازلنا نعمل على هذه الصفحة. يرجى التحقق لاحقاً."
                        : "We are still working on this page. Please check back later."}
                </p>
                <button
                    type="button"
                    onClick={() => window.close()}
                    className="not-found-btn"
                    style={{
                        backgroundColor: K ? "#95d3ba" : "#003829",
                        color: K ? "#0b0f0d" : "#ffffff",
                    }}
                >
                    {isarabic ? "قد علمت" : "Got it"}
                </button>
            </div>
        </div>
    );
}