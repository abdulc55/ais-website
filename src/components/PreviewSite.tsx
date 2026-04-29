/**
 * PreviewSite — Renders a complete single-page branded preview from SiteConfig.
 * Used for sales demo share links at /preview/[token].
 */
import type { SiteConfig } from "@/types";
import { Phone, Mail, MapPin, Star, Check } from "lucide-react";

interface PreviewSiteProps {
  config: SiteConfig;
  businessName: string;
  industry: string;
}

export function PreviewSite({ config, businessName }: PreviewSiteProps) {
  const { colors, hero, services, about, contact, business, navigation } = config;

  return (
    <div style={{ fontFamily: config.fonts?.body || "system-ui, sans-serif" }}>
      {/* Prepared-for badge */}
      <div className="fixed top-4 right-4 z-50 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-lg">
        <p className="text-xs text-gray-500">
          Preview prepared for <span className="font-bold text-gray-900">{businessName}</span>
        </p>
        <p className="text-[10px] text-gray-400">
          by <a href="https://spiffytec.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Spiffy Tec</a>
        </p>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b" style={{ backgroundColor: colors.primary, borderColor: colors.primaryLight }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-white" style={{ fontFamily: config.fonts?.heading }}>
            {business.name}
          </span>
          <div className="hidden md:flex items-center gap-6">
            {navigation.links.map((link) => (
              <a key={link.label} href={link.href} className="text-sm text-white/80 hover:text-white transition">
                {link.label}
              </a>
            ))}
            <a href={navigation.ctaHref} className="text-sm font-semibold px-5 py-2 rounded-full text-white" style={{ backgroundColor: colors.accent }}>
              {navigation.ctaLabel}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 text-center text-white" style={{ backgroundColor: colors.primary }}>
        {hero.badge && (
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/20 bg-white/10">
            {hero.badge}
          </span>
        )}
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight" style={{ fontFamily: config.fonts?.heading }}>
          {hero.title}
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto opacity-80">
          {hero.subtitle}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={hero.ctaHref} className="px-8 py-3.5 rounded-full font-semibold text-lg" style={{ backgroundColor: colors.accent, color: "#fff" }}>
            {hero.ctaLabel}
          </a>
          {hero.secondaryCtaLabel && (
            <a href={hero.secondaryCtaHref || "#"} className="px-8 py-3.5 rounded-full font-semibold text-lg border-2 border-white/30 text-white hover:bg-white/10 transition">
              {hero.secondaryCtaLabel}
            </a>
          )}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6" style={{ backgroundColor: colors.background }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.text, fontFamily: config.fonts?.heading }}>
            {services.sectionTitle}
          </h2>
          <div className={`grid gap-6 ${services.items.length <= 3 ? "md:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
            {services.items.map((item) => (
              <div key={item.title} className="border rounded-xl p-6 text-center" style={{ borderColor: colors.backgroundDark, backgroundColor: "#fff" }}>
                <div className="mx-auto mb-4 w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.accent + "15", color: colors.accent }}>
                  <Star className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-lg" style={{ color: colors.text }}>{item.title}</h3>
                {item.description && <p className="mt-2 text-sm" style={{ color: colors.textLight }}>{item.description}</p>}
                {item.price && <p className="mt-3 font-bold text-lg" style={{ color: colors.accent }}>{item.price}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6" style={{ backgroundColor: colors.backgroundDark }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6" style={{ color: colors.text, fontFamily: config.fonts?.heading }}>
            {about.title}
          </h2>
          <p className="text-center text-lg leading-relaxed mb-8" style={{ color: colors.textLight }}>
            {about.description}
          </p>
          {about.highlights && about.highlights.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4">
              {about.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: colors.accent + "40", backgroundColor: colors.accent + "10" }}>
                  <Check className="w-4 h-4" style={{ color: colors.accent }} />
                  <span className="text-sm font-medium" style={{ color: colors.text }}>{h}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 text-white" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: config.fonts?.heading }}>
            {contact.title}
          </h2>
          <p className="text-lg opacity-80 mb-10">{contact.subtitle}</p>

          <div className="grid gap-6 sm:grid-cols-3 mb-10">
            {business.phone && (
              <div className="flex flex-col items-center gap-2">
                <Phone className="w-6 h-6 opacity-70" />
                <span className="text-sm">{business.phone}</span>
              </div>
            )}
            {business.email && (
              <div className="flex flex-col items-center gap-2">
                <Mail className="w-6 h-6 opacity-70" />
                <span className="text-sm">{business.email}</span>
              </div>
            )}
            {business.address && (
              <div className="flex flex-col items-center gap-2">
                <MapPin className="w-6 h-6 opacity-70" />
                <span className="text-sm">{business.address}</span>
              </div>
            )}
          </div>

          <a href={navigation.ctaHref} className="inline-block px-8 py-3.5 rounded-full font-semibold text-lg" style={{ backgroundColor: colors.accent, color: "#fff" }}>
            {navigation.ctaLabel}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t" style={{ backgroundColor: colors.backgroundDark, borderColor: colors.backgroundDark }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: colors.textLight }}>
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <p>
            Built by{" "}
            <a href="https://spiffytec.com" className="font-semibold hover:underline" style={{ color: colors.accent }} target="_blank" rel="noopener noreferrer">
              Spiffy Tec
            </a>
          </p>
        </div>
      </footer>

      {/* Bottom CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 py-3 px-6 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Like what you see? <span className="font-semibold text-gray-900">Let&apos;s make it real.</span>
          </p>
          <a
            href="https://spiffytec.com/audit"
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: colors.accent }}
          >
            Get Started with Spiffy Tec
          </a>
        </div>
      </div>
    </div>
  );
}
