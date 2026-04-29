import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { siteConfig } from "@/siteConfig";

export default function HomePage() {
  return (
    <>
      {/* Hero — light editorial. Two-column on desktop, stacked on mobile. */}
      <section className="bg-canvas pt-20 pb-20 md:pt-28 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              {siteConfig.hero.badge && (
                <div className="inline-flex items-center gap-2 text-text-muted text-xs uppercase tracking-[0.12em] mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>{siteConfig.hero.badge}</span>
                </div>
              )}
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-primary leading-[1.05] tracking-tight mb-6">
                {siteConfig.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-secondary max-w-xl mb-10 leading-relaxed">
                {siteConfig.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href={siteConfig.hero.ctaHref}
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white px-7 py-3.5 rounded-md text-base font-semibold transition shadow-sm"
                >
                  {siteConfig.hero.ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {siteConfig.hero.secondaryCtaLabel && (
                  <Link
                    href={siteConfig.hero.secondaryCtaHref || "/about"}
                    className="inline-flex items-center justify-center bg-surface hover:bg-muted text-primary border border-border-strong px-7 py-3.5 rounded-md text-base font-semibold transition"
                  >
                    {siteConfig.hero.secondaryCtaLabel}
                  </Link>
                )}
              </div>
            </div>

            {/* Right column reserved for future tenant hero photo. Quiet
                accent-soft fallback so the panel never feels empty. */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted border border-border-subtle">
                <div className="absolute inset-0 bg-gradient-to-br from-muted via-canvas to-accent-soft" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — quiet row on muted background. */}
      {siteConfig.stats && (
        <section className="bg-muted py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {siteConfig.stats.map((stat, i) => (
                <div key={i}>
                  <p className="font-display text-4xl text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      <section className="bg-canvas py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl text-primary tracking-tight mb-4">
              {siteConfig.services.sectionTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.services.items.map((service, i) => (
              <div
                key={i}
                className="bg-surface rounded-xl border border-border-subtle p-7 transition hover:border-border-strong hover:shadow-sm"
              >
                <div className="w-10 h-10 bg-accent-soft rounded-md flex items-center justify-center mb-4">
                  <span className="text-accent font-display text-lg">
                    {service.icon.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {service.title}
                </h3>
                <p className="text-secondary text-sm mb-3 leading-relaxed">
                  {service.description}
                </p>
                {service.price && (
                  <p className="text-accent font-semibold">{service.price}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl text-primary tracking-tight mb-4">
              {siteConfig.testimonials.sectionTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteConfig.testimonials.items.map((t, i) => (
              <div
                key={i}
                className="bg-surface rounded-xl border border-border-subtle p-7"
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="font-display italic text-lg text-primary mb-6 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="font-medium text-primary text-sm pt-5 border-t border-border-subtle">
                  {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA — light section with accent CTA. */}
      <section className="bg-canvas py-20 md:py-24 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-5xl text-primary tracking-tight mb-4">
            {siteConfig.contact.title}
          </h2>
          <p className="text-secondary text-lg mb-10">
            {siteConfig.contact.subtitle}
          </p>
          <Link
            href={siteConfig.navigation.ctaHref}
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white px-7 py-3.5 rounded-md text-base font-semibold transition shadow-sm"
          >
            {siteConfig.navigation.ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
