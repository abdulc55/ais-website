/**
 * POST /api/demos — Create a sales demo (ClientSubmission + SiteGeneration with previewToken)
 * GET /api/demos — List all demos for the current user
 */
import { NextResponse } from "next/server";
import { requireAuth, requireJson, isError, apiError } from "@/lib/api-utils";
import prisma from "@/lib/prisma";
import { buildDemoSiteConfig, type DemoFormData } from "@/lib/demo-config";
import { slugify } from "@/lib/utils";
import crypto from "crypto";

/**
 * Get or create the shared "Sales Demos" intake form for the user.
 * All demo submissions share one parent form per user.
 */
async function getOrCreateDemoIntakeForm(userId: string): Promise<string> {
  const existing = await prisma.intakeForm.findFirst({
    where: { createdById: userId, label: "__sales-demos__" },
  });

  if (existing) return existing.id;

  const form = await prisma.intakeForm.create({
    data: {
      label: "__sales-demos__",
      createdById: userId,
    },
  });

  return form.id;
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (isError(auth)) return auth;

  const body = await requireJson(request);
  if (isError(body)) return body;

  const { businessName, industry, city, phone, email, tagline, services, primaryCta, colorPrimary, colorAccent, style, notes, prospectiqLeadId } = body as DemoFormData & { prospectiqLeadId?: string };

  if (!businessName || !industry || !city) {
    return apiError("businessName, industry, and city are required");
  }

  try {
    const intakeFormId = await getOrCreateDemoIntakeForm(auth.userId);
    const slug = slugify(businessName);
    const previewToken = crypto.randomBytes(16).toString("hex");
    const previewExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    // Build SiteConfig from form data
    const formData: DemoFormData = {
      businessName, industry, city, phone, email, tagline, services, primaryCta, colorPrimary, colorAccent, style, notes,
    };
    const siteConfig = buildDemoSiteConfig(formData);

    // Create submission + generation in a transaction
    const submission = await prisma.clientSubmission.create({
      data: {
        intakeFormId,
        businessName,
        industry,
        city,
        state: "",
        contactName: businessName,
        contactEmail: email || "",
        contactPhone: phone,
        tagline,
        services: services ? JSON.stringify(services.map((s: string) => ({ name: s, price: "", duration: "" }))) : null,
        primaryCta,
        brandColors: colorPrimary ? JSON.stringify({ primary: colorPrimary, accent: colorAccent }) : null,
        stylePreference: style,
        additionalNotes: notes,
        source: "sales-demo",
        prospectiqLeadId: prospectiqLeadId || null,
        status: "generated",
        generatedAt: new Date(),
        siteGeneration: {
          create: {
            siteConfig: JSON.stringify(siteConfig),
            slug,
            status: "success",
            previewToken,
            previewExpiresAt,
          },
        },
      },
      include: { siteGeneration: true },
    });

    return NextResponse.json({
      id: submission.id,
      previewToken,
      previewUrl: `/preview/${previewToken}`,
      businessName,
      industry,
    }, { status: 201 });
  } catch (err) {
    console.error("Demo creation error:", err);
    return apiError("Failed to create demo", 500);
  }
}

export async function GET() {
  const auth = await requireAuth();
  if (isError(auth)) return auth;

  try {
    const intakeForm = await prisma.intakeForm.findFirst({
      where: { createdById: auth.userId, label: "__sales-demos__" },
    });

    if (!intakeForm) {
      return NextResponse.json({ demos: [] });
    }

    const demos = await prisma.clientSubmission.findMany({
      where: {
        intakeFormId: intakeForm.id,
        source: "sales-demo",
      },
      include: {
        siteGeneration: {
          select: {
            previewToken: true,
            previewExpiresAt: true,
            previewViewCount: true,
            previewLastViewedAt: true,
            status: true,
          },
        },
      },
      orderBy: { submittedAt: "desc" },
    });

    return NextResponse.json({
      demos: demos.map((d) => ({
        id: d.id,
        businessName: d.businessName,
        industry: d.industry,
        city: d.city,
        previewToken: d.siteGeneration?.previewToken,
        previewUrl: d.siteGeneration?.previewToken ? `/preview/${d.siteGeneration.previewToken}` : null,
        viewCount: d.siteGeneration?.previewViewCount || 0,
        lastViewedAt: d.siteGeneration?.previewLastViewedAt,
        expiresAt: d.siteGeneration?.previewExpiresAt,
        createdAt: d.submittedAt,
      })),
    });
  } catch (err) {
    console.error("Demo list error:", err);
    return apiError("Failed to load demos", 500);
  }
}
