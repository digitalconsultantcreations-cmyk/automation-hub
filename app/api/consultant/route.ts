import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { linkifyPartnerMentions } from "@/lib/linkify-partners";
import { CONSULTANT_SYSTEM_PROMPT } from "@/lib/consultant-prompt";

export const runtime = "edge";

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response(
      "The AI Business Consultant isn't available yet — check back soon.",
      { status: 200, headers: { "Content-Type": "text/plain" } }
    );
  }

  const { messages } = await req.json();

  try {
    const result = streamText({
      model: google("gemini-2.0-flash"),
      system: CONSULTANT_SYSTEM_PROMPT,
      messages,
    });

    return result.toTextStreamResponse({
      async onFinish({ text }) {
        linkifyPartnerMentions(text);
      },
    });
  } catch (err) {
    console.error("[consultant] API call failed:", err);
    return new Response(
      "The AI Business Consultant is temporarily unavailable — please try again later.",
      { status: 200, headers: { "Content-Type": "text/plain" } }
    );
  }
}
