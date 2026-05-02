import { useEffect, useRef, useState } from "react";
import { Bot, ChevronRight, Mic, Send, Sparkles, User, Zap } from "lucide-react";
import { useApp, type ChatMessage } from "./AppContext";

const quickPrompts = ["What should I do?", "Analyze risk", "Best move now?"];

export function CopilotPanel() {
  const { chatOpen, toggleChat, messages, sendUserMessage, activeContext, walletAddress, unreadCount } = useApp();
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatOpen]);

  function handleSend() {
    if (!input.trim()) return;
    sendUserMessage(input);
    setInput("");
  }

  return (
    <>
      {/* Floating toggle button — always visible */}
      <button
        onClick={toggleChat}
        aria-label={chatOpen ? "Collapse AI chat" : "Open AI chat"}
        className={`fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-neon text-primary-foreground shadow-neon transition-transform hover:scale-110 active:scale-95 animate-pulse-glow ${chatOpen ? "translate-x-0" : ""}`}
      >
        {chatOpen ? <ChevronRight className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
        {!chatOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-[color:var(--bearish)] px-1 text-[10px] font-bold text-white shadow-card">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Side panel */}
      <aside
        className={`fixed top-0 right-0 z-40 h-screen w-full max-w-[420px] transform border-l border-white/10 bg-[oklch(0.11_0.02_320/0.92)] backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          chatOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-neon shadow-neon">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm font-semibold leading-none">ChainPilot AI</div>
                <div className="mt-1 inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--bullish)]" />
                  Context · {activeContext}
                </div>
              </div>
            </div>
            <button onClick={toggleChat} className="grid h-8 w-8 place-items-center rounded-lg glass hover:bg-white/10" aria-label="Close panel">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
            {!walletAddress && messages.length === 0 && (
              <div className="glass-strong rounded-2xl p-5 text-center">
                <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-gradient-sakura shadow-glow-soft">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="mt-3 text-sm font-semibold">Connect your wallet</div>
                <p className="mt-1 text-xs text-muted-foreground">I'll analyze your portfolio and start guiding you in real time.</p>
              </div>
            )}
            {messages.map((m) => (
              <Bubble key={m.id} msg={m} />
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick prompts */}
          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {quickPrompts.map((q) => (
              <button
                key={q}
                onClick={() => sendUserMessage(q)}
                className="rounded-full glass px-3 py-1 text-[11px] text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2 rounded-2xl glass p-2">
              <button className="grid h-9 w-9 place-items-center rounded-xl hover:bg-white/10" aria-label="Voice input">
                <Mic className="h-4 w-4 text-[color:var(--sakura)]" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask ChainPilot anything…"
                className="flex-1 bg-transparent px-1 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={handleSend}
                className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-neon text-primary-foreground shadow-neon transition-transform hover:scale-105"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function Bubble({ msg }: { msg: ChatMessage }) {
  const isAI = msg.role === "ai";
  return (
    <div className={`flex items-start gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 ${isAI ? "" : "flex-row-reverse"}`}>
      <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${isAI ? "bg-gradient-neon shadow-neon" : "glass"}`}>
        {isAI ? <Bot className="h-3.5 w-3.5 text-primary-foreground" /> : <User className="h-3.5 w-3.5" />}
      </div>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
          isAI ? "glass-strong shadow-glow-soft" : "bg-gradient-sakura text-primary-foreground"
        }`}
      >
        {msg.pending ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{msg.content}</span>
            <span className="flex items-center gap-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-typing-dot" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-typing-dot" style={{ animationDelay: "0.15s" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-typing-dot" style={{ animationDelay: "0.3s" }} />
            </span>
          </div>
        ) : (
          <>
            <p className="leading-relaxed">{msg.content}</p>
            {isAI && msg.decision && (
              <div className="mt-2.5 space-y-2">
                <div className="flex items-center gap-2">
                  <DecisionTag decision={msg.decision} />
                  {typeof msg.confidence === "number" && (
                    <span className="text-[11px] text-muted-foreground">
                      Confidence <span className="font-semibold text-foreground">{msg.confidence}%</span>
                    </span>
                  )}
                </div>
                {msg.reasoning && <p className="text-[11px] leading-relaxed text-muted-foreground">{msg.reasoning}</p>}
                {msg.cta && (
                  <button className="mt-1 inline-flex items-center gap-1 rounded-lg bg-gradient-neon px-3 py-1.5 text-[11px] font-semibold text-primary-foreground shadow-neon transition-transform hover:scale-[1.03]">
                    <Zap className="h-3 w-3" /> {msg.cta}
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function DecisionTag({ decision }: { decision: "BUY" | "SELL" | "HOLD" }) {
  const map = {
    BUY: "bg-[color:var(--bullish)]/15 text-[color:var(--bullish)] border-[color:var(--bullish)]/30 animate-pulse-glow",
    SELL: "bg-[color:var(--bearish)]/15 text-[color:var(--bearish)] border-[color:var(--bearish)]/30 animate-pulse-glow",
    HOLD: "bg-white/10 text-foreground border-white/15",
  } as const;
  return <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wider ${map[decision]}`}>{decision}</span>;
}