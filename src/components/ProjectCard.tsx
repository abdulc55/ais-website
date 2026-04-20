import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { TechBadge } from "@/components/TechBadge";

interface ProjectCardMetric {
  value: string;
  label: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
  imagePlaceholder?: string;
  metrics?: ProjectCardMetric[];
  proofPoints?: string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function ProjectCard({
  title,
  description,
  tags,
  featured = false,
  imagePlaceholder,
  metrics = [],
  proofPoints = [],
  primaryCta,
  secondaryCta,
}: ProjectCardProps) {
  const placeholder = (
    <div
      className={cn(
        "bg-gradient-to-br from-navy-dark via-navy to-navy-light flex items-center justify-center",
        featured ? "h-full min-h-[240px]" : "h-48 md:h-56"
      )}
    >
      <span className="text-white/50 text-sm font-medium">
        {imagePlaceholder ?? "Product preview"}
      </span>
    </div>
  );

  if (featured) {
    return (
      <div className="overflow-hidden rounded-[2rem] bg-white card-shadow grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-gradient-to-br from-navy-dark via-navy to-navy-light p-6 md:p-8 text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/85">
            Platform Snapshot
          </div>

          {metrics.length > 0 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm"
                >
                  <p className="text-2xl font-bold tracking-tight text-white">{metric.value}</p>
                  <p className="mt-1 text-sm text-white/65">{metric.label}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 rounded-3xl border border-white/12 bg-white/6 p-5">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
                  What Shipped
                </p>
                <p className="mt-1 text-lg font-semibold text-white">A full operating system for bookings</p>
              </div>
              <div className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                Live
              </div>
            </div>

            <ul className="mt-4 space-y-3">
              {proofPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                  <span className="text-sm leading-relaxed text-white/80">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium text-white/75"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-dark mb-2">
            Featured Project
          </span>
          <h3 className="text-3xl font-bold tracking-tight text-navy">{title}</h3>
          <p className="mt-4 text-base leading-relaxed text-text-muted">{description}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-dark">
                Business Problem
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Phone-only scheduling and manual payments were slowing down growth.
              </p>
            </div>
            <div className="rounded-2xl bg-surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-dark">
                Business Outcome
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Customers can book, pay, and rebook without waiting on a callback.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TechBadge key={tag} name={tag} />
            ))}
          </div>

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-navy-light"
                >
                  {primaryCta.label} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/15 px-6 py-3 font-semibold text-navy transition-colors hover:bg-surface-muted"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden flex flex-col">
      {placeholder}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-navy mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TechBadge key={tag} name={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
