import { Inbox, FileText, Globe, Clock } from "lucide-react";
import prisma from "@/lib/prisma";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default async function DashboardPage() {
  const [totalSubmissions, newSubmissions, generatedSites, totalForms, recentSubmissions] =
    await Promise.all([
      prisma.clientSubmission.count(),
      prisma.clientSubmission.count({ where: { status: "new" } }),
      prisma.siteGeneration.count({ where: { status: "success" } }),
      prisma.intakeForm.count(),
      prisma.clientSubmission.findMany({
        take: 5,
        orderBy: { submittedAt: "desc" },
        select: {
          id: true,
          businessName: true,
          industry: true,
          status: true,
          submittedAt: true,
          contactName: true,
        },
      }),
    ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Submissions" value={totalSubmissions} icon={Inbox} color="blue" />
        <StatCard label="New / Unreviewed" value={newSubmissions} icon={Clock} color="amber" />
        <StatCard label="Sites Generated" value={generatedSites} icon={Globe} color="green" />
        <StatCard label="Intake Forms" value={totalForms} icon={FileText} color="purple" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Submissions</h2>
        </div>
        {recentSubmissions.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Inbox className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p>No submissions yet</p>
            <p className="text-sm mt-1">Create an intake form and share it with a client</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentSubmissions.map((sub) => (
              <Link
                key={sub.id}
                href={`/admin/submissions/${sub.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">{sub.businessName}</p>
                  <p className="text-sm text-gray-500">
                    {sub.contactName} &middot; {sub.industry}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={sub.status} />
                  <span className="text-xs text-gray-400">{formatDate(sub.submittedAt)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
