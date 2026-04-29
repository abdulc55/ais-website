import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth, requireJson, isError, apiError } from "@/lib/api-utils";
import { createIntakeFormSchema } from "@/lib/validation";

/** GET /api/intake — List all intake forms (protected) */
export async function GET() {
  const auth = await requireAuth();
  if (isError(auth)) return auth;

  const forms = await prisma.intakeForm.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { submissions: true } },
    },
  });

  return NextResponse.json(forms);
}

/** POST /api/intake — Create a new intake form link (protected) */
export async function POST(request: Request) {
  const auth = await requireAuth();
  if (isError(auth)) return auth;

  const body = await requireJson(request);
  if (isError(body)) return body;

  const parsed = createIntakeFormSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(parsed.error.issues[0].message, 400);
  }

  const form = await prisma.intakeForm.create({
    data: {
      label: parsed.data.label,
      createdById: auth.userId,
      expiresAt: parsed.data.expiresAt ? new Date(parsed.data.expiresAt) : null,
    },
    include: {
      _count: { select: { submissions: true } },
    },
  });

  return NextResponse.json(form, { status: 201 });
}
