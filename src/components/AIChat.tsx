import { useEffect, useRef, useState } from "react";
import { Bot, Send, User } from "lucide-react";
import { SectionHeader } from "./WalletConnect";

type Msg = {
  id: number;
  role: "user" | "ai";
  content: string;
  decision?: "BUY" | "SELL" | "HOLD";
  confidence?: number;
  reasoning?: string;
};

const seed: Msg[] = [
  { id: 1, role: "user", content: "Should I buy more ETH right now?" },
  {
    id: 2,
    role: "ai",
    content: "Analyzed ETH across 24h indicators and your wallet history.",
    decision: "BUY",
    confidence: 86,
    reasoning: "RSI 42 (neutral-bullish), funding flat, your avg entry is above current price by 4.2%. Risk fits your Intermediate profile.",
  },
];

export function AIChat() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   endRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages, typing]);

  function send() {
    if (!input.trim()) return;
    const next: Msg = { id: Date.now(), role: "user", content: input.trim() };
    setMessages((m) => [...m, next]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          role: "ai",
          content: "Quick read on your question:",
          decision: "HOLD",
          confidence: 71,
          reasoning: "Volatility expanding, structure intact. Better to wait for confirmation candle before adding size.",
        },
      ]);
    }, 1400);
  }

  return (
    <section id="chat" className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="AI Chat" title="Talk to your co-pilot" subtitle="Ask about any token, position, or strategy. Reasoning is always shown." />

        <div className="mt-10 grid gap-4">
          <div className="glass-strong rounded-3xl p-4 shadow-card md:p-6">
            <div className="max-h-[520px] space-y-4 overflow-y-auto pr-2">
              {messages.map((m) => (
                <Bubble key={m.id} msg={m} />
              ))}
              {typing && <Typing />}
              <div ref={endRef} />
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-2xl glass p-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask ChainPilot anything…"
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={send}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-neon text-primary-foreground shadow-neon transition-transform hover:scale-105"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isAI = msg.role === "ai";
  return (
    <div className={`flex items-start gap-3 ${isAI ? "" : "flex-row-reverse"}`}>
      <div
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${
          isAI ? "bg-gradient-neon shadow-neon" : "glass"
        }`}
      >
        {isAI ? <Bot className="h-4 w-4 text-primary-foreground" /> : <User className="h-4 w-4" />}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
          isAI
            ? "glass-strong shadow-glow-soft"
            : "bg-gradient-sakura text-primary-foreground"
        }`}
      >
        <p className={isAI ? "text-foreground" : ""}>{msg.content}</p>
        {isAI && msg.decision && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2">
              <DecisionTag decision={msg.decision} />
              {typeof msg.confidence === "number" && (
                <span className="text-xs text-muted-foreground">
                  Confidence{" "}
                  <span className="font-semibold text-foreground">{msg.confidence}%</span>
                </span>
              )}
            </div>
            {msg.reasoning && (
              <p className="text-xs leading-relaxed text-muted-foreground">{msg.reasoning}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-neon shadow-neon">
        <Bot className="h-4 w-4 text-primary-foreground" />
      </div>
      <div className="glass-strong rounded-2xl px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-typing-dot" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-typing-dot" style={{ animationDelay: "0.15s" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-typing-dot" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>
    </div>
  );
}

export function DecisionTag({ decision }: { decision: "BUY" | "SELL" | "HOLD" }) {
  const map = {
    BUY: "bg-[color:var(--bullish)]/15 text-[color:var(--bullish)] border-[color:var(--bullish)]/30",
    SELL: "bg-[color:var(--bearish)]/15 text-[color:var(--bearish)] border-[color:var(--bearish)]/30",
    HOLD: "bg-white/10 text-foreground border-white/15",
  } as const;
  return (
    <span className={`rounded-md border px-2 py-0.5 text-xs font-bold tracking-wide ${map[decision]}`}>
      {decision}
    </span>
  );
}