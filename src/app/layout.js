import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { DataProvider } from "./Context/DarklightContext";
import { DataAProvider } from "./Context/Arabic";
import SessionProvider from "./Context/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
};

export const metadata = {
  metadataBase: new URL("https://connect-prayer.vercel.app"),
  title: {
    default: "PrayerConnect - Islamic Prayer Times & Smart Calendar Sync",
    template: "%s | PrayerConnect",
  },
  description: "Accurate Islamic prayer times, astronomical calculation methods (MWL, ISNA, Umm al-Qura), and seamless automatic synchronization with Google Calendar, Apple Calendar, and Microsoft Outlook.",
  keywords: [
    "prayer times",
    "Islamic prayer times",
    "google calendar prayer times",
    "outlook prayer times",
    "apple calendar prayer times",
    "athan times",
    "namaz schedule",
    "fajr dhuhr asr maghrib isha",
    "prayer times calculation methods",
    "webcal prayer feed",
    "salah schedule",
    "qibla direction",
    "Muslim calendar sync",
    "prayer reminder app"
  ],
  authors: [{ name: "Star Studios", url: "https://connect-prayer.vercel.app" }],
  creator: "Musa Mohammed",
  publisher: "PrayerConnect",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
    url: "https://connect-prayer.vercel.app",
    siteName: "PrayerConnect",
    title: "PrayerConnect - Islamic Prayer Times & Smart Calendar Sync",
    description: "PrayerConnect helps you sync local prayer times with Google Calendar and Outlook, making it easier to organize your daily schedule around your prayers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrayerConnect - Islamic Prayer Times & Smart Calendar Sync",
    description: "PrayerConnect helps you sync local prayer times with Google Calendar and Outlook, making it easier to organize your daily schedule around your prayers.",
  },
  alternates: {
    canonical: "https://connect-prayer.vercel.app",
  },
  other: {
    "google-adsense-account": "ca-pub-8383999192768244",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>




      </head>

      <body suppressHydrationWarning>
        <SessionProvider>
          <DataProvider>
            <DataAProvider>
              {children}
            </DataAProvider>
          </DataProvider>
        </SessionProvider>


        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8383999192768244"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}


