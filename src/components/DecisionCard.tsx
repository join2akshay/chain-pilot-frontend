import { Zap } from "lucide-react";
import { DecisionTag } from "./AIChat";

export function DecisionCard({ data }: { data: any }) {
  const confidence = data?.confidence || 0;
  return (
    <div className="animated-border rounded-2xl p-6 shadow-card animate-pulse-glow">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">AI Recommendation</div>
        <DecisionTag decision={data?.action || "BUY"} />
      </div>
      <div className="mt-4 text-3xl font-semibold tracking-tight">{data?.symbol || "ETH"}</div>
      <div className="mt-1 text-sm text-muted-foreground">Spot · {data?.timeframe || "1H"} timeframe</div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Confidence</span>
          <span className="font-semibold text-foreground">{confidence}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
          <div className="h-full bg-gradient-neon" style={{ width: `${confidence}%` }} />
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
       {data?.reason || "The AI has analyzed on-chain data and market trends to arrive at this recommendation. It considers factors like price momentum, trading volume, and recent news to provide a confidence score for this trade."}
      </p>

      {/* <button className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-neon px-4 py-3 text-sm font-semibold text-primary-foreground shadow-neon transition-transform hover:scale-[1.02]">
        <Zap className="h-4 w-4 transition-transform group-hover:rotate-12" />
        Execute Trade
      </button> */}
    </div>
  );
}