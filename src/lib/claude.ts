import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function analyzeImage(
  base64Image: string,
  mediaType: "image/jpeg" | "image/png" | "image/gif" | "image/webp",
  prompt: string
): Promise<string> {
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
