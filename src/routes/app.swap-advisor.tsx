import { useEffect, useState } from "react";
// import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  Wand2,
  TrendingUp,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useAppKitAccount } from "@reown/appkit/react";
import { createApiClient } from "@/lib/apiClient";


// export const Route = createFileRoute("/app/swap-advisor")({
//   head: () => ({
//     meta: [
//       { title: "AI Swap Advisor - ChainPilot" },
//       {
//         name: "description",
//         content:
//           "AI-powered swap suggestions based on your portfolio, market trends, and on-chain signals.",
//       },
//     ],
//   }),
//   component: SwapAdvisorPage,
// });

type Strategy = "Conservative" | "Balanced" | "Aggressive";
type Risk = "Low" | "Medium" | "High";

const defaultPortfolio = {
  total: 0,
  risk: "Medium" as Risk,
  top: [
    { sym: "---", pct: 0 },
  ],
};

function riskTone(r: Risk) {
  if (r === "Low") return "text-[color:var(--bullish)] bg-[color:var(--bullish)]/10 border-[color:var(--bullish)]/30";
  if (r === "Medium") return "text-[color:var(--sakura)] bg-[color:var(--sakura)]/10 border-[color:var(--sakura)]/30";
  return "text-[color:var(--bearish)] bg-[color:var(--bearish)]/10 border-[color:var(--bearish)]/30";
}

export default function SwapAdvisorPage() {
  const [strategy, setStrategy] = useState<Strategy>("Balanced");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isConnected } = useAppKitAccount();

  const [feedData, setFeedData] = useState<any>(null);
  const [portfolioData, setPortfolioData] = useState(defaultPortfolio);

  useEffect(() => {
    getWalletFeed();
  }, [strategy]);

  const getWalletFeed = async () => {
    try {
      setIsLoading(true);
      const res = await createApiClient().get(`/swap-intelligence-pro?mode=${strategy.toLowerCase()}`);
      console.log("User wallet feed data:", res);
      setFeedData(res?.data?.data);
      
      // Update portfolio data from API
      if (res?.data?.data?.portfolio) {
        const apiPortfolio = res.data.data.portfolio;
        setPortfolioData({
          total: apiPortfolio.totalValueUsd,
          risk: apiPortfolio.riskLevel.charAt(0).toUpperCase() + apiPortfolio.riskLevel.slice(1) as Risk,
          top: apiPortfolio.topAllocations.map((a: any) => ({
            sym: a.symbol,
            pct: a.allocationPercent
          }))
        });
      }
      
      // Update strategy based on API response
      if (res?.data?.data?.mode) {
        const mode = res.data.data.mode;
        const strategyMap: Record<string, Strategy> = {
          conservative: "Conservative",
          balanced: "Balanced",
          aggressive: "Aggressive"
        };
        setStrategy(strategyMap[mode] || "Balanced");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      getWalletFeed();
    } else {
      setIsLoading(false);
    }
  }, [isConnected]);

  return (
    <>
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[color:var(--sakura)]">
          AI Swap Advisor
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-gradient-neon/20 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-foreground">
            <Sparkles className="h-3 w-3" /> AI POWERED
          </span>
        </div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">AI Swap Advisor</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Smart swap suggestions based on your portfolio, market trends, and on-chain signals.
        </p>
      </header>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gradient-neon border-r-gradient-neon animate-spin" />
              <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-primary/50 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Analyzing your portfolio</p>
              <p className="text-xs text-muted-foreground mt-1">Fetching AI recommendations...</p>
            </div>
          </div>
        </div>
      ) : (
        <>
      {/* Portfolio Snapshot */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="glass rounded-2xl p-5 md:col-span-1">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Portfolio Value</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight">
            ${portfolioData.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium">
            <ShieldCheck className="h-3 w-3 text-[color:var(--sakura)]" />
            Risk: <span className="text-foreground">{portfolioData.risk}</span>
          </div>
        </div>
        <div className="glass rounded-2xl p-5 md:col-span-2">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Top Allocations</div>
          <div className="mt-3 space-y-3">
            {portfolioData.top.map((t) => (
              <div key={t.sym}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{t.sym}</span>
                  <span className="text-muted-foreground">{t.pct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full bg-gradient-neon" style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Insight banner */}
      <section className="mt-6">
        <div className="animated-border rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-neon shadow-neon">
              <Wand2 className="h-4 w-4 text-primary-foreground" />
            </span>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">AI Insight</div>
              <p className="mt-1 text-sm leading-relaxed">
                {feedData?.insight || "Analyzing your portfolio for optimization opportunities..."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Mode */}
      <section className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Strategy Mode</div>
          <div className="mt-1 text-sm text-muted-foreground">Suggestions adapt to your selected style.</div>
        </div>
        <div className="inline-flex rounded-xl glass p-1">
          {(["Conservative", "Balanced", "Aggressive"] as Strategy[]).map((s) => (
            <button
              key={s}
              onClick={() => setStrategy(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                strategy === s
                  ? "bg-gradient-neon text-primary-foreground shadow-neon"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Suggested Swaps */}
      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {(feedData?.suggestions || []).map((s: any, idx: number) => {
          const sugId = s.tokenIn + s.tokenOut + idx;
          const isOpen = expanded === sugId;
          const riskLower = s.risk.toLowerCase() as Risk;
          const riskDisplay = riskLower.charAt(0).toUpperCase() + riskLower.slice(1) as Risk;
          
          return (
            <div key={sugId} className="group glass rounded-2xl p-5 transition hover:bg-white/[0.04]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                  <span>{s.tokenIn}</span>
                  <ArrowRight className="h-4 w-4 text-[color:var(--sakura)]" />
                  <span>{s.tokenOut}</span>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${riskTone(riskDisplay)}`}>
                  {riskDisplay === "High" ? <AlertTriangle className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}
                  {riskDisplay} Risk
                </span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Suggested</div>
                  <div className="mt-1 text-sm font-semibold">{s.percent}%</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Impact</div>
                  <div className="mt-1 text-sm font-medium">{s.impact}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Confidence</div>
                  <div className="mt-1 flex items-center gap-1 text-sm font-semibold">
                    <TrendingUp className="h-3 w-3 text-[color:var(--bullish)]" />
                    {s.confidence}%
                  </div>
                </div>
              </div>

              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <div className="h-full bg-gradient-neon" style={{ width: `${s.confidence}%` }} />
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => setExpanded(isOpen ? null : sugId)}
                  className="inline-flex items-center gap-1.5 rounded-xl glass px-3 py-2 text-xs font-semibold hover:bg-white/10"
                >
                  View Reasoning
                  <ChevronDown className={`h-3.5 w-3.5 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <a
                  href="https://app.uniswap.org/swap"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-neon px-3 py-2 text-xs font-semibold text-primary-foreground shadow-neon transition-transform hover:scale-[1.02]"
                >
                  Swap via Uniswap
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <div
                className={`grid overflow-hidden transition-all duration-300 ${
                  isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Why this swap</div>
                    <p className="mt-1 leading-relaxed text-foreground/90">{s.reasoning}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Disclaimer */}
      <p className="mt-6 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Info className="h-3 w-3" />
        This app does not execute trades. You remain in full control of all actions.
      </p>
        </>
      )}
    </>
  );
}