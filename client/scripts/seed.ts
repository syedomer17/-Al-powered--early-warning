import { connectToDatabase } from "../lib/mongodb";
import { Zone } from "../models/Zone";
import { Incident } from "../models/Incident";
import { Alert } from "../models/Alert";
import { Road } from "../models/Road";
import { SensorData } from "../models/SensorData";
import {
  initialZones,
  initialIncidents,
  initialAlerts,
  initialRoads,
  initialSensorLogs,
} from "../lib/seed-data";

async function runSeed() {
  console.log("=========================================");
  console.log("🌱 LANDSLIDEX DATABASE SEEDING PROCESS");
  console.log("=========================================");

  try {
    const mongoose = await connectToDatabase();
    if (!mongoose) {
      console.warn("⚠️ Could not establish connection to MongoDB. Check MONGODB_URI in .env.local.");
      process.exit(0);
    }

    console.log("🧹 Clearing existing collections...");
    await Promise.all([
      Zone.deleteMany({}),
      Incident.deleteMany({}),
      Alert.deleteMany({}),
      Road.deleteMany({}),
      SensorData.deleteMany({}),
    ]);

    console.log("📥 Inserting seed datasets...");
    await Promise.all([
      Zone.insertMany(initialZones),
      Incident.insertMany(initialIncidents),
      Alert.insertMany(initialAlerts),
      Road.insertMany(initialRoads),
      SensorData.insertMany(initialSensorLogs),
    ]);

    console.log("✅ Seed completed successfully!");
    console.log(`- Monitored Zones: ${initialZones.length} (3 Critical, 12 High, 7 Moderate/Low)`);
    console.log(`- Reported Incidents: ${initialIncidents.length}`);
    console.log(`- Active Alerts: ${initialAlerts.length}`);
    console.log(`- Monitored Roads: ${initialRoads.length} (Priority #1: NH-6)`);
    console.log("=========================================");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during database seeding:", error);
    process.exit(1);
  }
}

runSeed();
