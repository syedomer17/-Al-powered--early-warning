# LANDSLIDEX — PHASE 3: Field Reporting, Offline Queue, Incident Triage & Alerts

> **Hackathon Goal**: Complete the two-way emergency response loop — enabling field agents and citizens to submit geolocated hazard reports (even while offline) and providing command staff with real-time incident triage and alert management.

---

## 📋 Task Checklist

- [ ] **3.1 Citizen & Field Incident Reporting (`app/incidents/report/page.tsx`)**
  - Clean, mobile-friendly reporting form.
  - Fields:
    - **Incident Type**: Ground Crack, Slope Movement, Blocked Road, Rockfall, Water Seepage, Other.
    - **Description**: Textarea for field observations.
    - **Severity**: LOW, MEDIUM, HIGH, CRITICAL.
    - **Photo Upload**: Simulated file picker with image preview.
    - **Coordinates**: Latitude & Longitude inputs.
  - **"USE CURRENT LOCATION"** button:
    - Uses browser `navigator.geolocation` API.
    - Graceful fallback button: *"Use Demo Location (Sohra/East Khasi Hills)"* if GPS permission is denied.
  - **Submission Confirmation View**:
    - Displays:
      - `Incident ID: INC-2026-XXXXX`
      - `Status: UNDER REVIEW`
      - Coordinates & timestamp.
    - CTA to view submission in Incident Registry or return to Dashboard.

- [ ] **3.2 Offline Mode & Queue Synchronization Demonstration**
  - Connectivity detection using `window.addEventListener('online')` and `navigator.onLine`.
  - Offline banner: *"OFFLINE MODE — No Internet Connection"*.
  - When offline, form submissions are queued in `localStorage` (`offline_incidents_queue`).
  - Offline counter: *"X reports waiting for synchronization"*.
  - When connection is restored:
    - Automatic or one-click **"SYNC REPORTS"** trigger.
    - Reports are posted to `POST /api/incidents`.
    - Toast feedback: *"X reports synchronized successfully."*

- [ ] **3.3 Incident Management Dashboard (`app/incidents/page.tsx`)**
  - Table and card view of all reported incidents.
  - Filter by Severity (`ALL`, `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`) and Status (`ALL`, `UNDER REVIEW`, `VERIFIED`, `DISPATCHED`, `RESOLVED`).
  - Columns:
    - Incident ID
    - Type
    - Location (Coordinates & District)
    - Severity (Color-coded badge)
    - Status dropdown / toggle
    - Timestamp
    - Action: *"View on Map"* (redirects to `/map?incidentId=...`)
  - Status mutation: Calls `PATCH /api/incidents/[id]` to update state.

- [ ] **3.4 Active Alerts Center (`app/alerts/page.tsx`)**
  - Real-time alert cards with levels: `INFO`, `WARNING`, `HIGH`, `CRITICAL`.
  - Alert contents:
    - Zone Name & District
    - Risk Score (e.g. 94%)
    - Message: *"High probability of landslide detected due to increasing rainfall and soil moisture."*
    - Timestamp
    - Recommended Action: *"Inspect vulnerable slopes and prepare evacuation routes."*
  - Action buttons per alert:
    - **ACKNOWLEDGE** (updates alert status to `ACKNOWLEDGED`)
    - **DISPATCH TEAM** (triggers modal or notification)
    - **VIEW ON MAP** (navigates to GIS map focused on the zone)

- [ ] **3.5 Emergency Response Prioritization Module**
  - Section on dashboard or dedicated view ranked by urgency:
    - Formula factors: Risk Score, Population Affected, Road Accessibility, Hospital/Ambulance access.
  - **Showcase Priority #1**:
    - **#1 NH-6 Road Blockage**
    - Risk Score: `94`
    - Population Affected: `2,840`
    - Ambulance Access: `BLOCKED`
    - Priority: `CRITICAL`
    - Action: `DISPATCH TEAM` button.

---

## ✅ Phase 3 Acceptance Criteria
1. Submitting a report from `/incidents/report` creates a document in MongoDB and returns an `INC-2026-XXXXX` identifier.
2. Clicking "Use Current Location" fetches device coordinates or loads the fallback demo coordinates cleanly.
3. Simulating offline mode in browser DevTools caches the submission locally and syncs successfully when online.
4. Changing an incident's status to "DISPATCHED" persists to the database and updates the UI.
5. The Emergency Response Prioritization view clearly ranks **NH-6 Road Blockage** as Priority #1.
