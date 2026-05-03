import { Github } from "lucide-react";
import Logo from "@/assets/logo.png"
export function Footer() {
  return (
    <footer className="relative px-6 pt-16 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="mt-10 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-neon shadow-neon">
              {/* <Sparkles className="h-3.5 w-3.5 text-primary-foreground" /> */}
            <img src={Logo} alt="ChainPilot Logo" className="h-[2rem] w-[3.25rem] rounded-[24px] bg-[aliceblue]" />

            </div>
            <span className="text-sm font-semibold">
              Chain<span className="text-gradient-neon">Pilot</span>
            </span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Home</a>
            <a href="https://github.com/join2akshay/chain-pilot-frontend" target="_blank" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Github className="h-4 w-4" /> GitHub
            </a>
            {/* <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--sakura)]/40 bg-[color:var(--sakura)]/10 px-3 py-1 text-xs text-[color:var(--sakura)]">
              <Trophy className="h-3.5 w-3.5" /> Hackathon Build
            </span> */}
          </nav>

          <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} ChainPilot</div>
        </div>
      </div>
    </footer>
  );
}