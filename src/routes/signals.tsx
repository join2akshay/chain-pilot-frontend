import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowDown, ArrowUp, Activity, Flame, Snowflake, Waves } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { smartMoney, whales, tokenFlows, sentiment } from "@/lib/mock-data";

export const Route = createFileRoute("/signals")({
  head: () => ({
    meta: [
      { title: "Onchain Signals — ChainPilot" },
      { name: "description", content: "Smart money movements, whale tracking, token inflow/outflow and live sentiment." },
      { property: "og:title", content: "ChainPilot Onchain Signals" },
      { property: "og:description", content: "Track smart money, whales and exchange flows in real time." },
    ],
  }),
  component: SignalsPage,
});

function SignalsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar />
      <main className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8">
            <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--sakura)]">Onchain Signals</div>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">What the chain is whispering</h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">Live smart money, whale activity, exchange flows and aggregate sentiment.</p>
          </header>

          <div className="grid gap-4 lg:grid-cols-3">
            {/* Smart money */}
            <div className="lg:col-span-2 glass-strong rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Smart Money</div>
                  <h3 className="mt-1 text-lg font-semibold">Top wallet movements</h3>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Activity className="h-3.5 w-3.5 text-[color:var(--bullish)] animate-pulse" /> Live
                </span>
              </div>
              <ul className="mt-4 divide-y divide-white/5">
                {smartMoney.map((s, i) => (
                  <li key={i} className="flex items-center justify-between gap-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`grid h-9 w-9 place-items-center rounded-xl ${s.dir === "in" ? "bg-[color:var(--bullish)]/15" : "bg-[color:var(--bearish)]/15"}`}>
                        {s.dir === "in" ? (
                          <ArrowDown className="h-4 w-4 text-[color:var(--bullish)]" />
                        ) : (
                          <ArrowUp className="h-4 w-4 text-[color:var(--bearish)]" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{s.label}</div>
                        <div className="font-mono text-xs text-muted-foreground">{s.wallet}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{s.action}</div>
                      <div className="text-xs text-muted-foreground">{s.time} ago · {s.impact} impact</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sentiment */}
            <div className="glass-strong rounded-2xl p-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Market Sentiment</div>
              <div className="mt-3 flex items-end justify-between">
                <div className="text-4xl font-semibold tracking-tight">{sentiment.fearGreed}</div>
                <span className="inline-flex items-center gap-1 rounded-md bg-[color:var(--sakura)]/15 px-2 py-1 text-xs font-semibold text-[color:var(--sakura)]">
                  <Flame className="h-3 w-3" /> {sentiment.mood}
                </span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">Fear & Greed Index</div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/5">
                <div className="h-full bg-gradient-to-r from-[color:var(--bearish)] via-[color:var(--sakura)] to-[color:var(--bullish)]" style={{ width: `${sentiment.fearGreed}%` }} />
              </div>

              <div className="mt-5 space-y-3">
                <SentimentRow label="Social Buzz" value={sentiment.social} Icon={Waves} />
                <SentimentRow label="Funding Rates" value={sentiment.funding} Icon={Snowflake} />
              </div>
            </div>
          </div>

          {/* Whales + Flows */}
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="glass-strong rounded-2xl p-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Whale Tracking</div>
              <h3 className="mt-1 text-lg font-semibold">Largest holders · 24h</h3>
              <ul className="mt-4 divide-y divide-white/5">
                {whales.map((w) => (
                  <li key={w.name} className="flex items-center justify-between py-3">
                    <div>
                      <div className="text-sm font-semibold">{w.name}</div>
                      <div className="text-xs text-muted-foreground">{w.token}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm">{w.balance}</div>
                      <div className={`text-xs ${w.change >= 0 ? "text-[color:var(--bullish)]" : "text-[color:var(--bearish)]"}`}>
                        {w.change >= 0 ? "+" : ""}{w.change}%
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-strong rounded-2xl p-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Token Flows</div>
              <h3 className="mt-1 text-lg font-semibold">Inflow vs outflow (24h, $M)</h3>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tokenFlows} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                    <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                    <XAxis dataKey="token" tick={{ fontSize: 10, fill: "oklch(0.72 0.04 340)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "oklch(0.72 0.04 340)" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "oklch(0.17 0.025 325)",
                        border: "1px solid oklch(1 0 0 / 0.1)",
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="inflow" fill="oklch(0.75 0.20 160)" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="outflow" fill="oklch(0.70 0.25 15)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function SentimentRow({ label, value, Icon }: { label: string; value: number; Icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <Icon className="h-3.5 w-3.5 text-[color:var(--sakura)]" /> {label}
        </span>
        <span className="font-semibold">{value}</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div className="h-full bg-gradient-neon" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}