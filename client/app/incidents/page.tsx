"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Map, Clock, AlertTriangle, Eye, RefreshCw } from "lucide-react";
import Link from "next/link";
import { IIncident } from "@/types/incident";

export default function IncidentsDashboard() {
  const [incidents, setIncidents] = useState<IIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/incidents");
      const data = await res.json();
      if (data.success) {
        setIncidents(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchIncidents();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/incidents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setIncidents(prev => prev.map(inc => inc.incidentId === id || inc._id === id ? { ...inc, status: newStatus as IIncident["status"] } : inc));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredIncidents = incidents.filter(inc => {
    if (severityFilter !== "ALL" && inc.severity !== severityFilter) return false;
    if (statusFilter !== "ALL" && inc.status !== statusFilter) return false;
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "CRITICAL": return "bg-red-900 text-red-100 hover:bg-red-800";
      case "HIGH": return "bg-orange-900 text-orange-100 hover:bg-orange-800";
      case "MEDIUM": return "bg-yellow-900 text-yellow-100 hover:bg-yellow-800";
      case "LOW": return "bg-green-900 text-green-100 hover:bg-green-800";
      default: return "bg-gray-800 text-gray-100";
    }
  };

  return (
    <div className="container mx-auto p-4 py-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Incident Management</h1>
          <p className="text-muted-foreground">Triage, dispatch, and track field reports.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={fetchIncidents} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Link href="/incidents/report">
            <Button>
              <AlertTriangle className="h-4 w-4 mr-2" />
              New Report
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="space-y-1.5 flex-1">
            <label className="text-sm font-medium">Severity</label>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Severities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Severities</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 flex-1">
            <label className="text-sm font-medium">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="UNDER REVIEW">Under Review</SelectItem>
                <SelectItem value="VERIFIED">Verified</SelectItem>
                <SelectItem value="DISPATCHED">Dispatched</SelectItem>
                <SelectItem value="RESOLVED">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Incident List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">Loading incidents...</div>
        ) : filteredIncidents.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">No incidents found matching criteria.</div>
        ) : (
          filteredIncidents.map(inc => (
            <Card key={inc.incidentId || inc._id as string} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="font-mono">{inc.incidentId}</Badge>
                  <Badge className={getSeverityColor(inc.severity)}>{inc.severity}</Badge>
                </div>
                <CardTitle className="text-lg">{inc.type}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Map className="h-3.5 w-3.5 mr-1" />
                  {inc.locationName || `${inc.latitude.toFixed(4)}, ${inc.longitude.toFixed(4)}`}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {inc.description}
                </p>
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  {new Date(inc.createdAt).toLocaleString()}
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Update Status:</label>
                  <Select 
                    value={inc.status} 
                    onValueChange={(val) => handleStatusChange(inc._id as string || inc.incidentId, val)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UNDER REVIEW">UNDER REVIEW</SelectItem>
                      <SelectItem value="VERIFIED">VERIFIED</SelectItem>
                      <SelectItem value="DISPATCHED">DISPATCHED</SelectItem>
                      <SelectItem value="RESOLVED">RESOLVED</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <div className="p-4 pt-0 mt-auto border-t">
                <Link href={`/map?incidentId=${inc.incidentId}`} className="block mt-4">
                  <Button variant="secondary" className="w-full" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View on Map
                  </Button>
                </Link>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
