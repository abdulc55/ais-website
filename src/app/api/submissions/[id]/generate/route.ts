import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth, isError, apiError } from "@/lib/api-utils";
import { buildSiteConfig } from "@/generator/config-builder";
import { writeTemplate } from "@/generator/template-writer";
import { slugify } from "@/lib/utils";

/** POST /api/submissions/[id]/generate — Generate a site (protected) */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (isError(auth)) return auth;

  const { id } = await params;
  const submission = await prisma.clientSubmission.findUnique({
    where: { id },
  });

  if (!submission) {
    return apiError("Submission not found", 404);
  }

  if (submission.status === "generating") {
    return apiError("Site generation already in progress", 409);
  }

  const existing = await prisma.siteGeneration.findUnique({
    where: { submissionId: submission.id },
  });

  if (existing?.status === "success") {
    return apiError("Site already generated for this submission", 409);
  }

  const slug = slugify(submission.businessName);

  // Update status to generating
  await prisma.clientSubmission.update({
    where: { id: submission.id },
    data: { status: "generating" },
  });

  // Create or update generation record
  const generation = existing
    ? await prisma.siteGeneration.update({
        where: { id: existing.id },
        data: { status: "generating", errorMessage: null },
      })
    : await prisma.siteGeneration.create({
        data: {
          submissionId: submission.id,
          siteConfig: "{}",
          slug,
          status: "generating",
        },
      });

  try {
    const siteConfig = buildSiteConfig(submission);
    const outputPath = await writeTemplate(slug, siteConfig);

    await prisma.siteGeneration.update({
      where: { id: generation.id },
      data: {
        siteConfig: JSON.stringify(siteConfig),
        outputPath,
        status: "success",
      },
    });

    await prisma.clientSubmission.update({
      where: { id: submission.id },
      data: { status: "generated", generatedAt: new Date() },
    });

    return NextResponse.json({ success: true, slug, outputPath });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    await prisma.siteGeneration.update({
      where: { id: generation.id },
      data: { status: "error", errorMessage: message },
    });

    await prisma.clientSubmission.update({
      where: { id: submission.id },
      data: { status: "reviewed" },
    });

    return apiError(`Generation failed: ${message}`, 500);
  }
}
