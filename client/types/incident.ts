export type IncidentType =
  | "Ground Crack"
  | "Slope Movement"
  | "Blocked Road"
  | "Rockfall"
  | "Water Seepage"
  | "Other";

export type IncidentSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type IncidentStatus = "UNDER REVIEW" | "VERIFIED" | "DISPATCHED" | "RESOLVED";

export interface IIncident {
  _id?: string;
  incidentId: string;
  type: IncidentType;
  description: string;
  latitude: number;
  longitude: number;
  locationName?: string;
  severity: IncidentSeverity;
  imageUrl?: string;
  status: IncidentStatus;
  reporter?: string;
  createdAt: string | Date;
}
