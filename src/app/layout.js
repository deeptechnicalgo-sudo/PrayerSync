import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { DataProvider } from "./Context/DarklightContext";
import { DataAProvider } from "./Context/Arabic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "PrayerSync",
  description: "Put your prayer time to your Outlook or Google Calendar",
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
      <DataProvider>
        <DataAProvider>
          <body>
            {children}

            <Script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8383999192768244"
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
          </body>
        </DataAProvider>
      </DataProvider>
    </html>
  );
}
