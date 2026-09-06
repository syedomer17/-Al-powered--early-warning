import { NextResponse } from "next/server";
import { getRoads, getIncidents } from "@/lib/data-service";
import { rankEmergencyPriorities } from "@/lib/priority-engine";

export async function GET() {
  try {
    const [roads, incidents] = await Promise.all([getRoads(), getIncidents()]);
    const priorities = rankEmergencyPriorities(roads, incidents);

    return NextResponse.json({
      success: true,
      data: {
        roads,
        priorities,
      },
    });
  } catch (error) {
    console.error("GET /api/roads error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch road telemetry" },
      { status: 500 }
    );
  }
}
