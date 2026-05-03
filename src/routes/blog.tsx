// @ts-ignore
// @ts-nocheck

// import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";

type Post = {
  title: string;
  tag: string;
  excerpt: string;
  sections: { heading: string; body: string }[];
};

const POSTS= {
  "market-live-insight": {
    title: "Market Live Insight",
    tag: "Market Intelligence",
    excerpt:
      "Real-time price action, liquidity depth and macro context fused into a single live pulse.",
    sections: [
      {
        heading: "What it does",
        body: "Market Live Insight streams price, volume and order-book depth across major venues and surfaces only the moves that matter — breakouts, liquidity grabs, and regime shifts.",
      },
      {
        heading: "How it works",
        body: "We blend tick-level price feeds with rolling volatility and funding-rate context. The engine filters noise and tags each event with a confidence score so you see signal, not chatter.",
      },
      {
        heading: "Why it matters",
        body: "You stop reading 12 dashboards. The market talks to you in plain language, the moment something changes.",
      },
    ],
  },
  "hero-page-recommendation": {
    title: "Hero Page Recommendation",
    tag: "Personalization",
    excerpt:
      "The very first thing you see is tuned to your wallet, your style and the current market regime.",
    sections: [
      {
        heading: "What it does",
        body: "Your hero card is never generic. It's the single highest-conviction action ChainPilot has for you right now — buy, trim, hedge or wait.",
      },
      {
        heading: "How it works",
        body: "We rank hundreds of candidate insights by relevance to your portfolio, your risk profile and live market signals, then promote the top one to the hero slot.",
      },
      {
        heading: "Why it matters",
        body: "Less scrolling. Less doubt. The next move is always one tap away.",
      },
    ],
  },
  "on-chain-signals": {
    title: "On-chain Signals",
    tag: "Onchain",
    excerpt:
      "Smart-money flows, whale wallets and exchange in/out — read straight from the chain.",
    sections: [
      {
        heading: "What it does",
        body: "Tracks classified cohorts (whales, smart wallets, exchanges, miners) and surfaces meaningful net flow shifts before they hit price.",
      },
      {
        heading: "How it works",
        body: "Every transfer is enriched with wallet labels and historical behavior. Statistical baselines flag outliers — accumulation, distribution, rotations — in near real time.",
      },
      {
        heading: "Why it matters",
        body: "Price lies. The chain doesn't. You see what the biggest players are actually doing.",
      },
    ],
  },
  "ai-recommendation": {
    title: "AI Recommendation",
    tag: "Co-Pilot",
    excerpt:
      "Transparent BUY / SELL / HOLD calls with a confidence score and a real reason.",
    sections: [
      {
        heading: "What it does",
        body: "For every position and watchlist asset, the co-pilot produces a directional call, a 0–100 confidence number, and a short rationale you can actually read.",
      },
      {
        heading: "How it works",
        body: "Momentum, on-chain flow, sentiment and risk are blended with regime-aware weights. The model explains which signals dominated each call — no black box.",
      },
      {
        heading: "Why it matters",
        body: "You always know why the AI thinks what it thinks. You stay in control, the AI does the homework.",
      },
    ],
  },
  "wallet-intelligence": {
    title: "Wallet Intelligence",
    tag: "Profiling",
    excerpt:
      "Your wallet, profiled — holdings, PnL, hold time, win rate and behavior archetype.",
    sections: [
      {
        heading: "What it does",
        body: "Turns raw transaction history into a clear profile: are you a swing trader, a degen, a holder, a whale? What's your real win rate?",
      },
      {
        heading: "How it works",
        body: "We parse every transfer, swap and bridge across chains, reconstruct cost basis, and classify behavior using cohort-trained models.",
      },
      {
        heading: "Why it matters",
        body: "Self-knowledge is alpha. ChainPilot tunes every recommendation to who you actually are on-chain.",
      },
    ],
  },
  "portfolio-simulator": {
    title: "Portfolio Simulator",
    tag: "Simulation",
    excerpt:
      "Test allocations, stress-test drawdowns and see expected return bands before you risk a dollar.",
    sections: [
      {
        heading: "What it does",
        body: "Plug in capital, risk tolerance and time horizon. Get an optimized allocation with expected APR, max drawdown and a confidence score.",
      },
      {
        heading: "How it works",
        body: "A Monte-Carlo style projection runs your basket across historical volatility regimes and produces a return distribution — not a single fake number.",
      },
      {
        heading: "Why it matters",
        body: "You see the worst case before the market shows it to you.",
      },
    ],
  },
  "chainpilot-ai-agent": {
    title: "ChainPilot (AI Agent)",
    tag: "Agent",
    excerpt:
      "The persistent co-pilot that watches your portfolio 24/7 and talks back when it matters.",
    sections: [
      {
        heading: "What it does",
        body: "ChainPilot is always on. It monitors positions, signals and macro events, and pings you with conversational, contextual insights — not spammy alerts.",
      },
      {
        heading: "How it works",
        body: "An agent loop pulls live signals, your portfolio state and recent decisions, then reasons about what's worth telling you. Each insight is logged for memory.",
      },
      {
        heading: "Why it matters",
        body: "You don't have to live on charts. The agent does, and only interrupts when there's a real edge.",
      },
    ],
  },
  "ai-swap-advisor": {
    title: "AI Swap Advisor",
    tag: "Decision Assistant",
    excerpt:
      "Not a swap interface — an AI that suggests optimized swaps and explains exactly why.",
    sections: [
      {
        heading: "What it does",
        body: "Analyzes your portfolio, picks the highest-impact rebalances, and presents them as suggestions you can review and act on.",
      },
      {
        heading: "How it works",
        body: "A strategy preference (Conservative / Balanced / Aggressive) shapes a candidate set of swaps. Each is scored on expected impact, risk and confidence — with a readable rationale.",
      },
      {
        heading: "Why it matters",
        body: "You stop guessing what to rotate. The AI guides; you decide.",
      },
    ],
  },
};

