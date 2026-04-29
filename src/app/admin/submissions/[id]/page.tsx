import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Building2, User, Target, Palette, Globe, Users, DollarSign, Wrench } from "lucide-react";

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await prisma.clientSubmission.findUnique({
    where: { id },
    include: { siteGeneration: true },
  });

  if (!submission) notFound();

  const goals = parseJson(submission.goals) as string[];
  const services = parseJson(submission.services) as { name: string; price: string; duration: string }[];
  const pagesNeeded = parseJson(submission.pagesNeeded) as string[];
  const featuresNeeded = parseJson(submission.featuresNeeded) as string[];
  const brandColors = parseJson(submission.brandColors) as { primary?: string; accent?: string; background?: string };
  const inspirationUrls = parseJson(submission.inspirationUrls) as string[];
  const competitors = parseJson(submission.competitors) as string[];

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/submissions" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{submission.businessName}</h1>
          <p className="text-sm text-gray-500">{submission.industry} &middot; Submitted {formatDate(submission.submittedAt)}</p>
        </div>
        <StatusBadge status={submission.status} />
        {!submission.siteGeneration && (
          <GenerateButton submissionId={submission.id} />
        )}
        {submission.siteGeneration?.status === "success" && (
          <span className="text-sm text-green-600 font-medium">Site generated</span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section icon={Building2} title="Business Information">
          <Field label="Business Name" value={submission.businessName} />
          <Field label="Industry" value={submission.industry} />
          <Field label="Years in Business" value={submission.yearsInBusiness} />
          <Field label="Location" value={[submission.city, submission.state].filter(Boolean).join(", ")} />
          <Field label="Service Area" value={submission.serviceArea} />
          <Field label="Employees" value={submission.employees} />
          <Field label="Current Website" value={submission.currentWebsite} />
        </Section>

        <Section icon={User} title="Contact Information">
          <Field label="Name" value={submission.contactName} />
          <Field label="Email" value={submission.contactEmail} />
          <Field label="Phone" value={submission.contactPhone} />
          <Field label="Preferred Contact" value={submission.preferredContact} />
          <Field label="Best Time" value={submission.bestTimeToReach} />
        </Section>

        <Section icon={Target} title="Goals">
          {goals.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {goals.map((g) => (
                <span key={g} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{g}</span>
              ))}
            </div>
          ) : <p className="text-sm text-gray-400">Not specified</p>}
          <Field label="Primary CTA" value={submission.primaryCta} />
        </Section>

        <Section icon={Wrench} title="Services">
          {services.length > 0 ? (
            <div className="space-y-2">
              {services.map((s, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-sm font-medium text-gray-900">{s.name}</span>
                  <div className="flex gap-3 text-xs text-gray-500">
                    {s.price && <span>{s.price}</span>}
                    {s.duration && <span>{s.duration}</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-sm text-gray-400">Not specified</p>}
        </Section>

        <Section icon={Palette} title="Branding">
          <Field label="Has Logo" value={submission.hasLogo ? "Yes" : "No"} />
          <Field label="Style Preference" value={submission.stylePreference} />
          <Field label="Tagline" value={submission.tagline} />
          <Field label="Desired Feeling" value={submission.desiredFeeling} />
          {brandColors.primary && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-500">Colors:</span>
              {brandColors.primary && <ColorSwatch color={brandColors.primary} label="Primary" />}
              {brandColors.accent && <ColorSwatch color={brandColors.accent} label="Accent" />}
              {brandColors.background && <ColorSwatch color={brandColors.background} label="Background" />}
            </div>
          )}
          {inspirationUrls.length > 0 && (
            <div className="mt-2">
              <span className="text-xs text-gray-500 block mb-1">Inspiration:</span>
              {inspirationUrls.map((url) => (
                <span key={url} className="text-xs text-blue-600 block">{url}</span>
              ))}
            </div>
          )}
        </Section>

        <Section icon={Globe} title="Website Needs">
          <div className="mb-3">
            <span className="text-xs text-gray-500 block mb-1">Pages:</span>
            <div className="flex flex-wrap gap-1.5">
              {pagesNeeded.map((p) => (
                <span key={p} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-700">{p}</span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-500 block mb-1">Features:</span>
            <div className="flex flex-wrap gap-1.5">
              {featuresNeeded.map((f) => (
                <span key={f} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-700">{f}</span>
              ))}
            </div>
          </div>
        </Section>

        <Section icon={Users} title="Target Customers">
          <Field label="Ideal Customer" value={submission.idealCustomer} />
          <Field label="Age Range" value={submission.ageRange} />
          <Field label="How They Find You" value={submission.howCustomersFind} />
          <Field label="Differentiator" value={submission.differentiator} />
          {competitors.length > 0 && (
            <div className="mt-1">
              <span className="text-xs text-gray-500">Competitors: </span>
              <span className="text-sm text-gray-700">{competitors.join(", ")}</span>
            </div>
          )}
        </Section>

        <Section icon={DollarSign} title="Budget & Details">
          <Field label="Budget Range" value={submission.budgetRange} />
          <Field label="Launch Date" value={submission.launchDate} />
          <Field label="Urgent" value={submission.isUrgent ? "Yes" : "No"} />
          <Field label="Existing Domain" value={submission.existingDomain} />
          {submission.additionalNotes && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              <span className="text-xs text-gray-500 block mb-1">Additional Notes:</span>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{submission.additionalNotes}</p>
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-gray-400" />
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2">
      <span className="text-xs text-gray-500 min-w-[120px]">{label}:</span>
      <span className="text-sm text-gray-900">{value}</span>
    </div>
  );
}

function ColorSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className="w-5 h-5 rounded border border-gray-200" style={{ backgroundColor: color }} />
      <span className="text-xs text-gray-600">{label}</span>
    </div>
  );
}

function GenerateButton({ submissionId }: { submissionId: string }) {
  return (
    <form action={`/api/submissions/${submissionId}/generate`} method="POST">
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors"
      >
        Generate Site
      </button>
    </form>
  );
}

function parseJson(value: string | null): unknown[] | Record<string, string> {
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}
