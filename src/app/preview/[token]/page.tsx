import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { PreviewSite } from "@/components/PreviewSite";
import type { SiteConfig } from "@/types";

interface PreviewPageProps {
  params: Promise<{ token: string }>;
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { token } = await params;

  const generation = await prisma.siteGeneration.findUnique({
    where: { previewToken: token },
    include: {
      submission: {
        select: { businessName: true, industry: true, city: true },
      },
    },
  });

  if (!generation) {
    notFound();
  }

  // Check expiry
  if (generation.previewExpiresAt && generation.previewExpiresAt < new Date()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Preview Expired</h1>
          <p className="text-gray-500 mb-6">
            This preview link has expired. Contact Spiffy Tec for a fresh demo.
          </p>
          <a
            href="https://spiffytec.com/audit"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Get a New Preview
          </a>
        </div>
      </div>
    );
  }

  // Increment view count (fire-and-forget)
  prisma.siteGeneration
    .update({
      where: { id: generation.id },
      data: {
        previewViewCount: { increment: 1 },
        previewLastViewedAt: new Date(),
      },
    })
    .catch(() => {}); // Don't block render on analytics

  let siteConfig: SiteConfig;
  try {
    siteConfig = JSON.parse(generation.siteConfig);
  } catch {
    notFound();
  }

  return (
    <PreviewSite
      config={siteConfig}
      businessName={generation.submission.businessName}
      industry={generation.submission.industry}
    />
  );
}
