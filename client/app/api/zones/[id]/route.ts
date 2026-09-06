import { NextRequest, NextResponse } from "next/server";
import { getZoneById } from "@/lib/data-service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const zone = await getZoneById(id);
    if (!zone) {
      return NextResponse.json(
        { success: false, error: "Zone not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: zone });
  } catch (error) {
    console.error("GET /api/zones/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch zone details" },
      { status: 500 }
    );
  }
}
