import { NextRequest, NextResponse } from "next/server";
import { updateAlertStatus } from "@/lib/data-service";

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

    const updated = await updateAlertStatus(id, body.status);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Alert not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Alert status updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("PATCH /api/alerts/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update alert" },
      { status: 500 }
    );
  }
}
