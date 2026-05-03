import { WalletIntelligence } from "@/components/dashboard/WalletIntelligence";
import { RiskExposure } from "@/components/dashboard/RiskExposure";
import { createApiClient } from "@/lib/apiClient";
import { useApp } from "@/components/app/AppContext";
import { useEffect, useState } from "react";

export default function WalletPage() {
const {userData}=useApp();
  const [walletIntelligence, setWalletIntelligence] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getWalletInel=async()=>{

    try {
    setIsLoading(true)
    const res=await createApiClient().get("/wallet/intelligence")
    console.log("User wallet intelligence data:",res)
    setWalletIntelligence(res?.data?.data)
  
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  } finally {
    setIsLoading(false)
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
      
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gradient-neon border-r-gradient-neon animate-spin" />
              <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-primary/50 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Analyzing your wallet</p>
              <p className="text-xs text-muted-foreground mt-1">Calculating trader DNA...</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2"><WalletIntelligence walletIntelligence={walletIntelligence} /></div>
          <RiskExposure walletIntelligence={walletIntelligence} />
        </div>
      )}
    </>
  );
}