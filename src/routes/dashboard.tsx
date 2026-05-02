import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatCards } from "@/components/dashboard/StatCards";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { AllocationPie } from "@/components/dashboard/AllocationPie";
import { RiskExposure } from "@/components/dashboard/RiskExposure";
import { WalletIntelligence } from "@/components/dashboard/WalletIntelligence";
import { Recommendations } from "@/components/dashboard/Recommendations";
import { TransactionFeed } from "@/components/dashboard/TransactionFeed";
import { TokenBalances } from "@/components/web3/TokenBalances";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — ChainPilot" },
      { name: "description", content: "Your AI-powered portfolio dashboard: portfolio value, PnL, risk and wallet health." },
      { property: "og:title", content: "ChainPilot Dashboard" },
      { property: "og:description", content: "AI-powered portfolio analysis with real-time risk and allocation insights." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar />
      <main className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--sakura)]">Dashboard</div>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">Your portfolio, decoded</h1>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">A live view of your on-chain footprint with AI-graded risk and recommendations.</p>
            </div>
            <div className="text-xs text-muted-foreground">Last sync · 12s ago</div>
          </header>

          <StatCards />

          <section className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2"><PortfolioChart /></div>
            <AllocationPie />
          </section>

          <section className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2"><WalletIntelligence /></div>
            <RiskExposure />
          </section>

          <section className="mt-4">
            <Recommendations />
          </section>

          <section className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2"><TransactionFeed /></div>
            <TokenBalances />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}