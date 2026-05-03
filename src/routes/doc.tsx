// import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Wallet,
  Activity,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  LineChart,
  BarChart3,
  Brain,
  Gauge,
  Database,
  ArrowRight,
  Radio,
  Star,
  Network,
  Bot,
  Wand2,
  PieChart,
} from "lucide-react";
import { Link } from "react-router-dom";

// export const Route = createFileRoute("/docs")({
//   head: () => ({
//     meta: [
//       { title: "How It Works — ChainPilot" },
//       {
//         name: "description",
//         content:
//           "Learn how ChainPilot turns wallet data, market signals and on-chain memory into AI-driven trading recommendations.",
//       },
//       { property: "og:title", content: "How ChainPilot Works" },
//       {
//         property: "og:description",
//         content:
//           "Wallet analysis, market signals, risk scoring, AI recommendations and decentralized memory — explained.",
//       },
//     ],
//   }),
//   component: DocsPage,
// });

const steps = [
  {
    icon: Wallet,
    title: "Wallet Analysis",
    desc: "We parse your on-chain history — holdings, PnL, hold time, win rate and behavior archetype.",
  },
  {
    icon: Activity,
    title: "Market Signal Processing",
    desc: "Live price action, RSI, volume profile and smart-money flow are streamed into the engine.",
  },
  {
    icon: ShieldAlert,
    title: "Risk Scoring",
    desc: "Each position is scored for volatility, concentration, liquidity and tail risk.",
  },
  {
    icon: Sparkles,
    title: "AI Recommendation",
    desc: "The co-pilot proposes BUY / SELL / HOLD with a confidence score and rationale.",
  },
  {
    icon: CheckCircle2,
    title: "User Decision",
    desc: "You stay in control — review, adjust, and execute. Every decision is remembered.",
  },
];

const coreLogic = [
  {
    icon: LineChart,
    title: "RSI Usage",
    desc: "Relative Strength Index across multiple timeframes flags momentum extremes (oversold < 30, overbought > 70) and divergence patterns that precede reversals.",
  },
  {
    icon: BarChart3,
    title: "Volume Indicators",
    desc: "Volume-weighted moving averages, OBV and abnormal volume spikes confirm whether a price move has real conviction behind it.",
  },
  {
    icon: Brain,
    title: "Wallet Behavior Tracking",
    desc: "We classify wallets (degen, swing, holder, whale) and track cohort flows — when smart money rotates, you see it first.",
  },
  {
    icon: Gauge,
    title: "Confidence Scoring",
    desc: "Signals are blended with weights tuned per regime. The output is a 0–100 confidence score, not a black-box yes/no.",
  },
];

const coreFeatureBlogs = [
  { slug: "market-live-insight", title: "Market Live Insight", desc: "Live price, volume and macro pulse fused into one signal stream.", icon: Radio },
  { slug: "hero-page-recommendation", title: "Hero Page Recommendation", desc: "Your highest-conviction next move, surfaced first.", icon: Star },
  { slug: "on-chain-signals", title: "On-chain Signals", desc: "Smart money, whales and exchange flows in real time.", icon: Network },
  { slug: "ai-recommendation", title: "AI Recommendation", desc: "BUY / SELL / HOLD with confidence and a real reason.", icon: Sparkles },
  { slug: "wallet-intelligence", title: "Wallet Intelligence", desc: "Your on-chain profile — PnL, hold time, archetype.", icon: Wallet },
  { slug: "portfolio-simulator", title: "Portfolio Simulator", desc: "Stress-test allocations before you risk a dollar.", icon: PieChart },
  { slug: "chainpilot-ai-agent", title: "ChainPilot (AI Agent)", desc: "Always-on co-pilot watching your portfolio 24/7.", icon: Bot },
  { slug: "ai-swap-advisor", title: "AI Swap Advisor", desc: "AI-suggested rebalances with transparent reasoning.", icon: Wand2 },
];

