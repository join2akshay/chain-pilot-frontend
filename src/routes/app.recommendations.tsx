// @ts-ignore
// @ts-nocheck

import { Recommendations } from "@/components/dashboard/Recommendations";
import { useEffect, useState } from "react";
import { createApiClient } from "@/lib/apiClient";
import { useApp } from "@/components/app/AppContext";

export default function RecPage() {
  const {userData}=useApp()
  const [isLoading, setIsLoading] = useState(false)
  const [recommendationsData, setRecommendationsData] = useState<any>(null)
    
    const getWalletRecommendation=async()=>{
      try {
        setIsLoading(true)
        const res=await createApiClient().get("/wallet/recommendations")
        console.log("User wallet recommendations data:",res)
        setRecommendationsData(res?.data?.data)
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false)
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
      
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gradient-neon border-r-gradient-neon animate-spin" />
              <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-primary/50 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Generating recommendations</p>
              <p className="text-xs text-muted-foreground mt-1">Analyzing your portfolio...</p>
            </div>
          </div>
        </div>
      ) : (
        <Recommendations data={recommendationsData} />
      )}
    </>
  );
}