import { Activity, Heart, ShieldCheck } from "lucide-react";
import { SectionHeader } from "./WalletConnect";

export function Profile() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Profile" title="Your trader DNA" subtitle="ChainPilot classifies your behaviour to tune every recommendation." />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="glass rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-glow-soft">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Profile Type</div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-neon px-3 py-1 text-xs font-semibold text-primary-foreground shadow-neon">
              Intermediate
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Balanced approach. Active but disciplined.
            </p>
          </div>

          <Stat icon={<ShieldCheck className="h-4 w-4" />} label="Risk Score" value="62 / 100" tone="sakura" bar={62} />
          <Stat icon={<Activity className="h-4 w-4" />} label="Trade Frequency" value="14 / week" tone="neon" bar={48} />
          <Stat icon={<Heart className="h-4 w-4" />} label="Wallet Health" value="A-" tone="bull" bar={84} />

          <Badge label="DeFi Native" />
          <Badge label="ETH Maxi" />
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, label, value, bar, tone }: { icon: React.ReactNode; label: string; value: string; bar: number; tone: "neon" | "sakura" | "bull" }) {
  const fill = tone === "bull" ? "bg-[color:var(--bullish)]" : tone === "sakura" ? "bg-gradient-sakura" : "bg-gradient-neon";
  return (
    <div className="glass rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-glow-soft">
      <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
        <span>{label}</span>
        <span className="text-foreground/80">{icon}</span>
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div className={`h-full ${fill}`} style={{ width: `${bar}%` }} />
      </div>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">Badge</div>
      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--sakura)]/40 bg-[color:var(--sakura)]/10 px-3 py-1 text-xs font-medium text-[color:var(--sakura)]">
        ✦ {label}
      </div>
    </div>
  );
}