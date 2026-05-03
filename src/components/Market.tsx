// @ts-ignore
// @ts-nocheck
import { TrendingDown, TrendingUp } from "lucide-react";
import { SectionHeader } from "./WalletConnect";
import { DecisionCard } from "./DecisionCard";

const tokens = [
  { sym: "ETH", name: "Ethereum", price: 3482.12, change: 2.4, rsi: 42, bull: true },
  { sym: "BTC", name: "Bitcoin", price: 71240.55, change: 1.1, rsi: 55, bull: true },
  { sym: "SOL", name: "Solana", price: 184.32, change: -3.2, rsi: 38, bull: false },
  { sym: "ARB", name: "Arbitrum", price: 0.91, change: -1.5, rsi: 31, bull: false },
];

export function Market() {
  return (
    <section id="market" className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Market" title="Live insights" subtitle="Key indicators distilled into signals you can act on." />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {tokens.map((t) => (
              <div key={t.sym} className="glass rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-glow-soft">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`grid h-9 w-9 place-items-center rounded-xl ${t.bull ? "bg-[color:var(--bullish)]/15" : "bg-[color:var(--bearish)]/15"}`}>
                      {t.bull ? (
                        <TrendingUp className="h-4 w-4 text-[color:var(--bullish)]" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-[color:var(--bearish)]" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.sym}</div>
                      <div className="text-xs text-muted-foreground">{t.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">${t.price.toLocaleString()}</div>
                    <div className={`text-xs ${t.bull ? "text-[color:var(--bullish)]" : "text-[color:var(--bearish)]"}`}>
                      {t.change > 0 ? "+" : ""}
                      {t.change}%
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-end gap-1.5">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const h = 6 + Math.abs(Math.sin((i + t.rsi) / 2)) * 26;
                    return (
                      <span
                        key={i}
                        className={`w-1 rounded-sm ${t.bull ? "bg-[color:var(--bullish)]/60" : "bg-[color:var(--bearish)]/60"}`}
                        style={{ height: h }}
                      />
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>RSI</span>
                  <span className="font-medium text-foreground">{t.rsi}</span>
                </div>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className={`h-full ${t.bull ? "bg-[color:var(--bullish)]" : "bg-[color:var(--bearish)]"}`} style={{ width: `${t.rsi}%` }} />
                </div>
              </div>
            ))}
          </div>

          <DecisionCard />
        </div>
      </div>
    </section>
  );
}