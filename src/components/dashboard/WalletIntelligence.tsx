import { Brain, Clock, Repeat, Trophy, Sparkles } from "lucide-react";

const stats = [
  { Icon: Trophy, label: "Win Rate", value: "67%", sub: "Last 90d · 142 trades" },
  { Icon: Clock, label: "Avg Hold Time", value: "3.4d", sub: "Swing-leaning" },
  { Icon: Repeat, label: "Trade Frequency", value: "14 / wk", sub: "Active operator" },
  { Icon: Brain, label: "Profitability Score", value: "78", sub: "Top 18% in cohort" },
];

const behaviors = [
  { name: "Swing Trader", weight: 62, active: true },
  { name: "Whale Follower", weight: 24, active: false },
  { name: "Long-Term Holder", weight: 10, active: false },
  { name: "Degen", weight: 4, active: false },
];

export function WalletIntelligence() {
  return (
    <div className="glass-strong rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--sakura)]">Wallet Intelligence</div>
          <h3 className="mt-1 text-xl font-semibold tracking-tight">Your trader profile</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-neon px-3 py-1 text-xs font-semibold text-primary-foreground shadow-neon">
          <Sparkles className="h-3 w-3" /> AI-generated
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="uppercase tracking-wider">{s.label}</span>
              <s.Icon className="h-3.5 w-3.5 text-[color:var(--sakura)]" />
            </div>
            <div className="mt-2 text-xl font-semibold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Behavior Type</div>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {behaviors.map((b) => (
            <div key={b.name} className={`rounded-xl p-3 ${b.active ? "bg-gradient-neon shadow-neon text-primary-foreground" : "glass"}`}>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>{b.name}</span>
                <span>{b.weight}%</span>
              </div>
              <div className={`mt-2 h-1 w-full overflow-hidden rounded-full ${b.active ? "bg-black/20" : "bg-white/5"}`}>
                <div className={`h-full ${b.active ? "bg-white/80" : "bg-gradient-neon"}`} style={{ width: `${b.weight}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}