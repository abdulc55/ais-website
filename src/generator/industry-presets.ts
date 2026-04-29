import type { IndustryPreset } from "@/types";

const defaultFonts = {
  heading: 'Georgia, "Times New Roman", serif',
  body: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const presets: Record<string, IndustryPreset> = {
  "Auto Detailing": {
    colors: {
      primary: "#0f172a", primaryLight: "#1e293b", primaryDark: "#020617",
      accent: "#06b6d4", accentLight: "#22d3ee", accentDark: "#0891b2",
      background: "#ffffff", backgroundDark: "#f1f5f9",
      text: "#0f172a", textLight: "#475569",
    },
    fonts: defaultFonts,
    sectionTitle: "Our Services",
    ctaLabel: "Book Now",
    defaultIcons: ["Car", "Sparkles", "Shield", "Star", "Droplets", "Wrench"],
    suggestedPages: ["Home", "Services", "About", "Contact", "Gallery"],
  },
  "Pressure Washing": {
    colors: {
      primary: "#1e40af", primaryLight: "#3b82f6", primaryDark: "#1e3a8a",
      accent: "#10b981", accentLight: "#34d399", accentDark: "#059669",
      background: "#ffffff", backgroundDark: "#f0f9ff",
      text: "#0f172a", textLight: "#475569",
    },
    fonts: defaultFonts,
    sectionTitle: "Our Services",
    ctaLabel: "Get a Free Quote",
    defaultIcons: ["Droplets", "Home", "Building2", "Fence", "Sparkles", "ThumbsUp"],
    suggestedPages: ["Home", "Services", "About", "Contact", "Gallery"],
  },
  "Law Firm": {
    colors: {
      primary: "#1e3a5f", primaryLight: "#2a4d7a", primaryDark: "#152c4a",
      accent: "#c9a84c", accentLight: "#d4b86a", accentDark: "#b89638",
      background: "#faf8f5", backgroundDark: "#f0ece5",
      text: "#334155", textLight: "#475569",
    },
    fonts: { heading: 'Georgia, "Times New Roman", serif', body: '"Segoe UI", Roboto, sans-serif' },
    sectionTitle: "Practice Areas",
    ctaLabel: "Free Consultation",
    defaultIcons: ["Shield", "Heart", "Gavel", "Briefcase", "FileText", "Home"],
    suggestedPages: ["Home", "Practice Areas", "About", "Testimonials", "Contact"],
  },
  "Restaurant": {
    colors: {
      primary: "#5c3d2e", primaryLight: "#7a5a4a", primaryDark: "#3d2920",
      accent: "#c67d4a", accentLight: "#d4976a", accentDark: "#b06838",
      background: "#fdf6ec", backgroundDark: "#f5e6d0",
      text: "#3d2920", textLight: "#6b5b52",
    },
    fonts: { heading: 'Georgia, "Times New Roman", serif', body: '"Segoe UI", Roboto, sans-serif' },
    sectionTitle: "Our Menu",
    ctaLabel: "Make a Reservation",
    defaultIcons: ["UtensilsCrossed", "Wine", "Salad", "Flame", "Clock", "MapPin"],
    suggestedPages: ["Home", "Menu", "About", "Gallery", "Contact"],
  },
  "Gym / Fitness": {
    colors: {
      primary: "#18181b", primaryLight: "#27272a", primaryDark: "#09090b",
      accent: "#f97316", accentLight: "#fb923c", accentDark: "#ea580c",
      background: "#ffffff", backgroundDark: "#fafafa",
      text: "#18181b", textLight: "#52525b",
    },
    fonts: { heading: '"Inter", "Helvetica Neue", Arial, sans-serif', body: '"Inter", system-ui, sans-serif' },
    sectionTitle: "Programs",
    ctaLabel: "Start Your Trial",
    defaultIcons: ["Dumbbell", "Heart", "Timer", "Users", "Trophy", "Flame"],
    suggestedPages: ["Home", "Programs", "About", "Pricing", "Contact"],
  },
  "Salon": {
    colors: {
      primary: "#831843", primaryLight: "#9d174d", primaryDark: "#6b1535",
      accent: "#f9a8d4", accentLight: "#fbcfe8", accentDark: "#f472b6",
      background: "#fdf2f8", backgroundDark: "#fce7f3",
      text: "#1f2937", textLight: "#6b7280",
    },
    fonts: defaultFonts,
    sectionTitle: "Our Services",
    ctaLabel: "Book Appointment",
    defaultIcons: ["Scissors", "Sparkles", "Heart", "Star", "Palette", "Clock"],
    suggestedPages: ["Home", "Services", "About", "Gallery", "Contact"],
  },
  "Boutique / Retail": {
    colors: {
      primary: "#4a3728", primaryLight: "#6b5344", primaryDark: "#2d2018",
      accent: "#d4a574", accentLight: "#e0bb94", accentDark: "#c08e58",
      background: "#faf5f0", backgroundDark: "#f0e8de",
      text: "#2d2018", textLight: "#6b5b52",
    },
    fonts: defaultFonts,
    sectionTitle: "Collections",
    ctaLabel: "Shop Now",
    defaultIcons: ["ShoppingBag", "Heart", "Star", "Gift", "Sparkles", "Tag"],
    suggestedPages: ["Home", "Shop", "About", "Lookbook", "Contact"],
  },
};

const genericPreset: IndustryPreset = {
  colors: {
    primary: "#1e40af", primaryLight: "#3b82f6", primaryDark: "#1e3a8a",
    accent: "#06b6d4", accentLight: "#22d3ee", accentDark: "#0891b2",
    background: "#ffffff", backgroundDark: "#f8fafc",
    text: "#0f172a", textLight: "#475569",
  },
  fonts: defaultFonts,
  sectionTitle: "Our Services",
  ctaLabel: "Get Started",
  defaultIcons: ["Star", "Shield", "Zap", "Heart", "CheckCircle", "Award"],
  suggestedPages: ["Home", "Services", "About", "Contact"],
};

export function getIndustryPreset(industry: string): IndustryPreset {
  return presets[industry] || genericPreset;
}

export { presets, genericPreset };
