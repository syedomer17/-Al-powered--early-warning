# MASTER PROMPT — LANDSLIDEX

You are a senior full-stack engineer, system architect, UI/UX engineer, and hackathon technical lead.

Build a complete, polished, working prototype called:

# LANDSLIDEX

### AI-Powered Landslide Early Warning & Disaster Response Platform

This is a college internal hackathon prototype that must be demonstrable tomorrow.

The goal is NOT to build a production-scale disaster management system.

The goal is to build a highly convincing working prototype demonstrating this complete flow:

> Environmental Data → Risk Analysis → GIS Visualization → Early Warning → Citizen/Field Report → Emergency Prioritization

The prototype must look like a serious disaster-management command center rather than a generic college project.

---

# 1. CORE PROBLEM

The platform is designed to monitor landslide-prone areas across India's North Eastern Region.

It should conceptually collect and analyze:

* Rainfall patterns
* Soil moisture
* Terrain/slope information
* Historical landslide records
* Satellite imagery
* Citizen/field reports

The system should calculate landslide risk, visualize vulnerable areas on a GIS map, generate alerts, accept geo-tagged field reports, and prioritize emergency response.

For this prototype, external sensor/API/satellite integrations should be SIMULATED.

DO NOT pretend simulated data is real.

Clearly indicate:

> Prototype / Simulated Data

where appropriate.

The architecture must be designed so real APIs and sensors can be integrated later.

---

# 2. TECHNOLOGY STACK

Use ONLY the following primary stack unless absolutely necessary:

Frontend:

* Next.js
* TypeScript
* React
* Tailwind CSS
* shadcn/ui

Backend:

* Next.js Route Handlers / API routes

Database:

* MongoDB
* Mongoose

Maps:

* MapLibre GL JS OR Leaflet
* OpenStreetMap tiles

Charts:

* Recharts

Icons:

* Lucide React

AI Assistant:

* LLM API integration through a server-side API route
* If no API key exists, provide a deterministic demo/fallback assistant so the application still works

Authentication:

* NOT required for the MVP

Deployment target:

* Vercel
* MongoDB Atlas

---

# 3. IMPORTANT DEVELOPMENT RULES

DO NOT:

* Build microservices
* Build Kubernetes infrastructure
* Build Kafka
* Build Redis
* Build a native mobile application
* Build actual satellite image processing
* Build actual IoT hardware integrations
* Build a complex deep-learning model
* Build complicated authentication
* Build unnecessary enterprise infrastructure
* Over-engineer the project
* Create dozens of unnecessary files
* Add features not requested here

This is a hackathon prototype.

Prioritize:

1. Working functionality
2. Professional UI
3. GIS visualization
4. Risk calculation
5. Incident reporting
6. Alerts
7. Emergency prioritization
8. Demo reliability

---

# 4. APPLICATION STRUCTURE

Create these primary pages:

/                  → Landing page / project overview

/dashboard          → Main disaster command center

/map                → Full-screen GIS risk map

/incidents          → Incident management

/incidents/report   → Citizen / field official report form

/alerts             → Active alerts

/analytics          → Risk analytics and trends

/assistant          → AI Disaster Intelligence Assistant

/settings           → Basic prototype settings

---

# 5. MAIN DASHBOARD

The dashboard is the most important screen.

It should look like a professional emergency operations center.

Use a dark, modern, information-dense design.

Avoid excessive gradients and flashy animations.

The dashboard should contain:

## Header

Show:

LANDSLIDEX

Subtitle:

AI-Powered Landslide Early Warning & Response Platform

Right side:

* System status
* Live simulation toggle
* Notification icon
* User/Admin indicator

Example:

SYSTEM STATUS
● OPERATIONAL

LIVE SIMULATION
● ON

---

# 6. KPI CARDS

Create cards for:

* Critical Zones
* High Risk Zones
* Moderate Risk Zones
* Active Alerts
* Reported Incidents
* Blocked Roads
* Population at Risk

Example:

CRITICAL ZONES
3

HIGH RISK
12

ACTIVE ALERTS
7

INCIDENTS
47

BLOCKED ROADS
8

POPULATION AT RISK
12,480

---

# 7. GIS RISK MAP

The GIS map must be one of the primary components of the dashboard.

Display Northeast India locations using markers or polygons.

Use risk levels:

LOW
MODERATE
HIGH
CRITICAL

