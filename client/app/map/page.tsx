import React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { DynamicRiskMap } from "@/components/map/DynamicRiskMap";
import { getZones, getIncidents, getRoads } from "@/lib/data-service";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export const revalidate = 0;

export default async function MapPage({
  searchParams,
}: {
  searchParams?: Promise<{ zone?: string }>;
}) {
  const [zones, incidents, roads] = await Promise.all([
    getZones(),
    getIncidents(),
    getRoads(),
  ]);

  const params = searchParams ? await searchParams : {};
  const selectedZoneId = params.zone || "Sohra";

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <AppHeader />

      <div className="flex-1 flex overflow-hidden">
        <AppSidebar />

        <main className="flex-1 flex flex-col p-4 lg:p-6 overflow-hidden space-y-3">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <h1 className="text-lg lg:text-xl font-black tracking-tight text-white">
                  FULL-SCREEN GIS LANDSLIDE RISK RADAR
                </h1>
                <Badge className="bg-red-950 text-red-300 border-red-700 text-[10px] font-mono animate-pulse">
                  NORTHEAST INDIA REGION
                </Badge>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Cartographic layer overlaying rainfall saturation, topological slope gradients, and incident reports
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Total Monitored Zones:</span>
              <span className="font-bold text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                {zones.length}
              </span>
            </div>
          </div>

          {/* Map Container */}
          <div className="flex-1 min-h-[600px] h-full">
            <DynamicRiskMap
              zones={zones}
              incidents={incidents}
              roads={roads}
              selectedZoneId={selectedZoneId}
              height="h-[calc(100vh-175px)]"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
