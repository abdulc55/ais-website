import type { SiteConfig } from "@/types";
import type { ClientSubmission } from "@/generated/prisma/client";
import { getIndustryPreset } from "./industry-presets";

function parseJson(value: string | null): unknown {
  if (!value) return [];
  try { return JSON.parse(value); } catch { return []; }
}

export function buildSiteConfig(submission: ClientSubmission): SiteConfig {
  const preset = getIndustryPreset(submission.industry);
  const brandColors = parseJson(submission.brandColors) as { primary?: string; accent?: string; background?: string };
  const services = parseJson(submission.services) as { name: string; price: string; duration: string }[];
  const pagesNeeded = parseJson(submission.pagesNeeded) as string[];
  const goals = parseJson(submission.goals) as string[];

  // Use client's brand colors if provided, otherwise fall back to preset
  const hasCustomColors = brandColors.primary && brandColors.primary.length > 0;
  const colors = hasCustomColors
    ? {
        primary: brandColors.primary!,
        primaryLight: lightenHex(brandColors.primary!, 20),
        primaryDark: darkenHex(brandColors.primary!, 15),
        accent: brandColors.accent || preset.colors.accent,
        accentLight: brandColors.accent ? lightenHex(brandColors.accent, 20) : preset.colors.accentLight,
        accentDark: brandColors.accent ? darkenHex(brandColors.accent, 15) : preset.colors.accentDark,
        background: brandColors.background || preset.colors.background,
        backgroundDark: brandColors.background ? darkenHex(brandColors.background, 5) : preset.colors.backgroundDark,
        text: preset.colors.text,
        textLight: preset.colors.textLight,
      }
    : preset.colors;

  // Build navigation links from selected pages
  const navLinks = buildNavLinks(pagesNeeded, preset.suggestedPages);

  // Determine CTA
  const ctaLabel = submission.primaryCta || preset.ctaLabel;
  const ctaHref = goals.includes("Accept online bookings") ? "/booking" : "/contact";

  // Map services to site config format
  const serviceItems = services.length > 0
    ? services.map((s, i) => ({
        icon: preset.defaultIcons[i % preset.defaultIcons.length],
        title: s.name,
        description: `Professional ${s.name.toLowerCase()} service${s.duration ? ` (${s.duration})` : ""}`,
        price: s.price || undefined,
      }))
    : [
        { icon: preset.defaultIcons[0], title: "Service 1", description: "Description of your first service" },
        { icon: preset.defaultIcons[1], title: "Service 2", description: "Description of your second service" },
        { icon: preset.defaultIcons[2], title: "Service 3", description: "Description of your third service" },
      ];

  const location = [submission.city, submission.state].filter(Boolean).join(", ");

  return {
    business: {
      name: submission.businessName,
      tagline: submission.tagline || `Trusted ${submission.industry} in ${location || "your area"}`,
      phone: submission.contactPhone || "(555) 000-0000",
      email: submission.contactEmail,
      address: location || "Your City, State",
      city: submission.city || "",
      state: submission.state || "",
      description: `${submission.businessName} provides professional ${submission.industry.toLowerCase()} services${location ? ` in ${location}` : ""}. ${submission.tagline || ""}`.trim(),
    },
    colors,
    fonts: preset.fonts,
    navigation: {
      links: navLinks,
      ctaLabel,
      ctaHref,
    },
    hero: {
      badge: submission.industry,
      title: submission.tagline || `Welcome to ${submission.businessName}`,
      subtitle: `Professional ${submission.industry.toLowerCase()} services${location ? ` serving ${location}` : ""}. ${submission.differentiator || "Quality you can trust."}`,
      ctaLabel,
      ctaHref,
      secondaryCtaLabel: "Learn More",
      secondaryCtaHref: "/about",
    },
    services: {
      sectionTitle: preset.sectionTitle,
      items: serviceItems,
    },
    testimonials: {
      sectionTitle: "What Our Clients Say",
      items: [
        { name: "Happy Customer", text: `${submission.businessName} provided excellent service. Highly recommend!`, rating: 5 },
        { name: "Satisfied Client", text: "Professional, reliable, and great attention to detail. Will use again.", rating: 5 },
        { name: "Loyal Customer", text: "Been using their services for years. Consistently exceeds expectations.", rating: 5 },
      ],
    },
    stats: [
      { value: submission.yearsInBusiness ? `${submission.yearsInBusiness}` : "5+", label: "Years Experience" },
      { value: "500+", label: "Happy Clients" },
      { value: "100%", label: "Satisfaction" },
      { value: "5.0", label: "Google Rating" },
    ],
    about: {
      title: `About ${submission.businessName}`,
      description: `${submission.businessName} is a trusted ${submission.industry.toLowerCase()} business${location ? ` based in ${location}` : ""}. ${submission.differentiator || "We are committed to providing the highest quality service to every customer."}`,
      highlights: [
        submission.yearsInBusiness ? `${submission.yearsInBusiness} years of experience` : "Years of experience",
        "Licensed & insured",
        "Customer satisfaction guaranteed",
        location ? `Serving the ${location} area` : "Local, trusted service",
      ],
    },
    contact: {
      title: "Get in Touch",
      subtitle: `Ready to get started? Contact ${submission.businessName} today.`,
    },
    footer: {
      description: `${submission.businessName} — ${submission.tagline || `Professional ${submission.industry.toLowerCase()} services`}`,
    },
    seo: {
      title: `${submission.businessName} | ${submission.industry}${location ? ` in ${location}` : ""}`,
      description: `${submission.businessName} provides professional ${submission.industry.toLowerCase()} services${location ? ` in ${location}` : ""}. Contact us today!`,
    },
  };
}

function buildNavLinks(pagesNeeded: string[], suggestedPages: string[]): { href: string; label: string }[] {
  const pages = pagesNeeded.length > 0 ? pagesNeeded : suggestedPages;
  const routeMap: Record<string, string> = {
    "Home": "/",
    "About": "/about",
    "Services": "/services",
    "Contact": "/contact",
    "Booking / Scheduling": "/contact",
    "Portfolio / Gallery": "/gallery",
    "Reviews / Testimonials": "/testimonials",
    "Blog": "/blog",
    "FAQ": "/faq",
    "Pricing": "/pricing",
    "Practice Areas": "/services",
    "Menu": "/services",
    "Programs": "/services",
    "Shop": "/services",
    "Lookbook": "/gallery",
    "Gallery": "/gallery",
  };

  return pages
    .filter((p) => p !== "Home" && p !== "Careers" && p !== "Legal / Privacy")
    .slice(0, 5)
    .map((p) => ({ href: routeMap[p] || `/${p.toLowerCase().replace(/\s+/g, "-")}`, label: p }));
}

function lightenHex(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, ((num >> 16) & 0xff) + Math.round(255 * percent / 100));
  const g = Math.min(255, ((num >> 8) & 0xff) + Math.round(255 * percent / 100));
  const b = Math.min(255, (num & 0xff) + Math.round(255 * percent / 100));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function darkenHex(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, ((num >> 16) & 0xff) - Math.round(255 * percent / 100));
  const g = Math.max(0, ((num >> 8) & 0xff) - Math.round(255 * percent / 100));
  const b = Math.max(0, (num & 0xff) - Math.round(255 * percent / 100));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
