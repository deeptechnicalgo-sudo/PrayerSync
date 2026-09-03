import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { accessToken } = body;

        if (!accessToken) {
            return NextResponse.json(
                { success: false, message: "Missing Google Access Token. Please connect your Google account." },
                { status: 401 }
            );
        }

        let deletedCount = 0;

        const queries = ["PrayerSync", "Prayer", "صلاة"];
        const eventIdsToDelete = new Set();

        for (const q of queries) {
            const listUrl = `https://www.googleapis.com/calendar/v3/calendars/primary/events?q=${encodeURIComponent(q)}&maxResults=250`;
            const listRes = await fetch(listUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (listRes.ok) {
                const listData = await listRes.json();
                if (listData?.items && Array.isArray(listData.items)) {
                    listData.items.forEach((item) => {
                        const desc = item.description || "";
                        const summary = item.summary || "";
                        if (
                            desc.includes("PrayerSync") ||
                            summary.includes("Prayer") ||
                            summary.includes("صلاة")
                        ) {
                            eventIdsToDelete.add(item.id);
                        }
                    });
                }
            }
        }

        const ids = Array.from(eventIdsToDelete);
        const chunkSize = 10;
        for (let i = 0; i < ids.length; i += chunkSize) {
            const chunk = ids.slice(i, i + chunkSize);
            const deletePromises = chunk.map(async (id) => {
                const delRes = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${encodeURIComponent(id)}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (delRes.ok || delRes.status === 404) {
                    deletedCount++;
                }
            });
            await Promise.all(deletePromises);
        }

        return NextResponse.json({
            success: true,
            deletedCount,
            message: `Wipe & Reset complete! Cleaned up ${deletedCount} prayer event(s) from your calendar.`,
        });
    } catch (error) {
        console.error("Calendar cleanup error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Failed to cleanup calendar" },
            { status: 500 }
        );
    }
}
