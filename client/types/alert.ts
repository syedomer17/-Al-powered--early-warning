export type AlertLevel = "INFO" | "WARNING" | "HIGH" | "CRITICAL";
export type AlertStatus = "ACTIVE" | "ACKNOWLEDGED" | "RESOLVED";

export interface IAlert {
  _id?: string;
  zoneId?: string;
  zoneName: string;
  level: AlertLevel;
  message: string;
  riskScore: number;
  recommendedAction: string;
  status: AlertStatus;
  createdAt: string | Date;
}
