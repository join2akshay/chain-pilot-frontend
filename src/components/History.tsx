import { Link2 } from "lucide-react";
import { SectionHeader } from "./WalletConnect";
import { DecisionTag } from "./AIChat";

const events = [
  { token: "ETH", action: "BUY" as const, qty: "1.20 ETH", outcome: "+4.2%", at: "2d ago", tx: "0x82a…1f4" },
  { token: "SOL", action: "SELL" as const, qty: "32 SOL", outcome: "+1.8%", at: "5d ago", tx: "0xc91…77b" },
  { token: "ARB", action: "HOLD" as const, qty: "-", outcome: "neutral", at: "1w ago", tx: "0x4d7…2ac" },
  { token: "BTC", action: "BUY" as const, qty: "0.06 BTC", outcome: "+2.1%", at: "2w ago", tx: "0xa12…9e0" },
];

export function History() {
  return (
    <section id="history" className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="History" title="Memory of every call" subtitle="Every decision recorded - verifiable and inspectable." />
        <div className="mt-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
          <Link2 className="h-3.5 w-3.5 text-[color:var(--sakura)]" />
          Stored on-chain for transparency
        </div>

        <div className="mt-10 relative">
          {/* timeline rail */}
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent md:left-4" />

          <ul className="space-y-4">
            {events.map((e, i) => (
              <li key={i} className="relative pl-10 md:pl-12">
                <span className="absolute left-1.5 top-5 h-3 w-3 rounded-full bg-gradient-neon shadow-neon md:left-2.5" />
                <div className="glass rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-glow-soft">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <DecisionTag decision={e.action} />
                      <div className="text-sm font-semibold">{e.token}</div>
                      <div className="text-xs text-muted-foreground">{e.qty}</div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{e.at}</span>
                      <span className={e.outcome.startsWith("+") ? "text-[color:var(--bullish)]" : ""}>
                        {e.outcome}
                      </span>
                      <span className="font-mono">{e.tx}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}