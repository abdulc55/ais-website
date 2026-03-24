import Link from "next/link";
import { cn } from "@/lib/cn";

interface HeroProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tall?: boolean;
}

export function Hero({
  badge,
  title,
  highlight,
  subtitle,
  primaryCta,
  secondaryCta,
  tall = false,
}: HeroProps) {
  const renderedTitle = highlight
    ? title.split(highlight).map((part, i, arr) => (
        <span key={i}>
          {part}
          {i < arr.length - 1 && (
            <span className="gradient-text">{highlight}</span>
          )}
        </span>
      ))
    : title;

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-navy via-primary-900 to-navy-dark",
        tall
          ? "min-h-screen flex items-center pt-20"
          : "py-20 md:py-28 pt-28 md:pt-36"
      )}
    >
      {/* Decorative gradient blurs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-cyan-500/20 blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-primary-500/20 blur-[128px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cyan-400/10 blur-[96px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="text-sm font-medium text-cyan-300">{badge}</span>
          </div>
        )}

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight max-w-4xl mx-auto">
          {renderedTitle}
        </h1>

        {subtitle && (
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="cta-gradient text-white rounded-full px-8 py-3.5 font-semibold text-lg transition-opacity hover:opacity-90 inline-block"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="border-2 border-white/20 text-white rounded-full px-8 py-3.5 font-semibold text-lg hover:bg-white/10 transition-colors inline-block"
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