Do not hard-code the entire UI.

Load zones from MongoDB/API.

Each zone should have:

* name
* district
* state
* latitude
* longitude
* rainfall
* soil moisture
* slope
* historical event count
* risk score
* risk level

Clicking a zone must open a popup/detail panel.

Example:

Shillong Hills

District:
East Khasi Hills

Rainfall:
178 mm

Soil Moisture:
82%

Slope:
41°

Historical Landslides:
6

AI Risk Score:
87%

Risk:
CRITICAL

Recommended Action:
Immediate field inspection and preparation of evacuation routes.

---

# 8. NORTHEASTERN REGION DEMO DATA

Create realistic simulated zones.

Include locations such as:

MEGHALAYA:

* Shillong
* Sohra
* Mawsynram
* Nongpoh

SIKKIM:

* Gangtok
* Mangan
* Namchi

ASSAM:

* Guwahati
* Dima Hasao

ARUNACHAL PRADESH:

* Itanagar
* Tawang
* Bomdila

NAGALAND:

* Kohima
* Dimapur

MANIPUR:

* Imphal
* Senapati

MIZORAM:

* Aizawl
* Lunglei

TRIPURA:

* Agartala

Create approximately 20–30 simulated zones.

Do not use generic names like:

Zone 1
Zone 2
Zone 3

Use real geographical names.

---

# 9. RISK ENGINE

Create:

lib/risk-engine.ts

Implement a transparent prototype risk scoring algorithm.

Input:

```typescript
type RiskInput = {
  rainfall: number;
  soilMoisture: number;
  slope: number;
  historicalRisk: number;
};
```

Calculate:

```text
Risk Score =
Rainfall × 0.35
+
Soil Moisture × 0.25
+
Slope × 0.20
+
Historical Risk × 0.20
```

All inputs should be normalized to 0–100.

Risk classification:

0–30:
LOW

31–50:
MODERATE

51–70:
HIGH

71–100:
CRITICAL

Return:

```typescript
{
  score: number,
  level: "LOW" | "MODERATE" | "HIGH" | "CRITICAL"
}
```

IMPORTANT:

Do NOT falsely claim this is a trained ML model.

In the UI explain:

> Prototype Risk Engine

and:

> The prototype uses a weighted risk model combining environmental and historical factors. The architecture can later be replaced with a trained ML model such as Random Forest, XGBoost, or LSTM.

---

# 10. SIMULATED REAL-TIME MODE

Implement a LIVE SIMULATION toggle.

When enabled, simulated sensor values should periodically change.

For example:

Rainfall:
178 → 181 → 187 → 195

Soil Moisture:
82 → 83 → 85 → 87

Risk:
87 → 88 → 90 → 93

Use a reasonable interval such as 5–10 seconds for the demo.

When risk crosses an important threshold:

Generate an alert.

Example:

CRITICAL ALERT

Landslide risk in Sohra increased to 93%.

Recommended Action:
Immediate field inspection.

Clearly display:

SIMULATION MODE

Do not claim the values are real.

---

# 11. WEATHER PANEL

Create a weather card showing:

* Rainfall
* Temperature
* Humidity
* Wind speed
* Forecast risk

Example:

CURRENT WEATHER

Rainfall:
178 mm

Temperature:
22°C

Humidity:
91%

Wind:
18 km/h

Weather-linked risk:
HIGH

Show a small rainfall trend chart using Recharts.

Use simulated data.

---

# 12. FIELD INCIDENT REPORTING

Create:

/incidents/report

The form should contain:

Incident Type:

* Ground Crack
* Slope Movement
* Blocked Road
* Rockfall
* Water Seepage
* Other

Description

Severity:

* LOW
* MEDIUM
* HIGH
* CRITICAL

Photo upload

Location:

* latitude
* longitude

Provide a button:

USE CURRENT LOCATION

Use browser geolocation API if available.

If unavailable, provide demo coordinates.

After submission:

Store the incident in MongoDB.

Show:

REPORT SUBMITTED

Incident ID:
INC-2026-XXXXX

Location:
latitude / longitude

Status:
UNDER REVIEW

---

# 13. INCIDENT MANAGEMENT

Create:

/incidents

Display incidents in a professional table/card interface.

Columns:

* Incident ID
* Type
* Location
* Severity
* Reporter
* Status
* Created
* Actions

