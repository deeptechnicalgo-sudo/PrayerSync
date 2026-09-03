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
  },
};



export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <SessionProvider>
        <DataProvider>
          <DataAProvider>
            <body>
              {children}

<<<<<<< HEAD
              <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8383999192768244"
                crossOrigin="anonymous"
                strategy="afterInteractive"
              />
            </body>
          </DataAProvider>
        </DataProvider>
      </SessionProvider>
=======
            <Script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8383999192768244"
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
                <script src="https://pl31170217.profitableratecpmnetwork.com/b2/0c/9b/b20c9b27034926a92f7a52f983a6b915.js"></script>
          </body>
        </DataAProvider>
      </DataProvider>
>>>>>>> origin/main
    </html>
  );
}
