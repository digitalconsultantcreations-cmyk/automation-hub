export default function AffiliateDisclosure() {
  return (
    <footer className="mx-auto max-w-5xl px-4 py-6 text-center">
      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-500">
        Disclosure: Digital Consultant Creations may earn a commission when
        you sign up for a tool through one of our activation links, at no
        additional cost to you.
      </p>
    </footer>
  );
}

export function InlineAffiliateBadge() {
  return (
    <span
      title="Digital Consultant Creations may earn a commission if you sign up through this link, at no additional cost to you."
      className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400"
    >
      Affiliate link
    </span>
  );
}