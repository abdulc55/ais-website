import {
  signupSchema,
  createIntakeFormSchema,
  intakeStep1Schema,
  intakeStep2Schema,
  intakeStep3Schema,
  intakeStep4Schema,
  intakeStep5Schema,
  intakeStep6Schema,
  intakeStep7Schema,
  fullIntakeSchema,
} from "@/lib/validation";

describe("signupSchema", () => {
  it("validates valid input", () => {
    const result = signupSchema.safeParse({
      name: "Abdul",
      email: "abdul@spiffytec.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short name", () => {
    const result = signupSchema.safeParse({
      name: "A",
      email: "abdul@spiffytec.com",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = signupSchema.safeParse({
      name: "Abdul",
      email: "not-an-email",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short password", () => {
    const result = signupSchema.safeParse({
      name: "Abdul",
      email: "abdul@spiffytec.com",
      password: "short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty fields", () => {
    const result = signupSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("createIntakeFormSchema", () => {
  it("validates valid label", () => {
    const result = createIntakeFormSchema.safeParse({ label: "Test Form" });
    expect(result.success).toBe(true);
  });

  it("rejects empty label", () => {
    const result = createIntakeFormSchema.safeParse({ label: "" });
    expect(result.success).toBe(false);
  });

  it("accepts optional expiresAt", () => {
    const result = createIntakeFormSchema.safeParse({
      label: "Test",
      expiresAt: "2026-12-31T00:00:00Z",
    });
    expect(result.success).toBe(true);
  });
});

describe("intakeStep1Schema (Business + Contact)", () => {
  const validStep1 = {
    businessName: "Mike T Detailing",
    industry: "Auto Detailing",
    contactName: "Mike Thompson",
    contactEmail: "mike@example.com",
  };

  it("validates with required fields only", () => {
    const result = intakeStep1Schema.safeParse(validStep1);
    expect(result.success).toBe(true);
  });

  it("rejects missing businessName", () => {
    const result = intakeStep1Schema.safeParse({ ...validStep1, businessName: "" });
    expect(result.success).toBe(false);
  });

  it("accepts missing industry (now optional)", () => {
    const result = intakeStep1Schema.safeParse({ ...validStep1, industry: "" });
    expect(result.success).toBe(true);
  });

  it("accepts missing contactName (now optional)", () => {
    const result = intakeStep1Schema.safeParse({ ...validStep1, contactName: "" });
    expect(result.success).toBe(true);
  });

  it("only requires businessName and contactEmail", () => {
    const result = intakeStep1Schema.safeParse({
      businessName: "Acme",
      contactEmail: "x@y.com",
    });
    expect(result.success).toBe(true);
  });

  it("still rejects missing businessName", () => {
    const result = intakeStep1Schema.safeParse({ ...validStep1, businessName: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = intakeStep1Schema.safeParse({ ...validStep1, contactEmail: "bad" });
    expect(result.success).toBe(false);
  });

  it("applies defaults for optional fields", () => {
    const result = intakeStep1Schema.safeParse(validStep1);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.city).toBe("");
      expect(result.data.state).toBe("");
      expect(result.data.yearsInBusiness).toBe("");
    }
  });
});

describe("intakeStep2Schema (Goals)", () => {
  it("accepts goals array", () => {
    const result = intakeStep2Schema.safeParse({
      goals: ["Generate more leads", "Accept online bookings"],
      primaryCta: "Book Now",
    });
    expect(result.success).toBe(true);
  });

  it("defaults to empty array", () => {
    const result = intakeStep2Schema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.goals).toEqual([]);
    }
  });
});

describe("intakeStep3Schema (Services)", () => {
  it("accepts services with name/price/duration", () => {
    const result = intakeStep3Schema.safeParse({
      services: [{ name: "Basic Detail", price: "$99", duration: "1-2 hrs" }],
    });
    expect(result.success).toBe(true);
  });

  it("rejects services without name", () => {
    const result = intakeStep3Schema.safeParse({
      services: [{ name: "", price: "$99", duration: "1 hr" }],
    });
    expect(result.success).toBe(false);
  });

  it("defaults to empty array", () => {
    const result = intakeStep3Schema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.services).toEqual([]);
    }
  });
});

describe("intakeStep4Schema (Branding)", () => {
  it("accepts brand colors", () => {
    const result = intakeStep4Schema.safeParse({
      brandColors: { primary: "#1e3a5f", accent: "#c9a84c", background: "#ffffff" },
      stylePreference: "Modern & Minimal",
    });
    expect(result.success).toBe(true);
  });

  it("defaults brandColors to empty strings", () => {
    const result = intakeStep4Schema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.brandColors).toEqual({ primary: "", accent: "", background: "" });
      expect(result.data.hasLogo).toBe(false);
    }
  });
});

describe("intakeStep5Schema (Pages & Features)", () => {
  it("accepts pages and features arrays", () => {
    const result = intakeStep5Schema.safeParse({
      pagesNeeded: ["Home", "About", "Services"],
      featuresNeeded: ["Contact form", "Google Maps / Directions"],
    });
    expect(result.success).toBe(true);
  });

  it("defaults to empty arrays", () => {
    const result = intakeStep5Schema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.pagesNeeded).toEqual([]);
      expect(result.data.featuresNeeded).toEqual([]);
    }
  });
});

describe("intakeStep6Schema (Customers)", () => {
  it("accepts customer data", () => {
    const result = intakeStep6Schema.safeParse({
      idealCustomer: "Homeowners in Raleigh",
      ageRange: "25-55",
      differentiator: "Mobile service",
    });
    expect(result.success).toBe(true);
  });

  it("defaults all to empty", () => {
    const result = intakeStep6Schema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.idealCustomer).toBe("");
      expect(result.data.competitors).toEqual([]);
    }
  });
});

describe("intakeStep7Schema (Budget)", () => {
  it("accepts budget data", () => {
    const result = intakeStep7Schema.safeParse({
      budgetRange: "$149–$249/mo",
      isUrgent: true,
      socialMedia: { instagram: "@miket", facebook: "", google: "" },
    });
    expect(result.success).toBe(true);
  });

  it("defaults socialMedia to empty strings", () => {
    const result = intakeStep7Schema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.socialMedia).toEqual({ instagram: "", facebook: "", google: "" });
      expect(result.data.isUrgent).toBe(false);
    }
  });
});

describe("fullIntakeSchema (merged)", () => {
  const validFull = {
    businessName: "Mike T Detailing",
    industry: "Auto Detailing",
    contactName: "Mike",
    contactEmail: "mike@test.com",
  };

  it("validates with minimum required fields", () => {
    const result = fullIntakeSchema.safeParse(validFull);
    expect(result.success).toBe(true);
  });

  it("rejects missing required fields", () => {
    const result = fullIntakeSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("fills in all defaults for optional fields", () => {
    const result = fullIntakeSchema.safeParse(validFull);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.goals).toEqual([]);
      expect(result.data.services).toEqual([]);
      expect(result.data.pagesNeeded).toEqual([]);
      expect(result.data.featuresNeeded).toEqual([]);
      expect(result.data.hasLogo).toBe(false);
      expect(result.data.isUrgent).toBe(false);
    }
  });
});
