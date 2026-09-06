"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Users, Truck, AlertTriangle } from "lucide-react";
import { IRoad } from "@/types/road";

interface Props {
  roads: IRoad[];
}

export function EmergencyResponseWidget({ roads: _roads }: Props) {
  // Demo mock prioritizing NH-6 if available, or static fallback
  return (
    <Card className="p-0 rounded-xl border-red-900/40 bg-slate-900/60 backdrop-blur-md flex flex-col w-full box-border glass-panel h-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 pb-3 border-b border-slate-800/80 bg-slate-900/40 shrink-0">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
          <h3 className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-slate-200 uppercase truncate">
            Emergency Response Prioritization
          </h3>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 p-3 space-y-3 custom-scrollbar">
        {/* Priority #1 */}
        <div className="p-3 sm:p-4 rounded-xl border border-red-900/60 bg-red-950/20 shadow-[0_0_15px_rgba(220,38,38,0.1)] flex flex-col gap-3 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 min-w-0">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <Badge className="bg-red-600 font-bold text-[9px] px-1.5 py-0">Priority #1</Badge>
                <h3 className="font-bold text-sm sm:text-base text-slate-100 truncate sm:whitespace-normal sm:break-words leading-tight">
                  NH-6 Road Blockage
                </h3>
              </div>
              <p className="text-xs text-slate-400 flex items-start sm:items-center gap-1.5 truncate sm:whitespace-normal sm:break-words leading-relaxed">
                <AlertTriangle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5 sm:mt-0" />
                <span>Critical supply route cut off by massive debris.</span>
              </p>
            </div>
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start shrink-0 pt-1 sm:pt-0 border-t sm:border-0 border-red-900/30 mt-2 sm:mt-0">
              <div className="text-[10px] text-slate-500 font-mono sm:order-2">RISK SCORE</div>
              <div className="text-2xl sm:text-3xl font-black text-red-400 sm:order-1 leading-none">94</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 py-1">
            <div className="bg-slate-950/50 p-2 sm:p-2.5 rounded-lg border border-slate-800/80">
              <div className="text-[9px] sm:text-[10px] text-slate-500 font-mono flex items-center gap-1.5 truncate">
                <Users className="w-3 h-3 text-cyan-500 shrink-0" /> POPULATION
              </div>
              <div className="font-bold text-slate-200 mt-1 truncate">2,840</div>
            </div>
            <div className="bg-slate-950/50 p-2 sm:p-2.5 rounded-lg border border-slate-800/80">
              <div className="text-[9px] sm:text-[10px] text-slate-500 font-mono flex items-center gap-1.5 truncate">
                <Truck className="w-3 h-3 text-red-500 shrink-0" /> AMBULANCE
              </div>
              <div className="font-bold text-red-400 mt-1 truncate">BLOCKED</div>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold tracking-wider h-11 border border-red-500/50 shadow-md shadow-red-900/40 text-xs sm:text-sm transition-all mt-1">
            <Truck className="w-4 h-4 mr-2" /> DISPATCH TEAM
          </Button>
        </div>

        {/* Priority #2 */}
        <div className="p-3 sm:p-4 rounded-xl border border-orange-900/30 bg-slate-950/40 hover:bg-slate-900/60 transition-colors flex flex-col gap-2 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 min-w-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-orange-400 border-orange-800/50 text-[9px] px-1.5 py-0 bg-orange-950/20">Priority #2</Badge>
                <h4 className="font-bold text-xs sm:text-sm text-slate-200 truncate sm:whitespace-normal sm:break-words leading-tight">
                  Sohra Edge Settlement
                </h4>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-400 mt-1 truncate sm:whitespace-normal sm:break-words leading-relaxed">
                Tension cracks observed near cliff edge. Prepare evacuation.
              </div>
            </div>
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start shrink-0 pt-2 sm:pt-0">
              <div className="text-[9px] text-slate-500 font-mono sm:order-2">SCORE</div>
              <div className="text-lg sm:text-xl font-bold text-orange-400 sm:order-1 leading-none">82</div>
            </div>
          </div>
        </div>

        {/* Priority #3 */}
        <div className="p-3 sm:p-4 rounded-xl border border-emerald-900/30 bg-slate-950/40 hover:bg-slate-900/60 transition-colors flex flex-col gap-2 min-w-0 opacity-70">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 min-w-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-emerald-400 border-emerald-800/50 text-[9px] px-1.5 py-0 bg-emerald-950/20">Priority #3</Badge>
                <h4 className="font-bold text-xs sm:text-sm text-slate-300 truncate sm:whitespace-normal sm:break-words leading-tight">
                  Shillong Bypass Minor Slip
                </h4>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 mt-1 truncate sm:whitespace-normal sm:break-words leading-relaxed">
                Minor debris flow. Traffic restricted to one lane.
              </div>
            </div>
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start shrink-0 pt-2 sm:pt-0">
              <div className="text-[9px] text-slate-600 font-mono sm:order-2">SCORE</div>
              <div className="text-lg sm:text-xl font-bold text-emerald-500 sm:order-1 leading-none">41</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
