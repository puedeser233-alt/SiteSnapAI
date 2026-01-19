import { NextResponse } from "next/server";
import { getAuthUrl } from "@/lib/google-drive";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { userId } = await request.json();

        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }

        // Generate auth URL with user ID as state
        const authUrl = getAuthUrl(userId);

        return NextResponse.json({ url: authUrl });
    } catch (error) {
        console.error("Google auth error:", error);
        return NextResponse.json(
            { error: "Error generating auth URL" },
            { status: 500 }
        );
    }
}
