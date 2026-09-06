export type RoadStatusType = "OPEN" | "PARTIAL" | "BLOCKED";
export type AmbulanceAccessType = "OPEN" | "RESTRICTED" | "BLOCKED";

export interface IRoad {
  _id?: string;
  roadId: string;
  name: string;
  state: string;
  district: string;
  status: RoadStatusType;
  riskScore: number;
  affectedPopulation: number;
  ambulanceAccess: AmbulanceAccessType;
  latitude: number;
  longitude: number;
  priorityRank?: number;
  lastUpdated: string | Date;
}
