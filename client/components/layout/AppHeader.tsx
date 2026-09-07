"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Radio, FilePlus, Menu, Languages, Bell, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface AppHeaderProps { onToggleSidebar?: () => void; }

export function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  const [simulationActive, setSimulationActive] = useState(false);
  const [lang, setLang] = useState<"EN" | "HI" | "AS">("EN");

  useEffect(() => {
    if (!simulationActive) return;
    const timer = setTimeout(() => {
      toast.warning("Simulation update: rainfall threshold crossed in Sohra.");
      setSimulationActive(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, [simulationActive]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          {onToggleSidebar && <button onClick={onToggleSidebar} className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden" aria-label="Toggle menu"><Menu className="size-5" /></button>}
          <Link href="/dashboard" className="flex min-w-0 items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/15"><Activity className="size-5" /></div>
            <div className="min-w-0">
              <div className="flex items-center gap-2"><span className="truncate text-sm font-bold tracking-[0.18em] text-foreground">LANDSLIDEX</span><Badge variant="outline" className="hidden border-primary/30 text-[9px] text-primary sm:inline-flex">NER OPS</Badge></div>
              <p className="hidden truncate text-[10px] text-muted-foreground sm:block">Early warning and response intelligence</p>
            </div>
          </Link>
        </div>
        <div className="hidden items-center gap-2 xl:flex">
          <Badge variant="outline" className="gap-2 border-primary/30 bg-primary/5 px-3 py-1.5 text-primary"><span className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" /> System operational</Badge>
          <button onClick={() => setSimulationActive((active) => !active)} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"><Radio className={simulationActive ? "size-3.5 text-chart-2" : "size-3.5"} /> {simulationActive ? "Simulation running" : "Run simulation"}</button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setLang(lang === "EN" ? "HI" : lang === "HI" ? "AS" : "EN")} className="hidden items-center gap-1.5 rounded-lg border border-border px-2.5 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground sm:flex" aria-label="Change language"><Languages className="size-3.5 text-primary" />{lang}<ChevronDown className="size-3" /></button>
          <Link href="/alerts" className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="View alerts"><Bell className="size-4" /></Link>
          <Link href="/incidents/report"><Button size="sm" className="gap-1.5 bg-destructive text-destructive-foreground hover:bg-destructive/90"><FilePlus data-icon="inline-start" /> Report hazard</Button></Link>
        </div>
      </div>
    </header>
  );
}
