"use client";

import { useMemo, useState } from "react";
import { PARTNERS, type Partner, type PartnerCategory } from "@/lib/partners";
import { InlineAffiliateBadge } from "@/components/AffiliateDisclosure";

const CATEGORIES: PartnerCategory[] = [
  "WhatsApp Automation",
  "All-In-One CRM",
  "AI Forms",
  "Booking Systems",
  "Funnel Builder",
  "Video/Content AI",
];

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {partner.name}
          </h3>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {partner.category}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {partner.description}
        </p>
      </div>

      <div className="mt-4 flex flex-col items-start gap-1.5">
        
          href={`/api/go/${partner.slug}`}
          rel="noopener"
          className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
        >
          {partner.ctaLabel}
        </a>
        <InlineAffiliateBadge />
      </div>
    </div>
  );
}

export default function IntegrationMarketplace() {
  const [activeCategory, setActiveCategory] = useState<PartnerCategory | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return PARTNERS.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesQuery =
        query.trim().length === 0 ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Integration Marketplace
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Activate the tools your automation blueprint recommends.
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search integrations…"
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 sm:w-64"
        />
        <div className="flex flex-wrap gap-2">
          {(["All", ...CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500">No integrations match your search.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((partner) => (
            <PartnerCard key={partner.slug} partner={partner} />
          ))}
        </div>
      )}
    </section>
  );
}
