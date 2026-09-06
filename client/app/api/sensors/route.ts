import { NextResponse } from "next/server";
import { getSensors } from "@/lib/data-service";

export async function GET() {
  try {
    const sensors = await getSensors();
    return NextResponse.json({
      success: true,
      data: sensors,
    });
  } catch (error) {
    console.error("GET /api/sensors error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch sensor telemetry" },
      { status: 500 }
    );
  }
}
