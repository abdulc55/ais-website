import Link from "next/link";
import { cn } from "@/lib/cn";
import { HeroBackground } from "@/components/HeroBackground";

interface HeroProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  supportingPoints?: string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
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
            <span className={tall ? "text-white underline decoration-amber decoration-4 underline-offset-8" : "text-amber-dark"}>{highlight}</span>
          )}
        </span>
      ))
    : title;

  return (
    <section
      data-page-hero
      data-hero-tone={tall ? "dark" : "light"}
      className={cn(
        "relative overflow-hidden",
        tall
          ? "min-h-[75vh] flex items-center pt-20 bg-navy"
          : "bg-surface pt-28 md:pt-32 pb-8 md:pb-10"
      )}
    >
      {/* Spiral animation — pushed behind content with a dark overlay */}
      {tall && (
        <>
          <HeroBackground />
          {/* Dark overlay so animation doesn't compete with text */}
          <div className="absolute inset-0 z-[1] bg-navy/60" />
        </>
      )}

      {/* Subtle top accent bar — only on non-animated heroes */}
      {!tall && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy via-amber to-navy" />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <div className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6",
            tall
              ? "bg-white border border-white/20"
              : "bg-navy/5 border border-navy/10"
          )}>
            <span className={cn("text-sm font-semibold", tall ? "text-navy" : "text-navy")}>
              {badge}
            </span>
          </div>
        )}

        <h1 className={cn(
          "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight max-w-4xl mx-auto",
          tall ? "text-white" : "text-navy"
        )}>
          {renderedTitle}
        </h1>

        {subtitle && (
          <p className={cn(
            "mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed",
            tall ? "text-white bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-6 py-4 inline-block" : "text-text-muted"
          )}>
            {subtitle}
          </p>
        )}

        {supportingPoints && supportingPoints.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {supportingPoints.map((point) => (
              <span
                key={point}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium",
                  tall
                    ? "border border-white/20 bg-white text-navy font-semibold"
                    : "border border-navy/10 bg-white text-navy"
                )}
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
                className={cn(
                  "rounded-full px-8 py-3.5 font-semibold text-lg transition-colors inline-block",
                  tall
                    ? "bg-amber text-navy-dark hover:bg-amber-dark"
                    : "bg-navy text-white hover:bg-navy-light"
                )}
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className={cn(
                  "border-2 rounded-full px-8 py-3.5 font-semibold text-lg transition-colors inline-block",
                  tall
                    ? "border-white/30 text-white hover:bg-white/10"
                    : "border-navy/20 text-navy hover:bg-navy/5"
                )}
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
