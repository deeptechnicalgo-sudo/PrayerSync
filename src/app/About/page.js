import AboutClient from "./AboutClient";

export const metadata = {
    title: "About Us — The Story & Mission Behind PrayerSync",
    description:
        "Learn about PrayerSync, developed by Musa Mohammed (Deep Technical Go) to help Muslims harmonize daily schedules, work meetings, and prayer times through seamless digital calendar sync.",
    keywords: [
        "about PrayerSync",
        "prayer times developer",
        "Musa Mohammed",
        "Deep Technical Go",
        "Islamic prayer app mission",
        "workplace prayer synchronization",
    ],
    alternates: {
        canonical: "https://prayer-sync.vercel.app/About",
    },
    openGraph: {
        title: "About Us — The Story & Mission Behind PrayerSync",
        description:
            "Learn about PrayerSync, created to help Muslims organize daily schedules and work meetings around prayer times.",
        url: "https://prayer-sync.vercel.app/About",
        type: "website",
    },
};

export default function AboutServerPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About PrayerSync",
        description:
            "The story, mission, and developer behind PrayerSync, an Islamic prayer times and calendar synchronization platform.",
        url: "https://prayer-sync.vercel.app/About",
        mainEntity: {
            "@type": "Organization",
            name: "PrayerSync",
            url: "https://prayer-sync.vercel.app",
            founder: {
                "@type": "Person",
                name: "Musa Mohammed",
                jobTitle: "Founder & Software Engineer",
            },
            description:
                "PrayerSync provides accurate astronomical prayer times and automatic calendar feeds for Google Calendar, Apple Calendar, and Microsoft Outlook.",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <AboutClient />
        </>
    );
}
