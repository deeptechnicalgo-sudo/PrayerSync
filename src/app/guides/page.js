import GuidesClient from "./GuidesClient";
import { guidesData } from "./guidesData";

export const metadata = {
    title: "Islamic Prayer Guides & Calendar Sync Tutorials",
    description:
        "Comprehensive guides on Islamic prayer time calculations, astronomical methods (Umm Al-Qura, MWL, ISNA), high latitude prayer estimation, Asr calculation differences, and calendar sync tutorials for Google, Apple, and Outlook.",
    keywords: [
        "islamic prayer guides",
        "prayer time tutorials",
        "prayer calculation guides",
        "calendar sync tutorial",
        "high latitudes prayer",
        "hanafi shafii asr difference",
        "google calendar prayer sync",
    ],
    alternates: {
        canonical: "https://prayer-sync.vercel.app/guides",
    },
    openGraph: {
        title: "Islamic Prayer Guides & Calendar Sync Tutorials | PrayerSync",
        description:
            "Comprehensive guides on Islamic prayer calculations, astronomical methods, high latitude prayers, and calendar sync tutorials.",
        url: "https://prayer-sync.vercel.app/guides",
        type: "website",
    },
};

export default function GuidesServerPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Islamic Prayer Guides & Calendar Sync Tutorials",
        description:
            "Authoritative articles and technical guides on prayer time calculations, astronomical formulas, and calendar synchronization.",
        url: "https://prayer-sync.vercel.app/guides",
        publisher: {
            "@type": "Organization",
            name: "PrayerSync",
            url: "https://prayer-sync.vercel.app",
        },
        hasPart: guidesData.map((g) => ({
            "@type": "Article",
            headline: g.title_en,
            description: g.desc_en,
            url: `https://prayer-sync.vercel.app${g.href}`,
            datePublished: g.date,
        })),
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
            ],
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <GuidesClient />
        </>
    );
}
