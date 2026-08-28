import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DataProvider } from "./Context/DarklightContext"
import { DataAProvider } from "./Context/Arabic"

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
  description: "Put your prayer time to you Outlooks or Google Calander",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning >
      <DataProvider>
        <DataAProvider>
          <body>{children}</body>
        </DataAProvider>
      </DataProvider>
    </html>
  );
}

