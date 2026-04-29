import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth, isError } from "@/lib/api-utils";

/** GET /api/submissions — List all submissions (protected) */
export async function GET(request: Request) {
  const auth = await requireAuth();
  if (isError(auth)) return auth;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const industry = searchParams.get("industry");

  const where: Record<string, string> = {};
  if (status) where.status = status;
  if (industry) where.industry = industry;

  const submissions = await prisma.clientSubmission.findMany({
    where,
    orderBy: { submittedAt: "desc" },
    select: {
      id: true,
      businessName: true,
      industry: true,
      contactName: true,
      contactEmail: true,
      city: true,
      state: true,
      status: true,
      submittedAt: true,
      budgetRange: true,
    },
  });

  return NextResponse.json(submissions);
}
