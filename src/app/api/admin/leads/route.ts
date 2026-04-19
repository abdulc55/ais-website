import { NextResponse } from "next/server";
import { getAllDashboardData, markContacted } from "@/lib/leads-db";
import { markContactedSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/require-admin";

const VALID_SORTS = new Set(["name", "date", "score"]);
const VALID_ORDERS = new Set(["asc", "desc"]);

export async function GET(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || undefined;
    const label = url.searchParams.get("label") || undefined;
    const rawSort = url.searchParams.get("sort");
    const rawOrder = url.searchParams.get("order");

    const sort = rawSort && VALID_SORTS.has(rawSort) ? rawSort : undefined;
    const order = rawOrder && VALID_ORDERS.has(rawOrder) ? rawOrder : undefined;

    const data = getAllDashboardData({ type, label, sort, order });
    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error("Leads GET error:", err);
    return NextResponse.json(
      { error: "Failed to load leads. Please try again." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

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
    console.error("Leads POST error:", err);
    return NextResponse.json(
      { error: "Failed to log outreach. Please try again." },
      { status: 500 }
    );
  }
}
