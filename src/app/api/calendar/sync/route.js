import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { events, accessToken, timeZone, isBusy } = body;

        if (!accessToken) {
            return NextResponse.json(
                { success: false, message: "Missing Google Access Token. Please connect your Google account." },
                { status: 401 }
            );
        }

        if (!events || !Array.isArray(events) || events.length === 0) {
            return NextResponse.json(
                { success: false, message: "No prayer events provided for sync." },
                { status: 400 }
            );
        }

        const tz = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
        const transparency = isBusy === false ? "transparent" : "opaque";
        let createdCount = 0;
        let failedCount = 0;

        const chunkSize = 5;
        for (let i = 0; i < events.length; i += chunkSize) {
            const chunk = events.slice(i, i + chunkSize);
            const promises = chunk.map(async (ev) => {
                const startStr = typeof ev.start === "string" && !ev.start.endsWith("Z")
                    ? ev.start
                    : new Date(ev.start).toISOString().replace("Z", "");
                
                const endStr = typeof ev.end === "string" && !ev.end.endsWith("Z")
                    ? ev.end
                    : new Date(ev.end || new Date(ev.start).getTime() + 40 * 60 * 1000).toISOString().replace("Z", "");

                const googleEvent = {
                    summary: ev.title,
                    description: ev.description || `${ev.title} - PrayerSync`,
                    location: ev.location || "",
                    transparency: ev.transparency || transparency,
                    start: {
                        dateTime: startStr,
                        timeZone: tz,
                    },
                    end: {
                        dateTime: endStr,
                        timeZone: tz,
                    },
                    reminders: {
                        useDefault: false,
                        overrides: [
                            { method: "popup", minutes: 10 },
                        ],
                    },
                };

                const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(googleEvent),
                });

                if (res.ok) {
                    createdCount++;
                } else {
                    const errData = await res.json().catch(() => ({}));
                    console.error("Failed to insert event into Google Calendar:", errData);
                    failedCount++;
                }
            });

            await Promise.all(promises);
        }

        if (createdCount === 0 && failedCount > 0) {
            return NextResponse.json(
                { success: false, message: "Google Calendar sync failed. Token might be invalid or expired." },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            createdCount,
            failedCount,
            message: `Successfully synced ${createdCount} prayer times to Google Calendar!`,
        });
    } catch (error) {
        console.error("Calendar sync API error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
