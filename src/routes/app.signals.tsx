import { ArrowDown, Activity, Flame, Snowflake, Waves } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { useApp } from "@/components/app/AppContext";
import { createApiClient } from "@/lib/apiClient";

export default function SignalsPage() {
  const {userData}=useApp()
  const [chainSignalData,setChainSignalData]=useState(null)
  
  const getWalletSignals=async()=>{
    try {
      const res=await createApiClient().get("/onchain/signals")
      console.log("User wallet signals data:",res)
      setChainSignalData(res?.data?.data)
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }
  
  useEffect(() => {
    if(userData!==null){
      getWalletSignals()
    }
  }, [userData])

  // Transform flows object to array for chart
  const flowsData = (chainSignalData as any)?.flows ? Object.entries((chainSignalData as any).flows).map(([token, data]: [string, any]) => ({
    token,
    inflow: data.inflow,
    outflow: data.outflow
  })) : []

  return (
    <>
      <header className="mb-6">
        <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--sakura)]">Onchain Signals</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">What the chain is whispering</h1>
      </header>
      <div className="grid gap-4 lg:grid-cols-3">
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
            {(chainSignalData as any)?.movements?.map((s: any, i: number) => (
              <li key={i} className="flex items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-3">
                  <div className={`grid h-9 w-9 place-items-center rounded-xl bg-[color:var(--bullish)]/15`}>
                    <ArrowDown className="h-4 w-4 text-[color:var(--bullish)]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{s.label}</div>
                    <div className="font-mono text-xs text-muted-foreground">{s.wallet.slice(0, 10)}...</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">{s.action}</div>
                  <div className="text-xs text-muted-foreground">{s.timeAgo} · {s.impact} impact</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-strong rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Market Sentiment</div>
          <div className="mt-3 flex items-end justify-between">
            <div className="text-4xl font-semibold tracking-tight">{(chainSignalData as any)?.sentiment?.score || 0}</div>
            <span className="inline-flex items-center gap-1 rounded-md bg-[color:var(--sakura)]/15 px-2 py-1 text-xs font-semibold text-[color:var(--sakura)]">
              <Flame className="h-3 w-3" /> {(chainSignalData as any)?.sentiment?.label || "Neutral"}
            </span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Fear & Greed Index</div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/5">
            <div className="h-full bg-gradient-to-r from-[color:var(--bearish)] via-[color:var(--sakura)] to-[color:var(--bullish)]" style={{ width: `${(chainSignalData as any)?.sentiment?.score || 0}%` }} />
          </div>
          <div className="mt-5 space-y-3">
            <SentimentRow label="Social Buzz" value={(chainSignalData as any)?.sentiment?.socialBuzz || 0} Icon={Waves} />
            <SentimentRow label="Funding Rates" value={(chainSignalData as any)?.sentiment?.fundingRates || 0} Icon={Snowflake} />
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="glass-strong rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Whale Tracking</div>
          <h3 className="mt-1 text-lg font-semibold">Largest holders · 24h</h3>
          <ul className="mt-4 divide-y divide-white/5">
            {(chainSignalData as any)?.whales?.map((w: any) => (
              <li key={w.wallet} className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-semibold">{w.token}</div>
                  <div className="text-xs text-muted-foreground">{w.wallet.slice(0, 10)}...</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm">{w.balance.toLocaleString()}</div>
                  <div className={`text-xs ${w.changePercent >= 0 ? "text-[color:var(--bullish)]" : "text-[color:var(--bearish)]"}`}>
                    {w.changePercent >= 0 ? "+" : ""}{w.changePercent}%
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
              <BarChart data={flowsData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis dataKey="token" tick={{ fontSize: 10, fill: "oklch(0.72 0.04 340)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "oklch(0.72 0.04 340)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.17 0.025 325)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="inflow" fill="oklch(0.75 0.20 160)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="outflow" fill="oklch(0.70 0.25 15)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
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