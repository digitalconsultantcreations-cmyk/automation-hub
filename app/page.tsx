import IntegrationMarketplace from "@/components/IntegrationMarketplace";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <IntegrationMarketplace />
      <AffiliateDisclosure />
    </main>
  );
}
