import { useState } from "react";
import { Loader2, Wallet, Copy } from "lucide-react";

export function WalletConnect() {
  const [analyzing, setAnalyzing] = useState(false);
  const address = "0x7a3F...9c2B";
  const balance = "12.482 ETH";

  return (
    <section id="wallet" className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Wallet" title="Connect & analyze" subtitle="Plug in your wallet to unlock AI-driven insights tailored to your on-chain footprint." />

        <div className="glass-strong glow-ring mt-10 rounded-3xl p-8 shadow-card">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-neon shadow-neon">
                <Wallet className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  Wallet Address
                  <Copy className="h-3.5 w-3.5 cursor-pointer hover:text-foreground" />
                </div>
                <div className="font-mono text-xl font-semibold tracking-tight">{address}</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Balance: <span className="font-medium text-foreground">{balance}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setAnalyzing(true);
                setTimeout(() => setAnalyzing(false), 2400);
              }}
              disabled={analyzing}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-neon px-5 py-3 text-sm font-medium text-primary-foreground shadow-neon transition-transform hover:scale-[1.03] disabled:opacity-80"
            >
              {analyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing on-chain…
                </>
              ) : (
                <>Analyze My Wallet</>
              )}
            </button>
          </div>

          {analyzing && (
            <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full w-1/3 bg-gradient-neon"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.4s linear infinite",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--sakura)]">{eyebrow}</div>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}