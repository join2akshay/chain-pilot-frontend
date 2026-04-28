import { ArrowRight, Sparkles, Wallet, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Ticker = () => {
  const items = [
    "ETH $3,841.20 +2.4%",
    "BTC $68,210 +1.1%",
    "SOL $189.42 +5.7%",
    "PEPE +18.3%",
    "WIF +12.1%",
    "PENDLE +8.9%",
    "Smart $ rotating → $PENDLE",
    "Risk Score: 74/100",
    "Copilot online",
  ];
  const list = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="flex animate-ticker whitespace-nowrap py-2.5">
        {list.map((t, i) => (
          <span key={i} className="terminal-text text-xs text-muted-foreground mx-6 inline-flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-primary/60" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export const Hero = () => {
  return (
    <section className="relative pt-28 pb-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-10 w-[400px] h-[400px] rounded-full bg-secondary/15 blur-[120px] pointer-events-none" />

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="terminal-text text-xs tracking-wider text-muted-foreground">
               New Gen AI-Driven Portfolio Management
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.95]">
            Your{" "}
            <span className="relative inline-block">
              <span className="text-gradient-primary">Autonomous</span>
              <span className="absolute -inset-2 bg-primary/10 blur-2xl -z-10" />
            </span>
            <br />
             Portfolio Copilot
          </h1>

          <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI analyzes your wallet behavior, follows smart money, predicts risks, and suggests actions{" "}
            <span className="text-foreground font-medium">before losses happen.</span>
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button size="lg" className="h-12 px-7 bg-gradient-primary text-primary-foreground border-0 shadow-glow-primary hover:opacity-95 hover:shadow-glow-primary font-semibold group">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-7 glass border-primary/30 hover:bg-primary/10 hover:border-primary/50 font-semibold">
              <Zap className="mr-2 h-4 w-4 text-accent" />
              Run AI Analysis
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 max-w-xl mx-auto gap-6">
            {[
              { v: "$0", l: "Onchain analyzed" },
              { v: "0", l: "AI features" },
              { v: "0", l: "Wallets tracked" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-bold text-gradient-primary">{s.v}</div>
                <div className="terminal-text text-[10px] tracking-widest text-muted-foreground uppercase mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Ticker />
      </div>
    </section>
  );
};
