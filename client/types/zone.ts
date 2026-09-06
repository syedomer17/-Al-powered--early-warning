import { RiskLevel } from "./risk";

export interface IZone {
  _id?: string;
  name: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  rainfall: number;           // mm
  soilMoisture: number;       // %
  slope: number;              // degrees
  historicalEvents: number;   // count
  historicalRisk: number;     // 0–100
  riskScore: number;          // 0–100
  riskLevel: RiskLevel;
  recommendedAction: string;
  updatedAt?: Date;
  createdAt?: Date;
}
