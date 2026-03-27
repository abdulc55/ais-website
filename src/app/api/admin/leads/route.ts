import { NextResponse } from "next/server";
import {
  getLeadStats,
  getScoreDistribution,
  getBusinessTypes,
  getLeads,
  getNoWebsiteLeads,
  getNoWebsiteCount,
  markContacted,
} from "@/lib/leads-db";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || undefined;
    const label = url.searchParams.get("label") || undefined;
    const sort = url.searchParams.get("sort") || undefined;
    const order = url.searchParams.get("order") || undefined;

    const [stats, byLabel, byType, leads, noWebsiteLeads, noWebsiteCount] = [
      getLeadStats(),
      getScoreDistribution(),
      getBusinessTypes(),
      getLeads({ type, label, sort, order }),
      getNoWebsiteLeads(),
      getNoWebsiteCount(),
    ];

    return NextResponse.json({ stats, byLabel, byType, leads, noWebsiteLeads, noWebsiteCount });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to load leads" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { businessId, method, notes } = await request.json();
    if (!businessId || !method) {
      return NextResponse.json(
        { error: "businessId and method are required" },
        { status: 400 }
      );
    }
    markContacted(businessId, method, notes);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to log outreach" },
      { status: 500 }
    );
  }
}
