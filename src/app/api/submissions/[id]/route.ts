import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth, isError, apiError } from "@/lib/api-utils";

/** GET /api/submissions/[id] — Get submission detail (protected) */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (isError(auth)) return auth;

  const submission = await prisma.clientSubmission.findUnique({
    where: { id: (await params).id },
    include: { siteGeneration: true },
  });

  if (!submission) {
    return apiError("Submission not found", 404);
  }

  return NextResponse.json(submission);
}

/** PATCH /api/submissions/[id] — Update submission status (protected) */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (isError(auth)) return auth;

  let body;
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON body", 400);
  }

  const validStatuses = ["new", "reviewed", "generating", "generated", "deployed"];
  if (body.status && !validStatuses.includes(body.status)) {
    return apiError("Invalid status", 400);
  }

  const updateData: Record<string, string | Date> = {};
  if (body.status) {
    updateData.status = body.status;
    if (body.status === "reviewed") updateData.reviewedAt = new Date();
  }

  const submission = await prisma.clientSubmission.update({
    where: { id: (await params).id },
    data: updateData,
  });

  return NextResponse.json(submission);
}
