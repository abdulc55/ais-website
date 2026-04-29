import prisma from "@/lib/prisma";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Search } from "lucide-react";

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; industry?: string }>;
}) {
  const params = await searchParams;
  const where: Record<string, string> = {};
  if (params.status) where.status = params.status;
  if (params.industry) where.industry = params.industry;

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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Submissions</h1>
        <div className="flex items-center gap-3">
          <FilterLink label="All" value="" param="status" current={params.status} />
          <FilterLink label="New" value="new" param="status" current={params.status} />
          <FilterLink label="Reviewed" value="reviewed" param="status" current={params.status} />
          <FilterLink label="Generated" value="generated" param="status" current={params.status} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {submissions.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p>No submissions found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Business</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Contact</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Industry</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Budget</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/admin/submissions/${sub.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                      {sub.businessName}
                    </Link>
                    {sub.city && (
                      <p className="text-xs text-gray-400">{sub.city}{sub.state ? `, ${sub.state}` : ""}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{sub.contactName}</p>
                    <p className="text-xs text-gray-400">{sub.contactEmail}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{sub.industry}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{sub.budgetRange || "—"}</td>
                  <td className="px-6 py-4"><StatusBadge status={sub.status} /></td>
                  <td className="px-6 py-4 text-sm text-gray-400">{formatDate(sub.submittedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function FilterLink({ label, value, param, current }: { label: string; value: string; param: string; current?: string }) {
  const isActive = value === "" ? !current : current === value;
  const href = value ? `?${param}=${value}` : "/admin/submissions";
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        isActive ? "bg-blue-50 text-blue-700" : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );
}
