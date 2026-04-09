import { NextResponse } from "next/server";
import { getAllDashboardData, markContacted } from "@/lib/leads-db";
import { markContactedSchema } from "@/lib/validations";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || undefined;
    const label = url.searchParams.get("label") || undefined;
    const sort = url.searchParams.get("sort") || undefined;
    const order = url.searchParams.get("order") || undefined;

    const data = getAllDashboardData({ type, label, sort, order });

    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load leads";
    console.error("Leads GET error:", err);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = markContactedSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => i.message);
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }
    const { businessId, method, notes } = parsed.data;
    markContacted(businessId, method, notes);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to log outreach";
    console.error("Leads POST error:", err);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
