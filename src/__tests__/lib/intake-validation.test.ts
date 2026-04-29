import { validateIntakeStep, validateIntakeStep1 } from "@/lib/intake-validation";
import type { IntakeFormData } from "@/types";

const baseForm: IntakeFormData = {
  businessName: "",
  industry: "",
  yearsInBusiness: "",
  city: "",
  state: "",
  serviceArea: "",
  employees: "",
  currentWebsite: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  preferredContact: "",
  bestTimeToReach: "",
  goals: [],
  primaryCta: "",
  services: [],
  cancellationPolicy: "",
  hasLogo: false,
  brandColors: { primary: "", accent: "", background: "" },
  stylePreference: "",
  tagline: "",
  desiredFeeling: "",
  inspirationUrls: [],
  pagesNeeded: [],
  featuresNeeded: [],
  idealCustomer: "",
  ageRange: "",
  howCustomersFind: "",
  competitors: [],
  differentiator: "",
  existingDomain: "",
  existingHosting: "",
  socialMedia: { instagram: "", facebook: "", google: "" },
  budgetRange: "",
  launchDate: "",
  isUrgent: false,
  additionalNotes: "",
};

describe("validateIntakeStep1", () => {
  it("flags missing businessName", () => {
    const errs = validateIntakeStep1({ ...baseForm, contactEmail: "x@y.com" });
    expect(errs.businessName).toBeDefined();
    expect(errs.contactEmail).toBeUndefined();
  });

  it("flags missing email", () => {
    const errs = validateIntakeStep1({ ...baseForm, businessName: "Acme" });
    expect(errs.contactEmail).toBeDefined();
    expect(errs.businessName).toBeUndefined();
  });

  it("flags malformed email", () => {
    const errs = validateIntakeStep1({
      ...baseForm,
      businessName: "Acme",
      contactEmail: "not-an-email",
    });
    expect(errs.contactEmail).toContain("valid");
  });

  it("does not require industry", () => {
    const errs = validateIntakeStep1({
      ...baseForm,
      businessName: "Acme",
      contactEmail: "x@y.com",
      industry: "",
    });
    expect(errs.industry).toBeUndefined();
    expect(Object.keys(errs).length).toBe(0);
  });

  it("does not require contactName", () => {
    const errs = validateIntakeStep1({
      ...baseForm,
      businessName: "Acme",
      contactEmail: "x@y.com",
      contactName: "",
    });
    expect(errs.contactName).toBeUndefined();
    expect(Object.keys(errs).length).toBe(0);
  });

  it("returns no errors for valid minimal data", () => {
    const errs = validateIntakeStep1({
      ...baseForm,
      businessName: "Acme",
      contactEmail: "owner@acme.com",
    });
    expect(Object.keys(errs)).toEqual([]);
  });

  it("trims whitespace when checking businessName", () => {
    const errs = validateIntakeStep1({
      ...baseForm,
      businessName: "   ",
      contactEmail: "x@y.com",
    });
    expect(errs.businessName).toBeDefined();
  });
});

describe("validateIntakeStep (multi-step dispatcher)", () => {
  it("validates step 0 like step 1", () => {
    const errs = validateIntakeStep(0, baseForm);
    expect(errs.businessName).toBeDefined();
  });

  it("returns empty errors for steps 1-6 (no required fields)", () => {
    for (const step of [1, 2, 3, 4, 5, 6]) {
      expect(validateIntakeStep(step, baseForm)).toEqual({});
    }
  });
});
