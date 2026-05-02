import { createFileRoute } from "@tanstack/react-router";
import { WalletIntelligence } from "@/components/dashboard/WalletIntelligence";
import { RiskExposure } from "@/components/dashboard/RiskExposure";
import { createApiClient } from "@/lib/apiClient";
import { useApp } from "@/components/app/AppContext";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/app/wallet")({
  head: () => ({
    meta: [
      { title: "Wallet Intelligence — ChainPilot" },
      { name: "description", content: "Trader DNA, behavior archetype and wallet analytics." },
    ],
  }),
  component: WalletPage,
});

function WalletPage() {
const {userData}=useApp();
  const [walletIntelligence, setWalletIntelligence] = useState<any>(null);

  const getWalletInel=async()=>{

    try {
    const res=await createApiClient().get("/wallet/intelligence")
    console.log("User wallet intelligence data:",res)
    setWalletIntelligence(res?.data?.data)
  
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }

  }

  useEffect(() => {
    console.log("User data in WalletPage:", userData);
    if(userData!=null){
      getWalletInel()
    }
  }, [userData]);


  return (
    <>
      <header className="mb-6">
        <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--sakura)]">Wallet Intelligence</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">Your trader DNA</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">Behavior, archetype and risk profile derived from on-chain history.</p>
      </header>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2"><WalletIntelligence walletIntelligence={walletIntelligence} /></div>
        <RiskExposure walletIntelligence={walletIntelligence} />
      </div>
    </>
  );
}