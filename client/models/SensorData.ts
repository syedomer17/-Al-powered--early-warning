import mongoose, { Schema, Model } from "mongoose";

export interface ISensorData {
  _id?: string;
  zoneId?: string;
  zoneName: string;
  rainfall: number;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  recordedAt: Date;
}

const SensorDataSchema = new Schema<ISensorData>(
  {
    zoneId: { type: String },
    zoneName: { type: String, required: true },
    rainfall: { type: Number, required: true },
    soilMoisture: { type: Number, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    recordedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const SensorData: Model<ISensorData> =
  mongoose.models.SensorData || mongoose.model<ISensorData>("SensorData", SensorDataSchema);
