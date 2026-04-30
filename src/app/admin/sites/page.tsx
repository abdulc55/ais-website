export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Globe, ExternalLink } from "lucide-react";


export default async function SitesPage() {
  const sites = await prisma.siteGeneration.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      submission: {
        select: { businessName: true, industry: true },
      },
    },
  });

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    generating: "bg-purple-100 text-purple-800",
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Generated Sites</h1>

      <div className="bg-white rounded-xl border border-gray-200">
        {sites.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Globe className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p>No sites generated yet</p>
            <p className="text-sm mt-1">Generate a site from a client submission</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {sites.map((site) => (
              <div key={site.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{site.submission.businessName}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {site.submission.industry} &middot; {site.slug} &middot; {formatDate(site.createdAt)}
                  </p>
                  {site.errorMessage && (
                    <p className="text-xs text-red-500 mt-1">{site.errorMessage}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[site.status] || "bg-gray-100 text-gray-800"}`}>
                    {site.status}
                  </span>
                  {site.deployUrl && (
                    <a
                      href={site.deployUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
