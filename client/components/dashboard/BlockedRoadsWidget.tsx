"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IRoad } from "@/types/road";
import {
  Car,
  Ambulance,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface BlockedRoadsWidgetProps {
  roads: IRoad[];
}

export function BlockedRoadsWidget({ roads }: BlockedRoadsWidgetProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  
  const totalPages = Math.ceil(roads.length / itemsPerPage);
  
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const paginatedRoads = roads.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <Card className="p-0 rounded-xl border-orange-900/40 bg-slate-900/60 backdrop-blur-md flex flex-col w-full box-border glass-panel overflow-hidden h-full min-h-0">
      {/* Fixed Header */}
      <div className="flex items-center gap-3 p-4 pb-3 border-b border-slate-800/80 bg-slate-900/40 shrink-0 min-w-0">
        <Car className="w-5 h-5 text-orange-400 shrink-0" />
        <h3 className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-slate-200 uppercase min-w-0 flex-1 truncate">
          VITAL TRANSPORT ARTERIES
        </h3>
        <Link href="/map" className="shrink-0 flex items-center gap-1 text-[10px] sm:text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors bg-slate-950/50 px-2 py-1 rounded-md border border-slate-700/50">
          <span>Map</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Container (no longer strictly scrollable since it is paginated, but flex-1 to push footer down) */}
      <div className="flex-1 min-h-0 p-3 flex flex-col gap-3">
        {paginatedRoads.map((road, pageIndex) => {
          const globalIndex = currentPage * itemsPerPage + pageIndex;
          const isFirst = globalIndex === 0;
          const isBlocked = road.status === "BLOCKED";
          const isPartial = road.status === "PARTIAL";

          const statusColor = isBlocked
            ? "text-red-400"
            : isPartial
            ? "text-amber-400"
            : "text-emerald-400";

          return (
            <div
              key={road.roadId || road.name}
              className={`w-full box-border rounded-lg border p-3 flex flex-row flex-wrap items-center gap-3 sm:gap-4 transition-all flex-none min-h-0 ${
                isFirst
                  ? "bg-red-950/20 border-red-900/60 shadow-[0_2px_10px_rgba(220,38,38,0.1)]"
                  : "bg-slate-950/40 border-slate-800/60 hover:bg-slate-900/60"
              }`}
            >
              {/* Block A: Index, Info, Risk */}
              <div className="flex items-center w-full 2xl:w-auto 2xl:flex-1 min-w-0 gap-3 sm:gap-4">
                
                {/* Index / Status (Fixed Width) */}
                <div className="flex flex-col items-center justify-center w-[36px] shrink-0">
                  <span className={`text-sm font-mono font-bold ${isFirst ? "text-red-400" : "text-slate-500"}`}>
                    #{globalIndex + 1}
                  </span>
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${
                    isBlocked ? "bg-red-500 shadow-[0_0_8px_#ef4444]" : isPartial ? "bg-amber-500" : "bg-emerald-500"
                  }`} />
                </div>

                {/* Road Information (Flexible Width) */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h4 className="text-sm font-bold text-slate-100 truncate sm:whitespace-normal sm:break-words leading-tight">
                    {road.name}
                  </h4>
                  <div className="text-[11px] text-slate-400 font-mono mt-1 truncate sm:whitespace-normal sm:break-words">
                    {road.district}, {road.state} • Pop: {road.affectedPopulation.toLocaleString()}
                  </div>
                </div>

                {/* Risk Score */}
                <div className="flex flex-col items-end sm:items-start justify-center w-[60px] shrink-0">
                  <span className="text-[9px] text-slate-500 font-mono mb-1">RISK</span>
                  <span className={`text-xl font-black leading-none ${
                    road.riskScore > 70 ? "text-red-400" : road.riskScore > 50 ? "text-amber-400" : "text-emerald-400"
                  }`}>
                    {road.riskScore}%
                  </span>
                </div>
              </div>

              {/* Block B: Ambulance & Action */}
              <div className="flex items-center justify-between sm:justify-end w-full 2xl:w-auto gap-4 pt-3 2xl:pt-0 border-t 2xl:border-0 border-slate-800/60 shrink-0">
                
                {/* Ambulance Status */}
                <div className="flex flex-col items-start justify-center w-[90px] shrink-0">
                  <span className="text-[9px] text-slate-500 font-mono mb-1">AMBULANCE</span>
                  <span className={`text-[11px] font-bold ${statusColor}`}>
                    {road.ambulanceAccess}
                  </span>
                </div>

                {/* Action Button */}
                <div className="shrink-0 flex-1 sm:flex-none">
                  <Button
                    size="sm"
                    className={`h-9 px-4 font-bold text-[10px] transition-colors w-full sm:w-auto ${
                      isFirst
                        ? "bg-red-600 hover:bg-red-700 text-white border border-red-500/50 shadow-md shadow-red-900/30"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                    }`}
                    onClick={() => alert(`Dispatching to ${road.name}`)}
                  >
                    DISPATCH
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-3 border-t border-slate-800/80 bg-slate-900/30 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="text-slate-400 hover:text-white hover:bg-slate-800 h-8 text-[11px] font-mono px-3"
          >
            <ChevronLeft className="w-3.5 h-3.5 mr-1" />
            PREV
          </Button>
          <div className="text-[10px] font-mono text-slate-500">
            PAGE {currentPage + 1} OF {totalPages}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="text-slate-400 hover:text-white hover:bg-slate-800 h-8 text-[11px] font-mono px-3"
          >
            NEXT
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      )}
    </Card>
  );
}
