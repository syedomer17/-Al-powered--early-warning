# LANDSLIDEX — PHASE 2: Emergency Command Center, GIS Risk Map & Landing Page

> **Hackathon Goal**: Deliver the visual showcase of the platform — the dark, information-dense disaster management operations dashboard and the full-screen interactive GIS map with Northeast India risk zones.

---

## 📋 Task Checklist

- [x] **2.1 Application Shell & Theme Layout**
  - Dark theme styling with emergency operations aesthetics.
  - Collapsible/persistent navigation sidebar:
    - Dashboard (`/dashboard`)
    - Risk Map (`/map`)
    - Incidents (`/incidents`)
    - Alerts (`/alerts`)
    - Analytics (`/analytics`)
    - AI Assistant (`/assistant`)
    - Settings (`/settings`)
  - Top header with:
    - Platform title: `LANDSLIDEX`
    - Subtitle: `AI-Powered Landslide Early Warning & Response Platform`
    - System status indicator: `● OPERATIONAL`
    - Live simulation badge: `● SIMULATION MODE`
    - Notification icon & Prototype disclaimer badge.

- [x] **2.2 Main Command Center Dashboard (`app/dashboard/page.tsx`)**
  - **KPI Summary Cards (6 Cards)**:
    - `CRITICAL ZONES`: 3
    - `HIGH RISK ZONES`: 12
    - `ACTIVE ALERTS`: 7
    - `REPORTED INCIDENTS`: 47
    - `BLOCKED ROADS`: 8
    - `POPULATION AT RISK`: 12,480
  - **Embedded Mini GIS Map View**:
    - Quick visual of Northeast India hot-zones with click-through to full map.
  - **Weather & Environmental Telemetry Panel**:
    - Current metrics: Rainfall (e.g. 178 mm), Temperature (22°C), Humidity (91%), Wind (18 km/h).
    - Weather-linked risk badge: `HIGH`.
    - Mini Recharts rainfall trend sparkline.
  - **Blocked Road Monitoring Widget**:
    - List of key roads with status badges (e.g., `NH-6` BLOCKED, `NH-10` PARTIAL, `Tawang Road` OPEN).

- [x] **2.3 Full-Screen Interactive GIS Risk Map (`app/map/page.tsx`)**
  - Center coordinates on Northeast India (Lat: 25.5° N, Long: 92.5° E, Zoom: ~7).
  - Map provider: Leaflet with dark OpenStreetMap tiles.
  - Marker / Polygon rendering with risk-level color codes:
    - 🟢 Low Risk (Green)
    - 🟡 Moderate Risk (Yellow/Amber)
    - 🟠 High Risk (Orange)
    - 🔴 Critical Risk (Red with pulsing CSS animation)
  - **Zone Detail Drawer / Popup**:
    - Clicking a zone (e.g., **Sohra**) displays:
      - Name: Sohra
      - District: East Khasi Hills, Meghalaya
      - Rainfall: 210 mm
      - Soil Moisture: 91%
      - Slope: 43°
      - Historical Landslides: 8
      - AI Risk Score: 94%
      - Risk Level: `CRITICAL`
      - Recommended Action: *"Immediate field inspection and preparation of evacuation routes."*
  - Map Layer Toggles:
    - [x] Risk Zones
    - [x] Incident Reports
    - [x] Road Blockages

- [x] **2.4 Public Landing Page (`app/page.tsx`)**
  - Hero section with headline: *"AI-Powered Landslide Early Warning & Response"*.
  - Primary CTA: **Open Command Center** (`/dashboard`).
  - Secondary CTA: **Report an Incident** (`/incidents/report`).
  - 4 Capability Highlights:
    1. AI Risk Prediction
    2. GIS Real-Time Monitoring
    3. Early Warning Alerts
    4. Field Intelligence & Response

---

## 🎨 UI & Design Principles
- **Aesthetic**: Serious government/disaster-management command center. Dark theme (`bg-slate-950`, `bg-slate-900`, `border-slate-800`).
- **Typography**: High readability, monospaced numbers for metrics.
- **Components**: Lucide icons, status pill badges, clean card containers with subtle borders.
- **Labels**: Every simulated metric must have clear attribution (*"Simulated Data / Prototype Engine"*).

---

## ✅ Phase 2 Acceptance Criteria
1. Visiting `/dashboard` renders all 6 KPI cards with live counts matching database seed.
2. Embedded weather widget renders the Recharts rainfall trend sparkline.
3. Visiting `/map` displays the Northeast India map without hydration or rendering errors.
4. Clicking **Sohra** on the map opens the zone detail drawer with 94% risk score and critical warning.
5. The public landing page at `/` links directly to the dashboard and reporting form.
