// app/api/consultant/route.ts
import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { linkifyPartnerMentions } from "@/lib/linkify-partners";

export const runtime = "edge";

export const CONSULTANT_SYSTEM_PROMPT = `
You are the AI Business Consultant embedded in a SaaS Business Automation Hub.
Your job is to help small-business users design automation workflows (WhatsApp
messaging, CRM pipelines, booking flows, lead-capture forms) and recommend
concrete tools to implement them.

TOOL RECOMMENDATION FORMAT (required):
Whenever you recommend a specific tool that exists in our integration catalog,
write it as an internal markdown link using this exact format:

  [Tool Name](/api/go/slug)

Valid slugs and names — use ONLY these when linking:
  - Gallabox        -> /api/go/gallabox        (WhatsApp automation, team inbox)
  - WANotifier       -> /api/go/wanotifier       (WhatsApp bulk notifications)
  - Respond.io       -> /api/go/respondio        (omnichannel conversations)
  - GoHighLevel      -> /api/go/gohighlevel      (all-in-one CRM/funnels)
  - Jotform          -> /api/go/jotform          (AI-assisted forms)
  - SimplyBook.me    -> /api/go/simplybook       (appointment booking)
  - Systeme.io       -> /api/go/systemeio        (funnel/course builder)
  - Submagic         -> /api/go/submagic         (AI video captioning)

RULES:
1. Only link a tool the FIRST time you actively recommend it in a given answer.
   Do not link every incidental mention of a brand name.
2. Never invent a slug for a tool that isn't in the list above. If the best
   recommendation isn't in the catalog, say so plainly and describe the tool
   in plain text with no link.
3. Be honest about trade-offs. If a catalog tool is a mediocre fit, say that
   and suggest the closer non-catalog alternative in plain text — do not
   force a catalog recommendation just because it's monetized.
4. Keep recommendations grounded in the user's stated use case (business
   type, budget, technical comfort) rather than defaulting to the same tool
   every time.
5. Disclose plainly if asked whether you earn a commission on a link: yes,
   these are affiliate links, clearly labeled as such in the UI footer.
`;

export async function POST(req: Request) {
  // Fail gracefully if no key is configured yet instead of throwing a raw
  // 500 the frontend can't handle nicely.
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response(
      "The AI Business Consultant isn't available yet — check back soon.",
      { status: 200, headers: { "Content-Type": "text/plain" } }
    );
  }

  const { messages } = await req.json();

  try {
    const result = streamText({
      model: google("gemini-2.0-flash"), // free tier via Google AI Studio
      system: CONSULTANT_SYSTEM_PROMPT,
      messages,
    });

    // Post-process the full text once streaming completes, so any raw brand
    // mentions the model didn't format itself still become tracked links.
    // (For token-by-token streaming UIs, run linkifyPartnerMentions on the
    // final accumulated string client-side instead of here.)
    return result.toTextStreamResponse({
      async onFinish({ text }) {
        linkifyPartnerMentions(text); // hook for logging/analytics if desired
      },
    });
  } catch (err) {
    // Covers out-of-quota accounts, invalid keys, and rate limit errors —
    // these throw at request time, not at startup, so the earlier
    // "no key configured" check above doesn't catch them.
    console.error("[consultant] API call failed:", err);
    return new Response(
      "The AI Business Consultant is temporarily unavailable — please try again later.",
      { status: 200, headers: { "Content-Type": "text/plain" } }
    );
  }
}
