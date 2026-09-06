"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Map, CheckCircle, ShieldAlert, Truck } from "lucide-react";
import Link from "next/link";
import { IAlert } from "@/types/alert";

export default function ActiveAlertsPage() {
  const [alerts, setAlerts] = useState<IAlert[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/alerts");
      const data = await res.json();
      if (data.success) {
        setAlerts(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAlerts();
  }, []);

  const handleAcknowledge = async (id: string) => {
    try {
      const res = await fetch(`/api/alerts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "ACKNOWLEDGED" })
      });
      if (res.ok) {
        setAlerts(prev => prev.map(a => a._id === id ? { ...a, status: "ACKNOWLEDGED" } : a));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "CRITICAL": return "bg-red-900 text-red-100 border-red-500";
      case "HIGH": return "bg-orange-900 text-orange-100 border-orange-500";
      case "WARNING": return "bg-yellow-900 text-yellow-100 border-yellow-500";
      case "INFO": return "bg-blue-900 text-blue-100 border-blue-500";
      default: return "bg-gray-800 text-gray-100 border-gray-500";
    }
  };

  return (
    <div className="container mx-auto p-4 py-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Active Alerts Center</h1>
          <p className="text-muted-foreground">Monitor and respond to real-time early warnings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">Loading alerts...</div>
        ) : alerts.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">No active alerts.</div>
        ) : (
          alerts.map(alertItem => (
            <Card key={alertItem._id as string} className={`border-l-4 ${getLevelColor(alertItem.level).split(' ')[2]}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className={`h-5 w-5 ${alertItem.level === 'CRITICAL' ? 'text-red-500' : 'text-orange-500'}`} />
                    <CardTitle className="text-xl">{alertItem.zoneName}</CardTitle>
                  </div>
                  <Badge variant={alertItem.status === "ACTIVE" ? "destructive" : "secondary"}>
                    {alertItem.status}
                  </Badge>
                </div>
                <CardDescription className="flex items-center mt-1 text-sm font-medium">
                  <Badge className="mr-2" variant="outline">{alertItem.level}</Badge>
                  Risk Score: {alertItem.riskScore}%
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/30 p-3 rounded-md text-sm border">
                  <strong>Message:</strong> {alertItem.message}
                </div>
                
                <div className="text-sm">
                  <strong>Recommended Action:</strong> {alertItem.recommendedAction}
                </div>

                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  {new Date(alertItem.createdAt).toLocaleString()}
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {alertItem.status !== "ACKNOWLEDGED" && alertItem.status !== "RESOLVED" && (
                    <Button 
                      size="sm" 
                      onClick={() => handleAcknowledge(alertItem._id as string)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      ACKNOWLEDGE
                    </Button>
                  )}
                  <Button size="sm" variant="secondary" onClick={() => window.alert("Dispatching team to " + alertItem.zoneName)}>
                    <Truck className="h-4 w-4 mr-2" />
                    DISPATCH TEAM
                  </Button>
                  <Link href={`/map?zone=${encodeURIComponent(alertItem.zoneName)}`}>
                    <Button size="sm" variant="outline">
                      <Map className="h-4 w-4 mr-2" />
                      VIEW ON MAP
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
