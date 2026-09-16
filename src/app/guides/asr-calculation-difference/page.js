import PageClient from "./PageClient";

export const metadata = {
    title: "Asr Prayer Calculation: Standard (Shafi'i) vs Hanafi Shadow Length Ratio",
    description:
        "An astronomical and jurisprudential deep dive into the two major Asr prayer time calculation methods — the Standard (Shafi'i/Maliki/Hanbali) 1× shadow ratio vs the Hanafi 2× shadow ratio — and how to configure your prayer app.",
    keywords: [
        "asr prayer time calculation",
        "hanafi asr time",
        "shafi asr prayer",
        "shadow ratio prayer",
        "1x shadow 2x shadow asr",
        "Islamic prayer jurisprudence",
        "madhab prayer times",
        "fiqh asr calculation",
    ],
    alternates: {
        canonical: "https://prayer-sync.vercel.app/guides/asr-calculation-difference",
    },
    openGraph: {
        title: "Asr Prayer Calculation: Standard (Shafi'i) vs Hanafi Shadow Length Ratio",
        description:
            "Astronomical and legal comparison between shadow ratio 1× (Jumhur) and 2× (Hanafi) Asr methods, with real-world time differences by latitude.",
        url: "https://prayer-sync.vercel.app/guides/asr-calculation-difference",
        type: "article",
    },
};

export default function AsrCalculationServerPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Asr Prayer Calculation: Standard (Shafi'i) vs Hanafi Shadow Length Ratio",
        description:
            "An astronomical and jurisprudential comparison of the two major Asr prayer time methods used by Islamic schools of law.",
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
            "@id": "https://prayer-sync.vercel.app/guides/asr-calculation-difference",
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
                    name: "Asr Calculation Difference",
                    item: "https://prayer-sync.vercel.app/guides/asr-calculation-difference",
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
