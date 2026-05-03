import { Activity, Bot, Bell, Scale, ArrowDownUp} from "lucide-react";
import { createApiClient } from "@/lib/apiClient";
import { useEffect, useState } from "react";
import { useAppKitAccount } from "../providers/Web3Provider";

const getIconForType = (type: string) => {
  const iconMap: Record<string, any> = {
    TRADE: ArrowDownUp,
    AI: Bot,
    REBALANCE: Scale,
    ALERT: Bell,
    SENTIMENT: Activity,
  };
  return iconMap[type] || Activity;
};

const getToneForEvent = (event: any): string => {
  if (event.type === "TRADE") {
    return event.metadata?.amount > 0 ? "text-[color:var(--bullish)]" : "text-[color:var(--bearish)]";
  }
  if (event.type === "SENTIMENT") {
    const score = event.metadata?.score || 50;
    return score > 60 ? "text-[color:var(--bullish)]" : score < 40 ? "text-[color:var(--bearish)]" : "text-[color:var(--sakura)]";
  }
  if (event.type === "ALERT") {
    return "text-[color:var(--bearish)]";
  }
  return "text-[color:var(--sakura)]";
};

const formatTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

const getMetaInfo = (event: any): string => {
  switch (event.type) {
    case "TRADE":
      return `${event.metadata?.category || "Spot"} · ${event.metadata?.asset || "Transfer"} · $${event.metadata?.usd?.toFixed(2) || "0"}`;
    case "SENTIMENT":
      return `Sentiment · ${event.metadata?.label || "Neutral"} · Buzz: ${event.metadata?.socialBuzz || 0}%`;
    case "ALERT":
      return `Alert · Threshold breached`;
    default:
      return event.subtitle || "Event";
  }
};

export function TransactionFeed() {
  const { isConnected } = useAppKitAccount();

  const [feedData, setFeedData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getWalletFeed = async () => {
    try {
      setIsLoading(true);
      const res = await createApiClient().get("/timeline");
      console.log("User wallet feed data:", res);
      setFeedData(res?.data?.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      getWalletFeed();
    }
  }, [isConnected]);

  return (
    <div className="glass-strong rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--sakura)]">Transaction Intelligence</div>
          <h3 className="mt-1 text-xl font-semibold tracking-tight">Live activity feed</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Activity className="h-3.5 w-3.5 text-[color:var(--bullish)] animate-pulse" />
          Streaming
        </span>
      </div>

      {isLoading ? (
        <div className="mt-6 flex items-center justify-center min-h-[300px]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gradient-neon border-r-gradient-neon animate-spin" />
              <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-primary/50 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Loading activity feed</p>
              <p className="text-xs text-muted-foreground mt-1">Fetching transaction data...</p>
            </div>
          </div>
        </div>
      ) : (
        <>
      <ul className="mt-6 relative">
        <div className="absolute left-3.5 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent" />
        {feedData?.events?.map((event: any) => {
          const Icon = getIconForType(event.type);
          const tone = getToneForEvent(event);
          const timeStr = formatTime(event.timestamp);
          const meta = getMetaInfo(event);

          return (
            <li key={event.id} className="relative flex items-start gap-3 pl-10 pb-4 last:pb-0">
              <span className="absolute left-1 top-2 grid h-6 w-6 place-items-center rounded-full bg-card ring-1 ring-white/10">
                <Icon className={`h-3.5 w-3.5 ${tone}`} />
              </span>
              <div className="flex-1 glass rounded-xl p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium">{event.title}</div>
                  <span className="text-[10px] text-muted-foreground">{timeStr}</span>
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">{meta}</div>
              </div>
            </li>
          );
        })}
      </ul>

      {feedData?.narrative && (
        <div className="mt-6 rounded-lg bg-white/5 p-3 border border-white/10">
          <div className="text-xs font-medium text-primary mb-1">Narrative</div>
          <p className="text-xs text-muted-foreground">{feedData.narrative}</p>
        </div>
      )}
      </>
      )}
    </div>
  );
}