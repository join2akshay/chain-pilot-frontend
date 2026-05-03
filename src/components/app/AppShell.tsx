import { useEffect, useState } from "react";
import { Link, useLocation, Routes, Route } from "react-router-dom";
import {
  LayoutDashboard,
  Brain,
  Sparkles,
  Radio,
  FlaskConical,
  Activity,
  ChevronLeft,
  Menu,
  Wand2,
} from "lucide-react";
import { useApp } from "./AppContext";
import { CopilotPanel } from "./CopilotPanel";
import { WalletModal } from "@/components/web3/WalletModal";
import { ConnectedAddress } from "@/components/web3/ConnectedAddress";

// Import page components
import Dashboard from "@/routes/app.index";
import WalletPage from "@/routes/app.wallet";
import RecommendationsPage from "@/routes/app.recommendations";
import SignalsPage from "@/routes/app.signals";
import SimulatorPage from "@/routes/app.simulator";
import FeedPage from "@/routes/app.feed";
 import SwapAdvisorPage from "@/routes/app.swap-advisor";
import { Market } from "@/routes/Market";

type NavItem =
 {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
};

const nav: NavItem[] = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/wallet", label: "Wallet Intelligence", icon: Brain },
  { to: "/app/recommendations", label: "AI Recommendations", icon: Sparkles },
  { to: "/app/signals", label: "Onchain Signals", icon: Radio },
  { to: "/app/simulator", label: "Portfolio Simulator", icon: FlaskConical },
  { to: "/app/feed", label: "Transaction Feed", icon: Activity },
  { to: "/app/swap-advisor", label: "AI Swap Advisor", icon: Wand2 },
  { to: "/app/Market", label: "Live Insights", icon: Sparkles },

  
];

export function AppShell() {
  return <ShellInner />;
}

function ShellInner() {
  const [collapsed, setCollapsed] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const [tabSwitching, setTabSwitching] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const { walletAddress, connectWallet, disconnectWallet, chatOpen, setActiveContext } = useApp();

  // Track active context for the AI
  useEffect(() => {
    const item = nav.find((n) => (n.exact ? path === n.to : path.startsWith(n.to)));
    if (item) setActiveContext(item.label);
  }, [path, setActiveContext]);

  // "AI Thinking…" loader on tab switch
  useEffect(() => {
    setTabSwitching(true);
    const t = setTimeout(() => setTabSwitching(false), 450);
    return () => clearTimeout(t);
  }, [path]);

  const isActive = (to: string, exact?: boolean) => (exact ? path === to : path === to || path.startsWith(to + "/"));

  return (
    <div className="relative flex min-h-screen w-full bg-background text-foreground">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-10 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[120px]" />
      </div>

      {/* Sidebar */}
      <aside
        className={`sticky top-0 z-30 flex h-screen shrink-0 flex-col border-r border-white/10 bg-[oklch(0.10_0.02_320/0.7)] backdrop-blur-2xl transition-[width] duration-300 ${
          collapsed ? "w-[72px]" : "w-64"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 overflow-hidden">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-neon shadow-neon">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-base font-semibold tracking-tight">
                Chain<span className="text-gradient-neon">Pilot</span>
              </span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="grid h-7 w-7 place-items-center rounded-lg glass hover:bg-white/10"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <Menu className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-3">
          {nav.map((item) => {
            const Active = isActive(item.to, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  Active
                    ? "bg-gradient-to-r from-primary/20 to-accent/10 text-foreground shadow-glow-soft"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {Active && (
                  <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r bg-gradient-neon shadow-neon" />
                )}
                <Icon className={`h-4 w-4 shrink-0 transition ${Active ? "text-[color:var(--sakura)]" : "group-hover:text-[color:var(--sakura)]"}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="m-3 rounded-2xl glass p-3 text-xs">
            <div className="flex items-center gap-2 font-semibold">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-sakura">
                <Sparkles className="h-3 w-3 text-primary-foreground" />
              </span>
              Pro tip
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              Tap the pink orb to talk to your AI co-pilot at any time.
            </p>
          </div>
        )}
      </aside>

      {/* Main column */}
      <div className={`flex min-w-0 flex-1 flex-col transition-[margin] duration-500 ${chatOpen ? "lg:mr-[420px]" : ""}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-[oklch(0.10_0.02_320/0.6)] px-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[11px] font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--bullish)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--bullish)]" />
              </span>
              LIVE
            </span>
            {tabSwitching && (
              <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] text-muted-foreground animate-in fade-in">
                <Sparkles className="h-3 w-3 animate-pulse text-[color:var(--sakura)]" />
                AI thinking…
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              {/* <NetworkSelector /> */}
            </div>
            {walletAddress ? (
              <ConnectedAddress address={walletAddress} onDisconnect={disconnectWallet} />
            ) : (
              <button
                onClick={() => setWalletModal(true)}
                className="rounded-xl bg-gradient-neon px-4 py-2 text-sm font-medium text-primary-foreground shadow-neon transition-transform hover:scale-[1.03]"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 px-6 py-8">
          <div key={path} className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/signals" element={<SignalsPage />} />
              <Route path="/simulator" element={<SimulatorPage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/swap-advisor" element={<SwapAdvisorPage />} />
              {/* <Route path="/swap-advisor" element={<SwapAdvisorPage />} /> */}
              <Route path="/Market" element={<Market />} />
            </Routes>
          </div>
        </main>
      </div>

      <WalletModal
        open={walletModal}
        onClose={() => setWalletModal(false)}
        onConnect={(name) => {
          connectWallet(name);
          setWalletModal(false);
        }}
      />

      <CopilotPanel />
    </div>
  );
}