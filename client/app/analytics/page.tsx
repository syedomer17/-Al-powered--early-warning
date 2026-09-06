"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  AreaChart, Area, ScatterChart, Scatter, Legend 
} from "recharts";
import { Activity, Droplets, CloudRain, ShieldAlert } from "lucide-react";

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Mock data for Recharts
  const riskDistribution = [
    { name: "Low", count: 8, fill: "#22c55e" },
    { name: "Moderate", count: 15, fill: "#eab308" },
    { name: "High", count: 12, fill: "#f97316" },
    { name: "Critical", count: 3, fill: "#ef4444" },
  ];

  const rainfallRiskData = [
    { rainfall: 50, risk: 20 },
    { rainfall: 80, risk: 35 },
    { rainfall: 120, risk: 55 },
    { rainfall: 150, risk: 70 },
    { rainfall: 180, risk: 85 },
    { rainfall: 210, risk: 94 }, // Sohra
    { rainfall: 250, risk: 98 },
  ];

  const soilMoistureData = [
    { time: "00:00", moisture: 65 },
    { time: "04:00", moisture: 68 },
    { time: "08:00", moisture: 75 },
    { time: "12:00", moisture: 82 },
    { time: "16:00", moisture: 88 },
    { time: "20:00", moisture: 91 }, // Sohra current
  ];

  const incidentVolume = [
    { date: "Aug 1", reported: 12, verified: 10 },
    { date: "Aug 2", reported: 15, verified: 11 },
    { date: "Aug 3", reported: 28, verified: 22 },
    { date: "Aug 4", reported: 45, verified: 38 },
    { date: "Aug 5", reported: 32, verified: 28 },
    { date: "Aug 6", reported: 47, verified: 40 },
  ];

  const regionalVulnerability = [
    { region: "East Khasi Hills", score: 92 },
    { region: "Aizawl District", score: 85 },
    { region: "Darjeeling", score: 78 },
    { region: "Tawang", score: 65 },
    { region: "Imphal West", score: 45 },
  ];

  if (!mounted) return <div className="p-8 text-center">Loading Analytics...</div>;

  return (
    <div className="container mx-auto p-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Risk Analytics & Trends</h1>
        <p className="text-muted-foreground mt-1">Data-driven insights into landslide vulnerabilities across the region.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Risk Level Distribution */}
        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-indigo-400" />
              Risk Level Distribution
            </CardTitle>
            <CardDescription>Current zone counts by severity</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 2. Rainfall vs Risk Score Correlation */}
        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CloudRain className="h-5 w-5 text-cyan-400" />
              Rainfall vs Risk Correlation
            </CardTitle>
            <CardDescription>Impact of 24h rainfall (mm) on risk score (%)</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" dataKey="rainfall" name="Rainfall" unit="mm" stroke="#94a3b8" fontSize={12} />
                <YAxis type="number" dataKey="risk" name="Risk Score" unit="%" stroke="#94a3b8" fontSize={12} />
                <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Scatter name="Zones" data={rainfallRiskData} fill="#06b6d4" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 3. 24-Hour Soil Moisture Saturation Curve */}
        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-400" />
              Soil Moisture Saturation
            </CardTitle>
            <CardDescription>Average moisture level trend over 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={soilMoistureData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} domain={[50, 100]} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Area type="monotone" dataKey="moisture" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMoisture)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 4. Incident Volume Over Time */}
        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-red-400" />
              Incident Volume
            </CardTitle>
            <CardDescription>Reported vs Verified incidents per day</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incidentVolume} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="reported" fill="#94a3b8" name="Reported" radius={[4, 4, 0, 0]} />
                <Bar dataKey="verified" fill="#f43f5e" name="Verified" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 5. Regional Vulnerability Summary */}
        <Card className="border-slate-800 bg-slate-900/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Regional Vulnerability Summary</CardTitle>
            <CardDescription>Top districts ranked by aggregate risk score</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={regionalVulnerability} margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
                <YAxis dataKey="region" type="category" stroke="#94a3b8" fontSize={12} width={120} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Bar dataKey="score" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
