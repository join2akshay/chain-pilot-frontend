import { Activity, Bot, Bell, Scale, ArrowDownUp } from "lucide-react";
import { feedEvents } from "@/lib/mock-data";

const iconFor = {
  trade: ArrowDownUp,
  ai: Bot,
  rebalance: Scale,
  alert: Bell,
} as const;

export function TransactionFeed() {
  return (
    <div className="glass-strong rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--sakura)]">Transaction Intelligence</div>
          <h3 className="mt-1 text-xl font-semibold tracking-tight">Live activity feed</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Activity className="h-3.5 w-3.5 text-[color:var(--bullish)] animate-pulse" />
          Streaming
        </span>
      </div>

      <ul className="mt-6 relative">
        <div className="absolute left-3.5 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent" />
        {feedEvents.map((e, i) => {
          const Icon = iconFor[e.kind];
          const tone =
            e.tone === "bull" ? "text-[color:var(--bullish)]" : e.tone === "bear" ? "text-[color:var(--bearish)]" : "text-[color:var(--sakura)]";
          return (
            <li key={i} className="relative flex items-start gap-3 pl-10 pb-4 last:pb-0">
              <span className="absolute left-1 top-2 grid h-6 w-6 place-items-center rounded-full bg-card ring-1 ring-white/10">
                <Icon className={`h-3.5 w-3.5 ${tone}`} />
              </span>
              <div className="flex-1 glass rounded-xl p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium">{e.title}</div>
                  <span className="text-[10px] text-muted-foreground">{e.time}</span>
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">{e.meta}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}