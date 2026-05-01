import { Brain, Gauge, Scale, Radio } from "lucide-react";
import { SectionHeader } from "./WalletConnect";

const features = [
  {
    icon: Brain,
    title: "Wallet Intelligence",
    body: "Behavioral DNA, win rate, hold time and trader archetype — derived directly from your on-chain history.",
  },
  {
    icon: Gauge,
    title: "Risk Scoring",
    body: "Real-time exposure, concentration and drawdown risk graded against your tolerance profile.",
  },
  {
    icon: Scale,
    title: "AI Rebalancing",
    body: "Adaptive allocation suggestions tuned to volatility regime, correlation and your investment horizon.",
  },
  {
    icon: Radio,
    title: "Onchain Signals",
    body: "Smart money rotations, whale prints, exchange flows and sentiment — distilled into actionable cues.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Features" title="Built for the on-chain operator" subtitle="Four pillars that turn raw chain data into a decision edge." />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group glass-strong relative overflow-hidden rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-glow-soft"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-neon opacity-0 blur-3xl transition group-hover:opacity-30" />
              <div className="relative">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-neon shadow-neon">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}