Status options:

UNDER REVIEW
VERIFIED
DISPATCHED
RESOLVED

Allow changing status.

Incident locations should also appear on the GIS map.

---

# 14. ALERT SYSTEM

Create:

/alerts

Show active alerts.

Each alert should contain:

* Alert level
* Zone
* Risk score
* Message
* Timestamp
* Recommended action
* Status

Alert levels:

INFO
WARNING
HIGH
CRITICAL

Example:

CRITICAL

Sohra

Risk Score:
94%

Message:

High probability of landslide detected due to increasing rainfall and soil moisture.

Recommended Action:

Inspect vulnerable slopes and prepare evacuation routes.

Provide buttons:

ACKNOWLEDGE
DISPATCH TEAM
VIEW ON MAP

---

# 15. EMERGENCY RESPONSE PRIORITIZATION

This is a major differentiating feature.

Create a dashboard section:

EMERGENCY RESPONSE PRIORITY

Rank incidents/zones using factors such as:

* Risk score
* Population affected
* Road accessibility
* Incident severity
* Infrastructure importance

Example:

#1
NH-6 Road Blockage

Risk:
94

Population affected:
2,840

Ambulance access:
BLOCKED

Priority:
CRITICAL

Action:
DISPATCH TEAM

---

# 16. BLOCKED ROAD MONITORING

Create a small road-status module.

Show:

Road
Status
Risk
Affected Population

Examples:

NH-6
BLOCKED
94%
2,840

NH-10
PARTIAL
81%
1,240

Tawang Road
OPEN
42%
540

Use simulated data.

Clicking a road should highlight its location on the map.

---

# 17. AI DISASTER INTELLIGENCE ASSISTANT

Create an AI assistant focused specifically on disaster intelligence.

Do NOT make it a generic chatbot.

It should answer questions based on application data.

Examples:

"Which area is most dangerous?"

"Which zones are critical?"

"Why is Sohra high risk?"

"Which roads are blocked?"

"Which villages need priority?"

"What changed in the last hour?"

"Show critical incidents."

"What should the response team do first?"

The assistant should query the backend and use MongoDB data where possible.

Architecture:

Frontend
↓
/api/assistant
↓
MongoDB data
↓
LLM API
↓
Response

If no LLM API key is configured:

Use deterministic fallback responses generated from MongoDB data.

The application MUST still work without an AI API key.

---

# 18. ANALYTICS PAGE

Create:

/analytics

Show:

* Risk distribution
* Rainfall vs risk
* Soil moisture vs risk
* Historical landslides
* Incidents over time
* Critical zones
* Risk trends

Use Recharts.

Charts:

1. Risk distribution bar chart
2. Rainfall trend line chart
3. Soil moisture trend
4. Incident trend
5. Risk score distribution

---

# 19. MULTILINGUAL SUPPORT

Implement a basic language selector.

Languages:

English
Hindi
Assamese

Do NOT build a complex internationalization system unless necessary.

A simple translation dictionary is sufficient for the prototype.

Translate key UI elements and warning messages.

Example:

English:
HIGH LANDSLIDE RISK

Hindi:
भूस्खलन का उच्च जोखिम

Assamese:
ভূমিস্খলনৰ উচ্চ আশংকা

---

# 20. OFFLINE MODE DEMONSTRATION

Implement a lightweight prototype offline mechanism.

Use:

localStorage or IndexedDB

When offline:

Show:

OFFLINE MODE

No Internet Connection

Reports created while offline should be placed into a local queue.

Example:

3 reports waiting for synchronization.

When the connection returns:

SYNC REPORTS

Then send queued reports to the API.

Show:

3 reports synchronized successfully.

Do not build a complicated distributed offline system.

---

# 21. MONGODB MODELS

Create these Mongoose models.

## Zone

```typescript
{
  name: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  rainfall: number;
  soilMoisture: number;
  slope: number;
  historicalEvents: number;
  historicalRisk: number;
  riskScore: number;
  riskLevel: string;
}
```

## Incident

```typescript
{
  incidentId: string;
  type: string;
  description: string;
  latitude: number;
  longitude: number;
  severity: string;
  imageUrl?: string;
  status: string;
  createdAt: Date;
}
```

## Alert

```typescript
{
  zoneId: string;
  level: string;
  message: string;
  riskScore: number;
  recommendedAction: string;
  status: string;
  createdAt: Date;
}
```

