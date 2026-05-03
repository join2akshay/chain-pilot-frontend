
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
// import { WalletModal } from "./web3/WalletModal";
// import { NetworkSelector } from "./web3/NetworkSelector";
import { ConnectedAddress } from "./web3/ConnectedAddress";
import {  useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useDisconnect } from '@reown/appkit/react'
import Logo from "@/assets/logo.jpeg"

export function Navbar() {
  
 const{isConnected,address}=useAppKitAccount()
   const { disconnect } = useDisconnect()
   const {open}=useAppKit()

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl glass px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="ChainPilot Logo" className="h-[3rem] w-[3rem] rounded-[24px]" />
          {/* <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-neon shadow-neon">
           
          </div> */}
          <span className="text-lg font-semibold tracking-tight">
            Chain<span className="text-gradient-neon">Pilot</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link to="/app" className="hover:text-foreground transition-colors">Dashboard</Link>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            {/* <NetworkSelector /> */}
          </div>
          {isConnected ? (
            <ConnectedAddress address={address} onDisconnect={() => disconnect()} />
          ) : (
            <button
              onClick={() => open()}
              className="rounded-xl bg-gradient-neon px-4 py-2 text-sm font-medium text-primary-foreground shadow-neon transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Connect Wallet
            </button>
          )}
          {
            isConnected && 

          <Link
            to="/app"
            className="hidden md:inline-flex items-center gap-1 rounded-xl glass px-3 py-2 text-sm font-medium hover:bg-white/10"
          >
            Launch App <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          }
        </div>
      </div>

      {/* <WalletModal open={open} onClose={() => setOpen(false)} onConnect={(name) => { setConnected(name); setOpen(false); }} /> */}
    </header>
  );
}