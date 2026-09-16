import PolicyClient from "./PolicyClient";

export const metadata = {
    title: "Privacy Policy & Cookie Disclosures (AdSense & GDPR)",
    description:
        "Privacy policy for PrayerSync, detailing local coordinate processing, Google AdSense and DoubleClick cookie disclosures, analytics policies, and GDPR/CCPA data compliance.",
    keywords: [
        "PrayerSync privacy policy",
        "AdSense cookie disclosure",
        "GDPR islamic prayer app",
        "CCPA privacy",
    ],
    alternates: {
        canonical: "https://prayer-sync.vercel.app/Priacypolicy",
    },
    openGraph: {
        title: "Privacy Policy & Cookie Disclosures | PrayerSync",
        description:
            "PrayerSync privacy policy, Google AdSense cookie disclosures, analytics policies, and data protection practices.",
        url: "https://prayer-sync.vercel.app/Priacypolicy",
        type: "website",
    },
};

export default function PolicyServerPage() {
    return <PolicyClient />;
}