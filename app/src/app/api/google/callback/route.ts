import { NextResponse } from "next/server";
import { getTokensFromCode, getOrCreateAppFolder } from "@/lib/google-drive";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';

// Lazy Supabase client
let _supabase: SupabaseClient | null = null;
function getSupabase() {
    if (!_supabase) {
        _supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
    }
    return _supabase;
}

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state"); // User ID
    const error = searchParams.get("error");

    if (error) {
        console.error("Google OAuth error:", error);
        return NextResponse.redirect(`${origin}/?drive_error=true`);
    }

    if (!code || !state) {
        return NextResponse.redirect(`${origin}/?drive_error=missing_params`);
    }

    try {
        const tokens = await getTokensFromCode(code);

        if (!tokens.access_token) {
            throw new Error("No access token received");
        }

        const folderId = await getOrCreateAppFolder(
            tokens.access_token,
            tokens.refresh_token || undefined
        );

        const supabase = getSupabase();

        await supabase
            .from("sitesnap_profiles")
            .update({
                google_drive_connected: true,
                google_drive_folder_id: folderId,
                google_refresh_token: tokens.refresh_token,
            })
            .eq("id", state);

        return NextResponse.redirect(`${origin}/?drive_connected=true`);
    } catch (err) {
        console.error("Google callback error:", err);
        return NextResponse.redirect(`${origin}/?drive_error=callback_failed`);
    }
}
