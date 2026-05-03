import { Copy, LogOut } from "lucide-react";

export function ConnectedAddress({ address, onDisconnect }: { address: string|undefined; onDisconnect?: () => void }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl glass px-3 py-2 text-xs font-medium">
      <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-neon text-[10px] text-primary-foreground">●</span>
      <span className="font-mono">{address}</span>
      <Copy className="h-3 w-3 cursor-pointer opacity-60 hover:opacity-100" />
      {onDisconnect && (
        <button onClick={onDisconnect} className="ml-1 opacity-60 hover:opacity-100 cursor-pointer" aria-label="Disconnect">
          <LogOut className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}