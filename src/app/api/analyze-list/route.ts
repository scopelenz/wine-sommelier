import { NextRequest, NextResponse } from "next/server";
import { analyzeImage } from "@/lib/claude";
import { buildWineListPrompt } from "@/lib/prompts";
import { WineListAnalysis, TastePreferences } from "@/types/wine";

export async function POST(request: NextRequest) {
  try {
    const { image, mediaType, foodContext, preferences } =
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
    const response = await analyzeImage(image, mediaType, prompt);

    const analysis: WineListAnalysis = JSON.parse(response);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Wine list analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze wine list. Please try again." },
      { status: 500 }
    );
  }
}
