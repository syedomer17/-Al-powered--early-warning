"use client";

import dynamic from "next/dynamic";

export const DynamicRiskMap = dynamic(
  () => import("./RiskMap").then((mod) => mod.RiskMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[650px] rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          <p className="text-xs font-mono text-slate-400 tracking-wider">
            INITIALIZING NORTHEAST GIS RADAR & TELEMETRY...
          </p>
        </div>
      </div>
    ),
  }
);
