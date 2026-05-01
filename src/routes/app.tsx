import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "ChainPilot — App" },
      { name: "description", content: "Your AI co-pilot for on-chain decisions." },
    ],
  }),
  component: AppShell,
});