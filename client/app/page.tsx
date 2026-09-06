import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Activity,
  MapPin,
  BellRing,
  ClipboardList,
  ArrowRight,
  FilePlus,
} from "lucide-react";

export default function LandingPage() {
  const capabilities = [
    {
      title: "AI Risk Prediction",
      desc: "Multi-factor environmental scoring combining rainfall intensity, soil saturation, slope gradients, and historical slip records.",
      icon: Activity,
      color: "text-red-400",
      border: "border-red-900/50",
      bg: "bg-red-950/20",
    },
    {
      title: "GIS Real-Time Monitoring",
      desc: "Cartographic command radar covering 8 northeastern states with dynamic polygon markers and geological hazard layers.",
      icon: MapPin,
      color: "text-cyan-400",
      border: "border-cyan-900/50",
      bg: "bg-cyan-950/20",
    },
    {
      title: "Early Warning Alerts",
      desc: "Automated threshold triggers dispatching SMS, mobile advisories, and local administrative evacuation warnings.",
      icon: BellRing,
      color: "text-amber-400",
      border: "border-amber-900/50",
      bg: "bg-amber-950/20",
    },
    {
      title: "Field Intelligence & Response",
      desc: "Geo-tagged citizen ground-crack reporting with offline queueing and algorithmic emergency road dispatch prioritization.",
      icon: ClipboardList,
      color: "text-emerald-400",
      border: "border-emerald-900/50",
      bg: "bg-emerald-950/20",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-red-500 selection:text-white">
      {/* Top Navigation */}
      <header className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center font-bold text-white shadow-lg shadow-red-900/30">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-lg tracking-wider text-white">
              LANDSLIDE<span className="text-red-500">X</span>
            </span>
            <span className="ml-2 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              INDIA NER PROTOTYPE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/incidents/report">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-700 hover:bg-slate-900 text-slate-300 text-xs font-mono hidden sm:flex"
            >
              <FilePlus className="w-3.5 h-3.5 mr-1 text-red-400" />
              Citizen Reporting
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-4 shadow-lg shadow-red-900/30"
            >
              Open Command Center <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center max-w-5xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>Active Monsoon 2026 Surveillance • Northeast Himalayan Corridor</span>
        </div>

        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            AI-POWERED LANDSLIDE EARLY WARNING & DISASTER RESPONSE
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Monitor real-time environmental telemetry, identify vulnerable high-slope zones, receive automated early warnings, and coordinate emergency response across India&apos;s Northeast Region.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-8 h-12 shadow-xl shadow-red-900/40"
            >
              <Activity className="w-4 h-4 mr-2" />
              Open Command Center
            </Button>
          </Link>
          <Link href="/incidents/report">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-slate-700 hover:bg-slate-900 text-slate-200 text-sm font-mono px-6 h-12"
            >
              <FilePlus className="w-4 h-4 mr-2 text-red-400" />
              Report Field Incident
            </Button>
          </Link>
        </div>

        {/* 4 Capability Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-10 text-left">
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <Card
                key={c.title}
                className={`p-4 rounded-xl border ${c.border} ${c.bg} backdrop-blur-md flex flex-col justify-between hover:scale-[1.02] transition-transform`}
              >
                <div>
                  <div className={`p-2.5 rounded-lg bg-slate-950/80 w-fit border border-slate-800 ${c.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mt-3 font-mono">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Prototype Transparency Notice */}
        <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 text-[11px] font-mono text-slate-400 max-w-xl">
          <span className="text-cyan-400 font-bold">PROTOTYPE NOTICE:</span> Sensor telemetry and environmental saturation indicators are simulated for demonstration. The architecture is engineered for direct plug-in to IMD, satellite DEM, and IoT telemetry feeds.
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-4 px-6 text-center text-xs font-mono text-slate-500">
        LANDSLIDEX • Disaster Intelligence & Emergency Triage Platform • Northeast India Command
      </footer>
    </div>
  );
}
