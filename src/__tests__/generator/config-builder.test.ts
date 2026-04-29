import { buildSiteConfig } from "@/generator/config-builder";
import type { ClientSubmission } from "@/generated/prisma/client";

function makeSubmission(overrides: Partial<ClientSubmission> = {}): ClientSubmission {
  return {
    id: "test-id",
    intakeFormId: "form-id",
    businessName: "Mike T Detailing",
    industry: "Auto Detailing",
    yearsInBusiness: "5",
    city: "Cary",
    state: "NC",
    serviceArea: "Triangle, NC",
    employees: "3",
    currentWebsite: null,
    contactName: "Mike Thompson",
    contactEmail: "mike@miketdetailing.com",
    contactPhone: "(919) 555-1234",
    preferredContact: "phone",
    bestTimeToReach: "mornings",
    goals: JSON.stringify(["Generate more leads", "Accept online bookings"]),
    primaryCta: "Book Now",
    services: JSON.stringify([
      { name: "Basic Detail", price: "$99", duration: "1-2 hrs" },
      { name: "Premium Detail", price: "$225", duration: "3-4 hrs" },
    ]),
    cancellationPolicy: "24 hour",
    hasLogo: true,
    brandColors: JSON.stringify({ primary: "#1a1a2e", accent: "#16213e", background: "#ffffff" }),
    stylePreference: "Modern & Minimal",
    tagline: "Your car, our passion",
    desiredFeeling: "Premium, professional",
    inspirationUrls: JSON.stringify(["https://example.com"]),
    pagesNeeded: JSON.stringify(["Home", "Services", "About", "Contact"]),
    featuresNeeded: JSON.stringify(["Contact form", "Online booking / scheduling"]),
    idealCustomer: "Homeowners with 2+ cars",
    ageRange: "30-55",
    howCustomersFind: "Google, word of mouth",
    competitors: JSON.stringify(["DetailKing", "CleanCar Pro"]),
    differentiator: "We come to you",
    existingDomain: "miketdetailing.com",
    existingHosting: null,
    socialMedia: JSON.stringify({ instagram: "@miketdetailing" }),
    budgetRange: "$149–$249/mo",
    launchDate: "April 2026",
    isUrgent: false,
    additionalNotes: null,
    status: "new",
    submittedAt: new Date(),
    reviewedAt: null,
    generatedAt: null,
    ...overrides,
  } as ClientSubmission;
}

