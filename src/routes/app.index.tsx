import { createFileRoute } from "@tanstack/react-router";
import { StatCards } from "@/components/dashboard/StatCards";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { AllocationPie } from "@/components/dashboard/AllocationPie";
import { TokenBalances } from "@/components/web3/TokenBalances";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Dashboard — ChainPilot" },
      { name: "description", content: "Portfolio value, PnL, risk and wallet health at a glance." },
    ],
  }),
  component: AppDashboard,
});

function AppDashboard() {
  return (
    <>
      <PageHeader eyebrow="Dashboard" title="Portfolio overview" subtitle="Live snapshot of your on-chain position." />
      <StatCards />
      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2"><PortfolioChart /></div>
        <AllocationPie />
      </section>
      <section className="mt-4 grid gap-4">
        <TokenBalances />
      </section>
    </>
  );
}

function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <header className="mb-6">
      <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--sakura)]">{eyebrow}</div>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">{subtitle}</p>
    </header>
  );
}