import TermsClient from "./TermsClient";

export const metadata = {
    title: "Terms of Service & Usage Policies",
    description:
        "Terms of service governing access to PrayerSync, astronomical prayer calculations, calendar feeds, and WebCal subscriptions.",
    keywords: [
        "PrayerSync terms of service",
        "prayer times terms",
        "webcal subscription terms",
    ],
    alternates: {
        canonical: "https://prayer-sync.vercel.app/terms",
    },
    openGraph: {
        title: "Terms of Service & Usage Policies | PrayerSync",
        description:
            "Terms of service governing access to PrayerSync, astronomical prayer calculations, and calendar sync services.",
        url: "https://prayer-sync.vercel.app/terms",
        type: "website",
    },
};

export default function TermsServerPage() {
    return <TermsClient />;
}