import { NextResponse } from "next/server";

function toFloatingICSDate(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    const hh = String(dateObj.getHours()).padStart(2, "0");
    const mm = String(dateObj.getMinutes()).padStart(2, "0");
    const ss = String(dateObj.getSeconds()).padStart(2, "0");
    return `${y}${m}${d}T${hh}${mm}${ss}`;
}

function toUTCICSDate(dateObj) {
    return dateObj.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const country = searchParams.get("country") || "SA";
        const city = searchParams.get("city") || "Makkah";
        const method = searchParams.get("method") || "4";
        const school = searchParams.get("school") || "0";
        const preBuffer = parseInt(searchParams.get("preBuffer") || "0", 10);
        const postBuffer = parseInt(searchParams.get("postBuffer") || "30", 10);
        const isBusy = searchParams.get("busy") !== "false";
        const lang = searchParams.get("lang") || "en";
        const isArabic = lang === "ar";

        const prayersParam = searchParams.get("prayers");
        const activePrayers = prayersParam
            ? prayersParam.split(",").map((p) => p.trim())
            : ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

        const offsets = { Fajr: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 };
        const offsetsParam = searchParams.get("offsets");
        if (offsetsParam) {
            offsetsParam.split(",").forEach((item) => {
                const [k, v] = item.split(":");
                if (k && v !== undefined && !isNaN(parseInt(v, 10))) {
                    offsets[k.trim()] = parseInt(v, 10);
                }
            });
        }

        const today = new Date();
        const curYear = today.getFullYear();
        const curMonth = today.getMonth() + 1;

        const nextMonth = curMonth === 12 ? 1 : curMonth + 1;
        const nextYear = curMonth === 12 ? curYear + 1 : curYear;

        const [resCur, resNext] = await Promise.all([
            fetch(`https://api.aladhan.com/v1/calendarByCity/${curYear}/${curMonth}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}&school=${school}`),
            fetch(`https://api.aladhan.com/v1/calendarByCity/${nextYear}/${nextMonth}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}&school=${school}`)
        ]);

        const dataCur = await resCur.json();
        const dataNext = await resNext.json();

        const allDays = [
            ...(dataCur?.data || []),
            ...(dataNext?.data || [])
        ];

        const prayerNames = {
            Fajr: isArabic ? "صلاة الفجر" : "Fajr Prayer",
            Dhuhr: isArabic ? "صلاة الظهر" : "Dhuhr Prayer",
            Asr: isArabic ? "صلاة العصر" : "Asr Prayer",
            Maghrib: isArabic ? "صلاة المغرب" : "Maghrib Prayer",
            Isha: isArabic ? "صلاة العشاء" : "Isha Prayer",
        };

        const icsLines = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//PrayerSync//DynamicFeed 2.0//EN",
            "CALSCALE:GREGORIAN",
            "METHOD:PUBLISH",
            `X-WR-CALNAME:PrayerSync - ${city}`,
            `X-WR-CALDESC:Live automated prayer timetable with Smart Scheduling for ${city}`,
            "REFRESH-INTERVAL;VALUE=DURATION:PT6H",
            "X-PUBLISHED-TTL:PT6H",
        ];

        allDays.forEach((dayItem) => {
            const dateParts = dayItem.date?.gregorian?.date?.split("-");
            if (!dateParts || dateParts.length < 3) return;

            const dayNum = parseInt(dateParts[0], 10);
            const monthNum = parseInt(dateParts[1], 10) - 1;
            const yearNum = parseInt(dateParts[2], 10);

            const timings = dayItem.timings || {};

            ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].forEach((prayerKey) => {
                if (!activePrayers.includes(prayerKey)) return;
                const rawTime = timings[prayerKey];
                if (!rawTime) return;

                const cleanTime = rawTime.split(" ")[0];
                const [h, m] = cleanTime.split(":").map(Number);
                const offsetMin = offsets[prayerKey] || 0;

                const azanDate = new Date(yearNum, monthNum, dayNum, h, m + offsetMin, 0, 0);
                const startDate = new Date(azanDate.getTime() - preBuffer * 60 * 1000);
                const endDate = new Date(azanDate.getTime() + postBuffer * 60 * 1000);

                const title = prayerNames[prayerKey] || `${prayerKey} Prayer`;
                const uid = `prayersync-${prayerKey}-${yearNum}-${monthNum + 1}-${dayNum}-${city.replace(/\s+/g, "_")}@prayer-sync.vercel.app`;

                const descriptionLines = [
                    `${title} (${cleanTime})`,
                    `📍 ${city}, ${country}`,
                    preBuffer > 0 ? `⏳ Prep Buffer: -${preBuffer}m (Wudu & Prep)` : "",
                    postBuffer > 0 ? `⏱ Duration: ${postBuffer}m (Iqama & Sunnah)` : "",
                    "",
                    "🔗 Quick Spiritual Links:",
                    "🧭 Qibla Finder: https://qiblafinder.withgoogle.com",
                    "📖 Daily Adhkar: https://sunnah.com/hisn",
                    "",
                    "Powered by PrayerSync (https://prayer-sync.vercel.app)"
                ].filter(Boolean).join("\\n");

                icsLines.push("BEGIN:VEVENT");
                icsLines.push(`UID:${uid}`);
                icsLines.push(`DTSTAMP:${toUTCICSDate(new Date())}`);
                icsLines.push(`DTSTART:${toFloatingICSDate(startDate)}`);
                icsLines.push(`DTEND:${toFloatingICSDate(endDate)}`);
                icsLines.push(`SUMMARY:${title}`);
                icsLines.push(`DESCRIPTION:${descriptionLines}`);
                icsLines.push(`LOCATION:${city}, ${country}`);
                icsLines.push(`STATUS:CONFIRMED`);
                icsLines.push(`TRANSP:${isBusy ? "OPAQUE" : "TRANSPARENT"}`);
                icsLines.push("BEGIN:VALARM");
                icsLines.push("TRIGGER:-PT10M");
                icsLines.push("ACTION:DISPLAY");
                icsLines.push(`DESCRIPTION:Reminder: ${title} in 10 minutes`);
                icsLines.push("END:VALARM");
                icsLines.push("END:VEVENT");
            });
        });

        icsLines.push("END:VCALENDAR");
        const icsContent = icsLines.join("\r\n");

        return new Response(icsContent, {
            status: 200,
            headers: {
                "Content-Type": "text/calendar; charset=utf-8",
                "Content-Disposition": `inline; filename="prayersync-${city.toLowerCase()}.ics"`,
                "Cache-Control": "public, max-age=3600, s-maxage=3600",
            },
        });
    } catch (error) {
        console.error("Live Webcal feed generation error:", error);
        return NextResponse.json({ error: "Failed to generate dynamic calendar feed" }, { status: 500 });
    }
}
