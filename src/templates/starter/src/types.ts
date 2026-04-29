export interface SiteConfig {
  business: {
    name: string;
    tagline: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    description: string;
  };
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    accent: string;
    accentLight: string;
    accentDark: string;
    background: string;
    backgroundDark: string;
    text: string;
    textLight: string;
  };
  fonts: { heading: string; body: string };
  navigation: {
    links: { href: string; label: string }[];
    ctaLabel: string;
    ctaHref: string;
  };
  hero: {
    badge?: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
  };
  services: {
    sectionTitle: string;
    items: { icon: string; title: string; description: string; price?: string }[];
  };
  testimonials: {
    sectionTitle: string;
    items: { name: string; text: string; rating: number }[];
  };
  stats?: { value: string; label: string }[];
  about: { title: string; description: string; highlights: string[] };
  contact: { title: string; subtitle: string };
  footer: { description: string; hours?: string };
  seo: { title: string; description: string };
}
