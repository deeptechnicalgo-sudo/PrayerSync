import PageClient from "./PageClient";

export const metadata = {
    title: "Prayer at Work: Practical Scheduling & Productivity Guide for Professionals",
    description:
        "A comprehensive practical guide for Muslim professionals on organizing prayer times at work, preventing meeting conflicts, calendar blocking, and communicating with management.",
    keywords: [
        "prayer at work",
        "muslim workplace prayer",
        "prayer breaks at work",
        "workplace religious accommodation",
        "calendar blocking prayer times",
        "dhuhr asr work schedule",
        "muslim corporate productivity",
        "prayer meeting conflicts",
    ],
    alternates: {
        canonical: "https://prayer-sync.vercel.app/guides/workplace-prayer-productivity",
    },
    openGraph: {
        title: "Prayer at Work: Practical Scheduling & Productivity Guide for Professionals",
        description:
            "A comprehensive practical guide for Muslim professionals on organizing prayer times at work, preventing meeting conflicts, and communicating with management.",
        url: "https://prayer-sync.vercel.app/guides/workplace-prayer-productivity",
        type: "article",
    },
};

export default function WorkplacePrayerServerPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Prayer at Work: Practical Scheduling & Productivity Guide for Professionals",
        description:
            "A comprehensive practical guide for Muslim professionals and business owners on organizing prayer times at work, preventing meeting conflicts, and professional communication.",
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
            "@id": "https://prayer-sync.vercel.app/guides/workplace-prayer-productivity",
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
                    name: "Workplace Prayer",
                    item: "https://prayer-sync.vercel.app/guides/workplace-prayer-productivity",
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
