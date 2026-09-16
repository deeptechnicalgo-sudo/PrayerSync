import FaqClient from "./FaqClient";
import { faqItems } from "./faqData";

export const metadata = {
    title: "Frequently Asked Questions (FAQ) — Prayer Times & Calendar Sync",
    description:
        "Comprehensive answers to common questions about Islamic prayer times, astronomical calculation methods (MWL, ISNA, Umm al-Qura), high-latitude rulings, and calendar synchronization for Google, Apple, and Outlook.",
    keywords: [
        "prayer times FAQ",
        "how to sync prayer times",
        "prayer calculation questions",
        "hanafi vs shafii asr time",
        "scandinavia prayer times faq",
        "google calendar prayer feed help",
        "prayersync questions",
    ],
    alternates: {
        canonical: "https://prayer-sync.vercel.app/faq",
    },
    openGraph: {
        title: "Frequently Asked Questions (FAQ) — Prayer Times & Calendar Sync | PrayerSync",
        description:
            "Authoritative answers to common questions about prayer calculations, calendar sync, high latitudes, and workplace prayer management.",
        url: "https://prayer-sync.vercel.app/faq",
        type: "website",
    },
};

export default function FaqServerPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q_en,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.a_en,
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <FaqClient />
        </>
    );
}
