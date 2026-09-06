import { NextResponse } from "next/server";
import { getZones } from "@/lib/data-service";

export async function GET() {
  try {
    const zones = await getZones();
    return NextResponse.json({ success: true, count: zones.length, data: zones });
  } catch (error) {
    console.error("GET /api/zones error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch zones" },
      { status: 500 }
    );
  }
}
