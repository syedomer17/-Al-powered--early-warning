import { NextRequest, NextResponse } from "next/server";
import { getIncidents, createIncident } from "@/lib/data-service";

export async function GET() {
  try {
    const incidents = await getIncidents();
    return NextResponse.json({
      success: true,
      count: incidents.length,
      data: incidents,
    });
  } catch (error) {
    console.error("GET /api/incidents error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch incidents" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.type || !body.description) {
      return NextResponse.json(
        { success: false, error: "Incident type and description are required" },
        { status: 400 }
      );
    }

    const created = await createIncident(body);
    return NextResponse.json(
      {
        success: true,
        message: "Incident report submitted successfully",
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/incidents error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create incident report" },
      { status: 500 }
    );
  }
}
