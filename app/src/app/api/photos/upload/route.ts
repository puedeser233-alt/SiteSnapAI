import { NextResponse } from "next/server";
import { uploadPhotoToDrive, createProjectFolder } from "@/lib/google-drive";
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

export async function POST(request: Request) {
    try {
        const {
            userId,
            projectId,
            imageData,
            fileName,
            latitude,
            longitude,
            address
        } = await request.json();

        if (!userId || !projectId || !imageData || !fileName) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const supabase = getSupabase();

        // Get user's Drive credentials and project info
        const [profileResult, projectResult] = await Promise.all([
            supabase
                .from("sitesnap_profiles")
                .select("google_drive_folder_id, google_refresh_token")
                .eq("id", userId)
                .single(),
            supabase
                .from("sitesnap_projects")
                .select("name, client_name, drive_folder_id")
                .eq("id", projectId)
                .single(),
        ]);

        const profile = profileResult.data;
        const project = projectResult.data;

        if (!profile?.google_drive_folder_id || !profile?.google_refresh_token) {
            return NextResponse.json(
                { error: "Google Drive not connected" },
                { status: 400 }
            );
        }

        const accessToken = profile.google_refresh_token;

        // Ensure project has a Drive folder
        let projectFolderId = project?.drive_folder_id;

        if (!projectFolderId && project) {
            projectFolderId = await createProjectFolder(
                accessToken,
                profile.google_refresh_token,
                profile.google_drive_folder_id,
                project.name,
                project.client_name
            );

            await supabase
                .from("projects")
                .update({ drive_folder_id: projectFolderId })
                .eq("id", projectId);
        }

        if (!projectFolderId) {
            return NextResponse.json(
                { error: "Could not create project folder" },
                { status: 500 }
            );
        }

        // Upload photo to Drive
        const uploadResult = await uploadPhotoToDrive(
            accessToken,
            profile.google_refresh_token,
            projectFolderId,
            fileName,
            imageData
        );

        // Save photo record to database
        const { data: photo, error: photoError } = await supabase
            .from("sitesnap_photos")
            .insert({
                project_id: projectId,
                user_id: userId,
                file_name: fileName,
                drive_file_id: uploadResult.fileId,
                latitude,
                longitude,
                address,
                captured_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (photoError) throw photoError;

        await supabase.rpc("sitesnap_increment_photo_count", { p_project_id: projectId });

        return NextResponse.json({
            success: true,
            photo,
            driveLink: uploadResult.webViewLink,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Error uploading photo" },
            { status: 500 }
        );
    }
}
