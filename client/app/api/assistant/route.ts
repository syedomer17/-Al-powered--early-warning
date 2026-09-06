import { NextRequest, NextResponse } from "next/server";
import { getZones, getRoads, getIncidents } from "@/lib/data-service";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    if (!message) {
      return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 });
    }

    const query = message.toLowerCase();
    
    // Deterministic Fallback Logic (Mode B)
    let responseText = "I'm analyzing the disaster data, but I couldn't understand your specific query. Please try asking about 'most dangerous area', 'roads blocked', or 'response team actions'.";
    
    if (query.includes("most dangerous") || query.includes("highest risk")) {
      const zones = await getZones();
      const highestRisk = zones.sort((a, b) => b.riskScore - a.riskScore)[0];
      if (highestRisk) {
        responseText = `The most dangerous area currently is **${highestRisk.name}** in ${highestRisk.district} with a critical risk score of **${highestRisk.riskScore}%**.`;
      }
    } else if (query.includes("why is sohra high risk") || query.includes("sohra")) {
      responseText = "Sohra is at a CRITICAL 94% risk because it has received **210mm of rainfall** in the last 24 hours, leading to a **91% soil moisture saturation** on a steep **43° slope**. Historically, it has recorded 8 landslide events under similar conditions.";
    } else if (query.includes("road") || query.includes("blocked")) {
      const roads = await getRoads();
      const blocked = roads.filter(r => r.status === "BLOCKED");
      if (blocked.length > 0) {
        responseText = `There are currently ${blocked.length} blocked roads. The most critical is **${blocked[0].name}**, affecting a population of 2,840 and completely blocking ambulance access.`;
      } else {
        responseText = "Currently, there are no fully blocked roads reported in the system.";
      }
    } else if (query.includes("response team") || query.includes("do first") || query.includes("immediate attention")) {
      responseText = "The emergency response team should immediately dispatch clearing units to the **NH-6 Road Blockage** (Priority #1) to restore ambulance access. Concurrently, a field inspection team must be sent to **Sohra Edge Settlement** where tension cracks have been observed.";
    }

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      data: {
        reply: responseText,
        source: "Deterministic Engine"
      }
    });

  } catch (error) {
    console.error("POST /api/assistant error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process query" },
      { status: 500 }
    );
  }
}
