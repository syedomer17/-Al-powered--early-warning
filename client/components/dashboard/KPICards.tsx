"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  AlertOctagon,
  ShieldAlert,
  BellRing,
  ClipboardList,
  AlertTriangle,
  Users,
} from "lucide-react";

interface KPICardsProps {
  criticalCount?: number;
  highRiskCount?: number;
  activeAlertsCount?: number;
  incidentsCount?: number;
  blockedRoadsCount?: number;
  populationAtRisk?: number;
}

export function KPICards({
  criticalCount = 3,
  highRiskCount = 12,
  activeAlertsCount = 7,
  incidentsCount = 47,
  blockedRoadsCount = 8,
  populationAtRisk = 12480,
}: KPICardsProps) {
  const cards = [
    {
      title: "CRITICAL ZONES",
      value: criticalCount,
      subtext: "Immediate evacuation alerts",
      icon: AlertOctagon,
      textColor: "text-red-400",
      borderColor: "border-red-900/60",
      bgColor: "bg-red-950/20",
      badgeColor: "bg-red-950 text-red-400 border-red-800",
      pulse: true,
    },
    {
      title: "HIGH RISK ZONES",
      value: highRiskCount,
      subtext: "Threshold >50% saturation",
      icon: ShieldAlert,
      textColor: "text-amber-400",
      borderColor: "border-amber-900/60",
      bgColor: "bg-amber-950/20",
      badgeColor: "bg-amber-950 text-amber-400 border-amber-800",
      pulse: false,
    },
    {
      title: "ACTIVE ALERTS",
      value: activeAlertsCount,
      subtext: "Disaster warnings issued",
      icon: BellRing,
      textColor: "text-rose-400",
      borderColor: "border-rose-900/60",
      bgColor: "bg-rose-950/20",
      badgeColor: "bg-rose-950 text-rose-400 border-rose-800",
      pulse: true,
    },
    {
      title: "REPORTED INCIDENTS",
      value: incidentsCount,
      subtext: "Citizen & field observations",
      icon: ClipboardList,
      textColor: "text-sky-400",
      borderColor: "border-sky-900/60",
      bgColor: "bg-sky-950/20",
      badgeColor: "bg-sky-950 text-sky-400 border-sky-800",
      pulse: false,
    },
    {
      title: "BLOCKED ROADS",
      value: blockedRoadsCount,
      subtext: "Corridors under clearance",
      icon: AlertTriangle,
      textColor: "text-orange-400",
      borderColor: "border-orange-900/60",
      bgColor: "bg-orange-950/20",
      badgeColor: "bg-orange-950 text-orange-400 border-orange-800",
      pulse: false,
    },
    {
      title: "POPULATION AT RISK",
      value: populationAtRisk.toLocaleString(),
      subtext: "Within high-slope catchment",
      icon: Users,
      textColor: "text-purple-400",
      borderColor: "border-purple-900/60",
      bgColor: "bg-purple-950/20",
      badgeColor: "bg-purple-950 text-purple-400 border-purple-800",
      pulse: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <Card
            key={c.title}
            className={`p-3.5 border ${c.borderColor} ${c.bgColor} rounded-xl relative overflow-hidden backdrop-blur-sm transition-all hover:translate-y-[-2px] glow-card glass-panel`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                {c.title}
              </span>
              <Icon
                className={`w-4 h-4 ${c.textColor} ${
                  c.pulse ? "animate-pulse" : ""
                }`}
              />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className={`text-2xl lg:text-3xl font-black font-mono ${c.textColor}`}>
                {c.value}
              </span>
              {c.pulse && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-1 font-mono truncate">
              {c.subtext}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
