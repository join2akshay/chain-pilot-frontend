import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { WalletConnect } from "@/components/WalletConnect";
import { AIChat } from "@/components/AIChat";
import { Market } from "@/components/Market";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ChainPilot — Your AI Co-Pilot for On-Chain Decisions" },
      { name: "description", content: "Understand your wallet, analyze the market, and make smarter trades with an AI co-pilot built for Web3." },
      { property: "og:title", content: "ChainPilot — AI Co-Pilot for Web3" },
      { property: "og:description", content: "Wallet analysis, live market signals, and on-chain memory — guided by AI." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <WalletConnect />
        <AIChat />
        <Market />
      </main>
      <Footer />
    </div>
  );
}
