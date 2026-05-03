import { Recommendations } from "@/components/dashboard/Recommendations";
import { useEffect } from "react";
import { createApiClient } from "@/lib/apiClient";
import { useApp } from "@/components/app/AppContext";

export default function RecPage() {
  const {userData}=useApp()
    
    const getWalletRecommendation=async()=>{
      try {
        const res=await createApiClient().get("/wallet/recommendations")
        console.log("User wallet recommendations data:",res)
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
    
    useEffect(() => {
      if(userData!==null){
        getWalletRecommendation()
      }
    }, [userData])
  
  return (

    <>
      <header className="mb-6">
        <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--sakura)]">AI Recommendations</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">Moves the AI suggests</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">Each recommendation includes confidence score and one-tap actions.</p>
      </header>
      <Recommendations />
    </>
  );
}