describe("buildSiteConfig", () => {
  it("produces a complete SiteConfig object", () => {
    const config = buildSiteConfig(makeSubmission());
    expect(config).toBeDefined();
    expect(config.business).toBeDefined();
    expect(config.colors).toBeDefined();
    expect(config.fonts).toBeDefined();
    expect(config.navigation).toBeDefined();
    expect(config.hero).toBeDefined();
    expect(config.services).toBeDefined();
    expect(config.testimonials).toBeDefined();
    expect(config.about).toBeDefined();
    expect(config.contact).toBeDefined();
    expect(config.footer).toBeDefined();
    expect(config.seo).toBeDefined();
  });

  describe("business info", () => {
    it("maps business name correctly", () => {
      const config = buildSiteConfig(makeSubmission());
      expect(config.business.name).toBe("Mike T Detailing");
      expect(config.business.email).toBe("mike@miketdetailing.com");
      expect(config.business.phone).toBe("(919) 555-1234");
    });

    it("includes city and state in address", () => {
      const config = buildSiteConfig(makeSubmission());
      expect(config.business.address).toContain("Cary");
      expect(config.business.address).toContain("NC");
    });

    it("uses tagline when provided", () => {
      const config = buildSiteConfig(makeSubmission({ tagline: "Best in town" }));
      expect(config.business.tagline).toBe("Best in town");
    });

    it("generates fallback tagline when none provided", () => {
      const config = buildSiteConfig(makeSubmission({ tagline: null }));
      expect(config.business.tagline).toContain("Auto Detailing");
    });
  });

  describe("colors", () => {
    it("uses client brand colors when provided", () => {
      const config = buildSiteConfig(makeSubmission());
      expect(config.colors.primary).toBe("#1a1a2e");
      expect(config.colors.accent).toBe("#16213e");
    });

    it("falls back to industry preset when no brand colors", () => {
      const config = buildSiteConfig(makeSubmission({
        brandColors: JSON.stringify({ primary: "", accent: "", background: "" }),
      }));
      // Should use Auto Detailing preset
      expect(config.colors.primary).toBe("#0f172a");
    });

    it("falls back to industry preset when null", () => {
      const config = buildSiteConfig(makeSubmission({ brandColors: null }));
      expect(config.colors.primary).toBe("#0f172a");
    });

    it("generates light/dark variants", () => {
      const config = buildSiteConfig(makeSubmission());
      expect(config.colors.primaryLight).toBeTruthy();
      expect(config.colors.primaryDark).toBeTruthy();
    });
  });

  describe("navigation", () => {
    it("builds nav links from selected pages", () => {
      const config = buildSiteConfig(makeSubmission());
      const labels = config.navigation.links.map((l) => l.label);
      expect(labels).toContain("Services");
      expect(labels).toContain("About");
      expect(labels).toContain("Contact");
    });

    it("excludes Home from nav links (it's the logo link)", () => {
      const config = buildSiteConfig(makeSubmission());
      const labels = config.navigation.links.map((l) => l.label);
      expect(labels).not.toContain("Home");
    });

    it("uses client CTA when provided", () => {
      const config = buildSiteConfig(makeSubmission({ primaryCta: "Call Us" }));
      expect(config.navigation.ctaLabel).toBe("Call Us");
    });

    it("falls back to industry CTA when no client CTA", () => {
      const config = buildSiteConfig(makeSubmission({ primaryCta: null }));
      expect(config.navigation.ctaLabel).toBe("Book Now"); // Auto Detailing preset
    });
  });

  describe("services", () => {
    it("maps client services to config items", () => {
      const config = buildSiteConfig(makeSubmission());
      expect(config.services.items.length).toBe(2);
      expect(config.services.items[0].title).toBe("Basic Detail");
      expect(config.services.items[0].price).toBe("$99");
      expect(config.services.items[1].title).toBe("Premium Detail");
    });

    it("assigns icons from industry preset", () => {
      const config = buildSiteConfig(makeSubmission());
      config.services.items.forEach((item) => {
        expect(item.icon).toBeTruthy();
      });
    });

    it("generates placeholder services when none provided", () => {
      const config = buildSiteConfig(makeSubmission({ services: null }));
      expect(config.services.items.length).toBe(3);
      expect(config.services.items[0].title).toBe("Service 1");
    });
  });

  describe("SEO", () => {
    it("includes business name in SEO title", () => {
      const config = buildSiteConfig(makeSubmission());
      expect(config.seo.title).toContain("Mike T Detailing");
    });

    it("includes industry in SEO title", () => {
      const config = buildSiteConfig(makeSubmission());
      expect(config.seo.title).toContain("Auto Detailing");
    });

    it("includes location in SEO title when available", () => {
      const config = buildSiteConfig(makeSubmission());
      expect(config.seo.title).toContain("Cary, NC");
    });
  });

  describe("different industries", () => {
    it("uses law firm preset for Law Firm industry", () => {
      const config = buildSiteConfig(makeSubmission({
        industry: "Law Firm",
        brandColors: null,
      }));
      expect(config.colors.primary).toBe("#1e3a5f"); // Navy
      expect(config.services.sectionTitle).toBe("Practice Areas");
    });

    it("uses restaurant preset for Restaurant industry", () => {
      const config = buildSiteConfig(makeSubmission({
        industry: "Restaurant",
        brandColors: null,
      }));
      expect(config.colors.primary).toBe("#5c3d2e"); // Brown
      expect(config.services.sectionTitle).toBe("Our Menu");
    });

    it("uses generic preset for unknown industry", () => {
      const config = buildSiteConfig(makeSubmission({
        industry: "Space Tourism",
        brandColors: null,
      }));
      expect(config.services.sectionTitle).toBe("Our Services");
    });
  });

  describe("edge cases", () => {
    it("handles submission with all null optional fields", () => {
      const config = buildSiteConfig(makeSubmission({
        yearsInBusiness: null,
        city: null,
        state: null,
        contactPhone: null,
        tagline: null,
        services: null,
        brandColors: null,
        pagesNeeded: null,
        goals: null,
        differentiator: null,
      }));
      expect(config).toBeDefined();
      expect(config.business.name).toBe("Mike T Detailing");
      expect(config.business.phone).toBe("(555) 000-0000");
    });

    it("handles malformed JSON in services", () => {
      const config = buildSiteConfig(makeSubmission({
        services: "not-json",
      }));
      expect(config.services.items.length).toBe(3); // Falls back to placeholders
    });
  });
});
