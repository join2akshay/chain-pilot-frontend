import { Activity, Wifi } from "lucide-react";

export const Navbar = () => (
  <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
    <div className="container flex h-16 items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="relative h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow-primary">
          <Activity className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-display font-bold text-base tracking-tight">Chain Pilot</span>
          <span className="terminal-text text-[10px] text-muted-foreground tracking-[0.2em] mt-0.5">AI </span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">Link</a>
        <a href="#" className="hover:text-foreground transition-colors">Link</a>
        <a href="#" className="hover:text-foreground transition-colors">Link</a>
        <a href="#" className="hover:text-foreground transition-colors">Link</a>
        <a href="#" className="hover:text-foreground transition-colors">Link</a>
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass terminal-text text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-muted-foreground">Testnet</span>
          <Wifi className="h-3 w-3 text-accent" />
        </div>
      </div>
    </div>
  </header>
);