export default function DocsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="pointer-events-none absolute -top-10 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Documentation
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
              How <span className="text-gradient-neon">ChainPilot</span> Works
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              ChainPilot fuses your wallet history with live market intelligence
              and an AI reasoning layer to deliver transparent, on-chain trading
              decisions — with you always in the driver's seat.
            </p>
          </div>
        </section>

        {/* Step Flow */}
        <section className="mx-auto mt-24 max-w-6xl px-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
            The Flow
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Five stages — from raw on-chain data to a decision you actually trust.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="group relative rounded-2xl glass p-5 transition-transform hover:-translate-y-1"
              >
                <div className="absolute -top-3 left-5 rounded-md bg-gradient-neon px-2 py-0.5 text-[10px] font-bold text-primary-foreground shadow-neon">
                  STEP {i + 1}
                </div>
                <div className="mt-2 grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Logic */}
        <section className="mx-auto mt-28 max-w-6xl px-6">
          {/* <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Core Logic
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            What's actually under the hood — no buzzwords, just the signals we
            use and how they combine.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {coreLogic.map((c) => (
              <div key={c.title} className="rounded-2xl glass p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div> */}

          <div className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Feature Deep Dives
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Click any card to read how that piece of ChainPilot actually works.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {coreFeatureBlogs.map((b) => (
                <Link
                  key={b.slug}
                  to={`/blog/${b.slug}`}
                  className="group relative rounded-2xl glass p-5 transition-all hover:-translate-y-1 hover:shadow-neon"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-4 text-base font-semibold">{b.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary opacity-80 transition-opacity group-hover:opacity-100">
                    Read more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Simulator Logic */}
        {/* <section className="mx-auto mt-28 max-w-5xl px-6">
          <div className="rounded-3xl glass p-8 md:p-10">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-neon text-primary-foreground shadow-neon">
                <Gauge className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold md:text-3xl">
                Simulator Logic
              </h2>
            </div>
            <p className="mt-4 text-muted-foreground">
              The simulator takes three inputs — capital, risk tolerance and
              time horizon — and produces an optimized allocation with expected
              return and drawdown bands.
            </p>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Build a candidate basket from blue-chips, majors and high-beta assets weighted by your risk profile.",
                "Score each asset by momentum (RSI), trend (MA crossovers) and on-chain flow strength.",
                "Run a Monte-Carlo style projection across historical volatility regimes to estimate return distribution.",
                "Output expected APR, max drawdown, Sharpe-like ratio and a confidence score for the allocation.",
              ].map((line, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl border border-border/40 bg-card/40 p-4 text-sm text-muted-foreground"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </div>
        </section> */}

        {/* Memory Layer */}
        {/* <section className="mx-auto mt-28 max-w-5xl px-6">
          <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background p-8 md:p-10">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/20 text-primary">
                <Database className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold md:text-3xl">
                Memory Layer · 0G
              </h2>
            </div>
            <p className="mt-4 text-muted-foreground">
              Every recommendation, decision and outcome is hashed and pinned to
              <span className="text-foreground"> 0G decentralized storage</span>.
              Your trading memory is portable, verifiable and uncensorable —
              the AI keeps learning from history nobody can rewrite.
            </p>
            <ul className="mt-6 grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
              <li className="rounded-xl glass p-4">
                <span className="text-foreground">Immutable</span> — decisions
                are content-addressed, no silent edits.
              </li>
              <li className="rounded-xl glass p-4">
                <span className="text-foreground">Portable</span> — your
                history follows your wallet across apps.
              </li>
              <li className="rounded-xl glass p-4">
                <span className="text-foreground">Composable</span> — other
                agents can read and build on your track record.
              </li>
            </ul>
          </div>
        </section> */}

        {/* Example Flow */}
        <section className="mx-auto mt-28 max-w-6xl px-6">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Example Flow
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A walkthrough from connecting a wallet to a recorded outcome.
          </p>
          <div className="mt-10 grid items-stretch gap-4 md:grid-cols-4">
            {[
              {
                tag: "Wallet",
                title: "0x7a3F…9c2B connects",
                body: "62% ETH, 18% SOL, 12% stables, 8% long-tail. Swing-trader profile.",
              },
              {
                tag: "Analysis",
                title: "Signals fire",
                body: "ETH RSI 4h = 71, volume 1.8× avg, smart-money net inflow +$24M.",
              },
              {
                tag: "Recommendation",
                title: "Trim ETH 15%",
                body: "Confidence 78. Reduce concentration, rotate into stables ahead of macro print.",
              },
              {
                tag: "Outcome",
                title: "Logged to 0G",
                body: "User executes, ETH retraces 6% in 36h, decision marked +1 in track record.",
              },
            ].map((card, i, arr) => (
              <div key={card.tag} className="relative">
                <div className="h-full rounded-2xl glass p-5">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {card.tag}
                  </div>
                  <h3 className="mt-2 text-base font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {card.body}
                  </p>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="absolute right-[-14px] top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary md:block" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/app"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-neon px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-neon transition-transform hover:scale-[1.03]"
            >
              Launch App <ArrowRight className="h-4 w-4" />
            </Link>
            {/* <Link
              to="/simulator"
              className="inline-flex items-center gap-2 rounded-xl glass px-5 py-2.5 text-sm font-medium hover:bg-white/10"
            >
              Try the Simulator
            </Link> */}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}