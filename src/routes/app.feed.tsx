import { createFileRoute } from "@tanstack/react-router";
import { TransactionFeed } from "@/components/dashboard/TransactionFeed";

export const Route = createFileRoute("/app/feed")({
  head: () => ({
    meta: [
      { title: "Transaction Feed — ChainPilot" },
      { name: "description", content: "Timeline of AI decisions, trades and alerts." },
    ],
  }),
  component: FeedPage,
});

function FeedPage() {
  return (
    <>
      <header className="mb-6">
        <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--sakura)]">Transaction Feed</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">Your on-chain timeline</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">AI decisions, trades, rebalances and alerts in chronological order.</p>
      </header>
      <TransactionFeed />
    </>
  );
}