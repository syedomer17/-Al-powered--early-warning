# LANDSLIDEX — PHASE 1: Foundation, Data Models, Engines & API Layer

> **Hackathon Goal**: Build the shared database, Mongoose models, risk & priority computing engines, realistic Northeast India seed data, and REST API routes so that every screen in subsequent phases connects to real, unified data.

---

## 📋 Task Checklist

- [x] **1.1 Project Setup & Dependencies**
  - Install dependencies: `mongoose`, `leaflet`, `@types/leaflet`, `recharts`, `lucide-react`, `clsx`, `tailwind-merge`.
  - Configure `.env.local` with `MONGODB_URI` and optional `AI_API_KEY`.
  - Create database connection singleton in `lib/mongodb.ts`.

- [x] **1.2 Mongoose Data Models (`models/`)**
  - `models/Zone.ts`: Monitored geographical zone with risk parameters.
  - `models/Incident.ts`: Field/citizen incident reports.
  - `models/Alert.ts`: Automated early warning alerts.
  - `models/SensorData.ts`: Telemetry logs (rainfall, soil moisture, temperature).
  - `models/Road.ts`: Critical transportation routes and blockage statuses.

- [x] **1.3 Computing Engines (`lib/`)**
  - `lib/risk-engine.ts`: Core transparent risk formula.
  - `lib/priority-engine.ts`: Emergency response triage ranking algorithm.

- [x] **1.4 Realistic Northeast India Seed Script (`scripts/seed.ts`)**
  - Populate 20–30 real Northeast India locations (Sohra, Shillong, Gangtok, Mangan, Guwahati, Kohima, Tawang, etc.).
  - Populate 15+ incidents, 8+ alerts, and key road statuses (`NH-6`, `NH-10`, `Tawang Road`).
  - Add npm script: `"seed": "tsx scripts/seed.ts"` (or node runner).

- [x] **1.5 API Route Handlers (`app/api/`)**
  - `GET /api/zones` & `GET /api/zones/[id]`
  - `GET /api/incidents`, `POST /api/incidents`, `PATCH /api/incidents/[id]`
  - `GET /api/alerts`, `POST /api/alerts`, `PATCH /api/alerts/[id]`
  - `GET /api/sensors`
  - `GET /api/roads`

---

## 🛠️ Technical Specifications

### 1. Risk Engine (`lib/risk-engine.ts`)
```typescript
export interface RiskInput {
  rainfall: number;      // normalized 0–100
  soilMoisture: number;  // normalized 0–100
  slope: number;         // normalized 0–100
  historicalRisk: number;// normalized 0–100
}

export interface RiskResult {
  score: number;
  level: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
}

export function calculateRisk(input: RiskInput): RiskResult {
  const score = Math.round(
    input.rainfall * 0.35 +
    input.soilMoisture * 0.25 +
    input.slope * 0.20 +
    input.historicalRisk * 0.20
  );

  let level: RiskResult["level"] = "LOW";
  if (score > 70) level = "CRITICAL";
  else if (score > 50) level = "HIGH";
  else if (score > 30) level = "MODERATE";

  return { score, level };
}
```

### 2. Mongoose Models Schema Outline

#### `models/Zone.ts`
- `name`: String (e.g., "Sohra", "Shillong Hills", "Gangtok Ridge")
- `district`: String (e.g., "East Khasi Hills")
- `state`: String (e.g., "Meghalaya")
- `latitude`: Number
- `longitude`: Number
- `rainfall`: Number (mm)
- `soilMoisture`: Number (%)
- `slope`: Number (degrees)
- `historicalEvents`: Number
- `historicalRisk`: Number (0–100)
- `riskScore`: Number (0–100)
- `riskLevel`: String ("LOW" | "MODERATE" | "HIGH" | "CRITICAL")
- `recommendedAction`: String

#### `models/Incident.ts`
- `incidentId`: String (unique, format: `INC-2026-XXXXX`)
- `type`: String ("Ground Crack" | "Slope Movement" | "Blocked Road" | "Rockfall" | "Water Seepage" | "Other")
- `description`: String
- `latitude`: Number
- `longitude`: Number
- `severity`: String ("LOW" | "MEDIUM" | "HIGH" | "CRITICAL")
- `imageUrl`: String (optional)
- `status`: String ("UNDER REVIEW" | "VERIFIED" | "DISPATCHED" | "RESOLVED")
- `createdAt`: Date

#### `models/Alert.ts`
- `zoneId`: ObjectId ref to Zone
- `zoneName`: String
- `level`: String ("INFO" | "WARNING" | "HIGH" | "CRITICAL")
- `message`: String
- `riskScore`: Number
- `recommendedAction`: String
- `status`: String ("ACTIVE" | "ACKNOWLEDGED" | "RESOLVED")
- `createdAt`: Date

#### `models/Road.ts`
- `name`: String (e.g., "NH-6", "NH-10", "Tawang Road")
- `status`: String ("OPEN" | "PARTIAL" | "BLOCKED")
- `riskScore`: Number
- `affectedPopulation`: Number
- `ambulanceAccess`: String ("OPEN" | "RESTRICTED" | "BLOCKED")
- `coordinates`: [Number, Number]

---

## 🎯 Target Seed Data Baseline (For Hackathon Demo)
The database seed MUST establish these exact counts:
- **3 Critical Zones** (e.g., Sohra, Mangan, Dima Hasao)
- **12 High Risk Zones**
- **7 Active Alerts**
- **47 Incident Reports**
- **Blocked Roads** (NH-6 blocked with 2,840 affected population)

---

## ✅ Phase 1 Acceptance Criteria
1. `npm run seed` executes cleanly and inserts all mock locations, alerts, and incidents.
2. Visiting `http://localhost:3000/api/zones` returns the populated zones with calculated risk scores.
3. Submitting a test `POST /api/incidents` stores a new incident and returns a generated `INC-2026-XXXX` ID.
4. All TypeScript types compile without errors.
