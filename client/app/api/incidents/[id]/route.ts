import { NextRequest, NextResponse } from "next/server";
import { updateIncidentStatus } from "@/lib/data-service";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.status) {
      return NextResponse.json(
        { success: false, error: "Status field is required" },
        { status: 400 }
      );
    }

    const updated = await updateIncidentStatus(id, body.status);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Incident not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Incident status updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("PATCH /api/incidents/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update incident" },
      { status: 500 }
    );
  }
}
