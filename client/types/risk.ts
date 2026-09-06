export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export interface RiskInput {
  rainfall: number;      // 0–100 normalized
  soilMoisture: number;  // 0–100 normalized
  slope: number;         // 0–100 normalized
  historicalRisk: number;// 0–100 normalized
}

export interface RiskResult {
  score: number;
  level: RiskLevel;
}
