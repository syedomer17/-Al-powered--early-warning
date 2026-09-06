import { IRoad } from "@/types/road";
import { IIncident } from "@/types/incident";

export interface PriorityItem {
  id: string;
  rank: number;
  title: string;
  type: "ROAD" | "INCIDENT" | "ZONE";
  riskScore: number;
  populationAffected: number;
  ambulanceAccess: "OPEN" | "RESTRICTED" | "BLOCKED";
  severity: "CRITICAL" | "HIGH" | "MODERATE" | "LOW";
  status: string;
  recommendedAction: string;
  location: string;
}

/**
 * Calculates priority score combining:
 * - Risk Score (weight 0.40)
 * - Population Impact (normalized 0-100, weight 0.30)
 * - Accessibility Blockage (BLOCKED=100, RESTRICTED=60, OPEN=10, weight 0.20)
 * - Severity Weight (weight 0.10)
 */
export function rankEmergencyPriorities(
  roads: IRoad[],
  incidents: IIncident[]
): PriorityItem[] {
  const items: { item: PriorityItem; rawScore: number }[] = [];

  for (const road of roads) {
    let accessScore = 10;
    if (road.ambulanceAccess === "BLOCKED") accessScore = 100;
    else if (road.ambulanceAccess === "RESTRICTED") accessScore = 60;

    const popNorm = Math.min(100, (road.affectedPopulation / 3000) * 100);
    const severityScore = road.status === "BLOCKED" ? 100 : road.status === "PARTIAL" ? 65 : 20;

    const rawScore =
      road.riskScore * 0.40 +
      popNorm * 0.30 +
      accessScore * 0.20 +
      severityScore * 0.10;

    items.push({
      rawScore,
      item: {
        id: road.roadId || road.name,
        rank: 0,
        title: `${road.name} Road Blockage`,
        type: "ROAD",
        riskScore: road.riskScore,
        populationAffected: road.affectedPopulation,
        ambulanceAccess: road.ambulanceAccess,
        severity:
          rawScore > 75 ? "CRITICAL" : rawScore > 50 ? "HIGH" : "MODERATE",
        status: road.status,
        recommendedAction:
          road.ambulanceAccess === "BLOCKED"
            ? "Urgent: Clear route for emergency ambulance dispatch"
            : "Monitor route and prepare clearance heavy machinery",
        location: `${road.district}, ${road.state}`,
      },
    });
  }

  for (const inc of incidents) {
    if (inc.status === "RESOLVED") continue;

    const sevWeight =
      inc.severity === "CRITICAL" ? 95 : inc.severity === "HIGH" ? 75 : 45;
    const rawScore = sevWeight * 0.70 + 40 * 0.30;

    items.push({
      rawScore,
      item: {
        id: inc.incidentId,
        rank: 0,
        title: `${inc.type} Report`,
        type: "INCIDENT",
        riskScore: Math.round(sevWeight),
        populationAffected: inc.severity === "CRITICAL" ? 1200 : 450,
        ambulanceAccess: inc.type === "Blocked Road" ? "BLOCKED" : "OPEN",
        severity:
          inc.severity === "CRITICAL"
            ? "CRITICAL"
            : inc.severity === "HIGH"
            ? "HIGH"
            : "MODERATE",
        status: inc.status,
        recommendedAction: `Dispatch inspection unit for ${inc.type.toLowerCase()}`,
        location: inc.locationName || `${inc.latitude.toFixed(2)}, ${inc.longitude.toFixed(2)}`,
      },
    });
  }

  // Sort descending by raw score
  items.sort((a, b) => b.rawScore - a.rawScore);

  return items.map((el, index) => ({
    ...el.item,
    rank: index + 1,
  }));
}
