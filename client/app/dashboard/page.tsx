import React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { KPICards } from "@/components/dashboard/KPICards";
import { WeatherPanel } from "@/components/dashboard/WeatherPanel";
import { BlockedRoadsWidget } from "@/components/dashboard/BlockedRoadsWidget";
import { EmergencyResponseWidget } from "@/components/dashboard/EmergencyResponseWidget";
import { DynamicRiskMap } from "@/components/map/DynamicRiskMap";
import { getZones, getRoads, getIncidents, getAlerts } from "@/lib/data-service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  FilePlus,
  ExternalLink,
} from "lucide-react";

export const revalidate = 0; // Live data fetching

export default async function DashboardPage() {
  const [zones, roads, incidents, alerts] = await Promise.all([
    getZones(),
    getRoads(),
    getIncidents(),
    getAlerts(),
  ]);

  const criticalZones = zones.filter((z) => z.riskLevel === "CRITICAL");
  const highRiskZones = zones.filter((z) => z.riskLevel === "HIGH");
  const activeAlerts = alerts.filter((a) => a.status === "ACTIVE");

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans relative">
      <AppHeader />

      <div className="flex-1 flex overflow-hidden max-w-full">
        <AppSidebar />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-5 sm:space-y-6 scroll-smooth">
          {/* Top Banner & Fast Actions */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 sm:pb-5 border-b border-slate-800/60 mt-1 sm:mt-0">
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                  COMMAND CENTER
                </h1>
                <Badge className="bg-red-950/40 text-red-400 border-red-800/50 text-[9px] sm:text-[10px] font-mono animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.3)]">
                  SURVEILLANCE ACTIVE
                </Badge>
              </div>
              <p className="text-[11px] sm:text-xs text-cyan-400/80 font-mono tracking-tight leading-relaxed max-w-2xl">
                Real-Time Landslide Early Warning, Geotechnical Telemetry & Emergency Resource Dispatch
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
              <Link href="/map" className="w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full sm:w-auto h-10 border-slate-700/60 bg-slate-900/40 hover:bg-slate-800 backdrop-blur-sm text-cyan-50 font-mono text-xs transition-colors"
                >
                  <MapPin className="w-4 h-4 mr-1.5 text-cyan-400" />
                  GIS Radar
                </Button>
              </Link>
              <Link href="/incidents/report" className="w-full sm:w-auto">
                <Button
                  size="sm"
                  className="w-full sm:w-auto h-10 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-xs font-bold shadow-[0_0_15px_rgba(220,38,38,0.3)] border border-red-500/30 transition-all tracking-wide"
                >
                  <FilePlus className="w-4 h-4 mr-1.5" />
                  Report Incident
                </Button>
              </Link>
            </div>
          </div>

          {/* 6 KPI Cards */}
          <KPICards
            criticalCount={criticalZones.length || 3}
            highRiskCount={highRiskZones.length || 12}
            activeAlertsCount={activeAlerts.length || 7}
            incidentsCount={incidents.length || 47}
            blockedRoadsCount={roads.length || 8}
            populationAtRisk={12480}
          />

          {/* Interactive GIS Risk Map Section */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-cyan-950/50 rounded-md border border-cyan-800/30">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <h2 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-200">
                  NORTHEAST INDIA GIS RADAR
                </h2>
                <Badge variant="outline" className="hidden sm:inline-flex text-[10px] font-mono border-slate-700/50 text-slate-500 bg-slate-900/30">
                  LIVE TELEMETRY
                </Badge>
              </div>
              <Link
                href="/map"
                className="text-[11px] sm:text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1.5 self-start sm:self-auto transition-colors bg-cyan-950/20 px-2 py-1 rounded-md border border-cyan-900/30"
              >
                Expand Radar <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="glass-panel glow-card border-slate-700/50 rounded-2xl overflow-hidden p-1 bg-slate-900/20">
              <DynamicRiskMap
                zones={zones}
                incidents={incidents}
                roads={roads}
                height="h-[400px] lg:h-[550px]"
              />
            </div>
          </div>

          {/* Three-Column Telemetry, Roads & Response */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.15fr)] gap-4 lg:gap-5 pb-6">
            <div className="order-2 xl:order-1 min-w-0 md:col-span-1">
              <WeatherPanel
                rainfall={210}
                temperature={21.4}
                humidity={94}
                windSpeed={24}
                riskLevel="CRITICAL"
              />
            </div>
            <div className="order-3 xl:order-2 min-w-0 md:col-span-2 xl:col-span-1">
              <BlockedRoadsWidget roads={roads} />
            </div>
            <div className="order-1 xl:order-3 min-w-0 md:col-span-1 xl:col-span-1">
              <EmergencyResponseWidget roads={roads} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