// export const Route = createFileRoute("/blog/$slug")({
//   head: ({ params }) => {
//     const post = POSTS[params.slug];
//     const title = post ? `${post.title} — ChainPilot` : "Post — ChainPilot";
//     const desc = post?.excerpt ?? "ChainPilot insight.";
//     return {
//       meta: [
//         { title },
//         { name: "description", content: desc },
//         { property: "og:title", content: title },
//         { property: "og:description", content: desc },
//       ],
//     };
//   },
//   loader: ({ params }) => {
//     if (!POSTS[params.slug]) throw notFound();
//     return { slug: params.slug };
//   },
//   component: BlogPostPage,
//   notFoundComponent: () => (
//     <div className="min-h-screen bg-background text-foreground">
//       <Navbar />
//       <main className="mx-auto max-w-3xl px-6 pt-32 pb-24 text-center">
//         <h1 className="text-3xl font-semibold">Post not found</h1>
//         <Link to="/docs" className="mt-6 inline-flex items-center gap-2 text-primary">
//           <ArrowLeft className="h-4 w-4" /> Back to How It Works
//         </Link>
//       </main>
//       <Footer />
//     </div>
//   ),
//   errorComponent: ({ error }) => (
//     <div className="min-h-screen bg-background text-foreground">
//       <Navbar />
//       <main className="mx-auto max-w-3xl px-6 pt-32 pb-24 text-center">
//         <h1 className="text-3xl font-semibold">Something went wrong</h1>
//         <p className="mt-3 text-muted-foreground">{error.message}</p>
//       </main>
//       <Footer />
//     </div>
//   ),
// });

export default function BlogPostPage() {
  const { id } =  useParams();
  console.log("Slug from params:", id);
  const post = POSTS[id]!;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24">
        <article className="relative mx-auto max-w-3xl px-6">
          <div className="pointer-events-none absolute -top-10 left-1/2 h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
          <div className="relative">
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> How It Works
            </Link>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> {post.tag}
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
          </div>

          <div className="mt-12 space-y-8">
            {post.sections.map((s) => (
              <section key={s.heading} className="rounded-2xl glass p-6 md:p-8">
                <h2 className="text-xl font-semibold md:text-2xl">{s.heading}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              to="/app"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-neon px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-neon transition-transform hover:scale-[1.03]"
            >
              Launch App
            </Link>
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 rounded-xl glass px-5 py-2.5 text-sm font-medium hover:bg-white/10"
            >
              Back to How It Works
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}