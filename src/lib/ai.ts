import { GoogleGenAI } from "@google/genai";
import Anthropic from "@anthropic-ai/sdk";

export type ImageMediaType =
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/webp";

export async function analyzeImage(
  base64Image: string,
  mediaType: ImageMediaType,
  prompt: string,
  provider: "gemini" | "claude" = "gemini",
  apiKey?: string
): Promise<string> {
  if (provider === "claude") {
    return analyzeWithClaude(base64Image, mediaType, prompt, apiKey);
  }
  return analyzeWithGemini(base64Image, mediaType, prompt, apiKey);
}

async function analyzeWithGemini(
  base64Image: string,
  mediaType: ImageMediaType,
  prompt: string,
  apiKey?: string
): Promise<string> {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("No Gemini API key configured");
  }

  const ai = new GoogleGenAI({ apiKey: key });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData: {
          mimeType: mediaType,
          data: base64Image,
        },
      },
      { text: prompt },
    ],
  });

  const text = response.text;
  if (!text) {
    throw new Error("No text response from Gemini");
  }
  return text;
}

async function analyzeWithClaude(
  base64Image: string,
  mediaType: ImageMediaType,
  prompt: string,
  apiKey?: string
): Promise<string> {
  const client = new Anthropic(apiKey ? { apiKey } : undefined);
  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mediaType,
              data: base64Image,
            },
          },
          {
            type: "text",
            text: prompt,
          },
        ],
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }
  return textBlock.text;
}
