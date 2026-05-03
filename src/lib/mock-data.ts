export const portfolioSeries = Array.from({ length: 30 }).map((_, i) => {
  const base = 100000;
  const drift = i * 1800;
  const wave = Math.sin(i / 3) * 6000 + Math.cos(i / 5) * 3500;
  const noise = (Math.sin(i * 7.3) + Math.cos(i * 2.1)) * 1200;
  return {
    day: `D${i + 1}`,
    value: Math.round(base + drift + wave + noise),
    benchmark: Math.round(base + drift * 0.7 + wave * 0.4),
  };
});

export const allocation = [
  { name: "ETH", value: 42, color: "var(--color-chart-1)" },
  { name: "BTC", value: 24, color: "var(--color-chart-2)" },
  { name: "SOL", value: 14, color: "var(--color-chart-3)" },
  { name: "Stables", value: 12, color: "var(--color-chart-4)" },
  { name: "Alts", value: 8, color: "var(--color-chart-5)" },
];

export const riskExposure = [
  { bucket: "L1", risk: 62 },
  { bucket: "L2", risk: 48 },
  { bucket: "DeFi", risk: 71 },
  { bucket: "Memes", risk: 88 },
  { bucket: "Stables", risk: 12 },
  { bucket: "RWA", risk: 28 },
];

export const smartMoney = [
  { wallet: "0x9a2…f81", label: "Genesis Whale", action: "Bought 1,240 ETH", time: "12m", impact: "high" as const, dir: "in" as const },
  { wallet: "0x4e1…3cc", label: "Smart LP", action: "Added LINK/ETH LP", time: "38m", impact: "med" as const, dir: "in" as const },
  { wallet: "0xb73…a02", label: "Cycle Trader", action: "Sold 18M PEPE", time: "1h", impact: "high" as const, dir: "out" as const },
  { wallet: "0x21f…77e", label: "Insider Cluster", action: "Accumulating ARB", time: "2h", impact: "med" as const, dir: "in" as const },
  { wallet: "0xcd0…4a9", label: "Long-Term Holder", action: "Withdrew 320 ETH from CEX", time: "3h", impact: "high" as const, dir: "in" as const },
];

export const whales = [
  { name: "Whale 0x82a", token: "ETH", balance: "184,210", change: 4.8 },
  { name: "Whale 0x4f1", token: "BTC", balance: "9,420", change: -1.2 },
  { name: "Whale 0x3bd", token: "USDC", balance: "212M", change: 0.0 },
  { name: "Whale 0x71e", token: "SOL", balance: "1.2M", change: 3.4 },
];

export const tokenFlows = [
  { token: "ETH", inflow: 142, outflow: 86 },
  { token: "BTC", inflow: 78, outflow: 91 },
  { token: "SOL", inflow: 64, outflow: 42 },
  { token: "ARB", inflow: 52, outflow: 31 },
  { token: "LINK", inflow: 38, outflow: 22 },
];

export const sentiment = {
  fearGreed: 68, // 0-100
  social: 72,
  funding: 54,
  mood: "Greed" as const,
};

export const recommendations = [
  {
    title: "Reduce exposure to volatile alts",
    body: "Memecoin allocation (12%) exceeds your risk tolerance. Trim to 6% to lower drawdown risk by ~28%.",
    confidence: 91,
    severity: "high" as const,
    action: "Trim",
  },
  {
    title: "Increase defensive allocation",
    body: "Rotate 8% from ALT basket into USDC + stETH. Preserves yield while cutting beta.",
    confidence: 84,
    severity: "med" as const,
    action: "Rotate",
  },
  {
    title: "Rebalance ETH/BTC ratio",
    body: "Current 1.75 ratio drifted from your target 1.40. Sell 1.4 ETH for 0.07 BTC.",
    confidence: 79,
    severity: "med" as const,
    action: "Rebalance",
  },
  {
    title: "Position sizing - SOL",
    body: "SOL position is 1.8x your average sizing. Consider scaling out 25% on next +5% move.",
    confidence: 73,
    severity: "low" as const,
    action: "Scale Out",
  },
];

export const feedEvents = [
  { kind: "trade" as const, title: "Bought 0.42 ETH @ $3,481", meta: "Spot · Uniswap", time: "2m", tone: "bull" as const },
  { kind: "ai" as const, title: "AI flagged ARB accumulation by smart money", meta: "Signal · Confidence 88%", time: "14m", tone: "neutral" as const },
  { kind: "rebalance" as const, title: "Auto-rebalanced ETH/BTC 1.75 → 1.40", meta: "Strategy · Quarterly", time: "1h", tone: "neutral" as const },
  { kind: "alert" as const, title: "Risk Score crossed 65 - review exposure", meta: "Alert · Threshold", time: "3h", tone: "bear" as const },
  { kind: "trade" as const, title: "Sold 18 SOL @ $186.10", meta: "Spot · Jupiter", time: "5h", tone: "bull" as const },
  { kind: "ai" as const, title: "Fear & Greed flipped to Greed (68)", meta: "Sentiment · Daily", time: "8h", tone: "neutral" as const },
];