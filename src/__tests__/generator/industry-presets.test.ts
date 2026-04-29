import { getIndustryPreset, presets, genericPreset } from "@/generator/industry-presets";

describe("getIndustryPreset", () => {
  it("returns the correct preset for known industries", () => {
    const detailing = getIndustryPreset("Auto Detailing");
    expect(detailing.ctaLabel).toBe("Book Now");
    expect(detailing.colors.primary).toBe("#0f172a");

    const law = getIndustryPreset("Law Firm");
    expect(law.sectionTitle).toBe("Practice Areas");
    expect(law.ctaLabel).toBe("Free Consultation");
    expect(law.colors.primary).toBe("#1e3a5f");

    const restaurant = getIndustryPreset("Restaurant");
    expect(restaurant.sectionTitle).toBe("Our Menu");
    expect(restaurant.colors.accent).toBe("#c67d4a");
  });

  it("returns generic preset for unknown industries", () => {
    const unknown = getIndustryPreset("Underwater Basket Weaving");
    expect(unknown).toEqual(genericPreset);
    expect(unknown.ctaLabel).toBe("Get Started");
  });

  it("returns generic preset for empty string", () => {
    expect(getIndustryPreset("")).toEqual(genericPreset);
  });
});

describe("preset structure", () => {
  const allPresets = Object.values(presets);

  it("every preset has complete color palette", () => {
    allPresets.forEach((preset) => {
      expect(preset.colors.primary).toBeTruthy();
      expect(preset.colors.primaryLight).toBeTruthy();
      expect(preset.colors.primaryDark).toBeTruthy();
      expect(preset.colors.accent).toBeTruthy();
      expect(preset.colors.background).toBeTruthy();
      expect(preset.colors.text).toBeTruthy();
    });
  });

  it("every preset has valid hex colors", () => {
    const hexRegex = /^#[0-9a-f]{6}$/i;
    allPresets.forEach((preset) => {
      Object.values(preset.colors).forEach((color) => {
        expect(color).toMatch(hexRegex);
      });
    });
  });

  it("every preset has fonts", () => {
    allPresets.forEach((preset) => {
      expect(preset.fonts.heading).toBeTruthy();
      expect(preset.fonts.body).toBeTruthy();
    });
  });

  it("every preset has at least 4 default icons", () => {
    allPresets.forEach((preset) => {
      expect(preset.defaultIcons.length).toBeGreaterThanOrEqual(4);
    });
  });

  it("every preset has suggested pages", () => {
    allPresets.forEach((preset) => {
      expect(preset.suggestedPages.length).toBeGreaterThanOrEqual(3);
      expect(preset.suggestedPages).toContain("Home");
    });
  });

  it("every preset has CTA label and section title", () => {
    allPresets.forEach((preset) => {
      expect(preset.ctaLabel).toBeTruthy();
      expect(preset.sectionTitle).toBeTruthy();
    });
  });
});

describe("known presets list", () => {
  it("has presets for key industries", () => {
    expect(presets["Auto Detailing"]).toBeDefined();
    expect(presets["Pressure Washing"]).toBeDefined();
    expect(presets["Law Firm"]).toBeDefined();
    expect(presets["Restaurant"]).toBeDefined();
    expect(presets["Gym / Fitness"]).toBeDefined();
    expect(presets["Salon"]).toBeDefined();
    expect(presets["Boutique / Retail"]).toBeDefined();
  });

  it("has at least 7 industry presets", () => {
    expect(Object.keys(presets).length).toBeGreaterThanOrEqual(7);
  });
});
