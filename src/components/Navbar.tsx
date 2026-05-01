import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight } from "lucide-react";
import { WalletModal } from "./web3/WalletModal";
import { NetworkSelector } from "./web3/NetworkSelector";
import { ConnectedAddress } from "./web3/ConnectedAddress";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl glass px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-neon shadow-neon">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Chain<span className="text-gradient-neon">Pilot</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link to="/" activeOptions={{ exact: true }} className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Home</Link>
          <Link to="/dashboard" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Dashboard</Link>
          <Link to="/signals" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Signals</Link>
          <Link to="/simulator" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Simulator</Link>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <NetworkSelector />
          </div>
          {connected ? (
            <ConnectedAddress address="0x7a3F…9c2B" onDisconnect={() => setConnected(null)} />
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="rounded-xl bg-gradient-neon px-4 py-2 text-sm font-medium text-primary-foreground shadow-neon transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Connect Wallet
            </button>
          )}
          <Link
            to="/app"
            className="hidden md:inline-flex items-center gap-1 rounded-xl glass px-3 py-2 text-sm font-medium hover:bg-white/10"
          >
            Launch App <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <WalletModal open={open} onClose={() => setOpen(false)} onConnect={(name) => { setConnected(name); setOpen(false); }} />
    </header>
  );
}