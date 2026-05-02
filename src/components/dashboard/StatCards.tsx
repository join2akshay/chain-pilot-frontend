import { TrendingUp, TrendingDown, ShieldCheck, Heart } from "lucide-react";
import { useApp } from "../app/AppContext";
import { useEffect } from "react";

type Tone = "bull" | "bear" | "neutral";

function Card({ label, value, sub, tone, Icon }: { label: string; value: string; sub: string; tone: Tone; Icon: React.ComponentType<{ className?: string }> }) {
  const toneColor =
    tone === "bull" ? "text-[color:var(--bullish)]" : tone === "bear" ? "text-[color:var(--bearish)]" : "text-muted-foreground";
  return (
    <div className="glass-strong rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-glow-soft">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="grid h-8 w-8 place-items-center rounded-lg glass">
          <Icon className="h-4 w-4 text-[color:var(--sakura)]" />
        </div>
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{value}</div>
      <div className={`mt-1 text-xs ${toneColor}`}>{sub}</div>
    </div>
  );
}

export function StatCards() {
  const {analysisData,analyticsData} = useApp()
  console.log("Analysis data in StatCards:", analysisData)
  useEffect(() => {
    if(analysisData){
      console.log("Updating StatCards with analysis data:", analysisData)
      // Here you would typically set state with the analysis data to update the cards
    }
  }, [analysisData])
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card label="Portfolio Value" value={analyticsData?.currentValueUsd || "0"} sub="" tone="bull" Icon={TrendingUp} />
      <Card label="Wallet Level" value={analysisData?.wallet_level || "N/A"} sub="" tone="bull" Icon={TrendingUp} />
      <Card label="Risk Score" value={analysisData?.risk_score || "N/A"} sub="" tone="neutral" Icon={ShieldCheck} />
      <Card label="Wallet Health" value={analysisData?.wallet_health_score || "N/A"} sub="" tone="bull" Icon={Heart} />
    </div>
  );
}