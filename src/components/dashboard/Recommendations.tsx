import { ArrowRight, AlertTriangle, ShieldCheck, Scale, Crosshair } from "lucide-react";
import { recommendations } from "@/lib/mock-data";

const iconFor: Record<string, React.ComponentType<{ className?: string }>> = {
  Trim: AlertTriangle,
  Rotate: ShieldCheck,
  Rebalance: Scale,
  "Scale Out": Crosshair,
};

export function Recommendations() {
  return (
    <div className="glass-strong rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--sakura)]">AI Recommendations</div>
          <h3 className="mt-1 text-xl font-semibold tracking-tight">Suggested moves</h3>
        </div>
        <span className="text-xs text-muted-foreground">Updated 2m ago</span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {recommendations.map((r) => {
          const Icon = iconFor[r.action] ?? Scale;
          const sevColor =
            r.severity === "high"
              ? "text-[color:var(--bearish)] border-[color:var(--bearish)]/30 bg-[color:var(--bearish)]/10"
              : r.severity === "med"
              ? "text-[color:var(--sakura)] border-[color:var(--sakura)]/30 bg-[color:var(--sakura)]/10"
              : "text-muted-foreground border-white/10 bg-white/5";
          return (
            <div key={r.title} className="glass rounded-xl p-4 transition hover:-translate-y-0.5 hover:shadow-glow-soft">
              <div className="flex items-center justify-between">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-neon shadow-neon">
                  <Icon className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${sevColor}`}>
                  {r.severity} priority
                </span>
              </div>
              <h4 className="mt-3 text-sm font-semibold">{r.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{r.body}</p>

              <div className="mt-4">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                  <span>AI Confidence</span>
                  <span className="font-semibold text-foreground">{r.confidence}%</span>
                </div>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full bg-gradient-neon" style={{ width: `${r.confidence}%` }} />
                </div>
              </div>

              <button className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--sakura)] hover:text-foreground">
                {r.action} <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}