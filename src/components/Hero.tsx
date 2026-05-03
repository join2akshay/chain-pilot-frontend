import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Wallet, Rocket } from "lucide-react";
import { SakuraPetals } from "./SakuraPetals";
import sakuraTree from "@/assets/sakura-tree.png";
import { useAppKit, useAppKitAccount } from '@/components/providers/Web3Provider'
import { createApiClient } from "@/lib/apiClient";
const Ticker = ({ items }: { items: string[] }) => {
  const list = items;
  return (
    <div className="relative overflow-hidden border-y border-border/50 bg-card/30 backdrop-blur-sm mt-[7rem]">
      <div className="flex animate-ticker whitespace-nowrap py-2.5">
        {[...list, ...list].map((t: string, i: number) => (
          <span key={i} className="terminal-text text-md text-muted-foreground mx-6 inline-flex items-center gap-2 flex-shrink-0">
            <span className="h-1 w-1 rounded-full bg-primary/60" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export function Hero() {
const [globalData,setGlobalData]=useState<string[]>([])
const [recommendationsData,setRecommendationsData]=useState<any>(null)
    
    const getWalletRecommendation=async()=>{
      try {
        const res=await createApiClient().get("/market/hero-recommendation")
        console.log("User wallet recommendations data:",res)
        setRecommendationsData(res?.data?.data?.recommendation)
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
  const globalDataAPI=async()=>{
    const res=await createApiClient().get("/wallet/global-market")
    const data=res?.data?.data?.tokens
    console.log("Global data:",data)
    
    const cryptoData = [
     ...data
    ];
    
    const items: string[] = cryptoData.map(crypto => 
      `${crypto.symbol} $${crypto.price.toFixed(2)} ${crypto.change24h > 0 ? '+' : ''}${crypto.change24h.toFixed(2)}% ${crypto.trend === 'up' ? '📈' : '📉'}`
    );
    items.push("Copilot online");
    
    setGlobalData(items)
  }

  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();

  useEffect(() => {
    globalDataAPI()
    getWalletRecommendation()
    if(isConnected){
      console.log("Connected with address:",address)
    
      // navigate({ to: "/app" })
    
    }
  },[isConnected,address])

  // const [open, setOpen] = useState(false);
  return (
    <section className="relative isolate overflow-hidden bg-hero pt-40 pb-32">
      {/* Sakura tree backdrop on left (decorative) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[55%] md:w-[42%] lg:w-[38%] z-0"
      >
        {/* soft pink glow behind tree */}
        <div className="absolute -left-24 top-1/4 h-[520px] w-[520px] rounded-full bg-primary/25 blur-[140px]" />
        {/* fog at base */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/15 via-primary/5 to-transparent blur-2xl" />
        <div className="absolute inset-0 animate-branch-sway">
          <img
            src={sakuraTree}
            alt=""
            width={1920}
            height={1280}
            className="h-full w-full object-cover object-left-bottom opacity-90"
            style={{
              maskImage:
                "linear-gradient(to right, black 55%, transparent 100%), linear-gradient(to top, transparent 0%, black 18%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 55%, transparent 100%), linear-gradient(to top, transparent 0%, black 18%)",
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
            }}
          />
        </div>
        {/* sparkle particles near blossoms */}
        <span className="animate-sparkle absolute left-[28%] top-[22%] h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_2px_oklch(0.85_0.18_340)]" style={{ animationDelay: "0.4s" }} />
        <span className="animate-sparkle absolute left-[44%] top-[34%] h-1 w-1 rounded-full bg-accent shadow-[0_0_8px_2px_oklch(0.85_0.18_340)]" style={{ animationDelay: "1.2s" }} />
        <span className="animate-sparkle absolute left-[18%] top-[48%] h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_2px_oklch(0.85_0.18_340)]" style={{ animationDelay: "2.1s" }} />
        <span className="animate-sparkle absolute left-[36%] top-[60%] h-1 w-1 rounded-full bg-accent shadow-[0_0_8px_2px_oklch(0.85_0.18_340)]" style={{ animationDelay: "0.9s" }} />
      </div>

      <SakuraPetals count={36} />

      {/* Right-side fade so petals dissolve into the dark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[20%] z-0 bg-gradient-to-l from-background via-background/60 to-transparent"
      />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-primary/30 blur-[120px]" />
      <div className="pointer-events-none absolute top-20 right-1/4 h-[360px] w-[360px] rounded-full bg-accent/30 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          AI Co-Pilot · Live on-chain intelligence
        </div>

        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          Your AI Co-Pilot for{" "}
          <span className="text-gradient-neon">On-Chain Decisions</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
          Understand your wallet. Analyze the market. Make smarter trades - guided by an AI that
          reads the chain so you don't have to.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          
      
      
          {
            !isConnected 
            ? 
            <button
            onClick={() => open()}
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-neon px-6 py-3 text-sm font-medium text-primary-foreground shadow-neon transition-transform hover:scale-[1.04] active:scale-[0.98]"
          >
              <Wallet className="h-4 w-4" />
              Connect Wallet
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                :

          <Link
            to="/app"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-sakura px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-soft transition-transform hover:scale-[1.04] active:scale-[0.98] animate-pulse-glow"
          >
            <Rocket className="h-4 w-4" />
           Launch App
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          }
        </div>

        {/* Floating preview chip */}
        <div className="mx-auto mt-16 max-w-3xl animate-float">
        {
          recommendationsData &&
          <div className="glass-strong rounded-2xl p-4 shadow-card">
            <div className="flex items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-sakura" />
                <div className="text-left">
                  <div className="font-medium">{recommendationsData?.token} · Recommendation</div>
                  <div className="text-xs text-muted-foreground">Confidence {recommendationsData?.confidence}% · RSI {recommendationsData?.rsi}</div>
                </div>
              </div>
              <span className="rounded-lg bg-bullish/15 px-3 py-1 text-xs font-semibold text-[color:var(--bullish)]">
                {recommendationsData?.action}
              </span>
            </div>
          </div>
        }
        </div>
      </div>
       <div className="mt-16">
        {
          globalData.length > 0 && <Ticker items={globalData} />
        }
        
      </div>
      {/* <WalletModal open={open} onClose={() => setOpen(false)} onConnect={() => setOpen(false)} /> */}
    </section>
  );
}