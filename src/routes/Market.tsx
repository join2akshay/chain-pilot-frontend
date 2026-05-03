// @ts-ignore
// @ts-nocheck
import { TrendingDown, TrendingUp } from "lucide-react";
// import { SectionHeader } from "./WalletConnect";
// import { DecisionCard } from "./DecisionCard";
import { createApiClient } from "@/lib/apiClient";
import { useEffect, useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { SectionHeader } from "@/components/WalletConnect";
import { DecisionCard } from "@/components/DecisionCard";
export function Market() {
  const {isConnected}=useAppKitAccount()
  const [liveInsightsData,setLiveInsightsData]=useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const getWalletRecommendation=async()=>{
    try {
      setIsLoading(true)
      const res=await createApiClient().get("/market/live-insights")
      console.log("User wallet live sigth  data:",res)
      setLiveInsightsData(res?.data?.data)
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(isConnected){
      getWalletRecommendation()
    }
  },[isConnected])
  return (
    <section id="market" className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Market" title="Live insights" subtitle="Key indicators distilled into signals you can act on." />

        {isLoading ? (
          <div className="mt-10 flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gradient-neon border-r-gradient-neon animate-spin" />
                <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-primary/50 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Loading market insights</p>
                <p className="text-xs text-muted-foreground mt-1">Fetching live data...</p>
              </div>
            </div>
          </div>
        ) : (
          <>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {
            liveInsightsData?.cards?.map((t: any) => {
              const bull = t.change24hPercent > 0;
              const minPrice = Math.min(...t.sparkline);
              const maxPrice = Math.max(...t.sparkline);
              const range = maxPrice - minPrice;
              
              return (
                <div key={t.symbol} className="glass rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-glow-soft">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`grid h-9 w-9 place-items-center rounded-xl ${bull ? "bg-[color:var(--bullish)]/15" : "bg-[color:var(--bearish)]/15"}`}>
                        {bull ? (
                          <TrendingUp className="h-4 w-4 text-[color:var(--bullish)]" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-[color:var(--bearish)]" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{t.symbol}</div>
                        <div className="text-xs text-muted-foreground">{t.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">${t.priceUsd.toLocaleString()}</div>
                      <div className={`text-xs ${bull ? "text-[color:var(--bullish)]" : "text-[color:var(--bearish)]"}`}>
                        {t.change24hPercent > 0 ? "+" : ""}
                        {t.change24hPercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-end gap-1.5">
                    {t.sparkline.map((price: number, i: number) => {
                      const normalized = range > 0 ? (price - minPrice) / range : 0.5;
                      const h = 6 + normalized * 26;
                      return (
                        <span
                          key={i}
                          className={`w-1 rounded-sm ${bull ? "bg-[color:var(--bullish)]/60" : "bg-[color:var(--bearish)]/60"}`}
                          style={{ height: `${h}px` }}
                        />
                      );
                    })}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>RSI</span>
                    <span className="font-medium text-foreground">{t.rsi.toFixed(2)}</span>
                  </div>
                  <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/5">
                    <div className={`h-full ${bull ? "bg-[color:var(--bullish)]" : "bg-[color:var(--bearish)]"}`} style={{ width: `${Math.min(t.rsi, 100)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <DecisionCard data={liveInsightsData?.recommendation} />
          </div>
        </>
        )}

        </div>
      {/* </div> */}
    </section>
  );
}