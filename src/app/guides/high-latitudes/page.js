import PageClient from "./PageClient";

export const metadata = {
    title: "Prayer Times at High Latitudes: Twilight Persistence & Midnight Sun Solutions",
    description:
        "How Muslims in Scandinavia, UK, Canada, and other high-latitude regions calculate Fajr and Isha when solar twilight persists all night. Covers Middle of Night, Angle-Based, Nearest City, and One-Seventh Night methods.",
    keywords: [
        "prayer times high latitudes",
        "fajr isha midnight sun",
        "scandinavia prayer times",
        "norway prayer times",
        "high latitude fajr calculation",
        "twilight persistence fajr isha",
        "islamic prayer arctic",
        "middle of night prayer method",
    ],
    alternates: {
        canonical: "https://prayer-sync.vercel.app/guides/high-latitudes",
    },
    openGraph: {
        title: "Prayer Times at High Latitudes: Twilight Persistence & Midnight Sun Solutions",
        description:
            "Scientific and jurisprudential solutions for Fajr and Isha calculation when twilight never disappears in Scandinavia, Canada, and the UK.",
        url: "https://prayer-sync.vercel.app/guides/high-latitudes",
        type: "article",
    },
};

export default function HighLatitudesServerPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline:
            "Prayer Times at High Latitudes: Twilight Persistence & Midnight Sun Solutions",
        description:
            "Scientific and jurisprudential solutions for calculating Islamic prayer times in Scandinavian countries, Canada, and regions where Fajr and Isha twilight disappears.",
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
            "@id": "https://prayer-sync.vercel.app/guides/high-latitudes",
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
                    name: "High Latitude Prayer Times",
                    item: "https://prayer-sync.vercel.app/guides/high-latitudes",
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
