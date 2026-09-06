import { connectToDatabase, isDbConnected } from "./mongodb";
import { Zone } from "@/models/Zone";
import { Incident } from "@/models/Incident";
import { Alert } from "@/models/Alert";
import { Road } from "@/models/Road";
import { SensorData } from "@/models/SensorData";
import {
  initialZones,
  initialIncidents,
  initialAlerts,
  initialRoads,
  initialSensorLogs,
} from "./seed-data";
import { IZone } from "@/types/zone";
import { IIncident } from "@/types/incident";
import { IAlert } from "@/types/alert";
import { IRoad } from "@/types/road";

// In-memory runtime fallback storage
const memoryStore = {
  zones: [...initialZones],
  incidents: [...initialIncidents],
  alerts: [...initialAlerts],
  roads: [...initialRoads],
  sensors: [...initialSensorLogs],
};

export async function seedDatabase(force: boolean = false) {
  const mongoose = await connectToDatabase();
  if (!mongoose || !isDbConnected()) {
    console.log("[DataService] MongoDB offline. Memory store initialized with seed data.");
    return { success: true, mode: "memory", message: "Loaded into memory store" };
  }

  const zoneCount = await Zone.countDocuments();
  if (zoneCount > 0 && !force) {
    return { success: true, mode: "mongodb", message: `Already seeded (${zoneCount} zones)` };
  }

  // Clear existing collections
  await Promise.all([
    Zone.deleteMany({}),
    Incident.deleteMany({}),
    Alert.deleteMany({}),
    Road.deleteMany({}),
    SensorData.deleteMany({}),
  ]);

  // Insert seed data
  await Promise.all([
    Zone.insertMany(initialZones),
    Incident.insertMany(initialIncidents),
    Alert.insertMany(initialAlerts),
    Road.insertMany(initialRoads),
    SensorData.insertMany(initialSensorLogs),
  ]);

  console.log("[DataService] MongoDB successfully seeded!");
  return {
    success: true,
    mode: "mongodb",
    counts: {
      zones: initialZones.length,
      incidents: initialIncidents.length,
      alerts: initialAlerts.length,
      roads: initialRoads.length,
    },
  };
}

export async function getZones(): Promise<IZone[]> {
  try {
    const mongoose = await connectToDatabase();
    if (mongoose && isDbConnected()) {
      const dbZones = await Zone.find({}).lean();
      if (dbZones.length > 0) {
        return JSON.parse(JSON.stringify(dbZones));
      }
      // Auto-seed if empty
      await seedDatabase();
      const seeded = await Zone.find({}).lean();
      return JSON.parse(JSON.stringify(seeded));
    }
  } catch (err) {
    console.warn("[DataService] Falling back to memory store for zones:", err);
  }
  return memoryStore.zones;
}

export async function getZoneById(id: string): Promise<IZone | null> {
  try {
    const mongoose = await connectToDatabase();
    if (mongoose && isDbConnected()) {
      const zone = await Zone.findById(id).lean();
      if (zone) return JSON.parse(JSON.stringify(zone));
    }
  } catch (err) {
    console.warn("[DataService] Zone lookup fallback:", err);
  }
  return memoryStore.zones.find((z) => z.name.toLowerCase().includes(id.toLowerCase())) || null;
}

export async function getIncidents(): Promise<IIncident[]> {
  try {
    const mongoose = await connectToDatabase();
    if (mongoose && isDbConnected()) {
      const dbIncidents = await Incident.find({}).sort({ createdAt: -1 }).lean();
      if (dbIncidents.length > 0) {
        return JSON.parse(JSON.stringify(dbIncidents));
      }
      await seedDatabase();
      const seeded = await Incident.find({}).sort({ createdAt: -1 }).lean();
      return JSON.parse(JSON.stringify(seeded));
    }
  } catch (err) {
    console.warn("[DataService] Incident fallback:", err);
  }
  return memoryStore.incidents;
}

