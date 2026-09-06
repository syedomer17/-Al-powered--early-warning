import { RiskInput, RiskResult, RiskLevel } from "@/types/risk";

/**
 * LANDSLIDEX Prototype Risk Engine
 * Formula:
 * Risk Score = (Rainfall * 0.35) + (Soil Moisture * 0.25) + (Slope * 0.20) + (Historical Risk * 0.20)
 * 
 * Note: The prototype uses a transparent weighted risk model combining environmental
 * and historical factors. The architecture can later be replaced with a trained ML model
 * such as Random Forest, XGBoost, or LSTM.
 */
export function calculateRisk(input: RiskInput): RiskResult {
  const rainfallNorm = Math.min(100, Math.max(0, input.rainfall));
  const soilNorm = Math.min(100, Math.max(0, input.soilMoisture));
  const slopeNorm = Math.min(100, Math.max(0, input.slope));
  const histNorm = Math.min(100, Math.max(0, input.historicalRisk));

  const rawScore =
    rainfallNorm * 0.35 +
    soilNorm * 0.25 +
    slopeNorm * 0.20 +
    histNorm * 0.20;

  const score = Math.round(rawScore);

  let level: RiskLevel = "LOW";
  if (score > 70) {
    level = "CRITICAL";
  } else if (score > 50) {
    level = "HIGH";
  } else if (score > 30) {
    level = "MODERATE";
  } else {
    level = "LOW";
  }

  return { score, level };
}

/**
 * Helper to normalize real physical values to 0-100 scale:
 * - Rainfall: 0 to 250mm -> 0 to 100
 * - Soil Moisture: 0 to 100% -> 0 to 100
 * - Slope: 0 to 60 degrees -> 0 to 100
 * - Historical Events: 0 to 10 -> 0 to 100
 */
export function normalizePhysicalInputs(
  rainfallMm: number,
  soilMoisturePercent: number,
  slopeDegrees: number,
  historicalEventsCount: number
): RiskInput {
  const rainfallNorm = Math.min(100, (rainfallMm / 220) * 100);
  const soilNorm = Math.min(100, Math.max(0, soilMoisturePercent));
  const slopeNorm = Math.min(100, (slopeDegrees / 50) * 100);
  const historicalNorm = Math.min(100, (historicalEventsCount / 8) * 100);

  return {
    rainfall: Math.round(rainfallNorm),
    soilMoisture: Math.round(soilNorm),
    slope: Math.round(slopeNorm),
    historicalRisk: Math.round(historicalNorm),
  };
}
