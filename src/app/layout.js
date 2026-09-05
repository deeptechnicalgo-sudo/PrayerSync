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

export const metadata = {
  title: "PrayerSync",
  description: "Put your prayer time to your Outlook or Google Calendar",
  other: {
    "google-adsense-account": "ca-pub-8383999192768244",
    monetag: "a576e3547efeb8521364795d32ad5b05",
    clckd:"712de51b17d966f3fa784fdf3f75bffd",
    
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
        <meta name="admaven-placement" content="Bpdk5rdr4" />
        
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JVM4SDFJZK"
        />

        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JVM4SDFJZK');
          `}
        </Script>
      </head>

      <body>
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


