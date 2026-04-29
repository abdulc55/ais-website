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
  fonts: {
    heading: string;
    body: string;
  };
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
    items: {
      icon: string;
      title: string;
      description: string;
      price?: string;
    }[];
  };
  testimonials: {
    sectionTitle: string;
    items: {
      name: string;
      text: string;
      rating: number;
    }[];
  };
  stats?: {
    value: string;
    label: string;
  }[];
  about: {
    title: string;
    description: string;
    highlights: string[];
  };
  contact: {
    title: string;
    subtitle: string;
  };
  footer: {
    description: string;
    hours?: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

export interface IndustryPreset {
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
  fonts: {
    heading: string;
    body: string;
  };
  sectionTitle: string;
  ctaLabel: string;
  defaultIcons: string[];
  suggestedPages: string[];
}

export interface IntakeFormData {
  // Step 1: Business & Contact
  businessName: string;
  industry: string;
  yearsInBusiness: string;
  city: string;
  state: string;
  serviceArea: string;
  employees: string;
  currentWebsite: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  preferredContact: string;
  bestTimeToReach: string;

  // Step 2: Goals
  goals: string[];
  primaryCta: string;

  // Step 3: Services
  services: { name: string; price: string; duration: string }[];
  cancellationPolicy: string;

  // Step 4: Branding
  hasLogo: boolean;
  brandColors: { primary: string; accent: string; background: string };
  stylePreference: string;
  tagline: string;
  desiredFeeling: string;
  inspirationUrls: string[];

  // Step 5: Pages & Features
  pagesNeeded: string[];
  featuresNeeded: string[];

  // Step 6: Customers
  idealCustomer: string;
  ageRange: string;
  howCustomersFind: string;
  competitors: string[];
  differentiator: string;

  // Step 7: Budget & Details
  existingDomain: string;
  existingHosting: string;
  socialMedia: { instagram: string; facebook: string; google: string };
  budgetRange: string;
  launchDate: string;
  isUrgent: boolean;
  additionalNotes: string;
}
