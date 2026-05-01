import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Wallet, Rocket } from "lucide-react";
import { SakuraPetals } from "./SakuraPetals";
import { WalletModal } from "./web3/WalletModal";
import sakuraTree from "@/assets/sakura-tree.png";

export function Hero() {
  const [open, setOpen] = useState(false);
  return (
    <section className="relative isolate overflow-hidden bg-hero pt-40 pb-32">
      {/* Sakura tree backdrop on left (decorative) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[55%] md:w-[42%] lg:w-[38%] z-0"
      >
        {/* soft pink glow behind tree */}
        <div className="absolute -left-24 top-1/4 h-[520px] w-[520px] rounded-full bg-primary/25 blur-[140px]" />
        {/* fog at base */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/15 via-primary/5 to-transparent blur-2xl" />
        <div className="absolute inset-0 animate-branch-sway">
          <img
            src={sakuraTree}
            alt=""
            width={1920}
            height={1280}
            className="h-full w-full object-cover object-left-bottom opacity-90"
            style={{
              maskImage:
                "linear-gradient(to right, black 55%, transparent 100%), linear-gradient(to top, transparent 0%, black 18%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 55%, transparent 100%), linear-gradient(to top, transparent 0%, black 18%)",
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
            }}
          />
        </div>
        {/* sparkle particles near blossoms */}
        <span className="animate-sparkle absolute left-[28%] top-[22%] h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_2px_oklch(0.85_0.18_340)]" style={{ animationDelay: "0.4s" }} />
        <span className="animate-sparkle absolute left-[44%] top-[34%] h-1 w-1 rounded-full bg-accent shadow-[0_0_8px_2px_oklch(0.85_0.18_340)]" style={{ animationDelay: "1.2s" }} />
        <span className="animate-sparkle absolute left-[18%] top-[48%] h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_2px_oklch(0.85_0.18_340)]" style={{ animationDelay: "2.1s" }} />
        <span className="animate-sparkle absolute left-[36%] top-[60%] h-1 w-1 rounded-full bg-accent shadow-[0_0_8px_2px_oklch(0.85_0.18_340)]" style={{ animationDelay: "0.9s" }} />
      </div>

      <SakuraPetals count={36} />

      {/* Right-side fade so petals dissolve into the dark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[20%] z-0 bg-gradient-to-l from-background via-background/60 to-transparent"
      />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-primary/30 blur-[120px]" />
      <div className="pointer-events-none absolute top-20 right-1/4 h-[360px] w-[360px] rounded-full bg-accent/30 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          AI Co-Pilot · Live on-chain intelligence
        </div>

        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          Your AI Co-Pilot for{" "}
          <span className="text-gradient-neon">On-Chain Decisions</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
          Understand your wallet. Analyze the market. Make smarter trades — guided by an AI that
          reads the chain so you don't have to.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-neon px-6 py-3 text-sm font-medium text-primary-foreground shadow-neon transition-transform hover:scale-[1.04] active:scale-[0.98]"
          >
            <Wallet className="h-4 w-4" />
            Connect Wallet
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <Link
            to="/app"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-sakura px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-soft transition-transform hover:scale-[1.04] active:scale-[0.98] animate-pulse-glow"
          >
            <Rocket className="h-4 w-4" />
           Launch App
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Floating preview chip */}
        <div className="mx-auto mt-16 max-w-3xl animate-float">
          <div className="glass-strong rounded-2xl p-4 shadow-card">
            <div className="flex items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-sakura" />
                <div className="text-left">
                  <div className="font-medium">ETH · Recommendation</div>
                  <div className="text-xs text-muted-foreground">Confidence 86% · RSI 42</div>
                </div>
              </div>
              <span className="rounded-lg bg-bullish/15 px-3 py-1 text-xs font-semibold text-[color:var(--bullish)]">
                BUY
              </span>
            </div>
          </div>
        </div>
      </div>
      <WalletModal open={open} onClose={() => setOpen(false)} onConnect={() => setOpen(false)} />
    </section>
  );
}