import { NextRequest, NextResponse } from "next/server";
import { analyzeImage, extractJSON } from "@/lib/ai";
import { buildWineListPrompt } from "@/lib/prompts";
import { WineListAnalysis, TastePreferences } from "@/types/wine";

export async function POST(request: NextRequest) {
  try {
    const { image, mediaType, foodContext, preferences, provider, apiKey } =
      await request.json();

    if (!image || !mediaType) {
      return NextResponse.json(
        { error: "Image and media type are required" },
        { status: 400 }
      );
    }

    const prompt = buildWineListPrompt(
      foodContext,
      preferences as TastePreferences | null
    );
    const response = await analyzeImage(
      image,
      mediaType,
      prompt,
      provider || "gemini",
      apiKey
    );

    const analysis: WineListAnalysis = JSON.parse(extractJSON(response));

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Wine list analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze wine list. Please try again." },
      { status: 500 }
    );
  }
}
