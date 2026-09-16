import ContactClient from "./ContactClient";

export const metadata = {
    title: "Contact Us & Technical Support",
    description:
        "Contact the PrayerSync team and developer Musa Mohammed for technical support, calendar synchronization inquiries, bug reports, and partnership opportunities.",
    keywords: [
        "contact PrayerSync",
        "prayer times support",
        "calendar sync help",
        "prayer app customer service",
    ],
    alternates: {
        canonical: "https://prayer-sync.vercel.app/Contact",
    },
    openGraph: {
        title: "Contact Us & Technical Support | PrayerSync",
        description:
            "Get in touch with the PrayerSync team for technical assistance, calendar synchronization questions, and developer support.",
        url: "https://prayer-sync.vercel.app/Contact",
        type: "website",
    },
};

export default function ContactServerPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact PrayerSync Support",
        description:
            "Customer support and developer contact information for the PrayerSync calendar synchronization service.",
        url: "https://prayer-sync.vercel.app/Contact",
        mainEntity: {
            "@type": "Organization",
            name: "PrayerSync",
            url: "https://prayer-sync.vercel.app",
            contactPoint: [
                {
                    "@type": "ContactPoint",
                    email: "PrayerSync-Reply@outlook.com",
                    contactType: "customer support",
                },
                {
                    "@type": "ContactPoint",
                    email: "deep.technical.go@gmail.com",
                    contactType: "technical support",
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
            <ContactClient />
        </>
    );
}