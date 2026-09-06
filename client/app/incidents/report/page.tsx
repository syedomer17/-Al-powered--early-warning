"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, WifiOff, CheckCircle2, UploadCloud, AlertTriangle, FilePlus2 } from "lucide-react";
import Link from "next/link";

export default function IncidentReportPage() {
  const [isOnline, setIsOnline] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  
  // Form State
  const [type, setType] = useState("Ground Crack");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("MEDIUM");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationName, setLocationName] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [queueCount, setQueueCount] = useState(0);

  const checkQueue = () => {
    const queue = JSON.parse(localStorage.getItem("offline_incidents_queue") || "[]");
    setQueueCount(queue.length);
  };

  useEffect(() => {
    // Initial check
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOnline(navigator.onLine);
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    const handleOnline = () => setIsOnline(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    checkQueue();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        (error) => {
          console.warn("Geolocation denied, using fallback", error);
          setLatitude("25.275");
          setLongitude("91.731");
          setLocationName("Sohra/East Khasi Hills (Demo)");
        }
      );
    } else {
      setLatitude("25.275");
      setLongitude("91.731");
      setLocationName("Sohra/East Khasi Hills (Demo)");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      type,
      description,
      severity,
      latitude: parseFloat(latitude) || 25.275,
      longitude: parseFloat(longitude) || 91.731,
      locationName: locationName || "Field Location",
      status: "UNDER REVIEW",
      imageUrl: imagePreview,
    };

    if (!isOnline) {
      const queue = JSON.parse(localStorage.getItem("offline_incidents_queue") || "[]");
      const fakeId = `INC-OFFLINE-${Math.floor(1000 + Math.random() * 9000)}`;
      queue.push({ ...payload, incidentId: fakeId, timestamp: new Date().toISOString() });
      localStorage.setItem("offline_incidents_queue", JSON.stringify(queue));
      
      setSubmittedId(fakeId);
      checkQueue();
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSubmittedId(data.data.incidentId);
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed. You might be offline.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSync = async () => {
    if (!isOnline) return;
    
    const queue = JSON.parse(localStorage.getItem("offline_incidents_queue") || "[]");
    if (queue.length === 0) return;
    
    let synced = 0;
    for (const item of queue) {
      try {
        const res = await fetch("/api/incidents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        if (res.ok) synced++;
      } catch (err) {
        console.error("Sync error for item:", item, err);
      }
    }
    
    localStorage.removeItem("offline_incidents_queue");
    checkQueue();
    alert(`${synced} reports synchronized successfully.`);
  };

  if (submittedId) {
    return (
      <div className="container max-w-2xl mx-auto p-3 sm:p-4 py-8 sm:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="glass-panel border-green-900/50 text-center py-8 sm:py-12 glow-card">
          <CardContent className="flex flex-col items-center gap-4 sm:gap-5 px-4 sm:px-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
              <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                Report Confirmed
              </h2>
              <p className="text-slate-400 mt-1 sm:mt-2 text-xs sm:text-sm font-mono tracking-tight">Your field observation has been transmitted securely.</p>
            </div>
            
            <div className="bg-slate-950/60 p-4 sm:p-5 rounded-xl w-full max-w-sm mt-2 sm:mt-4 text-left border border-slate-800 backdrop-blur-md">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] sm:text-xs text-slate-500 font-mono">TRACKING ID</span>
                <span className="text-xs sm:text-sm font-mono font-bold text-cyan-400">{submittedId}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] sm:text-xs text-slate-500 font-mono">STATUS</span>
                <Badge className="bg-amber-950/50 text-amber-400 border-amber-800 text-[10px] sm:text-xs">UNDER REVIEW</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] sm:text-xs text-slate-500 font-mono">LOCATION</span>
                <span className="text-[10px] sm:text-xs font-mono text-slate-300">{latitude}, {longitude}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full max-w-sm">
              <Button onClick={() => setSubmittedId(null)} variant="outline" className="flex-1 bg-transparent border-slate-700 hover:bg-slate-800">
                Submit Another
              </Button>
              <Link href="/dashboard" className="flex-1 w-full">
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-900/30 border border-cyan-500">
                  Command Center
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto p-3 sm:p-4 py-6 sm:py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {!isOnline && (
        <div className="glass-panel bg-red-950/40 border border-red-900/50 text-red-200 p-4 rounded-xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-red-900/10">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 bg-red-900/50 rounded-lg shrink-0">
              <WifiOff className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <span className="font-bold tracking-wider text-sm block">OFFLINE MODE ACTIVE</span>
              <span className="text-xs text-red-300/80 font-mono mt-0.5 block">Reports will queue locally and sync when connection restores.</span>
            </div>
          </div>
          {queueCount > 0 && <Badge variant="destructive" className="animate-pulse self-start sm:self-auto shrink-0">{queueCount} Pending</Badge>}
        </div>
      )}
      
      {isOnline && queueCount > 0 && (
        <div className="glass-panel bg-amber-950/40 border border-amber-900/50 text-amber-200 p-4 rounded-xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-amber-900/10">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 bg-amber-900/50 rounded-lg shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <span className="font-bold tracking-wider text-sm block">SYNC REQUIRED</span>
              <span className="text-xs text-amber-300/80 font-mono mt-0.5 block">{queueCount} offline reports waiting to be transmitted.</span>
            </div>
          </div>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md self-start sm:self-auto shrink-0 w-full sm:w-auto" onClick={handleSync}>
            <UploadCloud className="h-4 w-4 mr-2" />
            SYNC NOW
          </Button>
        </div>
      )}

      <Card className="glass-panel glow-card border-slate-700/50 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-slate-800/60 bg-slate-900/40 pb-5 sm:pb-6 px-4 sm:px-6">
          <div className="flex items-start sm:items-center gap-3 mb-1 sm:mb-2">
            <div className="p-2.5 bg-gradient-to-br from-cyan-900 to-blue-900 rounded-lg border border-cyan-800/50 shadow-inner shrink-0 mt-1 sm:mt-0">
              <FilePlus2 className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
            </div>
            <div>
              <CardTitle className="text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 leading-tight">
                Field Incident Report
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm font-mono text-cyan-400/80 mt-1">
                SECURE TELEMETRY SUBMISSION
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit} className="px-2 sm:px-4">
          <CardContent className="space-y-6 sm:space-y-8 pt-5 sm:pt-6 px-2 sm:px-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div className="space-y-2.5">
                <Label htmlFor="type" className="text-xs font-bold text-slate-400 tracking-wider">INCIDENT TYPE</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger id="type" className="bg-slate-950/60 border-slate-700/60 h-11 sm:h-12 focus:ring-cyan-500/50 text-sm">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="glass-panel">
                    <SelectItem value="Ground Crack">Ground Crack</SelectItem>
                    <SelectItem value="Slope Movement">Slope Movement</SelectItem>
                    <SelectItem value="Blocked Road">Blocked Road</SelectItem>
                    <SelectItem value="Rockfall">Rockfall</SelectItem>
                    <SelectItem value="Water Seepage">Water Seepage</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="severity" className="text-xs font-bold text-slate-400 tracking-wider">SEVERITY LEVEL</Label>
                <Select value={severity} onValueChange={setSeverity}>
                  <SelectTrigger id="severity" className="bg-slate-950/60 border-slate-700/60 h-11 sm:h-12 focus:ring-cyan-500/50 text-sm">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent className="glass-panel">
                    <SelectItem value="LOW">LOW (Monitoring Required)</SelectItem>
                    <SelectItem value="MEDIUM">MEDIUM (Partial Blockage)</SelectItem>
                    <SelectItem value="HIGH">HIGH (Dangerous)</SelectItem>
                    <SelectItem value="CRITICAL">CRITICAL (Life Threatening)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="description" className="text-xs font-bold text-slate-400 tracking-wider">OBSERVATION DETAILS</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the incident (e.g., width of crack, impact on traffic)..." 
                rows={4} 
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-slate-950/60 border-slate-700/60 resize-none focus:ring-cyan-500/50 p-3 sm:p-4 text-sm"
              />
            </div>

            {/* Location Block */}
            <div className="border border-slate-700/60 p-4 sm:p-5 rounded-xl bg-slate-900/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4">
                <div>
                  <Label className="text-xs font-bold text-slate-400 tracking-wider">GEOSPATIAL COORDINATES</Label>
                  <p className="text-[10px] font-mono text-slate-500 mt-0.5">Required for risk map plotting</p>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleGetLocation}
                  className="bg-slate-950/80 border-cyan-800/60 text-cyan-400 hover:bg-cyan-950/50 hover:text-cyan-300 font-mono text-xs w-full sm:w-auto"
                >
                  <MapPin className="h-3.5 w-3.5 mr-2" />
                  PING DEVICE GPS
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] text-slate-500 font-mono">LATITUDE (N)</Label>
                  <Input 
                    type="number" 
                    step="any" 
                    placeholder="25.275" 
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    required 
                    className="bg-slate-950/80 border-slate-800 font-mono text-cyan-100 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] text-slate-500 font-mono">LONGITUDE (E)</Label>
                  <Input 
                    type="number" 
                    step="any" 
                    placeholder="91.731" 
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    required 
                    className="bg-slate-950/80 border-slate-800 font-mono text-cyan-100 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-2.5">
              <Label className="text-[11px] sm:text-xs font-bold text-slate-400 tracking-wider flex items-center justify-between">
                <span>VISUAL EVIDENCE <span className="text-slate-600 font-normal ml-1 sm:inline block mt-0.5 sm:mt-0">(Optional)</span></span>
                {imagePreview && (
                  <button 
                    type="button" 
                    className="text-[10px] text-red-400 hover:text-red-300 font-mono hover:underline bg-red-950/30 px-2 py-0.5 rounded" 
                    onClick={() => setImagePreview(null)}
                  >
                    [REMOVE]
                  </button>
                )}
              </Label>
              <Input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id="photo-upload"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setImagePreview(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <label 
                htmlFor="photo-upload" 
                className="group flex items-center justify-center h-32 sm:h-40 border-2 border-dashed border-slate-700/60 bg-slate-950/40 rounded-xl hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all cursor-pointer overflow-hidden relative"
              >
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="flex flex-col items-center text-slate-500 group-hover:text-cyan-400 transition-colors">
                    <div className="p-2 sm:p-3 bg-slate-900 rounded-full mb-2 sm:mb-3 group-hover:bg-cyan-950/50 transition-colors">
                      <Camera className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold tracking-wide text-center">Tap to attach photo</span>
                    <span className="text-[9px] sm:text-[10px] font-mono mt-1 opacity-70">JPEG, PNG up to 10MB</span>
                  </div>
                )}
              </label>
            </div>
            
          </CardContent>

          <CardFooter className="pt-4 sm:pt-6 pb-4 sm:pb-6 px-4 sm:px-6">
            <Button 
              type="submit" 
              className="w-full h-12 sm:h-14 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-[0_0_15px_rgba(8,145,178,0.3)] hover:shadow-[0_0_25px_rgba(8,145,178,0.5)] border border-cyan-400/20 text-white font-black tracking-widest text-xs sm:text-sm transition-all" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "TRANSMITTING..." : "TRANSMIT INCIDENT REPORT"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
