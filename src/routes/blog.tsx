// @ts-ignore
// @ts-nocheck

// import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppKitAccount } from "@reown/appkit/react";

type Post = {
  title: string;
  tag: string;
  excerpt: string;
  oneLiner?: string;
  sections: {
    heading: string;
    body?: string;
    bullets?: string[];
    subsections?: { heading: string; body?: string; bullets?: string[] }[];
  }[];
};

const POSTS= {
  "market-live-insight": {
    title: "Market Live Insight",
    tag: "Market Intelligence",
    excerpt:
      "A hybrid recommendation engine that combines rule-based logic, AI refinement, and strict safety guardrails to deliver reliable, explainable, and production-ready trading decisions.",
    oneLiner:
      "A hybrid recommendation engine that combines rule-based logic, AI refinement, and strict safety guardrails to deliver reliable, explainable, and production-ready trading decisions.",
    sections: [
      {
        heading: "What It Does",
        body: "Our recommendation engine delivers reliable, explainable, and production-ready trading signals using a hybrid approach of rules, AI, and safety controls. Each recommendation includes:",
        bullets: [
          "Action (BUY / SELL / HOLD)",
          "Confidence score",
          "Clear reasoning",
          "Source (RULES or GPT)",
        ],
        subsections: [
          {
            heading: "",
            body: "This ensures users always understand why a decision is made, not just the outcome.",
          },
        ],
      },
      {
        heading: "How It Works",
        subsections: [
          {
            heading: "Market Data Collection",
            body: "We collect real-time data for ETH, BTC, SOL, and ARB:",
            bullets: ["Price (USD)", "24h change (%)", "Sparkline data"],
          },
          {
            heading: "",
            body: "From this, we compute RSI to detect overbought or oversold conditions.",
          },
          {
            heading: "Rule-Based Engine (Core Layer)",
            body: "A deterministic system generates the base recommendation:",
            bullets: [
              "High momentum → increases score",
              "High RSI → reduces score",
            ],
          },
          {
            heading: "Actions",
            bullets: [
              "BUY → Low RSI + stabilizing momentum",
              "SELL → High RSI + weakening momentum",
              "HOLD → Neutral signals",
            ],
          },
          {
            heading: "",
            body: "This layer is always active and acts as a fallback.",
          },
          {
            heading: "GPT Refinement (Optional)",
            body: "When enabled, GPT enhances decisions using structured inputs: action, symbol, confidence, reason. Strict validation ensures:",
            bullets: [
              "Valid JSON output",
              "Allowed actions only",
              "Valid tokens",
              "Safe confidence range",
            ],
          },
          {
            heading: "",
            body: "Failures automatically fall back to rules.",
          },
          {
            heading: "Safety Guardrails (Final Layer)",
            body: "Hard constraints ensure safe decisions:",
            bullets: [
              "High RSI → blocks BUY",
              "Low RSI → blocks SELL",
              "Confidence is capped",
            ],
          },
          {
            heading: "",
            body: "This layer overrides everything.",
          },
          {
            heading: "Caching for Performance",
            body: "Responses are cached (Redis, ~60s TTL): Cache → Return → Else compute → Store → Return. This ensures low latency and scalability.",
          },
        ],
      },
      {
        heading: "Why It Matters",
        body: "We prioritize: Reliability > Explainability > Intelligence. By combining rules + AI + guardrails, every recommendation is:",
        bullets: ["Safe", "Consistent", "Transparent", "Production-ready"],
      },
    ],
  },
  "hero-page-recommendation": {
    title: "Hero Page Recommendation",
    tag: "Personalization",
    excerpt:
      "The Hero Recommendation API is designed to deliver a single, fast, and intelligent token recommendation for your landing page banner — helping users quickly understand what action to take in the market.",
    oneLiner:
      "The Hero Recommendation API is designed to deliver a single, fast, and intelligent token recommendation for your landing page banner — helping users quickly understand what action to take in the market.",
    sections: [
      {
        heading: "What It Does",
        body: "Returns one smart recommendation:",
        bullets: [
          "Token (ETH, BTC, SOL, ARB)",
          "Action → BUY / SELL / HOLD",
          "Confidence + RSI",
          "Price + 24h change",
          "Short reason",
        ],
        subsections: [
          {
            heading: "",
            body: "Built for instant, explainable decision signals.",
          },
        ],
      },
      {
        heading: "How It Works",
        subsections: [
          {
            heading: "Cache-First",
            bullets: [
              "Serve from cache if available (~60s TTL)",
              "Else compute + store",
            ],
          },
          {
            heading: "Data + Signals",
            body: "Fetch price, 24h change, sparkline. Compute:",
            bullets: [
              "Momentum (24h trend)",
              "RSI (market condition)",
            ],
          },
          {
            heading: "Decision Logic",
            body: "Rank tokens by combined score, pick top token, and assign:",
            bullets: [
              "BUY → strong",
              "SELL → weak",
              "HOLD → neutral",
            ],
          },
          {
            heading: "Safety Guardrails",
            bullets: [
              "High RSI → avoid BUY",
              "Low RSI → avoid SELL",
            ],
          },
          {
            heading: "Output",
            bullets: [
              "Confidence + short reason",
              "Clean, UI-ready response",
            ],
          },
        ],
      },
      {
        heading: "Why It Matters",
        bullets: [
          "Fast → instant insights",
          "Clear → explainable decisions",
          "Safe → avoids risky extremes",
          "Efficient → optimized for real-time UI",
        ],
      },
    ],
  },
  "on-chain-signals": {
    title: "On-chain Signals",
    tag: "Onchain",
    excerpt:
      "A single API that aggregates market sentiment, whale activity, smart money movements, and token flows into one dashboard-ready response.",
    oneLiner:
      "A single API that aggregates market sentiment, whale activity, smart money movements, and token flows into one dashboard-ready response.",
    sections: [
      {
        heading: "What It Does",
        body: "Returns a unified payload for multiple insights:",
        bullets: [
          "Movements → large on-chain transfers (smart money signals)",
          "Sentiment → Fear & Greed index snapshot",
          "Whales → wallets receiving large inflows",
          "Flows → 24h inflow vs outflow (ETH, BTC, SOL, ARB)",
        ],
        subsections: [
          {
            heading: "",
            body: "One API call = complete market intelligence for UI widgets.",
          },
        ],
      },
      {
        heading: "How It Works",
        subsections: [
          {
            heading: "Cache-First",
            bullets: [
              "Checks Redis (onchain:signals)",
              "Returns cached data (~60–120s TTL)",
              "Else computes fresh response",
            ],
          },
          {
            heading: "Parallel Aggregation",
            bullets: [
              "Fetches all signals using Promise.all",
              "Fail-safe: partial failures return defaults (no crash)",
            ],
          },
          {
            heading: "Signal Engines — Movements",
            bullets: [
              "Uses transfer data (Alchemy)",
              "Detects large transactions",
              "Labels exchange deposits/withdrawals",
            ],
          },
          {
            heading: "Signal Engines — Sentiment",
            bullets: [
              "Pulls Fear & Greed index",
              "Converts into UI-friendly score + label",
            ],
          },
          {
            heading: "Signal Engines — Whales",
            bullets: [
              "Tracks wallets with high recent inflows",
              "Ranks by estimated USD value",
            ],
          },
          {
            heading: "Signal Engines — Flows",
            bullets: [
              "Aggregates inflow vs outflow over ~24h",
              "Uses exchange interactions as directional signal",
            ],
          },
          {
            heading: "Optional Narrative",
            body: "Generates a short summary from:",
            bullets: [
              "sentiment",
              "flow pressure",
              "movement patterns",
            ],
          },
        ],
      },
      {
        heading: "Why It Matters",
        bullets: [
          "Single API, multiple insights → no frontend chaining",
          "Holistic view → combines on-chain + sentiment",
          "Resilient → partial failures don't break UI",
          "Scalable → cache-first reduces rate limits",
        ],
      },
    ],
  },
  "ai-recommendation": {
    title: "AI Recommendation",
    tag: "Co-Pilot",
    excerpt:
      "An API that generates actionable portfolio insights by combining portfolio data with risk intelligence — designed for clean, UI-ready dashboard recommendations.",
    oneLiner:
      "An API that generates actionable portfolio insights by combining portfolio data with risk intelligence — designed for clean, UI-ready dashboard recommendations.",
    sections: [
      {
        heading: "What It Does",
        body: "Provides smart portfolio recommendations with:",
        bullets: [
          "Title + description",
          "Priority (risk level)",
          "Confidence score",
          "Clear action (e.g., rebalance, reduce exposure)",
        ],
        subsections: [
          { heading: "", body: "Built for decision-ready insights, not raw data." },
        ],
      },
      {
        heading: "How It Works",
        subsections: [
          {
            heading: "Parallel Data Load",
            bullets: [
              "Portfolio snapshot (holdings, allocation, USD value)",
              "Wallet intelligence (risk exposure: L1, DeFi, Memes, Stables)",
            ],
          },
          {
            heading: "Signal Engine (Core Logic)",
            body: "Generates structured signals using rules.",
          },
          {
            heading: "Risk",
            bullets: [
              "High memecoin exposure → reduce risk",
              "Low stablecoins → increase safety",
            ],
          },
          {
            heading: "Allocation",
            bullets: ["Overconcentration (>40%) → diversify"],
          },
          {
            heading: "Rebalance",
            bullets: ["ETH/BTC imbalance → adjust ratio"],
          },
          {
            heading: "Position Sizing",
            bullets: ["Oversized token → scale down gradually"],
          },
          {
            heading: "",
            body: "Outputs are deduplicated and capped (4–6 max).",
          },
          {
            heading: "Confidence System",
            body: "Based on:",
            bullets: [
              "Severity of signal",
              "Data quality",
              "Strength of deviation",
            ],
          },
          {
            heading: "",
            body: "Final confidence is safely bounded (~60–95).",
          },
          {
            heading: "Optional GPT Layer",
            bullets: [
              "Enhances wording only (no logic changes)",
              "If GPT fails → fallback to rule-based output",
            ],
          },
          {
            heading: "Caching",
            bullets: [
              "Stored in Redis (~60s TTL)",
              "Faster dashboard refresh, reduced load",
            ],
          },
        ],
      },
      {
        heading: "Why It Matters",
        bullets: [
          "Actionable → not just analytics, but decisions",
          "Explainable → rule-based, transparent logic",
          "Reliable → works even if GPT or dependencies fail",
          "Efficient → optimized for real-time UI",
        ],
      },
    ],
  },
  "wallet-intelligence": {
    title: "Wallet Intelligence",
    tag: "Profiling",
    excerpt:
      "A \"Trader DNA\" API that analyzes wallet activity to reveal trading behavior, patterns, and risk exposure - all in a single snapshot.",
    oneLiner:
      "A \"Trader DNA\" API that analyzes wallet activity to reveal trading behavior, patterns, and risk exposure - all in a single snapshot.",
    sections: [
      {
        heading: "What It Does",
        body: "Generates a wallet intelligence profile including:",
        bullets: [
          "Trading profile → win rate, hold time, frequency",
          "Behavior mix → swing trader, long-term holder, degen, whale follower",
          "Risk exposure → L1, DeFi, Memes, Stables allocation",
        ],
        subsections: [
          { heading: "", body: "Output is UI-ready and marked as estimated (heuristic-based)." },
        ],
      },
      {
        heading: "How It Works",
        subsections: [
          {
            heading: "Auth + Identity",
            bullets: ["Uses Bearer token", "Resolves user → wallet address"],
          },
          {
            heading: "Cache-First",
            bullets: [
              "Redis cache (user + wallet key)",
              "~60s TTL for fast dashboard loads",
            ],
          },
          {
            heading: "Data Collection",
            body: "Fetches ERC20 transfers (Alchemy):",
            bullets: [
              "Incoming (IN)",
              "Outgoing (OUT)",
              "Normalizes: token, amount, timestamp, txHash",
            ],
          },
          {
            heading: "Trade Inference Engine",
            bullets: [
              "Groups transfers by transaction",
              "Detects swap-like events",
              "Builds trades using FIFO pairing (buy → sell)",
              "Fallback logic if missing data",
            ],
          },
          {
            heading: "",
            body: "Not exact swap decoding, but practical approximation.",
          },
          {
            heading: "Profile Metrics",
            bullets: [
              "Win rate (proxy-based)",
              "Avg hold time",
              "Trade frequency",
              "Profitability score (0–100)",
            ],
          },
          {
            heading: "Behavior Classification",
            body: "Breaks trading style into % mix:",
            bullets: [
              "Swing trader",
              "Long-term holder",
              "Degen (high frequency)",
              "Whale follower",
            ],
          },
          {
            heading: "Risk Exposure",
            bullets: [
              "Reads token balances",
              "Maps into categories: L1 / DeFi / Memes / Stables",
              "Converts to % allocation using price data",
            ],
          },
        ],
      },
      {
        heading: "Why It Matters",
        bullets: [
          "Deep insights → understand user trading DNA",
          "Explainable → rule-based, transparent logic",
          "Fast → cached, dashboard-ready",
          "Resilient → works even with partial data",
        ],
      },
    ],
  },
  "portfolio-simulator": {
    title: "Portfolio Simulator",
    tag: "Simulation",
    excerpt:
      "A simulation engine that helps users test crypto portfolio strategies before investing, with clear returns, risk insights, and allocation suggestions.",
    oneLiner:
      "A simulation engine that helps users test crypto portfolio strategies before investing, with clear returns, risk insights, and allocation suggestions.",
    sections: [
      {
        heading: "What It Does",
        body: "Simulates a portfolio based on:",
        bullets: [
          "Capital (USD)",
          "Risk tolerance (0–100)",
          "Time horizon (3m / 6m / 1y / 3y)",
        ],
        subsections: [
          {
            heading: "Returns",
            bullets: [
              "Allocation → ETH, BTC, STABLES, ALTS",
              "Expected return (%) + USD profit",
              "Max drawdown (risk proxy)",
            ],
          },
          {
            heading: "",
            body: "Built for safe, pre-trade decision making.",
          },
        ],
      },
      {
        heading: "How It Works",
        subsections: [
          {
            heading: "Rule-Based Allocation",
            bullets: [
              "Conservative → more stables",
              "Balanced → diversified mix",
              "Aggressive → higher alt exposure",
              "Always sums to 100% (fully deterministic)",
            ],
          },
          {
            heading: "Optional AI Layer",
            bullets: [
              "Slightly refines allocation",
              "Strict constraints enforced",
              "Fallback to base if invalid",
            ],
          },
          {
            heading: "Return Model",
            bullets: [
              "Uses fixed expected returns per asset",
              "Weighted portfolio return calculation",
            ],
          },
          {
            heading: "Risk Model",
            bullets: [
              "Uses volatility proxies",
              "Converts into drawdown estimate",
            ],
          },
          {
            heading: "Horizon Scaling",
            bullets: [
              "Adjusts return + risk for time period",
              "Short-term ≠ long-term projections",
            ],
          },
          {
            heading: "Final Output",
            bullets: [
              "Expected return (%)",
              "Expected profit (USD)",
              "Max drawdown (%)",
            ],
          },
          {
            heading: "Caching",
            bullets: [
              "Redis (~60s TTL)",
              "Faster repeat simulations",
            ],
          },
        ],
      },
      {
        heading: "Why It Matters",
        bullets: [
          "Plan before you invest",
          "Clear risk vs reward view",
          "Fast simulations",
          "Explainable + controlled AI",
        ],
      },
    ],
  },
  "chainpilot-ai-agent": {
    title: "ChainPilot (AI Agent)",
    tag: "Agent",
    excerpt:
      "A conversational, wallet-aware AI that guides users through crypto decisions — safely, transparently, and with on-chain memory.",
    oneLiner:
      "A conversational, wallet-aware AI that guides users through crypto decisions — safely, transparently, and with on-chain memory.",
    sections: [
      {
        heading: "What It Does",
        body: "Instead of dashboards, it creates a guided conversation to help users decide:",
        bullets: [
          "Understand current portfolio",
          "Define goal (grow / reduce risk / explore)",
          "Get a trade suggestion",
          "Confirm before action",
        ],
        subsections: [
          {
            heading: "",
            body: "Think: \"Your wallet talks back with actionable guidance.\"",
          },
        ],
      },
      {
        heading: "How It Works",
        subsections: [
          {
            heading: "Wallet-Aware Context",
            body: "Pulls:",
            bullets: [
              "Stored wallet intelligence",
              "Live on-chain balances",
              "Builds a real-time context snapshot",
            ],
          },
          {
            heading: "Conversational Flow",
            body: "Follows a structured lifecycle: INIT → GOAL → STRATEGY → CONFIRM → COMPLETE.",
            bullets: [
              "User types naturally",
              "System detects intent: increase returns, reduce risk, explore",
            ],
          },
          {
            heading: "Rule-Based Decisions",
            body: "Trade suggestions come from deterministic rules. Example:",
            bullets: [
              "High stables → suggest ETH allocation",
              "High risk → shift to stables",
            ],
          },
          {
            heading: "",
            body: "No hallucinations, fully explainable.",
          },
          {
            heading: "AI for Language Only",
            bullets: [
              "GPT improves wording (not logic)",
              "If it fails → fallback to templates",
            ],
          },
          {
            heading: "Confirmation First",
            bullets: [
              "Always asks: Proceed / Modify / Cancel",
              "Never executes trades automatically",
            ],
          },
          {
            heading: "On-Chain Memory (0G)",
            body: "Stores confirmed decisions:",
            bullets: [
              "User goal",
              "Trade suggestion",
              "Wallet context",
              "Timestamp",
            ],
          },
          {
            heading: "",
            body: "Creates a verifiable decision history.",
          },
          {
            heading: "Architecture",
            bullets: [
              "Backend: NestJS",
              "State: Redis (session-based)",
              "Modular services: context builder, rule engine, LLM layer, memory (0G)",
            ],
          },
        ],
      },
      {
        heading: "Why It Matters",
        bullets: [
          "From data → decisions",
          "Explainable & auditable (rule-based)",
          "User-first control (no auto execution)",
          "On-chain memory for future personalization",
          "Simple frontend (single API, no state management)",
        ],
      },
    ],
  },
  "ai-swap-advisor": {
    title: "AI Swap Advisor",
    tag: "Decision Assistant",
    excerpt:
      "An AI-powered system that analyzes real wallets and generates personalized swap suggestions — based on live data, risk, and user behavior.",
    oneLiner:
      "An AI-powered system that analyzes real wallets and generates personalized swap suggestions — based on live data, risk, and user behavior.",
    sections: [
      {
        heading: "What It Does",
        body: "Provides intelligent swap recommendations using:",
        bullets: [
          "Real wallet holdings",
          "Live token pricing",
          "Portfolio risk analysis",
          "Market + on-chain signals",
        ],
        subsections: [
          {
            heading: "Returns",
            bullets: [
              "Portfolio summary (value, allocation, risk)",
              "Top insights",
              "Swap suggestions (tokenIn → tokenOut, %, confidence, reasoning)",
            ],
          },
          {
            heading: "",
            body: "Built for smart, personalized portfolio optimization.",
          },
        ],
      },
      {
        heading: "How It Works",
        subsections: [
          {
            heading: "Wallet + Data Fetch",
            bullets: [
              "Resolves user wallet",
              "Fetches balances + metadata (Alchemy)",
              "Runs safely in parallel (no crashes)",
            ],
          },
          {
            heading: "Token Cleaning",
            bullets: [
              "Removes spam, airdrops, LP tokens",
              "Filters only real holdings",
            ],
          },
          {
            heading: "Pricing Engine",
            bullets: [
              "Stablecoins → fixed $1",
              "Redis cache (shared, 60s TTL)",
              "CoinGecko → fallback to Binance on rate limits",
            ],
          },
          {
            heading: "Portfolio Analysis",
            bullets: [
              "Calculates USD value + allocation %",
              "Filters dust (<$1)",
              "Determines risk: High / Medium / Low",
            ],
          },
          {
            heading: "Opportunity Engine",
            bullets: [
              "Picks top 3 overexposed tokens",
              "Suggests swaps into missing core assets",
              "Dynamic % based on allocation",
            ],
          },
          {
            heading: "Strategy Modes",
            bullets: [
              "Conservative → smaller swaps",
              "Balanced → default",
              "Aggressive → larger swaps",
            ],
          },
          {
            heading: "Confidence Engine",
            body: "Based on:",
            bullets: [
              "Portfolio imbalance",
              "Market sentiment",
              "On-chain flows",
              "Past user behavior (memory boost)",
            ],
          },
          {
            heading: "AI Reasoning",
            bullets: [
              "GPT explains the suggestion",
              "Fallback ensures reliability",
            ],
          },
          {
            heading: "Memory Layer (0G)",
            bullets: [
              "Past confirmed decisions stored",
              "Improves future suggestions",
            ],
          },
          {
            heading: "Caching",
            bullets: [
              "Redis per user + mode (~60s)",
              "Fast repeat responses",
            ],
          },
        ],
      },
      {
        heading: "Why It Matters",
        bullets: [
          "Fully personalized → no hardcoded assumptions",
          "Explainable → rule-based + AI reasoning",
          "Reliable → never crashes, always fallback-ready",
          "Efficient → cache + rate-limit safe",
          "Learns over time → memory-driven improvements",
        ],
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
          const {isConnected}=useAppKitAccount()
  const { id } = useParams();
  const post = POSTS[id]!;

  useEffect(()=>{
window.scrollTo(0, 0);
  },[])

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
                {s.body && (
                  <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
                )}
                {s.bullets && (
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    {s.bullets.map((b:any) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.subsections && (
                  <div className="mt-6 space-y-5 border-l border-white/10 pl-5">
                    {s.subsections.map((sub, i) => (
                      <div key={`${sub.heading}-${i}`}>
                        {sub.heading && (
                          <h3 className="text-base font-semibold md:text-lg text-foreground">
                            {sub.heading}
                          </h3>
                        )}
                        {sub.body && (
                          <p className="mt-2 text-muted-foreground leading-relaxed">
                            {sub.body}
                          </p>
                        )}
                        {sub.bullets && (
                          <ul className="mt-3 space-y-2 text-muted-foreground">
                            {sub.bullets.map((b) => (
                              <li key={b} className="flex gap-2">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
                    {
                              isConnected &&
            <Link
              to="/app"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-neon px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-neon transition-transform hover:scale-[1.03]"
            >
              Launch App
            </Link>
                    }
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