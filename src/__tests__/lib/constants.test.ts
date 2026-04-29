import {
  SUBMISSION_STATUSES,
  INDUSTRIES,
  BUDGET_RANGES,
  PAGES_OPTIONS,
  FEATURES_OPTIONS,
  GOALS_OPTIONS,
  STYLE_OPTIONS,
  NAV_ITEMS,
  INDUSTRY_SERVICE_TEMPLATES,
  DEFAULT_SERVICE_TEMPLATE,
} from "@/lib/constants";

describe("SUBMISSION_STATUSES", () => {
  it("has all 5 pipeline statuses", () => {
    const values = SUBMISSION_STATUSES.map((s) => s.value);
    expect(values).toEqual(["new", "reviewed", "generating", "generated", "deployed"]);
  });

  it("each status has label and color", () => {
    SUBMISSION_STATUSES.forEach((s) => {
      expect(s.label).toBeTruthy();
      expect(s.color).toBeTruthy();
      expect(s.color).toContain("bg-");
      expect(s.color).toContain("text-");
    });
  });
});

describe("INDUSTRIES", () => {
  it("has at least 20 industries", () => {
    expect(INDUSTRIES.length).toBeGreaterThanOrEqual(20);
  });

  it("includes key target markets", () => {
    expect(INDUSTRIES).toContain("Auto Detailing");
    expect(INDUSTRIES).toContain("Pressure Washing");
    expect(INDUSTRIES).toContain("Law Firm");
    expect(INDUSTRIES).toContain("Restaurant");
    expect(INDUSTRIES).toContain("Gym / Fitness");
  });

  it("ends with Other", () => {
    expect(INDUSTRIES[INDUSTRIES.length - 1]).toBe("Other");
  });

  it("has no duplicates", () => {
    const unique = new Set(INDUSTRIES);
    expect(unique.size).toBe(INDUSTRIES.length);
  });
});

describe("BUDGET_RANGES", () => {
  it("has budget tiers", () => {
    expect(BUDGET_RANGES.length).toBeGreaterThanOrEqual(4);
    expect(BUDGET_RANGES).toContain("Not sure yet");
  });
});

describe("PAGES_OPTIONS", () => {
  it("includes essential pages", () => {
    expect(PAGES_OPTIONS).toContain("Home");
    expect(PAGES_OPTIONS).toContain("About");
    expect(PAGES_OPTIONS).toContain("Services");
    expect(PAGES_OPTIONS).toContain("Contact");
  });
});

describe("FEATURES_OPTIONS", () => {
  it("includes common features", () => {
    expect(FEATURES_OPTIONS).toContain("Contact form");
    expect(FEATURES_OPTIONS).toContain("Online booking / scheduling");
    expect(FEATURES_OPTIONS).toContain("Payment processing");
  });
});

describe("GOALS_OPTIONS", () => {
  it("includes common business goals", () => {
    expect(GOALS_OPTIONS).toContain("Generate more leads");
    expect(GOALS_OPTIONS).toContain("Accept online bookings");
  });
});

describe("STYLE_OPTIONS", () => {
  it("has 6 style options", () => {
    expect(STYLE_OPTIONS.length).toBe(6);
  });
});

describe("INDUSTRY_SERVICE_TEMPLATES", () => {
  it("provides templates for the major target industries", () => {
    const expected = [
      "Auto Detailing",
      "Pressure Washing",
      "Lawn Care",
      "Cleaning Service",
      "Law Firm",
      "Restaurant",
      "Gym / Fitness",
      "Salon",
    ];
    for (const ind of expected) {
      expect(INDUSTRY_SERVICE_TEMPLATES[ind]).toBeDefined();
      expect(INDUSTRY_SERVICE_TEMPLATES[ind].length).toBeGreaterThanOrEqual(3);
    }
  });

  it("each template item has name/price/duration strings", () => {
    for (const items of Object.values(INDUSTRY_SERVICE_TEMPLATES)) {
      for (const item of items) {
        expect(typeof item.name).toBe("string");
        expect(item.name.length).toBeGreaterThan(0);
        expect(typeof item.price).toBe("string");
        expect(typeof item.duration).toBe("string");
      }
    }
  });

  it("only references industries that exist in INDUSTRIES", () => {
    for (const key of Object.keys(INDUSTRY_SERVICE_TEMPLATES)) {
      expect(INDUSTRIES).toContain(key);
    }
  });
});

describe("DEFAULT_SERVICE_TEMPLATE", () => {
  it("has at least one row to seed", () => {
    expect(DEFAULT_SERVICE_TEMPLATE.length).toBeGreaterThanOrEqual(1);
  });

  it("each row has the same shape as industry templates", () => {
    for (const item of DEFAULT_SERVICE_TEMPLATE) {
      expect(typeof item.name).toBe("string");
      expect(typeof item.price).toBe("string");
      expect(typeof item.duration).toBe("string");
    }
  });
});

describe("NAV_ITEMS", () => {
  it("has 6 nav items (Dashboard, Lead Scanner, Intake Forms, Submissions, Demos, Sites)", () => {
    expect(NAV_ITEMS.length).toBe(6);
  });

  it("includes the unified admin sections", () => {
    const labels = NAV_ITEMS.map((n) => n.label);
    expect(labels).toContain("Dashboard");
    expect(labels).toContain("Lead Scanner");
    expect(labels).toContain("Submissions");
    expect(labels).toContain("Intake Forms");
    expect(labels).toContain("Demos");
    expect(labels).toContain("Generated Sites");
  });

  it("all hrefs are under /admin", () => {
    NAV_ITEMS.forEach((item) => {
      expect(item.href.startsWith("/admin")).toBe(true);
    });
  });

  it("all items have href and icon", () => {
    NAV_ITEMS.forEach((item) => {
      expect(item.href).toBeTruthy();
      expect(item.href.startsWith("/")).toBe(true);
      expect(item.icon).toBeTruthy();
    });
  });
});
