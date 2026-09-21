import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { getPartnerBySlug } from "@/lib/partners";

export const runtime = "edge";

interface RouteContext {
  params: { slug: string };
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  const { slug } = params;

  if (!slug || typeof slug !== "string") {
    return NextResponse.redirect(new URL("/tools", req.url), 307);
  }

  const partner = getPartnerBySlug(slug);

  if (!partner) {
    return NextResponse.redirect(new URL("/tools", req.url), 307);
  }

  const trackClick = async () => {
    const day = new Date().toISOString().slice(0, 10);
    await Promise.all([
      kv.incr(`clicks:total:${partner.slug}`),
      kv.incr(`clicks:daily:${partner.slug}:${day}`),
      kv.lpush(
        `clicks:log:${partner.slug}`,
        JSON.stringify({
          ts: Date.now(),
          referer: req.headers.get("referer") ?? null,
          ua: req.headers.get("user-agent") ?? null,
        })
      ),
      kv.ltrim(`clicks:log:${partner.slug}`, 0, 499),
    ]);
  };

  try {
    await Promise.race([
      trackClick(),
      new Promise((resolve) => setTimeout(resolve, 150)),
    ]);
  } catch (err) {
    console.error(`[go/${slug}] click tracking failed:`, err);
  }

  let destination: URL;
  try {
    destination = new URL(partner.destinationUrl);
  } catch {
    console.error(`[go/${slug}] invalid destinationUrl: ${partner.destinationUrl}`);
    return NextResponse.redirect(new URL("/tools", req.url), 307);
  }

  return NextResponse.redirect(destination, 307);
}
