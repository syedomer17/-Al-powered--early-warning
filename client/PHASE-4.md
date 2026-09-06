# LANDSLIDEX — PHASE 4: AI Disaster Intelligence, Live Simulation, Analytics & Demo Delivery

> **Hackathon Goal**: Implement the high-impact differentiating features (AI intelligence assistant, live simulation mode, analytics charts, and multilingual support), followed by full build verification and rehearsal of the official demo flow.

---

## 📋 Task Checklist

- [ ] **4.1 AI Disaster Intelligence Assistant (`app/assistant/page.tsx` & `app/api/assistant/route.ts`)**
  - Dedicated disaster response terminal / chat interface.
  - Domain-specific knowledge injection (system prompt passes current critical zones, blocked roads, and recent alerts).
  - **Dual-Mode AI Engine**:
    - **Mode A (Online LLM)**: If `AI_API_KEY` is configured, streams/calls LLM with live disaster context.
    - **Mode B (Deterministic Fallback)**: If no key is set or external API fails, queries MongoDB directly and returns structured answers to core queries:
      - *"Which area is most dangerous?"* → Returns highest-risk zone (e.g. Sohra at 94% risk) with breakdown.
      - *"Why is Sohra high risk?"* → Details 210mm rainfall, 91% soil moisture, 43° slope, and 8 historical events.
      - *"Which roads are blocked?"* → Returns NH-6 (2,840 affected, ambulance blocked) and NH-10 (partial).
      - *"What should the response team do first?"* → Advises immediate team dispatch to NH-6 clearing and Sohra inspection.
  - Pre-populated prompt suggestion chips for fast hackathon judging demos.

- [ ] **4.2 Live Simulation Engine (`app/api/simulation/route.ts` & UI Hook)**
  - Top navigation toggle: `LIVE SIMULATION [ON / OFF]`.
  - Background ticker (5–8s intervals) simulating severe monsoon telemetry changes:
    - Example (Sohra): Rainfall increases `178 → 187 → 202 → 210 mm`.
    - Soil moisture saturates `82% → 85% → 89% → 91%`.
    - Recalculates risk: `87% → 90% → 94% (CRITICAL)`.
  - Threshold alert trigger: Crossing 90% automatically generates an emergency critical toast alert:
    - *"🚨 CRITICAL LANDSLIDE WARNING: Landslide risk in Sohra increased to 94%. Recommended: Immediate field inspection."*
  - Distinct badge displayed: `SIMULATION MODE — Prototype Data`.

- [ ] **4.3 Risk Analytics & Trends Page (`app/analytics/page.tsx`)**
  - Interactive Recharts visual dashboards:
    1. **Risk Level Distribution** (Bar chart of zones categorized by Low, Moderate, High, Critical).
    2. **Rainfall vs Risk Score Correlation** (Scatter or dual line plot).
    3. **24-Hour Soil Moisture Saturation Curve** (Area chart).
    4. **Incident Volume Over Time** (Bar chart tracking verified vs reported).
    5. **Regional Vulnerability Summary** (Horizontal comparison by state/district).

- [ ] **4.4 Multilingual Support (Lightweight Dictionary)**
  - Language dropdown in top navigation:
    - 🇬🇧 English
    - 🇮🇳 Hindi (हिंदी)
    - 🇮🇳 Assamese (অসমীয়া)
  - Translates key command center terms and warning alerts:
    - *HIGH LANDSLIDE RISK* → *भूस्खलन का उच्च जोखिम* → *ভূমিস্খলনৰ উচ্চ আশংকা*
    - *CRITICAL ALERT* → *गंभीर चेतावनी* → *জৰুৰী সতৰ্কবাৰ্তা*
    - *BLOCKED ROAD* → *अवरुद्ध सड़क* → *অৱৰুদ্ধ পথ*

- [ ] **4.5 Verification of Hackathon Demo Flow (Section 34 Rehearsal)**
  - [ ] **Step 1**: Open Dashboard → Confirm 3 Critical, 12 High, 7 Alerts, 47 Incidents.
  - [ ] **Step 2**: Open GIS Map → Click Sohra → Confirm 210mm rainfall, 91% soil, 43° slope, 94% risk.
  - [ ] **Step 3**: Toggle LIVE SIMULATION → Watch environmental metrics and risk rise.
  - [ ] **Step 4**: Trigger Critical Alert → Confirm alert toast appears.
  - [ ] **Step 5**: Open Field Reporting → Submit "Ground Crack" report with GPS.
  - [ ] **Step 6**: Return to Dashboard/Map → Confirm new report appears in table and map.
  - [ ] **Step 7**: Emergency Priority Section → Confirm NH-6 blockage is Priority #1.
  - [ ] **Step 8**: Open AI Assistant → Ask *"Which area needs immediate attention?"* → Confirm accurate response.

- [ ] **4.6 Build & Code Quality Validation**
  - Run `npm run lint` and resolve any ESLint warnings or errors.
  - Run `npm run build` and ensure Next.js builds clean static and dynamic routes.

---

## ✅ Phase 4 Acceptance Criteria
1. AI Assistant answers disaster queries intelligently with or without an `AI_API_KEY`.
2. Live simulation increments environmental metrics and fires a critical alert toast.
3. `/analytics` renders 5 distinct Recharts charts without SVG hydration mismatches.
4. Language switcher switches key labels seamlessly between English, Hindi, and Assamese.
5. `npm run build` passes with zero TypeScript or build errors.
6. The entire 8-step demo walkthrough runs smoothly from start to finish.
