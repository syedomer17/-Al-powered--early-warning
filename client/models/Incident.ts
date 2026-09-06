import mongoose, { Schema, Model } from "mongoose";
import { IIncident } from "@/types/incident";

const IncidentSchema = new Schema<IIncident>(
  {
    incidentId: { type: String, required: true, unique: true },
    type: {
      type: String,
      required: true,
      enum: [
        "Ground Crack",
        "Slope Movement",
        "Blocked Road",
        "Rockfall",
        "Water Seepage",
        "Other",
      ],
    },
    description: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    locationName: { type: String, default: "Northeast Region" },
    severity: {
      type: String,
      required: true,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "MEDIUM",
    },
    imageUrl: { type: String },
    status: {
      type: String,
      required: true,
      enum: ["UNDER REVIEW", "VERIFIED", "DISPATCHED", "RESOLVED"],
      default: "UNDER REVIEW",
    },
    reporter: { type: String, default: "Field Observer" },
  },
  { timestamps: true }
);

export const Incident: Model<IIncident> =
  mongoose.models.Incident || mongoose.model<IIncident>("Incident", IncidentSchema);
