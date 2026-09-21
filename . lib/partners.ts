export type PartnerCategory =
  | "WhatsApp Automation"
  | "All-In-One CRM"
  | "AI Forms"
  | "Booking Systems"
  | "Funnel Builder"
  | "Video/Content AI";

export interface Partner {
  slug: string;
  name: string;
  category: PartnerCategory;
  description: string;
  destinationUrl: string;
  ctaLabel: "Activate Integration" | "Start Free Trial";
  logoKey?: string;
}

export const PARTNERS: Partner[] = [
  {
    slug: "gallabox",
    name: "Gallabox",
    category: "WhatsApp Automation",
    description: "WhatsApp Business API automation, shared team inbox, and chatbot flows.",
    destinationUrl: "https://gallabox.com?ref=nwixntq",
    ctaLabel: "Start Free Trial",
    logoKey: "gallabox",
  },
  {
    slug: "wanotifier",
    name: "WANotifier",
    category: "WhatsApp Automation",
    description: "Bulk WhatsApp notifications and template-based campaign sending.",
    destinationUrl: "https://wanotifier.com/?ref=1023",
    ctaLabel: "Start Free Trial",
    logoKey: "wanotifier",
  },
  {
    slug: "respondio",
    name: "Respond.io",
    category: "WhatsApp Automation",
    description: "Omnichannel conversation management across WhatsApp, IG, and more.",
    destinationUrl: "https://get.respond.io/jg7dtk4l8gfh",
    ctaLabel: "Start Free Trial",
    logoKey: "respondio",
  },
  {
    slug: "gohighlevel",
    name: "GoHighLevel",
    category: "All-In-One CRM",
    description: "Full CRM, pipeline, funnel, and marketing automation suite for agencies.",
    destinationUrl: "https://gohighlevel.com/?fp_ref=dwight56",
    ctaLabel: "Start Free Trial",
    logoKey: "gohighlevel",
  },
  {
    slug: "jotform",
    name: "Jotform",
    category: "AI Forms",
    description: "Drag-and-drop AI-assisted form builder with integrations and payment collection.",
    destinationUrl: "https://jotform.com/?partner=digitalconsultantcreations",
    ctaLabel: "Start Free Trial",
    logoKey: "jotform",
  },
  {
    slug: "simplybook",
    name: "SimplyBook.me",
    category: "Booking Systems",
    description: "Appointment scheduling, booking pages, and reminders for service businesses.",
    destinationUrl: "https://affiliate.simplybook.me/idevaffiliate.php?id=9575",
    ctaLabel: "Start Free Trial",
    logoKey: "simplybook",
  },
  {
    slug: "systemeio",
    name: "Systeme.io",
    category: "Funnel Builder",
    description: "All-in-one funnel, email, and course platform for small businesses.",
    destinationUrl: "https://systeme.io/?sa=sa0267961796c7400a249ff124937405da927b9d6a",
    ctaLabel: "Start Free Trial",
    logoKey: "systemeio",
  },
  {
    slug: "submagic",
    name: "Submagic",
    category: "Video/Content AI",
    description: "AI captioning and short-form video editing for content creators.",
    destinationUrl: "https://submagic.co/?via=dwight82",
    ctaLabel: "Start Free Trial",
    logoKey: "submagic",
  },
];

export function getPartnerBySlug(slug: string): Partner | undefined {
  return PARTNERS.find((p) => p.slug === slug);
}
