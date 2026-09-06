"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Radio,
  FilePlus,
  Menu,
  Languages,
} from "lucide-react";
import { toast } from "sonner";

interface AppHeaderProps {
  onToggleSidebar?: () => void;
}

export function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  const [simulationActive, setSimulationActive] = useState(false);
  const [lang, setLang] = useState<"EN" | "HI" | "AS">("EN");

  const cycleLang = () => {
    if (lang === "EN") setLang("HI");
    else if (lang === "HI") setLang("AS");
    else setLang("EN");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (simulationActive) {
      let step = 0;
      interval = setInterval(() => {
        step += 1;
        if (step === 1) {
          toast.info("Simulation: Rainfall in Sohra increasing (178mm -> 187mm)");
        } else if (step === 2) {
          toast.warning("Simulation: Soil moisture reaching 85%, slope instability detected.");
        } else if (step === 3) {
          toast.error("🚨 CRITICAL LANDSLIDE WARNING: Landslide risk in Sohra increased to 94%. Recommended: Immediate field inspection.", { duration: 8000 });
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setSimulationActive(false); // Stop simulation after critical alert
        }
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [simulationActive]);

  const dictionary = {
    EN: {
      reportHazard: "Report Hazard",
      systemOp: "SYSTEM: OPERATIONAL",
      simStandby: "SIMULATION: STANDBY",
      simActive: "SIMULATION: ACTIVE (6s TICK)"
    },
    HI: {
      reportHazard: "खतरे की रिपोर्ट",
      systemOp: "सिस्टम: चालू",
      simStandby: "सिमुलेशन: स्टैंडबाय",
      simActive: "सिमुलेशन: सक्रिय"
    },
    AS: {
      reportHazard: "বিপদৰ প্ৰতিবেদন",
      systemOp: "প্ৰণালী: সক্ৰিয়",
      simStandby: "সিমুলেচন: ষ্টেণ্ডবাই",
      simActive: "সিমুলেচন: সক্ৰিয়"
    }
  };

  const t = dictionary[lang];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b-0 rounded-b-xl px-4 lg:px-6 py-2.5 mb-2 mx-auto max-w-[98%] mt-2">
      <div className="flex items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center font-bold text-white shadow-md shadow-red-900/30 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black tracking-wider text-base text-white">
                  LANDSLIDE<span className="text-red-500">X</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  NER COMMAND
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden md:block">
                AI Early Warning & Response System • India Northeast
              </p>
            </div>
          </Link>
        </div>

        {/* Center/Status Controls */}
        <div className="hidden xl:flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold tracking-wide">{t.systemOp}</span>
          </div>

          <button
            onClick={() => setSimulationActive(!simulationActive)}
            className={`flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-mono border transition-all cursor-pointer ${
              simulationActive
                ? "bg-amber-950/60 border-amber-600 text-amber-300"
                : "bg-slate-900 border-slate-700 text-slate-400"
            }`}
          >
            <Radio
              className={`w-3.5 h-3.5 ${
                simulationActive ? "text-amber-400 animate-pulse" : "text-slate-500"
              }`}
            />
            <span className="font-semibold">
              {simulationActive ? t.simActive : t.simStandby}
            </span>
          </button>

          <Badge
            variant="outline"
            className="border-blue-800/60 bg-blue-950/40 text-blue-300 font-mono text-[10px] uppercase"
          >
            Prototype Data Mode
          </Badge>
        </div>

        {/* Right CTA / Language & Report */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={cycleLang}
            className="flex items-center gap-1 px-2 py-1 rounded border border-slate-800 bg-slate-900 text-xs font-mono text-slate-300 hover:bg-slate-800 transition-colors"
            title="Switch Language (English / Hindi / Assamese)"
          >
            <Languages className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang}</span>
          </button>

          <Link href="/incidents/report">
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white font-medium text-xs px-3 shadow-md shadow-red-900/40 border border-red-500"
            >
              <FilePlus className="w-3.5 h-3.5 mr-1.5" />
              {t.reportHazard}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
