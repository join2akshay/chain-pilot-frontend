import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const networks = [
  { id: "eth", name: "Ethereum", color: "bg-indigo-400" },
  { id: "arb", name: "Arbitrum", color: "bg-sky-400" },
  { id: "op", name: "Optimism", color: "bg-red-400" },
  { id: "base", name: "Base", color: "bg-blue-500" },
  { id: "sol", name: "Solana", color: "bg-fuchsia-400" },
];

export function NetworkSelector() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(networks[0]);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-xl glass px-3 py-2 text-xs font-medium hover:bg-white/10"
      >
        <span className={`h-2 w-2 rounded-full ${active.color}`} />
        {active.name}
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-2xl glass-strong p-1 shadow-card">
          {networks.map((n) => (
            <button
              key={n.id}
              onClick={() => {
                setActive(n);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs hover:bg-white/10"
            >
              <span className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${n.color}`} />
                {n.name}
              </span>
              {active.id === n.id && <Check className="h-3.5 w-3.5 text-[color:var(--sakura)]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}