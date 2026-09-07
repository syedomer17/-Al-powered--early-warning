"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MapPin, ClipboardList, AlertOctagon, BarChart3, Bot, Settings, ShieldAlert, Radio } from "lucide-react";

const navItems = [
  { name: "Command center", href: "/dashboard", icon: LayoutDashboard },
  { name: "Risk map", href: "/map", icon: MapPin, badge: "LIVE" },
  { name: "Incident triage", href: "/incidents", icon: ClipboardList, badge: "47" },
  { name: "Active alerts", href: "/alerts", icon: AlertOctagon, badge: "7", danger: true },
  { name: "Risk analytics", href: "/analytics", icon: BarChart3 },
  { name: "AI disaster intel", href: "/assistant", icon: Bot, badge: "AI" },
  { name: "System settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border/70 bg-sidebar px-3 py-5 lg:flex">
      <div className="mb-6 rounded-xl border border-border/70 bg-card/60 p-3">
        <div className="mb-3 flex items-center justify-between"><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Current operation</span><Radio className="size-3.5 text-primary" /></div>
        <p className="text-sm font-semibold text-foreground">Monsoon surveillance</p><p className="mt-1 text-xs text-muted-foreground">Northeast region · 2026</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary"><div className="h-full w-[78%] rounded-full bg-primary" /></div><div className="mt-2 flex justify-between text-[10px] text-muted-foreground"><span>Readiness</span><span className="text-primary">78%</span></div>
      </div>
      <nav className="flex flex-1 flex-col gap-1" aria-label="Primary navigation">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Workspace</p>
        {navItems.map((item) => { const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href)); const Icon = item.icon; return <Link key={item.href} href={item.href} className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}><span className="flex items-center gap-3"><Icon className="size-4" />{item.name}</span>{item.badge && <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.danger ? "bg-destructive/15 text-destructive" : "bg-secondary text-muted-foreground"}`}>{item.badge}</span>}</Link>; })}
      </nav>
      <div className="rounded-xl border border-border/70 bg-card/50 p-3"><div className="flex items-center gap-2 text-xs font-semibold text-foreground"><ShieldAlert className="size-4 text-chart-2" /> Dispatch network</div><p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">SDRF and NDRF units are standing by across 8 states.</p><div className="mt-3 flex items-center justify-between border-t border-border/70 pt-2 text-[10px] text-muted-foreground"><span>154.650 MHz</span><span className="text-primary">READY</span></div></div>
    </aside>
  );
}
