import mongoose, { Schema, Model } from "mongoose";
import { IAlert } from "@/types/alert";

const AlertSchema = new Schema<IAlert>(
  {
    zoneId: { type: String },
    zoneName: { type: String, required: true },
    level: {
      type: String,
      required: true,
      enum: ["INFO", "WARNING", "HIGH", "CRITICAL"],
      default: "WARNING",
    },
    message: { type: String, required: true },
    riskScore: { type: Number, required: true },
    recommendedAction: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "ACKNOWLEDGED", "RESOLVED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

export const Alert: Model<IAlert> =
  mongoose.models.Alert || mongoose.model<IAlert>("Alert", AlertSchema);
