import { useAppKitAccount } from "@/components/providers/Web3Provider";
import { createApiClient } from "@/lib/apiClient";
import { walletStorage } from "@/lib/walletStorage";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type ChatMessage = {
  id: string;
  role: "user" | "ai";
  content: string;
  decision?: "BUY" | "SELL" | "HOLD";
  confidence?: number;
  reasoning?: string;
  cta?: string;
  pending?: boolean;
  actions?: string[];
  step?: string;
};

type AppContextValue = {
  walletAddress: string | null;
  connectWallet: (name?: string) => void;
  disconnectWallet: () => void;

  chatOpen: boolean;
  setChatOpen: (v: boolean) => void;
  toggleChat: () => void;

  unreadCount: number;
  clearUnread: () => void;

  messages: ChatMessage[];
  sendUserMessage: (text: string) => void;

  activeContext: string;
  setActiveContext: (label: string) => void;
  userData:any;
  setUserData:any;
  analysisData:any;
  setAnalysisData:any;
  analyticsData:any;
  setAnalyticsData:any;
};

const AppCtx = createContext<AppContextValue | null>(null);

const intros: Record<string, string> = {
  Dashboard: "Your portfolio is slightly overexposed to SOL - beta has crept above your target. Want me to rebalance?",
  "Wallet Intelligence": "I read your trading DNA - you're a Swing Trader with a 58% win rate. Hold time is shrinking, watch for FOMO entries.",
  "AI Recommendations": "I'd reduce SOL exposure by 4–6% and rotate into stETH. It cuts drawdown risk by ~22% with minimal upside loss.",
  "Onchain Signals": "Smart money is accumulating ARB. 4 wallets I track started buying in the last 90 minutes - confidence 88%.",
  "Portfolio Simulator": "Tell me your capital and risk appetite - I'll run a Monte Carlo and propose an allocation.",
  "Transaction Feed": "Here's your timeline. The ARB accumulation flag at 14m is the highest-conviction signal of the day.",
};

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const {isConnected,address}=useAppKitAccount()
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeContext, setActiveContext] = useState<string>("Dashboard");
const [userData,setUserData]=useState<any>(null)
const [analysisData,setAnalysisData]=useState<any>(null)
const [analyticsData,setAnalyticsData]=useState<any>(null)
const [portfolioSummary,setPortfolioSummary]=useState<any>(null)
const getUserData=async(address:any)=>{
  console.log({portfolioSummary})
  try {
    const res=await createApiClient().post("/wallet/connect",{"walletAddress":address})
    console.log("User data:",res)
    
  walletStorage.setAddress(address)
  walletStorage.setTokens(res?.data?.data?.tokens.accessToken,res?.data?.data?.tokens.refreshToken)
    setUserData(res?.data?.data)
    getWalletAnalysis()
    getWalletAnalytics()
    getWalletSummary()
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
}
const getWalletAnalysis=async()=>{
  try {
    const res=await createApiClient().get("/wallet/analyze-wallet")
    console.log("User wallet analysis data:",res)
    setAnalysisData(res?.data)
    // setUserData(res?.data?.data)
    
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
}
const getWalletSummary=async()=>{
  try {
    const res=await createApiClient().get("/wallet/portfolio-summary")
    console.log("User wallet summary data:",res)
    setPortfolioSummary(res?.data)
    // setUserData(res?.data?.data)
    
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
}
const getWalletAnalytics=async()=>{
  try {
    const res=await createApiClient().get("/wallet/portfolio-analytics")
    console.log("User wallet analytics data====:",res)
    setAnalyticsData(res?.data?.data)
    // setUserData(res?.data?.data)
    
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
}
  const pushAi = useCallback((msg: Omit<ChatMessage, "id" | "role">) => {
    setMessages((m) => [...m, { id: uid(), role: "ai", ...msg }]);
  }, []);

  const connectWallet = useCallback(() => {
    const addr = "0x7a3F" + Math.floor(Math.random() * 9999).toString(16).padStart(4, "0") + "…9c2B";
    setWalletAddress(addr);
    setChatOpen(true);
    setMessages((prev) => {
      if (prev.length > 0) return prev;
      return [
        {
          id: uid(),
          role: "ai",
          content: "Wallet connected. I've analyzed your portfolio. Let's make smarter moves 🚀",
        },
      ];
    });
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletAddress(null);
  }, []);

  const toggleChat = useCallback(() => {
    setChatOpen((v) => {
      const next = !v;
      if (next) setUnreadCount(0);
      return next;
    });
  }, []);

  const clearUnread = useCallback(() => setUnreadCount(0), []);

  useEffect(() => {
    console.log("AppContext: Checking wallet connection on mount...", isConnected, address);
    if(isConnected && address){
      getUserData(address)

      // await getWalletAnalysis()
      console.log("Connected with address:",address)
      setWalletAddress(address)
      setChatOpen(true);
      setMessages((prev) => {
        if (prev.length > 0) return prev;
        return [
          {
            id: uid(),
            role: "ai",
            content: "Wallet connected. I've analyzed your portfolio. Let's make smarter moves 🚀",
          },
        ];
      });
    }
  },[isConnected,address]);

  // Context-aware nudge when active tab changes (only if connected)
  useEffect(() => {
    if (!walletAddress) return;
    const intro = intros[activeContext];
    if (!intro) return;
    const t = setTimeout(() => {
      pushAi({ content: intro });
      if (!chatOpen) setUnreadCount((n) => n + 1);
    }, 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeContext, walletAddress]);

  const sendUserMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setMessages((m) => [...m, { id: uid(), role: "user", content: trimmed }]);
      // simulate analysis
      const thinkingId = uid();
      setMessages((m) => [...m, { id: thinkingId, role: "ai", content: "Analyzing on-chain data…", pending: true }]);
      setTimeout(() => {
        const decisions: Array<"BUY" | "SELL" | "HOLD"> = ["BUY", "HOLD", "SELL"];
        const decision = decisions[Math.floor(Math.random() * decisions.length)];
        const confidence = 60 + Math.floor(Math.random() * 35);
        const reasoning =
          decision === "BUY"
            ? "Smart money inflow rising, RSI 42 (neutral-bullish), funding flat. Risk fits your profile."
            : decision === "SELL"
              ? "Distribution from top wallets, funding turning positive - momentum exhausted near resistance."
              : "Volatility expanding, structure intact. Wait for a confirmation candle before adding size.";
        setMessages((m) =>
          m
            .filter((x) => x.id !== thinkingId)
            .concat({
              id: uid(),
              role: "ai",
              content: `Quick read on "${trimmed.length > 60 ? trimmed.slice(0, 60) + "…" : trimmed}":`,
              decision,
              confidence,
              reasoning,
              cta: decision !== "HOLD" ? "Execute Trade" : undefined,
            }),
        );
        if (!chatOpen) setUnreadCount((n) => n + 1);
      }, 1400);
    },
    [chatOpen],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      walletAddress,
      connectWallet,
      disconnectWallet,
      chatOpen,
      setChatOpen,
      toggleChat,
      unreadCount,
      clearUnread,
      messages,
      sendUserMessage,
      activeContext,
      setActiveContext,
      userData,
      setUserData,
      analysisData,
      setAnalysisData,
      analyticsData,
      setAnalyticsData,
    }),
    [walletAddress, connectWallet, disconnectWallet, chatOpen, toggleChat, unreadCount, clearUnread, messages, sendUserMessage, activeContext, userData, analysisData, analyticsData],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}