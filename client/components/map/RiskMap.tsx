"use client";

import React, { useEffect, useRef, useState } from "react";
import { IZone } from "@/types/zone";
import { IIncident } from "@/types/incident";
import { IRoad } from "@/types/road";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Layers,
  AlertTriangle,
  CloudRain,
  Compass,
  Gauge,
} from "lucide-react";

interface RiskMapProps {
  zones: IZone[];
  incidents?: IIncident[];
  roads?: IRoad[];
  onSelectZone?: (zone: IZone) => void;
  selectedZoneId?: string;
  height?: string;
}

export function RiskMap({
  zones,
  incidents = [],
  roads = [],
  onSelectZone,
  selectedZoneId,
  height = "h-[650px]",
}: RiskMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<Record<string, unknown>>({});
  const [userSelectedZone, setUserSelectedZone] = useState<IZone | null>(null);

  const [showZones, setShowZones] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);
  const [showRoads, setShowRoads] = useState(true);

  // Derived active zone without setting state inside an effect
  const activeZone = React.useMemo(() => {
    if (userSelectedZone) return userSelectedZone;
    if (selectedZoneId) {
      return (
        zones.find(
          (z) =>
            z._id === selectedZoneId ||
            z.name.toLowerCase().includes(selectedZoneId.toLowerCase())
        ) || null
      );
    }
    return (
      zones.find((z) => z.name.toLowerCase().includes("sohra")) ||
      zones[0] ||
      null
    );
  }, [userSelectedZone, selectedZoneId, zones]);

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    async function initMap() {
      const L = (await import("leaflet")).default;

      if (!mapContainerRef.current) return;

      // Clean up previous instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Center of Northeast India: Shillong / Meghalaya / Assam region
      const map = L.map(mapContainerRef.current, {
        center: [25.7, 92.5],
        zoom: 7,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // Dark theme OpenStreetMap tiles
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
        maxZoom: 19,
        subdomains: "abcd",
      }).addTo(map);

      // Render Zones
      if (showZones) {
        zones.forEach((zone) => {
          let markerColor = "#22c55e"; // Low
          let radius = 10;

          if (zone.riskLevel === "CRITICAL") {
            markerColor = "#ef4444";
            radius = 16;
          } else if (zone.riskLevel === "HIGH") {
            markerColor = "#f97316";
            radius = 13;
          } else if (zone.riskLevel === "MODERATE") {
            markerColor = "#eab308";
            radius = 11;
          }

          const circle = L.circleMarker([zone.latitude, zone.longitude], {
            radius,
            color: markerColor,
            fillColor: markerColor,
            fillOpacity: zone.riskLevel === "CRITICAL" ? 0.85 : 0.65,
            weight: zone.riskLevel === "CRITICAL" ? 3 : 1.5,
            className: zone.riskLevel === "CRITICAL" ? "critical-pulse-marker" : "",
          }).addTo(map);

          circle.bindTooltip(
            `<b>${zone.name}</b><br/>Risk Score: ${zone.riskScore}% (${zone.riskLevel})`,
            { direction: "top", offset: [0, -10] }
          );

          circle.on("click", () => {
            setUserSelectedZone(zone);
            if (onSelectZone) onSelectZone(zone);
            map.flyTo([zone.latitude, zone.longitude], 9, { duration: 1.2 });
          });

          markersRef.current[`zone-${zone.name}`] = circle;
        });
      }

      // Render Blocked Roads
      if (showRoads) {
        roads.forEach((road) => {
          const roadColor =
            road.status === "BLOCKED"
              ? "#ef4444"
              : road.status === "PARTIAL"
              ? "#f59e0b"
              : "#3b82f6";

          const roadIcon = L.divIcon({
            className: "custom-road-marker",
            html: `<div style="background-color: ${roadColor}; width: 22px; height: 22px; border-radius: 4px; border: 2px solid white; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; color: white; box-shadow: 0 2px 6px rgba(0,0,0,0.5);">🛣️</div>`,
            iconSize: [22, 22],
          });

          const marker = L.marker([road.latitude, road.longitude], {
            icon: roadIcon,
          }).addTo(map);

          marker.bindTooltip(
            `<b>${road.name}</b> - ${road.status}<br/>Ambulance Access: ${road.ambulanceAccess}`,
            { direction: "top" }
          );

          marker.on("click", () => {
            // center map on road
            map.flyTo([road.latitude, road.longitude], 10, { duration: 1 });
          });
        });
      }

      // Render Incident Reports
      if (showIncidents) {
        incidents.slice(0, 20).forEach((inc) => {
          const incColor =
            inc.severity === "CRITICAL"
              ? "#dc2626"
              : inc.severity === "HIGH"
              ? "#ea580c"
              : "#0284c7";

          const incIcon = L.divIcon({
            className: "custom-incident-marker",
            html: `<div style="background-color: ${incColor}; width: 18px; height: 18px; border-radius: 50%; border: 2px solid #fff; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #fff; font-weight: bold;">!</div>`,
            iconSize: [18, 18],
          });

          const incMarker = L.marker([inc.latitude, inc.longitude], {
            icon: incIcon,
          }).addTo(map);

          incMarker.bindTooltip(
            `<b>${inc.incidentId}</b> (${inc.type})<br/>Severity: ${inc.severity}<br/>Status: ${inc.status}`,
            { direction: "top" }
          );
        });
      }
    }

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [zones, incidents, roads, showZones, showRoads, showIncidents]);

  return (
    <div className={`relative w-full ${height} rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col md:flex-row shadow-2xl`}>
      {/* Interactive Map Area */}
      <div className="relative flex-1 h-full min-h-[350px]">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Top Controls Overlay */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-1.5 flex items-center gap-1 shadow-lg text-xs font-mono">
            <button
              onClick={() => setShowZones(!showZones)}
              className={`px-2 py-1 rounded transition-colors ${
                showZones
                  ? "bg-slate-800 text-cyan-300 font-semibold border border-cyan-800/60"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Risk Zones ({zones.length})
            </button>
            <button
              onClick={() => setShowRoads(!showRoads)}
              className={`px-2 py-1 rounded transition-colors ${
                showRoads
                  ? "bg-slate-800 text-amber-300 font-semibold border border-amber-800/60"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Roads ({roads.length})
            </button>
            <button
              onClick={() => setShowIncidents(!showIncidents)}
              className={`px-2 py-1 rounded transition-colors ${
                showIncidents
                  ? "bg-slate-800 text-red-300 font-semibold border border-red-800/60"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Incidents ({incidents.length})
            </button>
          </div>
        </div>

        {/* Legend Overlay */}
        <div className="absolute bottom-3 left-3 z-10 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-2.5 shadow-lg text-[11px] font-mono">
          <div className="font-bold text-slate-300 mb-1.5 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>RISK LEVEL LEGEND</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              Critical (&gt;70)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              High (51-70)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              Mod (31-50)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              Low (&le;30)
            </span>
          </div>
        </div>
      </div>

      {/* Zone Detail Inspection Drawer */}
      {activeZone && (
        <div className="w-full md:w-80 lg:w-96 border-t md:border-t-0 md:border-l border-slate-800 bg-slate-900/95 backdrop-blur-lg p-4 flex flex-col justify-between overflow-y-auto z-10">
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  {activeZone.state} • {activeZone.district}
                </span>
                <Badge
                  className={`font-mono text-[10px] font-bold ${
                    activeZone.riskLevel === "CRITICAL"
                      ? "bg-red-950 text-red-400 border border-red-700 animate-pulse"
                      : activeZone.riskLevel === "HIGH"
                      ? "bg-amber-950 text-amber-300 border border-amber-700"
                      : "bg-emerald-950 text-emerald-300 border border-emerald-700"
                  }`}
                >
                  {activeZone.riskLevel} RISK
                </Badge>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                {activeZone.name}
              </h2>
              <div className="text-[11px] text-slate-400 font-mono">
                COORD: {activeZone.latitude.toFixed(2)}°N, {activeZone.longitude.toFixed(2)}°E
              </div>
            </div>

            {/* AI Risk Score Hero Gauge */}
            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 relative overflow-hidden">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-cyan-400" />
                  AI RISK SCORE
                </span>
                <span
                  className={`text-3xl font-black font-mono ${
                    activeZone.riskScore >= 71
                      ? "text-red-400"
                      : activeZone.riskScore >= 51
                      ? "text-amber-400"
                      : "text-emerald-400"
                  }`}
                >
                  {activeZone.riskScore}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-2.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    activeZone.riskScore >= 71
                      ? "bg-red-500"
                      : activeZone.riskScore >= 51
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }`}
                  style={{ width: `${activeZone.riskScore}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-400 mt-2 font-mono">
                Weighted Formula: Rain (35%) + Soil (25%) + Slope (20%) + Hist (20%)
              </div>
            </div>

            {/* Environmental Metric Breakdown */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-950/40">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                  Rainfall (24h)
                </div>
                <div className="text-lg font-bold font-mono text-white mt-1">
                  {activeZone.rainfall} <span className="text-xs text-slate-400 font-normal">mm</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-950/40">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                  Soil Moisture
                </div>
                <div className="text-lg font-bold font-mono text-white mt-1">
                  {activeZone.soilMoisture} <span className="text-xs text-slate-400 font-normal">%</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-950/40">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  Slope Gradient
                </div>
                <div className="text-lg font-bold font-mono text-white mt-1">
                  {activeZone.slope}°
                </div>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-950/40">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  Past Landslides
                </div>
                <div className="text-lg font-bold font-mono text-white mt-1">
                  {activeZone.historicalEvents} <span className="text-xs text-slate-400 font-normal">events</span>
                </div>
              </div>
            </div>

            {/* Recommended Action Box */}
            <div className="p-3 rounded-lg border border-red-900/40 bg-red-950/20 text-xs space-y-1">
              <div className="font-semibold text-red-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                RECOMMENDED ACTION
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {activeZone.recommendedAction}
              </p>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="pt-4 border-t border-slate-800 flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
              onClick={() =>
                alert(
                  `Emergency response taskforce alerted for ${activeZone.name}. Dispatch notification sent to SDRF unit.`
                )
              }
            >
              Dispatch Unit
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-slate-700 hover:bg-slate-800 text-slate-300 text-xs"
              onClick={() => {
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.flyTo(
                    [activeZone.latitude, activeZone.longitude],
                    11,
                    { duration: 1.5 }
                  );
                }
              }}
            >
              Zoom In
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
