import { useApp } from "../app/AppContext";

// Color palette for tokens
const colorPalette = [
  "bg-indigo-400",
  "bg-amber-400",
  "bg-fuchsia-400",
  "bg-sky-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-red-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-yellow-400",
];

export function TokenBalances() {
  const { analysisData } = useApp();
console.log("Analysis data in TokenBalances:", analysisData)
  // Only show if we have real data
  if (!analysisData?.holdings || analysisData.holdings.length === 0) {
    return (
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Token Balances</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">Loading...</div>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          No token data available yet
        </div>
      </div>
    );
  }

  // Use real data
  const holdings = analysisData.holdings;
  const totalValueUsd = analysisData.currentValueUsd ?? 0;

  // Transform holdings data to match display format
  const displayBalances = holdings.map((holding: any, index: number) => {
    const color = colorPalette[index % colorPalette.length];
    
    // If it's already in mock format
    if (holding.usd !== undefined) {
      return holding;
    }

    // Transform from API format
    return {
      sym: holding.symbol,
      name: holding.name,
      amount: holding.balance?.toLocaleString() || "0",
      usd: holding.balance || 0,
      color,
      logo: holding.logo,
    };
  });

  // Calculate total for percentage
  const balanceTotal = displayBalances.reduce((sum: number, b: any) => sum + (b.usd || 0), 0) || totalValueUsd;

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Token Balances</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">
            ${totalValueUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
        </div>
        <span className="rounded-md bg-[color:var(--bullish)]/15 px-2 py-1 text-xs font-semibold text-[color:var(--bullish)]">
          {analysisData?.changePercent ? (analysisData.changePercent >= 0 ? '+' : '') + analysisData.changePercent.toFixed(2) + '%' : '0'}
        </span>
      </div>
      <ul className="mt-4 divide-y divide-white/5">
        {displayBalances.map((b: any) => (
          <li key={b.sym} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-[2.5rem]">
              {b.logo ? (
                <img src={b.logo} alt={b.sym} className="h-9 w-9 rounded-xl" />
              ) : (
                <span className={`grid h-9 w-9 place-items-center rounded-xl ${b.color}/20 text-xs font-bold`}>
                  {b.sym}
                </span>
              )}
              <div>
                <div className="text-sm font-semibold">{b.name}</div>
                <div className="text-xs text-muted-foreground">{b.amount} {b.sym}</div>
              </div>
            </div>
            <div className="text-right text-sm">
              <div className="font-semibold">${(b.usd || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              <div className="text-xs text-muted-foreground">≈ {balanceTotal > 0 ? (((b.usd || 0) / balanceTotal) * 100).toFixed(1) : '0.0'}%</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}