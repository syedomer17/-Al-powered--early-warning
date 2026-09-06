import mongoose, { Schema, Model } from "mongoose";
import { IZone } from "@/types/zone";

const ZoneSchema = new Schema<IZone>(
  {
    name: { type: String, required: true, unique: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    rainfall: { type: Number, default: 0 },
    soilMoisture: { type: Number, default: 0 },
    slope: { type: Number, default: 0 },
    historicalEvents: { type: Number, default: 0 },
    historicalRisk: { type: Number, default: 0 },
    riskScore: { type: Number, default: 0 },
    riskLevel: {
      type: String,
      enum: ["LOW", "MODERATE", "HIGH", "CRITICAL"],
      default: "LOW",
    },
    recommendedAction: { type: String, default: "Standard monitoring" },
  },
  { timestamps: true }
);

export const Zone: Model<IZone> =
  mongoose.models.Zone || mongoose.model<IZone>("Zone", ZoneSchema);