## SensorData

```typescript
{
  zoneId: string;
  rainfall: number;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  recordedAt: Date;
}
```

---

# 22. API ROUTES

Implement:

GET
/api/zones

GET
/api/zones/[id]

GET
/api/incidents

POST
/api/incidents

PATCH
/api/incidents/[id]

GET
/api/alerts

POST
/api/alerts

PATCH
/api/alerts/[id]

GET
/api/sensors

POST
/api/simulation

POST
/api/assistant

GET
/api/analytics

Keep API responses consistent.

Handle errors properly.

---

# 23. DATABASE SEEDING

Create a seed script.

Command:

npm run seed

It should insert:

* 20–30 zones
* Sensor data
* 15+ incidents
* 8+ alerts
* Road status data

Ensure the dataset produces:

* Low risk
* Moderate risk
* High risk
* Critical risk

Do NOT use completely random values.

The data should look realistic and internally consistent.

---

# 24. UI DESIGN

Design language:

Professional
Emergency operations center
Modern
Dark theme
High information density
Readable
Responsive

Primary layout:

Sidebar
+
Top navigation
+
Main dashboard

Sidebar:

Dashboard
Risk Map
Incidents
Alerts
Analytics
AI Assistant
Settings

Use Lucide icons.

Use cards sparingly.

Use status badges.

Use charts.

Use tables.

Use clear risk indicators.

Avoid:

* Excessive rounded cards
* Huge hero sections inside dashboard
* Unnecessary gradients
* Excessive animations
* Emoji-heavy UI
* Fake AI decorations

The application should look like software that a government disaster management authority could realistically use.

---

# 25. RESPONSIVENESS

Desktop is the primary target.

Also support:

* Tablet
* Mobile

The field reporting page must work well on mobile.

---

# 26. LANDING PAGE

Create a simple professional landing page.

Headline:

AI-Powered Landslide Early Warning & Response

Subtitle:

Monitor environmental conditions, identify high-risk zones, receive early warnings, and coordinate emergency response across vulnerable regions.

CTA:

Open Command Center

Secondary:

Report an Incident

Include four capability blocks:

AI Risk Prediction
GIS Monitoring
Real-Time Alerts
Field Intelligence

Do not overbuild the landing page.

---

# 27. DEMO DATA LABELING

Whenever simulated data is shown, make it clear.

Use:

SIMULATION MODE

or:

PROTOTYPE DATA

Do not make false claims about live IMD, satellite, or sensor connectivity.

---

# 28. FUTURE INTEGRATION ARCHITECTURE

Add a section in the README explaining that the prototype can later integrate:

* IMD weather APIs
* IoT soil moisture sensors
* Satellite imagery
* Digital Elevation Models
* Historical landslide datasets
* SMS gateways
* Push notifications
* Government disaster-management systems

But DO NOT implement these integrations now unless a free/demo API can be integrated reliably without delaying the core prototype.

---

# 29. SECURITY

Even though authentication is not required:

* Validate API input
* Sanitize MongoDB queries
* Never expose MongoDB credentials
* Store secrets in .env.local
* Never put API keys in client-side code
* Add basic request validation
* Do not trust client-provided risk scores
* Calculate risk on the server

Environment variables:

MONGODB_URI=
AI_API_KEY=

---

# 30. ERROR HANDLING

The app should gracefully handle:

* MongoDB unavailable
* Empty database
* API failure
* Location permission denied
* Offline state
* Missing AI API key
* Invalid form submission

Never show raw stack traces to the user.

---

# 31. LOADING STATES

Implement loading states for:

* Dashboard
* Map
* Incidents
* Alerts
* Analytics
* AI assistant

Use skeleton loaders where appropriate.

---

# 32. EMPTY STATES

Create useful empty states.

Example:

NO ACTIVE ALERTS

All monitored zones are currently below the critical threshold.

---

# 33. PROJECT STRUCTURE

Use a clean architecture similar to:

