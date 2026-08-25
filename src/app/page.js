"use client";
import React, { useEffect } from "react";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import "./App.css";
import Link from "next/link";

export default function Home() {
    countries.registerLocale(en);

    const apikeyforcountry = "b721f60ec45901c4df9158699cdddf564ad21360a80c12885e2556a3c25cec58";

    const [PrayerData, SetApi] = React.useState({});
    const [CountryData, SetCountry] = React.useState([]);
    const [selecter, setsec] = React.useState("");
    const [sel2, set2] = React.useState("");
    const [State, setSate] = React.useState([]);
    const [now, setNow] = React.useState(null);

    useEffect(() => { setNow(new Date()); }, []);

    const date = now || new Date(0);
    const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    let FajrInt = PrayerData.data?.timings?.Fajr;
    let DhuhrInt = PrayerData.data?.timings?.Dhuhr;
    let AsrInt = PrayerData.data?.timings?.Asr;
    let MaghribInt = PrayerData.data?.timings?.Maghrib;
    let IshaInt = PrayerData.data?.timings?.Isha;

    useEffect(() => {
        fetch("https://api.countrystatecity.in/v1/countries", {
            headers: {
                "X-CSCAPI-KEY": `${apikeyforcountry}`,
            },
        })
            .then((res) => res.json())
            .then((coun) => SetCountry(coun));
    }, []);

    const MapofCount = CountryData.map((items) => (
        <option key={items.id} value={items.iso2}>
            {items.name}
        </option>
    ));

    const Mapofstate = State.map((items) => (
        <option key={items.id} value={items.name}>
            {items.name}
        </option>
    ));

    function formatToISO(timeString, addMins = 0) {
        if (!timeString) return null;
        const cleanTime = timeString.split(" ")[0];
        const [hours, mins] = cleanTime.split(":").map(Number);

        const eventDate = new Date();
        eventDate.setHours(hours, mins + addMins, 0, 0);

        return eventDate;
    }

    React.useEffect(() => {
        if (!selecter) return;
        fetch(
            `https://api.countrystatecity.in/v1/countries/${selecter}/states`,
            {
                headers: {
                    "X-CSCAPI-KEY": `${apikeyforcountry}`,
                },
            }
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`States request failed: ${res.status}`);
                }
                return res.json();
            })
            .then((state) => {
                setSate(Array.isArray(state) ? state : []);
            })
            .catch((err) => {
                console.error("Failed to load states:", err);
                setSate([]);
            });
    }, [selecter]);

    React.useEffect(() => {
        if (!sel2 || !selecter) return;

        fetch(
            `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=${sel2}&country=${selecter}&method=4`
        )
            .then((res) => res.json())
            .then((time) => SetApi(time));
    }, [sel2, selecter]);

    const fajrStart = formatToISO(FajrInt);
    const dhuhrStart = formatToISO(DhuhrInt);
    const asrStart = formatToISO(AsrInt);
    const maghribStart = formatToISO(MaghribInt);
    const ishaStart = formatToISO(IshaInt);

    const isDataValid =
        fajrStart && dhuhrStart && asrStart && maghribStart && ishaStart;

    const events = isDataValid
        ? [
            { title: "Fajr Prayer", start: fajrStart, raw: FajrInt },
            { title: "Dhuhr Prayer", start: dhuhrStart, raw: DhuhrInt },
            { title: "Asr Prayer", start: asrStart, raw: AsrInt },
            { title: "Maghrib Prayer", start: maghribStart, raw: MaghribInt },
            { title: "Isha Prayer", start: ishaStart, raw: IshaInt },
        ]
        : null;

    function toICSDate(d) {
        return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    }

    function buildICS(eventsList) {
        const lines = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//PrayerTimes//EN",
            "CALSCALE:GREGORIAN",
        ];

        eventsList.forEach((ev, idx) => {
            const endDate = new Date(ev.start.getTime() + 40 * 60000);
            lines.push(
                "BEGIN:VEVENT",
                `UID:${idx}-${ev.start.getTime()}@prayertimes`,
                `DTSTAMP:${toICSDate(new Date())}`,
                `DTSTART:${toICSDate(ev.start)}`,
                `DTEND:${toICSDate(endDate)}`,
                `SUMMARY:${ev.title}`,
                `DESCRIPTION:${ev.title} Time: ${ev.raw}`,
                `LOCATION:${sel2}`,
                "END:VEVENT"
            );
        });

        lines.push("END:VCALENDAR");
        return lines.join("\r\n");
    }

    function downloadICS() {
        if (!events) return;
        const icsContent = buildICS(events);
        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `prayer-times-${formattedDate}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    const Day = now ? date.getDate() : null;
    const Month = now ? date.toLocaleString("default", { month: "long" }) : null;
    const Year = now ? date.getFullYear() : null;

    function getCurrentPrayerKey() {
        if (!PrayerData.data?.timings) return null;

        const now = new Date();
        const parseTime = (timeStr) => {
            if (!timeStr) return null;
            const cleanTime = timeStr.split(" ")[0];
            const [hours, minutes] = cleanTime.split(":").map(Number);
            const d = new Date(now);
            d.setHours(hours, minutes, 0, 0);
            return d;
        };

        const timings = PrayerData.data.timings;
        const fajr = parseTime(timings.Fajr);
        const dhuhr = parseTime(timings.Dhuhr);
        const asr = parseTime(timings.Asr);
        const maghrib = parseTime(timings.Maghrib);
        const isha = parseTime(timings.Isha);

        if (!fajr || !dhuhr || !asr || !maghrib || !isha) return null;

        if (now >= fajr && now < dhuhr) {
            return "Fajr";
        } else if (now >= dhuhr && now < asr) {
            return "Dhuhr";
        } else if (now >= asr && now < maghrib) {
            return "Asr";
        } else if (now >= maghrib && now < isha) {
            return "Maghrib";
        } else {
            return "Isha";
        }
    }

    const currentPrayerKey = getCurrentPrayerKey();

    const prayerList = [
        { key: "Fajr", name: "Fajr", displayTime: PrayerData.data?.timings?.Fajr?.split(" ")[0] },
        { key: "Dhuhr", name: "Dhuhr", displayTime: PrayerData.data?.timings?.Dhuhr?.split(" ")[0] },
        { key: "Asr", name: "Asr", displayTime: PrayerData.data?.timings?.Asr?.split(" ")[0] },
        { key: "Maghrib", name: "Maghrib", displayTime: PrayerData.data?.timings?.Maghrib?.split(" ")[0] },
        { key: "Isha", name: "Isha", displayTime: PrayerData.data?.timings?.Isha?.split(" ")[0] },
    ];

    const countryName = selecter ? countries.getName(selecter, "en") : "";
    const locationText = sel2 ? (countryName ? `${sel2}, ${countryName}` : sel2) : "Riyadh, Saudi Arabia";

    return (
        <div className="app-wrapper">
            <header className="navbar">
                <a href="#" className="navbar-logo">PrayerSync</a>
                <nav>
                    <ul className="navbar-links">
                        <li><a href="#" className="navbar-link active">Home</a></li>
                        <li><a href="#" className="navbar-link">Schedule</a></li>
                        <li><a href="#" className="navbar-link">About</a></li>
                    </ul>
                </nav>
                <div className="navbar-actions">
                    <button className="navbar-icon-btn" aria-label="Settings" onClick={() => {

                    }}>
                        <svg className="navbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>

                    </button>
                    <button className="navbar-icon-btn" aria-label="Help">
                        <svg className="navbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </header>

            <main className="hero-section">
                <h1 className="hero-title">Add the prayer time to your Calendar.</h1>
                <p className="hero-subtitle">
                    Download your local prayer times directly to your Outlook or Google Calendar. Ensure you never miss a moment of reflection, no matter where your day takes you.
                </p>
            </main>

            <div className="dashboard-container">
                <div className="location-card">
                    <h2 className="location-card-title">Find Your Location</h2>

                    <div className="input-group">
                        <span className="input-label">Select Country</span>
                        <div className="select-wrapper">
                            <svg className="select-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                            <select value={selecter} onChange={(e) => setsec(e.target.value)} className="premium-select" >
                                <option value="">Choose a country...</option>
                                {MapofCount}
                            </select>
                        </div>
                    </div>

                    <div className="input-group">
                        <span className="input-label">Select State/City</span>
                        <div className="select-wrapper">
                            <svg className="select-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                                <line x1="9" y1="22" x2="9" y2="16"></line>
                                <line x1="15" y1="22" x2="15" y2="16"></line>
                                <line x1="9" y1="16" x2="15" y2="16"></line>
                                <path d="M9 6h6M9 10h6M9 14h6"></path>
                            </svg>
                            <select value={sel2} onChange={(e) => set2(e.target.value)} className="premium-select">
                                <option value="">Choose a city...</option>
                                {Mapofstate}
                            </select>
                        </div>
                    </div>

                    {events ? (
                        <button onClick={downloadICS} className="calendar-button">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                                <path d="M8 14h8M12 14v4"></path>
                            </svg>
                            Add to Calendar
                        </button>
                    ) : (
                        <button className="calendar-button" disabled>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            Add to Calendar
                        </button>
                    )}
                </div>

                <div className="Prayertime">
                    <div className="schedule-header">
                        <div className="header-left">
                            <h2 className="schedule-title">Today's Schedule</h2>
                            <div className="location-container">
                                <svg className="location-icon" viewBox="0 0 12 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 0C2.68629 0 0 2.68629 0 6C0 9.75 6 14 6 14C6 14 12 9.75 12 6C12 2.68629 9.31371 0 6 0ZM6 8.25C4.75736 8.25 3.75 7.24264 3.75 6C3.75 4.75736 4.75736 3.75 6 3.75C7.24264 3.75 8.25 4.75736 8.25 6C8.25 7.24264 7.24264 8.25 6 8.25Z" />
                                </svg>
                                <span className="location-text">{locationText}</span>
                            </div>
                        </div>
                        <div className="date-badge" suppressHydrationWarning>
                            {now ? `${Month} ${Day}, ${Year}` : ""}
                        </div>
                    </div>

                    <div className="schedule-divider"></div>

                    <div className="prayer-list">
                        {prayerList.map((prayer) => {
                            const isCurrent = prayer.key === currentPrayerKey;
                            return (
                                <div key={prayer.key} className={`prayer-card ${isCurrent ? 'current' : ''}`} suppressHydrationWarning>
                                    <span className="prayer-name">{prayer.name}</span>
                                    <div className="prayer-time-container">
                                        {isCurrent && <span className="current-badge">Current</span>}
                                        <span className="prayer-time">{prayer.displayTime || '--:--'}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-left" suppressHydrationWarning>
                        &copy; {now ? Year : ""} Musa Mohammed. All rights reserved.
                    </div>
                    <div className="footer-right">
                        <a href="#" className="footer-link" onClick={() => {
                            window.open("/Priacypolicy", "_blank", "width=800,height=600")
                        }}>Privacy Policy</a>
                        <a href="#" className="footer-link" onClick={() => {
                            window.open("/terms", "_blank", "width=800,height=600")
                        }}>Terms of Service</a>
                        <a href="#" className="footer-link" onClick={() => {
                            window.open("/Contact", "_blank", "width=800,height=600")
                        }}>Contact Us</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
