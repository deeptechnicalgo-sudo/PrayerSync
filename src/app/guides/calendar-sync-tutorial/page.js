import PageClient from "./PageClient";

export const metadata = {
    title: "Step-by-Step Calendar Sync Tutorial for Google, Apple & Outlook",
    description:
        "Complete illustrated guide for syncing Islamic prayer times automatically with Google Calendar, Apple Calendar, and Microsoft Outlook using WebCal and ICS feeds on iOS, macOS, Android, and Windows.",
    keywords: [
        "prayer times calendar sync",
        "google calendar prayer times",
        "apple calendar islamic prayer",
        "outlook prayer times subscription",
        "webcal prayer feed",
        "ICS prayer calendar",
        "prayer times iPhone",
        "salah google calendar",
    ],
    alternates: {
        canonical: "https://prayer-sync.vercel.app/guides/calendar-sync-tutorial",
    },
    openGraph: {
        title: "Step-by-Step Calendar Sync Tutorial for Google, Apple & Outlook",
        description:
            "Illustrated walkthrough for configuring rolling WebCal feeds and ICS calendars on iOS, macOS, Android, and Windows.",
        url: "https://prayer-sync.vercel.app/guides/calendar-sync-tutorial",
        type: "article",
    },
};

export default function CalendarSyncTutorialServerPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to Sync Islamic Prayer Times with Google Calendar, Apple Calendar & Outlook",
        description:
            "A step-by-step guide to automatically synchronize your local Islamic prayer times with Google Calendar, Apple Calendar (iCal), and Microsoft Outlook using WebCal / ICS subscription feeds.",
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
        totalTime: "PT3M",
        step: [
            {
                "@type": "HowToStep",
                position: 1,
                name: "Configure Your City & Method",
                text: "Open PrayerSync and set your city and preferred calculation method (Umm al-Qura, ISNA, MWL, etc.).",
            },
            {
                "@type": "HowToStep",
                position: 2,
                name: "Choose Your Calendar Platform",
                text: "Select Google Calendar, Apple Calendar (WebCal), or Microsoft Outlook and follow the platform-specific steps.",
            },
            {
                "@type": "HowToStep",
                position: 3,
                name: "Authorize & Subscribe",
                text: "Grant the required permissions (OAuth for Google) or subscribe via the WebCal/ICS URL for Apple and Outlook.",
            },
            {
                "@type": "HowToStep",
                position: 4,
                name: "Enjoy Automatic Updates",
                text: "Your prayer calendar now updates automatically as times shift seasonally — no manual changes needed.",
            },
        ],
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://prayer-sync.vercel.app/guides/calendar-sync-tutorial",
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
                    name: "Calendar Sync Tutorial",
                    item: "https://prayer-sync.vercel.app/guides/calendar-sync-tutorial",
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
