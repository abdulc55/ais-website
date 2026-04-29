/**
 * Transforms a simplified demo form into a SiteConfig object.
 * Reuses industry presets from the existing generation system.
 */
import type { SiteConfig } from "@/types";
import { getIndustryPreset } from "@/generator/industry-presets";

export interface DemoFormData {
  businessName: string;
  industry: string;
  city: string;
  phone?: string;
  email?: string;
  tagline?: string;
  services?: string[];
  primaryCta?: string;
  colorPrimary?: string;
  colorAccent?: string;
  style?: string;
  notes?: string;
}

/**
 * Build a SiteConfig from minimal demo form data.
 * Uses industry presets for everything the form doesn't specify.
 */
export function buildDemoSiteConfig(data: DemoFormData): SiteConfig {
  const preset = getIndustryPreset(data.industry);

  const colors = {
    ...preset.colors,
    ...(data.colorPrimary ? { primary: data.colorPrimary } : {}),
    ...(data.colorAccent ? { accent: data.colorAccent } : {}),
  };

  const serviceItems = (data.services || ["Service 1", "Service 2", "Service 3"]).map(
    (name, i) => ({
      title: name,
      description: `Professional ${name.toLowerCase()} service for ${data.city} area.`,
      icon: preset.defaultIcons[i] || "Star",
    })
  );

  const ctaLabel = data.primaryCta || preset.ctaLabel;
  const tagline = data.tagline || `Professional ${data.industry.toLowerCase()} services in ${data.city}`;

  return {
    business: {
      name: data.businessName,
      tagline,
      phone: data.phone || "(555) 000-0000",
      email: data.email || "info@example.com",
      address: data.city,
      city: data.city.split(",")[0]?.trim() || data.city,
      state: data.city.split(",")[1]?.trim() || "",
      description: `${data.businessName} proudly serves ${data.city} and the surrounding area.`,
    },
    colors,
    fonts: preset.fonts,
    navigation: {
      links: [
        { label: "Home", href: "#" },
        { label: preset.sectionTitle, href: "#services" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
      ],
      ctaLabel,
      ctaHref: "#contact",
    },
    hero: {
      badge: data.industry,
      title: data.businessName,
      subtitle: tagline,
      ctaLabel,
      ctaHref: "#contact",
    },
    services: {
      sectionTitle: preset.sectionTitle,
      items: serviceItems,
    },
    testimonials: {
      sectionTitle: "What Customers Say",
      items: [
        { name: "Happy Customer", text: "Outstanding service. Would recommend to anyone!", rating: 5 },
      ],
    },
    about: {
      title: `About ${data.businessName}`,
      description: `${data.businessName} proudly serves ${data.city} and the surrounding area. We are committed to delivering quality work and exceptional customer experiences.`,
      highlights: ["Locally owned and operated", `Serving ${data.city}`, "Professional and reliable"],
    },
    contact: {
      title: "Get in Touch",
      subtitle: `Ready to get started? Reach out to ${data.businessName} today.`,
    },
    footer: {
      description: `${data.businessName} — proudly serving ${data.city}.`,
    },
    seo: {
      title: `${data.businessName} — ${tagline}`,
      description: `${data.businessName} provides professional ${data.industry.toLowerCase()} services in ${data.city}. ${ctaLabel} today.`,
    },
  };
}
