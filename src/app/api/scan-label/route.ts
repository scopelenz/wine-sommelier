import { NextRequest, NextResponse } from "next/server";
import { analyzeImage, extractJSON } from "@/lib/ai";
import { buildLabelScanPrompt } from "@/lib/prompts";
import { WineInfo, TastePreferences } from "@/types/wine";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { image, mediaType, preferences, provider, apiKey } =
      await request.json();

    if (!image || !mediaType) {
      return NextResponse.json(
        { error: "Image and media type are required" },
        { status: 400 }
      );
    }

    const prompt = buildLabelScanPrompt(
      preferences as TastePreferences | null
    );
    const response = await analyzeImage(
      image,
      mediaType,
      prompt,
      provider || "gemini",
      apiKey
    );

    const wineInfo: WineInfo = JSON.parse(extractJSON(response));

    return NextResponse.json({ wine: wineInfo });
  } catch (error) {
    console.error("Label scan error:", error);
    return NextResponse.json(
      { error: "Failed to analyze wine label. Please try again." },
      { status: 500 }
    );
  }
}
