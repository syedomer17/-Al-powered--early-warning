"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  ClipboardList,
  AlertOctagon,
  BarChart3,
  Bot,
  Settings,
  ShieldAlert,
  Flame,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

const navItems: NavItem[] = [
  {
    name: "Command Center",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "GIS Risk Map",
    href: "/map",
    icon: MapPin,
    badge: "LIVE",
    badgeColor: "bg-red-500/20 text-red-400 border border-red-500/30",
  },
  {
    name: "Incident Triage",
    href: "/incidents",
    icon: ClipboardList,
    badge: "47",
    badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  },
  {
    name: "Active Alerts",
    href: "/alerts",
    icon: AlertOctagon,
    badge: "7 CRIT",
    badgeColor: "bg-red-950 text-red-400 border border-red-700 animate-pulse",
  },
  {
    name: "Risk Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "AI Disaster Intel",
    href: "/assistant",
    icon: Bot,
    badge: "AI",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
  },
  {
    name: "System Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col border-r border-slate-800 bg-slate-950/80 p-3 justify-between glass-panel rounded-xl ml-2 mb-2">
      <div className="space-y-4">
        {/* Operations Hub Banner */}
        <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center gap-3">
          <div className="p-2 rounded-md bg-red-950 text-red-400 border border-red-800">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200">MONSOON 2026</div>
            <div className="text-[10px] text-slate-400 font-mono">
              High Risk Surveillance
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? "bg-slate-800 text-white shadow-sm border border-slate-700 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/80"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-cyan-400" : "text-slate-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                      item.badgeColor || "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Emergency Hotline Footer */}
      <div className="space-y-2 p-3 rounded-lg border border-slate-800 bg-slate-900/40">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>SDRF / NDRF DISPATCH</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-tight">
          Emergency response units standing by across 8 northeastern states.
        </p>
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
          <span>FREQ: 154.650 MHz</span>
          <span className="text-emerald-400">READY</span>
        </div>
      </div>
    </aside>
  );
}
