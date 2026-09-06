import { NextRequest, NextResponse } from "next/server";
import { getAlerts, createAlert } from "@/lib/data-service";

export async function GET() {
  try {
    const alerts = await getAlerts();
    return NextResponse.json({
      success: true,
      count: alerts.length,
      data: alerts,
    });
  } catch (error) {
    console.error("GET /api/alerts error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch alerts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.zoneName || !body.message) {
      return NextResponse.json(
        { success: false, error: "Zone name and message are required" },
        { status: 400 }
      );
    }

    const created = await createAlert(body);
    return NextResponse.json(
      {
        success: true,
        message: "Early warning alert created",
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/alerts error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create alert" },
      { status: 500 }
    );
  }
}
