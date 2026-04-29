import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { apiError } from "@/lib/api-utils";
import { fullIntakeSchema } from "@/lib/validation";

/** GET /api/intake/[token] — Get form metadata (public) */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const form = await prisma.intakeForm.findUnique({
    where: { token },
    select: { id: true, label: true, expiresAt: true },
  });

  if (!form) {
    return apiError("Form not found", 404);
  }

  if (form.expiresAt && new Date(form.expiresAt) < new Date()) {
    return apiError("This form has expired", 410);
  }

  return NextResponse.json({ label: form.label });
}

/** POST /api/intake/[token] — Submit client intake (public) */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const form = await prisma.intakeForm.findUnique({
    where: { token },
  });

  if (!form) {
    return apiError("Form not found", 404);
  }

  if (form.expiresAt && new Date(form.expiresAt) < new Date()) {
    return apiError("This form has expired", 410);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON body", 400);
  }

  const parsed = fullIntakeSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(parsed.error.issues[0].message, 400);
  }

  const data = parsed.data;

  const submission = await prisma.clientSubmission.create({
    data: {
      intakeFormId: form.id,
      businessName: data.businessName,
      industry: data.industry,
      yearsInBusiness: data.yearsInBusiness || null,
      city: data.city || null,
      state: data.state || null,
      serviceArea: data.serviceArea || null,
      employees: data.employees || null,
      currentWebsite: data.currentWebsite || null,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone || null,
      preferredContact: data.preferredContact || null,
      bestTimeToReach: data.bestTimeToReach || null,
      goals: JSON.stringify(data.goals),
      primaryCta: data.primaryCta || null,
      services: JSON.stringify(data.services),
      cancellationPolicy: data.cancellationPolicy || null,
      hasLogo: data.hasLogo,
      brandColors: JSON.stringify(data.brandColors),
      stylePreference: data.stylePreference || null,
      tagline: data.tagline || null,
      desiredFeeling: data.desiredFeeling || null,
      inspirationUrls: JSON.stringify(data.inspirationUrls),
      pagesNeeded: JSON.stringify(data.pagesNeeded),
      featuresNeeded: JSON.stringify(data.featuresNeeded),
      idealCustomer: data.idealCustomer || null,
      ageRange: data.ageRange || null,
      howCustomersFind: data.howCustomersFind || null,
      competitors: JSON.stringify(data.competitors),
      differentiator: data.differentiator || null,
      existingDomain: data.existingDomain || null,
      existingHosting: data.existingHosting || null,
      socialMedia: JSON.stringify(data.socialMedia),
      budgetRange: data.budgetRange || null,
      launchDate: data.launchDate || null,
      isUrgent: data.isUrgent,
      additionalNotes: data.additionalNotes || null,
    },
  });

  // Send notification email (fire-and-forget)
  try {
    const { sendSubmissionNotification } = await import("@/lib/email");
    await sendSubmissionNotification({
      businessName: data.businessName,
      industry: data.industry,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      city: data.city,
      state: data.state,
    });
  } catch {
    // Email failure should not block submission
  }

  return NextResponse.json({ id: submission.id, success: true }, { status: 201 });
}
