import { useMemo, useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, TrendingUp, ShieldAlert } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { createApiClient } from "@/lib/apiClient";

export const Route = createFileRoute("/app/simulator")({
  head: () => ({
    meta: [
      { title: "Portfolio Simulator — ChainPilot" },
      { name: "description", content: "Simulate AI-optimized allocations across capital, risk and horizon." },
    ],
  }),
  component: SimulatorPage,
});

const horizons = ["3m", "6m", "1y", "3y"] as const;
const palette = ["oklch(0.72 0.27 350)", "oklch(0.85 0.18 340)", "oklch(0.75 0.20 160)", "oklch(0.70 0.22 30)", "oklch(0.65 0.22 290)"];

function SimulatorPage() {
  const [capital, setCapital] = useState(50000);
  const [risk, setRisk] = useState(55);
  const [horizon, setHorizon] = useState<(typeof horizons)[number]>("1y");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const simulateAPI = async(cap: number, rsk: number, hrz: string) => {
    console.log("Simulating with - Capital:", cap, "Risk:", rsk, "Horizon:", hrz);
    // TODO: Call actual API endpoint here
    try {
    const res=await createApiClient().post("/portfolio/simulate",{"capital":cap,"riskTolerance ":rsk,"horizon":hrz})
    console.log("simulate  data:",res)
    
 
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
  };

  useEffect(() => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new debounced call
    debounceTimer.current = setTimeout(() => {
      simulateAPI(capital, risk, horizon);
    }, 1000);

    // Cleanup
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [capital, risk, horizon]);

  const { allocation, expectedReturn, drawdown } = useMemo(() => {
    const eth = Math.round(20 + risk * 0.35);
    const btc = Math.round(20 + (100 - risk) * 0.2);
    const stables = Math.max(5, Math.round((100 - risk) * 0.45));
    const alts = Math.max(0, Math.round(risk * 0.25));
    const defi = Math.max(0, 100 - eth - btc - stables - alts);
    const data = [
      { name: "ETH", value: eth },
      { name: "BTC", value: btc },
      { name: "Stables", value: stables },
      { name: "DeFi", value: defi },
      { name: "Alts", value: alts },
    ];
    const horizonMult = { "3m": 0.25, "6m": 0.5, "1y": 1, "3y": 2.4 }[horizon];
    return { allocation: data, expectedReturn: (8 + risk * 0.35) * horizonMult, drawdown: 6 + risk * 0.45 };
  }, [risk, horizon]);

  return (
    <>
      <header className="mb-6">
        <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--sakura)]">Portfolio Simulator</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">Run the strategy before the trade</h1>
      </header>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass-strong rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Inputs</div>
          <div className="mt-5 space-y-6">
            <div>
              <label className="text-xs text-muted-foreground">Capital</label>
              <div className="mt-2 flex items-center gap-2 rounded-xl glass px-3 py-2">
                <span className="text-sm">$</span>
                <input type="number" value={capital} onChange={(e) => setCapital(Number(e.target.value) || 0)} className="w-full bg-transparent text-sm outline-none" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs">
                <label className="text-muted-foreground">Risk Tolerance</label>
                <span className="font-semibold">{risk}/100</span>
              </div>
              <input type="range" min={0} max={100} value={risk} onChange={(e) => setRisk(Number(e.target.value))} className="mt-2 w-full accent-[color:var(--neon)]" />
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground"><span>Conservative</span><span>Balanced</span><span>Degen</span></div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Investment Horizon</label>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {horizons.map((h) => (
                  <button key={h} onClick={() => setHorizon(h)} className={`rounded-lg px-2 py-1.5 text-xs font-semibold transition ${horizon === h ? "bg-gradient-neon text-primary-foreground shadow-neon" : "glass hover:bg-white/10"}`}>{h}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">AI Optimized Allocation</div>
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-neon px-2 py-0.5 text-[10px] font-semibold text-primary-foreground shadow-neon"><Sparkles className="h-3 w-3" /> AI</span>
          </div>
          <div className="mt-3 grid grid-cols-2 items-center">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={allocation} dataKey="value" innerRadius={42} outerRadius={70} paddingAngle={2} stroke="none">
                    {allocation.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "oklch(0.17 0.025 325)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-1.5 text-xs">
              {allocation.map((a, i) => (
                <li key={a.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: palette[i % palette.length] }} /> {a.name}</span>
                  <span className="font-semibold">{a.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="glass-strong rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Projection</div>
          <div className="mt-4 space-y-4">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground"><span>Expected Return ({horizon})</span><TrendingUp className="h-3.5 w-3.5 text-[color:var(--bullish)]" /></div>
              <div className="mt-2 text-2xl font-semibold text-[color:var(--bullish)]">+{expectedReturn.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">≈ ${(capital * expectedReturn / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground"><span>Projected Max Drawdown</span><ShieldAlert className="h-3.5 w-3.5 text-[color:var(--bearish)]" /></div>
              <div className="mt-2 text-2xl font-semibold text-[color:var(--bearish)]">-{drawdown.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">P95 stress scenario</div>
            </div>
            <button className="w-full rounded-xl bg-gradient-neon px-4 py-3 text-sm font-semibold text-primary-foreground shadow-neon transition-transform hover:scale-[1.02]">Apply Strategy</button>
          </div>
        </div>
      </div>
    </>
  );
}