import { PARTNERS } from "@/lib/partners";

const NEGATIVE_CONTEXT_WINDOW = 40;
const NEGATIVE_CONTEXT_PATTERN =
  /\b(not|avoid|instead of|rather than|worse than|pricier than|more expensive than|skip|don't use|steer clear of|isn't a good fit|wouldn't recommend|weaker than|behind|lacks?)\b/i;

export function linkifyPartnerMentions(rawText: string): string {
  const linkPlaceholders: string[] = [];
  const withPlaceholders = rawText.replace(/\[[^\]]+\]\([^)]+\)/g, (match) => {
    linkPlaceholders.push(match);
    return `__LINK_PLACEHOLDER_${linkPlaceholders.length - 1}__`;
  });

  let processed = withPlaceholders;

  for (const partner of PARTNERS) {
    const escaped = partner.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(?<!\\[)\\b${escaped}\\b(?!\\]\\()`, "gi");

    processed = processed.replace(pattern, (match, offset: number) => {
      const windowStart = Math.max(0, offset - NEGATIVE_CONTEXT_WINDOW);
      const preceding = processed.slice(windowStart, offset);

      if (NEGATIVE_CONTEXT_PATTERN.test(preceding)) {
        return match;
      }
      return `[${partner.name}](/api/go/${partner.slug})`;
    });
  }

  processed = processed.replace(
    /__LINK_PLACEHOLDER_(\d+)__/g,
    (_, i) => linkPlaceholders[Number(i)]
  );

  return processed;
}