export async function createIncident(data: Partial<IIncident>): Promise<IIncident> {
  const incidentId =
    data.incidentId || `INC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const newIncident: IIncident = {
    incidentId,
    type: data.type || "Ground Crack",
    description: data.description || "Field report submitted",
    latitude: Number(data.latitude) || 25.27,
    longitude: Number(data.longitude) || 91.73,
    locationName: data.locationName || "Northeast Region",
    severity: data.severity || "HIGH",
    status: data.status || "UNDER REVIEW",
    imageUrl: data.imageUrl,
    reporter: data.reporter || "Citizen / Field Observer",
    createdAt: new Date().toISOString(),
  };

  try {
    const mongoose = await connectToDatabase();
    if (mongoose && isDbConnected()) {
      const created = await Incident.create(newIncident);
      return JSON.parse(JSON.stringify(created));
    }
  } catch (err) {
    console.warn("[DataService] Error writing incident to DB, saving to memory:", err);
  }

  memoryStore.incidents.unshift(newIncident);
  return newIncident;
}

export async function updateIncidentStatus(
  incidentId: string,
  status: IIncident["status"]
): Promise<IIncident | null> {
  try {
    const mongoose = await connectToDatabase();
    if (mongoose && isDbConnected()) {
      const updated = await Incident.findOneAndUpdate(
        { $or: [{ incidentId }, { _id: incidentId }] },
        { status },
        { new: true }
      ).lean();
      if (updated) return JSON.parse(JSON.stringify(updated));
    }
  } catch (err) {
    console.warn("[DataService] Incident update fallback:", err);
  }

  const idx = memoryStore.incidents.findIndex(
    (inc) => inc.incidentId === incidentId || (inc._id && inc._id === incidentId)
  );
  if (idx !== -1) {
    memoryStore.incidents[idx].status = status;
    return memoryStore.incidents[idx];
  }
  return null;
}

export async function getAlerts(): Promise<IAlert[]> {
  try {
    const mongoose = await connectToDatabase();
    if (mongoose && isDbConnected()) {
      const dbAlerts = await Alert.find({}).sort({ createdAt: -1 }).lean();
      if (dbAlerts.length > 0) {
        return JSON.parse(JSON.stringify(dbAlerts));
      }
      await seedDatabase();
      const seeded = await Alert.find({}).sort({ createdAt: -1 }).lean();
      return JSON.parse(JSON.stringify(seeded));
    }
  } catch (err) {
    console.warn("[DataService] Alert fallback:", err);
  }
  return memoryStore.alerts;
}

export async function createAlert(data: Partial<IAlert>): Promise<IAlert> {
  const newAlert: IAlert = {
    zoneName: data.zoneName || "Northeast Region",
    level: data.level || "CRITICAL",
    message: data.message || "Landslide risk warning",
    riskScore: data.riskScore || 90,
    recommendedAction:
      data.recommendedAction || "Immediate field inspection and preparation of evacuation routes.",
    status: data.status || "ACTIVE",
    createdAt: new Date().toISOString(),
  };

  try {
    const mongoose = await connectToDatabase();
    if (mongoose && isDbConnected()) {
      const created = await Alert.create(newAlert);
      return JSON.parse(JSON.stringify(created));
    }
  } catch (err) {
    console.warn("[DataService] Alert creation fallback:", err);
  }

  memoryStore.alerts.unshift(newAlert);
  return newAlert;
}

export async function updateAlertStatus(
  id: string,
  status: IAlert["status"]
): Promise<IAlert | null> {
  try {
    const mongoose = await connectToDatabase();
    if (mongoose && isDbConnected()) {
      const updated = await Alert.findByIdAndUpdate(id, { status }, { new: true }).lean();
      if (updated) return JSON.parse(JSON.stringify(updated));
    }
  } catch (err) {
    console.warn("[DataService] Alert update fallback:", err);
  }

  const idx = memoryStore.alerts.findIndex(
    (a) => a._id === id || a.zoneName.toLowerCase().includes(id.toLowerCase())
  );
  if (idx !== -1) {
    memoryStore.alerts[idx].status = status;
    return memoryStore.alerts[idx];
  }
  return null;
}

export async function getRoads(): Promise<IRoad[]> {
  try {
    const mongoose = await connectToDatabase();
    if (mongoose && isDbConnected()) {
      const dbRoads = await Road.find({}).sort({ priorityRank: 1 }).lean();
      if (dbRoads.length > 0) {
        return JSON.parse(JSON.stringify(dbRoads));
      }
      await seedDatabase();
      const seeded = await Road.find({}).sort({ priorityRank: 1 }).lean();
      return JSON.parse(JSON.stringify(seeded));
    }
  } catch (err) {
    console.warn("[DataService] Road fallback:", err);
  }
  return memoryStore.roads;
}

export async function getSensors() {
  try {
    const mongoose = await connectToDatabase();
    if (mongoose && isDbConnected()) {
      const dbSensors = await SensorData.find({}).sort({ recordedAt: -1 }).limit(10).lean();
      if (dbSensors.length > 0) {
        return JSON.parse(JSON.stringify(dbSensors));
      }
    }
  } catch (err) {
    console.warn("[DataService] Sensor fallback:", err);
  }
  return memoryStore.sensors;
}
