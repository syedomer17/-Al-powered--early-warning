"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CloudRain,
  Thermometer,
  Droplets,
  Wind,
  TrendingUp,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WeatherPanelProps {
  rainfall?: number;
  temperature?: number;
  humidity?: number;
  windSpeed?: number;
  riskLevel?: string;
}

const mockRainfallTrend = [
  { time: "06:00", rain: 65, soil: 55 },
  { time: "09:00", rain: 90, soil: 62 },
  { time: "12:00", rain: 130, soil: 74 },
  { time: "15:00", rain: 165, soil: 82 },
  { time: "18:00", rain: 195, soil: 88 },
  { time: "21:00", rain: 210, soil: 91 },
];

export function WeatherPanel({
  rainfall = 210,
  temperature = 21.4,
  humidity = 94,
  windSpeed = 24,
  riskLevel = "CRITICAL",
}: WeatherPanelProps) {
  return (
    <Card className="p-4 sm:p-5 rounded-xl border-cyan-900/40 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between w-full box-border glass-panel">
      <div className="w-full min-w-0">
        {/* Header Redesign */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-slate-400 uppercase truncate">
              Environmental Telemetry
            </h3>
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-sm font-bold text-slate-100 truncate">Sohra Sensor Cluster</span>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end shrink-0">
            <span className="text-[10px] font-mono text-slate-500 mb-1">METEOROLOGICAL RISK</span>
            <Badge
              className={`font-mono text-[10px] sm:text-xs px-2.5 py-0.5 rounded-sm ${
                riskLevel === "CRITICAL"
                  ? "bg-red-950/80 text-red-400 border border-red-800 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.2)]"
                  : "bg-amber-950 text-amber-300 border-amber-700"
              }`}
            >
              {riskLevel}
            </Badge>
          </div>
        </div>

        {/* Sensor Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-3 mt-4">
          <div className="p-3 rounded-lg border border-slate-800/80 bg-slate-950/80 flex flex-col justify-between">
            <div className="text-[10px] sm:text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-2 truncate">
              <CloudRain className="w-3 h-3 text-blue-400 shrink-0" />
              <span className="truncate">RAINFALL</span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white flex items-baseline gap-1">
                {rainfall} <span className="text-xs text-slate-500 font-normal">mm</span>
              </div>
              <div className="text-[10px] text-red-400 font-mono flex items-center gap-1 mt-1 truncate">
                <TrendingUp className="w-3 h-3 shrink-0" /> <span className="truncate">+32mm / 3h</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-800/80 bg-slate-950/80 flex flex-col justify-between">
            <div className="text-[10px] sm:text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-2 truncate">
              <Droplets className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">SOIL MOISTURE</span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                {humidity > 80 ? "91%" : "78%"}
              </div>
              <div className="text-[10px] text-amber-400 font-mono mt-1 truncate">
                Threshold &gt;85%
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-800/80 bg-slate-950/80 flex flex-col justify-between">
            <div className="text-[10px] sm:text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-2 truncate">
              <Thermometer className="w-3 h-3 text-rose-400 shrink-0" />
              <span className="truncate">SURFACE TEMP</span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white flex items-baseline gap-1">
                {temperature} <span className="text-xs text-slate-500 font-normal">°C</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-1 truncate">
                Saturated
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-800/80 bg-slate-950/80 flex flex-col justify-between">
            <div className="text-[10px] sm:text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-2 truncate">
              <Wind className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">WIND GUST</span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white flex items-baseline gap-1">
                {windSpeed} <span className="text-xs text-slate-500 font-normal">km/h</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-1 truncate">
                Dir: SSW
              </div>
            </div>
          </div>
        </div>

        {/* 24-Hour Precipitation Trend Chart */}
        <div className="mt-5 pt-4 border-t border-slate-800/60 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5 truncate">
              <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">PRECIPITATION / SATURATION</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500 shrink-0">
              INTERVAL: 3H
            </span>
          </div>
          <div className="h-[220px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRainfallTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} tickMargin={8} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} tickMargin={8} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#f8fafc",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
                  }}
                  itemStyle={{ color: "#22d3ee" }}
                />
                <Area
                  type="monotone"
                  dataKey="rain"
                  stroke="#22d3ee"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#rainGradient)"
                  name="Rainfall (mm)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
}
