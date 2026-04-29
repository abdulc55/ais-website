/**
 * GET /api/demos/prefill?leadId=xxx
 *
 * Fetches safe prefill data from ProspectIQ's internal endpoint.
 * Requires admin auth (session-based) + INTERNAL_API_SECRET for cross-app call.
 */
import { NextRequest, NextResponse } from "next/server";
import { requireAuth, isError, apiError } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  const auth = await requireAuth();
  if (isError(auth)) return auth;

  const leadId = request.nextUrl.searchParams.get("leadId");
  if (!leadId) {
    return apiError("leadId is required");
  }

  const prospectiqUrl = process.env.PROSPECTIQ_URL || "http://localhost:3003";
  const secret = process.env.INTERNAL_API_SECRET;

  if (!secret) {
    return apiError("ProspectIQ integration not configured", 503);
  }

  try {
    const res = await fetch(`${prospectiqUrl}/api/internal/lead-prefill/${leadId}`, {
      headers: { Authorization: `Bearer ${secret}` },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return apiError(data.error || "Could not load lead from ProspectIQ", res.status);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("ProspectIQ prefill error:", err);
    return apiError("Could not connect to ProspectIQ", 503);
  }
}
