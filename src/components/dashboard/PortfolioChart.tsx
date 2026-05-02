import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { portfolioSeries } from "@/lib/mock-data";
import { useApp } from "../app/AppContext";
import { useEffect } from "react";

export function PortfolioChart() {
  const { analyticsData } = useApp()
  
  // Use analyticsData if available, fallback to mock data
  const chartData = analyticsData?.portfolioPerformance?.points || portfolioSeries;
  const portfolioValue = analyticsData?.currentValueUsd ?? 148920;
  const changePercent = analyticsData?.changePercent ?? 18.2;
  
  useEffect(() => {
    if (analyticsData) {
      console.log("Updating PortfolioChart with analytics data:", analyticsData)
    }
  }, [analyticsData])
  
  return (
    <div className="glass-strong rounded-2xl p-5">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Portfolio Performance</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">${portfolioValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
        </div>
        <div className="text-xs text-[color:var(--bullish)]">
          {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(1)}% · {analyticsData?.range || '30d'}
        </div>
      </div>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="pf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.27 350)" stopOpacity={0.6} />
                <stop offset="100%" stopColor="oklch(0.72 0.27 350)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="bm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.85 0.18 340)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="oklch(0.85 0.18 340)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: "oklch(0.72 0.04 340)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "oklch(0.72 0.04 340)" }} axisLine={false} tickLine={false} width={50} />
            <Tooltip
              contentStyle={{
                background: "oklch(0.17 0.025 325)",
                border: "1px solid oklch(1 0 0 / 0.1)",
                borderRadius: 12,
                fontSize: 12,
              }}
              labelStyle={{ color: "oklch(0.92 0.06 350)" }}
            />
            <Area type="monotone" dataKey="benchmark" stroke="oklch(0.85 0.18 340)" strokeWidth={1.5} fill="url(#bm)" />
            <Area type="monotone" dataKey="value" stroke="oklch(0.72 0.27 350)" strokeWidth={2.5} fill="url(#pf)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}