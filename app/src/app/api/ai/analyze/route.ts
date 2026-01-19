import { NextResponse } from "next/server";
import { analyzeImageForNaming, generatePhotoDescription } from "@/lib/openai";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { imageData, includeDescription } = await request.json();

        if (!imageData) {
            return NextResponse.json(
                { error: "Missing image data" },
                { status: 400 }
            );
        }

        // Generate filename using AI
        const fileName = await analyzeImageForNaming(imageData);

        // Optionally generate description
        let description = null;
        if (includeDescription) {
            description = await generatePhotoDescription(imageData);
        }

        return NextResponse.json({
            fileName,
            description,
        });
    } catch (error) {
        console.error("AI analyze error:", error);
        return NextResponse.json(
            { error: "Error analyzing image" },
            { status: 500 }
        );
    }
}
