import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
// import { riskExposure } from "@/lib/mock-data";

function colorFor(v: number) {
  if (v >= 75) return "oklch(0.70 0.25 15)";
  if (v >= 50) return "oklch(0.72 0.27 350)";
  if (v >= 30) return "oklch(0.85 0.18 340)";
  return "oklch(0.75 0.20 160)";
}

export function RiskExposure({ walletIntelligence }: { walletIntelligence: any }  ) {
  const riskExposure = [
  { bucket: "L1", risk: walletIntelligence?.riskExposure?.L1 || 0 },
  { bucket: "L2", risk: walletIntelligence?.riskExposure?.L2 || 0 },
  { bucket: "DeFi", risk: walletIntelligence?.riskExposure?.DeFi || 0 },
  { bucket: "Memes", risk: walletIntelligence?.riskExposure?.Memes || 0 },
  { bucket: "Stables", risk: walletIntelligence?.riskExposure?.Stables || 0 },
  { bucket: "RWA", risk: walletIntelligence?.riskExposure?.RWA || 0 },
];
  return (
    <div className="glass-strong rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Risk Exposure</div>
        <div className="text-xs text-muted-foreground">by category</div>
      </div>
      <div className="mt-4 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={riskExposure} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
            <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
            <XAxis dataKey="bucket" tick={{ fontSize: 10, fill: "oklch(0.72 0.04 340)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "oklch(0.72 0.04 340)" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "oklch(0.17 0.025 325)",
                border: "1px solid oklch(1 0 0 / 0.1)",
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            <Bar dataKey="risk" radius={[6, 6, 0, 0]}>
              {riskExposure.map((r) => (
                <Cell key={r.bucket} fill={colorFor(r.risk)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}