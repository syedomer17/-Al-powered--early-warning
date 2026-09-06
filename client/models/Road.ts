import mongoose, { Schema, Model } from "mongoose";
import { IRoad } from "@/types/road";

const RoadSchema = new Schema<IRoad>(
  {
    roadId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["OPEN", "PARTIAL", "BLOCKED"],
      default: "OPEN",
    },
    riskScore: { type: Number, required: true },
    affectedPopulation: { type: Number, required: true },
    ambulanceAccess: {
      type: String,
      required: true,
      enum: ["OPEN", "RESTRICTED", "BLOCKED"],
      default: "OPEN",
    },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    priorityRank: { type: Number, default: 99 },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Road: Model<IRoad> =
  mongoose.models.Road || mongoose.model<IRoad>("Road", RoadSchema);
