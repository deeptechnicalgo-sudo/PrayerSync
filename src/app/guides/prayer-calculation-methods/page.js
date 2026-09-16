import PageClient from "./PageClient";

export const metadata = {
    title: "Islamic Prayer Calculation Methods: Umm Al-Qura, MWL & ISNA Compared",
    description:
        "A comprehensive deep dive into astronomical twilight equations, solar depression angles, and organizational calculation standards for Islamic prayer times — including Umm al-Qura, Muslim World League (MWL), ISNA, Egyptian, and Karachi methods.",
    keywords: [
        "prayer calculation methods",
        "Umm al-Qura",
        "Muslim World League",
        "ISNA prayer times",
        "Fajr angle",
        "Isha angle",
        "Islamic astronomy",
        "solar declination prayer",
        "twilight prayer calculation",
    ],
    alternates: {
        canonical: "https://prayer-sync.vercel.app/guides/prayer-calculation-methods",
    },
    openGraph: {
        title: "Islamic Prayer Calculation Methods: Umm Al-Qura, MWL & ISNA Compared",
        description:
            "Deep dive into astronomical twilight equations, solar depression angles, and global Islamic calculation standards.",
        url: "https://prayer-sync.vercel.app/guides/prayer-calculation-methods",
        type: "article",
    },
};

export default function PrayerCalculationMethodsPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline:
            "Islamic Prayer Calculation Methods: Umm Al-Qura, MWL & ISNA Compared",
        description:
            "A comprehensive deep dive into astronomical twilight equations, solar depression angles, and organizational calculation standards.",
        author: {
            "@type": "Person",
            name: "Musa Mohammed",
            url: "https://prayer-sync.vercel.app/About",
        },
        publisher: {
            "@type": "Organization",
            name: "PrayerSync",
            url: "https://prayer-sync.vercel.app",
        },
        datePublished: "2026-09-06",
        dateModified: "2026-09-16",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id":
                "https://prayer-sync.vercel.app/guides/prayer-calculation-methods",
        },
        breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://prayer-sync.vercel.app",
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Guides",
                    item: "https://prayer-sync.vercel.app/guides",
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: "Prayer Calculation Methods",
                    item: "https://prayer-sync.vercel.app/guides/prayer-calculation-methods",
                },
            ],
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PageClient />
        </>
    );
}