```text
landslidex/
│
├── app/
│   ├── page.tsx
│   ├── dashboard/
│   ├── map/
│   ├── incidents/
│   │   └── report/
│   ├── alerts/
│   ├── analytics/
│   ├── assistant/
│   ├── settings/
│   │
│   └── api/
│       ├── zones/
│       ├── incidents/
│       ├── alerts/
│       ├── sensors/
│       ├── simulation/
│       ├── analytics/
│       └── assistant/
│
├── components/
│   ├── dashboard/
│   ├── map/
│   ├── incidents/
│   ├── alerts/
│   ├── analytics/
│   ├── assistant/
│   └── ui/
│
├── lib/
│   ├── mongodb.ts
│   ├── risk-engine.ts
│   ├── priority-engine.ts
│   ├── simulation.ts
│   └── utils.ts
│
├── models/
│   ├── Zone.ts
│   ├── Incident.ts
│   ├── Alert.ts
│   └── SensorData.ts
│
├── types/
│   ├── zone.ts
│   ├── incident.ts
│   ├── alert.ts
│   └── risk.ts
│
├── scripts/
│   └── seed.ts
│
├── public/
│
├── .env.example
├── README.md
├── package.json
└── tsconfig.json
```

Adjust the structure if Next.js conventions require it, but keep the architecture clean.

---

# 34. DEMO FLOW

The application MUST support this exact demonstration:

STEP 1

Open Dashboard.

Show:

3 Critical Zones
12 High Risk Zones
7 Active Alerts
47 Incidents

STEP 2

Open GIS map.

Click Sohra.

Show:

Rainfall: 210mm
Soil Moisture: 91%
Slope: 43°
Historical Events: 8
Risk Score: 94%
Risk Level: CRITICAL

STEP 3

Enable LIVE SIMULATION.

Show rainfall increasing.

Risk increases.

STEP 4

Generate a critical alert.

Show:

CRITICAL LANDSLIDE WARNING

STEP 5

Open Field Reporting.

Submit a Ground Crack report.

Use browser geolocation if possible.

STEP 6

Return to dashboard.

Show the new incident on the map.

STEP 7

Open Emergency Response Priority.

Show:

NH-6 blockage as Priority #1.

STEP 8

Open AI Assistant.

Ask:

"Which area needs immediate attention?"

Assistant should answer using current application data.

This entire flow must work reliably.

---

# 35. README

Create a professional README containing:

Project overview

Problem statement

Solution

Features

Architecture

Tech stack

Risk methodology

Database schema

API documentation

Local setup

Environment variables

Seeding database

Running the project

Demo instructions

Future improvements

Limitations

Important note:

The current prototype uses simulated environmental/sensor data.

---

# 36. DEVELOPMENT PROCESS

Do NOT generate everything blindly in one huge implementation.

Work in this order:

PHASE 1
Initialize Next.js project and dependencies.

PHASE 2
Create MongoDB connection and models.

PHASE 3
Create seed data.

PHASE 4
Implement risk engine.

PHASE 5
Implement API routes.

PHASE 6
Build dashboard.

PHASE 7
Build GIS map.

PHASE 8
Build incidents.

PHASE 9
Build alerts.

PHASE 10
Build emergency prioritization.

PHASE 11
Build AI assistant.

PHASE 12
Build simulation mode.

PHASE 13
Add offline demonstration.

PHASE 14
Add multilingual UI.

PHASE 15
Polish UI.

PHASE 16
Run tests and fix errors.

---

# 37. QUALITY REQUIREMENTS

Before considering the project complete:

Run:

npm run lint

npm run build

Fix ALL TypeScript errors.

Fix ALL ESLint errors.

Make sure:

* Pages load
* MongoDB connection works
* Seed script works
* API routes work
* Map renders
* Incident submission works
* Alerts render
* Risk engine works
* Simulation works
* AI fallback works
* Responsive UI works

Do not leave TODO placeholders in the main functionality.

---

# 38. FINAL HACKATHON STANDARD

The final prototype should communicate this idea:

> "We are not simply predicting landslides. We are building a disaster intelligence platform that converts environmental signals and field observations into risk awareness, early warnings, and prioritized emergency action."

The prototype must feel like a coherent product.

Every major screen should connect to the same underlying data.

The GIS map, dashboard, incidents, alerts, analytics, and AI assistant should NOT feel like separate demos.

They must use shared MongoDB-backed data.

Prioritize reliability over unnecessary complexity.

If a requested feature cannot be implemented robustly within the prototype constraints, implement a clean simulation/mock version and clearly label it as simulated rather than building a broken half-integration.

Now start implementing the project from Phase 1.

After each major phase, verify that the application still builds successfully before moving to the next phase.
