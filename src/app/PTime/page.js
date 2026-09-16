import PtimeClient from "./PTimeClient";

export const metadata = {
    title: "Daily Prayer Times & Live Countdown",
    description:
        "Real-time Islamic prayer schedule (Fajr, Dhuhr, Asr, Maghrib, Isha) with live countdown to the next prayer, geolocation detection, and 12/24 hour display.",
    keywords: [
        "daily prayer times",
        "live prayer countdown",
        "fajr dhuhr asr maghrib isha today",
        "athan times today",
        "salah times live",
    ],
    alternates: {
        canonical: "https://prayer-sync.vercel.app/PTime",
    },
    openGraph: {
        title: "Daily Prayer Times & Live Countdown | PrayerSync",
        description:
            "Real-time Islamic prayer times with live countdown to the next prayer and automatic location detection.",
        url: "https://prayer-sync.vercel.app/PTime",
        type: "website",
    },
};

export default function PtimeServerPage() {
    return <PtimeClient />;
}
