import Link from "next/link";
import { cn } from "@/lib/cn";

interface HeroProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  supportingPoints?: string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Reserved for future use; the hero is always light now. */
  tall?: boolean;
}

export function Hero({
  badge,
  title,
  highlight,
  subtitle,
  supportingPoints,
  primaryCta,
  secondaryCta,
  tall = false,
}: HeroProps) {
  const renderedTitle = highlight
    ? title.split(highlight).map((part, i, arr) => (
        <span key={i}>
          {part}
          {i < arr.length - 1 && (
            <span className="text-[var(--color-spiffy-orange)]">{highlight}</span>
          )}
        </span>
      ))
    : title;

  return (
    <section
      data-page-hero
      data-hero-tone="light"
      className={cn(
        "relative overflow-hidden bg-white",
        tall ? "pt-28 md:pt-36 pb-20 md:pb-28" : "pt-28 md:pt-32 pb-8 md:pb-10"
      )}
    >
      {/* Soft orange decoration — purely decorative, no animation */}
      {tall && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(closest-side, #FFE0CB, transparent)" }}
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 bg-[var(--color-spiffy-orange-soft)] border border-[var(--color-border)]">
            <span className="text-sm font-semibold text-[var(--color-spiffy-orange-dark)]">
              {badge}
            </span>
          </div>
        )}

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight max-w-4xl mx-auto text-[var(--color-ink)]">
          {renderedTitle}
        </h1>

        {subtitle && (
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-[var(--color-ink-muted)]">
            {subtitle}
          </p>
        )}

        {supportingPoints && supportingPoints.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {supportingPoints.map((point) => (
              <span
                key={point}
                className="rounded-full px-4 py-2 text-sm font-medium border border-[var(--color-border)] bg-white text-[var(--color-ink)]"
              >
                {point}
              </span>
            ))}
          </div>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="rounded-full px-8 py-3.5 font-semibold text-lg inline-block bg-[var(--color-spiffy-orange)] text-white hover:bg-[var(--color-spiffy-orange-dark)] transition-colors"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="rounded-full px-8 py-3.5 font-semibold text-lg inline-block bg-white border border-[var(--color-border-strong)] text-[var(--color-ink)] hover:border-[var(--color-spiffy-orange)] hover:text-[var(--color-spiffy-orange)] transition-colors"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
