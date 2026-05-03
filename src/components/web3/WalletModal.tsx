import { useEffect } from "react";
import { X, Wallet, Shield } from "lucide-react";

const wallets = [
  { name: "MetaMask", desc: "Most popular browser wallet", color: "from-orange-400 to-amber-500" },
  { name: "WalletConnect", desc: "Scan with mobile wallet", color: "from-blue-400 to-indigo-500" },
  { name: "Coinbase Wallet", desc: "Self-custody by Coinbase", color: "from-sky-400 to-blue-600" },
  { name: "Rainbow", desc: "Fun, simple, secure", color: "from-pink-400 to-fuchsia-500" },
];

export function WalletModal({ open, onClose, onConnect }: { open: boolean; onClose: () => void; onConnect: (name: string) => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md animated-border rounded-3xl p-1 shadow-card">
        <div className="rounded-3xl bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--sakura)]">Connect</div>
              <h3 className="mt-1 text-xl font-semibold">Choose a wallet</h3>
            </div>
            <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg glass hover:bg-white/10" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 space-y-2">
            {wallets.map((w) => (
              <button
                key={w.name}
                onClick={() => onConnect(w.name)}
                className="flex w-full items-center gap-3 rounded-2xl glass p-3 text-left transition hover:bg-white/10"
              >
                <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${w.color}`}>
                  <Wallet className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{w.name}</div>
                  <div className="text-xs text-muted-foreground">{w.desc}</div>
                </div>
                <span className="text-xs text-muted-foreground">›</span>
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-xl glass px-3 py-2 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5 text-[color:var(--sakura)]" />
            We never see your keys — read-only signature.
          </div>
        </div>
      </div>
    </div>
  );
}