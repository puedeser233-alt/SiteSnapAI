import { google } from "googleapis";

// Google OAuth2 client configuration
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_APP_URL}/api/google/callback`
);

// Scopes needed for Drive file access
export const SCOPES = [
    "https://www.googleapis.com/auth/drive.file", // Only files created by app
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
];

// Generate auth URL for OAuth flow
export function getAuthUrl(state: string) {
    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
        state,
        prompt: "consent",
    });
}

// Exchange code for tokens
export async function getTokensFromCode(code: string) {
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
}

// Create Drive client with user's tokens
export function getDriveClient(accessToken: string, refreshToken?: string) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
    });
    return google.drive({ version: "v3", auth });
}

// Create or get SiteSnap folder
export async function getOrCreateAppFolder(
    accessToken: string,
    refreshToken?: string
) {
    const drive = getDriveClient(accessToken, refreshToken);

    // Search for existing SiteSnap folder
    const response = await drive.files.list({
        q: "name='SiteSnap' and mimeType='application/vnd.google-apps.folder' and trashed=false",
        fields: "files(id, name)",
    });

    if (response.data.files && response.data.files.length > 0) {
        return response.data.files[0].id;
    }

    // Create new folder
    const folder = await drive.files.create({
        requestBody: {
            name: "SiteSnap",
            mimeType: "application/vnd.google-apps.folder",
        },
        fields: "id",
    });

    return folder.data.id;
}

// Create project subfolder
export async function createProjectFolder(
    accessToken: string,
    refreshToken: string | undefined,
    parentFolderId: string,
    projectName: string,
    clientName: string
) {
    const drive = getDriveClient(accessToken, refreshToken);

    const folderName = `${clientName} - ${projectName}`;

    const folder = await drive.files.create({
        requestBody: {
            name: folderName,
            mimeType: "application/vnd.google-apps.folder",
            parents: [parentFolderId],
        },
        fields: "id",
    });

    return folder.data.id;
}

// Upload photo to Drive
export async function uploadPhotoToDrive(
    accessToken: string,
    refreshToken: string | undefined,
    folderId: string,
    fileName: string,
    imageData: string // Base64 data URL
) {
    const drive = getDriveClient(accessToken, refreshToken);

    // Convert base64 to buffer
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const file = await drive.files.create({
        requestBody: {
            name: fileName,
            parents: [folderId],
        },
        media: {
            mimeType: "image/jpeg",
            body: require("stream").Readable.from(buffer),
        },
        fields: "id, webViewLink",
    });

    return {
        fileId: file.data.id,
        webViewLink: file.data.webViewLink,
    };
}

// List files in a folder
export async function listFolderFiles(
    accessToken: string,
    refreshToken: string | undefined,
    folderId: string
) {
    const drive = getDriveClient(accessToken, refreshToken);

    const response = await drive.files.list({
        q: `'${folderId}' in parents and trashed=false`,
        fields: "files(id, name, mimeType, thumbnailLink, webViewLink, createdTime)",
        orderBy: "createdTime desc",
    });

    return response.data.files || [];
}

// Delete file from Drive
export async function deleteFileFromDrive(
    accessToken: string,
    refreshToken: string | undefined,
    fileId: string
) {
    const drive = getDriveClient(accessToken, refreshToken);
    await drive.files.delete({ fileId });
}
