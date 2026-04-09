import {
  contactFormSchema,
  adminAuthSchema,
  markContactedSchema,
  analyzeUrlsSchema,
  discoverLeadsSchema,
} from "@/lib/validations";

describe("contactFormSchema", () => {
  const validData = {
    name: "John Doe",
    email: "john@example.com",
    message: "Hello, I need a website.",
  };

  it("passes with valid required fields", () => {
    const result = contactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("passes with all fields", () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      phone: "(919) 555-0123",
      businessName: "Acme Corp",
      service: "Custom Website",
      budget: "$99/mo (Starter)",
    });
    expect(result.success).toBe(true);
  });

  it("fails when name is empty", () => {
    const result = contactFormSchema.safeParse({ ...validData, name: "" });
    expect(result.success).toBe(false);
  });

  it("fails when email is missing", () => {
    const result = contactFormSchema.safeParse({ ...validData, email: "" });
    expect(result.success).toBe(false);
  });

  it("fails when email is invalid", () => {
    const result = contactFormSchema.safeParse({ ...validData, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("fails when message is empty", () => {
    const result = contactFormSchema.safeParse({ ...validData, message: "" });
    expect(result.success).toBe(false);
  });

  it("trims whitespace from name", () => {
    const result = contactFormSchema.safeParse({ ...validData, name: "  John  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("John");
    }
  });
});

describe("adminAuthSchema", () => {
  it("passes with a password", () => {
    const result = adminAuthSchema.safeParse({ password: "secret123" });
    expect(result.success).toBe(true);
  });

  it("fails when password is empty", () => {
    const result = adminAuthSchema.safeParse({ password: "" });
    expect(result.success).toBe(false);
  });

  it("fails when password is missing", () => {
    const result = adminAuthSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("markContactedSchema", () => {
  it("passes with valid data", () => {
    const result = markContactedSchema.safeParse({
      businessId: 1,
      method: "email",
    });
    expect(result.success).toBe(true);
  });

  it("accepts notes as optional", () => {
    const result = markContactedSchema.safeParse({
      businessId: 1,
      method: "phone",
      notes: "Left voicemail",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid method", () => {
    const result = markContactedSchema.safeParse({
      businessId: 1,
      method: "fax",
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-positive businessId", () => {
    const result = markContactedSchema.safeParse({
      businessId: 0,
      method: "email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-integer businessId", () => {
    const result = markContactedSchema.safeParse({
      businessId: 1.5,
      method: "email",
    });
    expect(result.success).toBe(false);
  });
});

describe("analyzeUrlsSchema", () => {
  it("passes with valid URLs", () => {
    const result = analyzeUrlsSchema.safeParse({
      urls: ["https://example.com"],
    });
    expect(result.success).toBe(true);
  });

  it("accepts up to 10 URLs", () => {
    const urls = Array.from({ length: 10 }, (_, i) => `https://example${i}.com`);
    const result = analyzeUrlsSchema.safeParse({ urls });
    expect(result.success).toBe(true);
  });

  it("rejects more than 10 URLs", () => {
    const urls = Array.from({ length: 11 }, (_, i) => `https://example${i}.com`);
    const result = analyzeUrlsSchema.safeParse({ urls });
    expect(result.success).toBe(false);
  });

  it("rejects empty array", () => {
    const result = analyzeUrlsSchema.safeParse({ urls: [] });
    expect(result.success).toBe(false);
  });

  it("rejects invalid URLs", () => {
    const result = analyzeUrlsSchema.safeParse({ urls: ["not-a-url"] });
    expect(result.success).toBe(false);
  });
});

describe("discoverLeadsSchema", () => {
  it("passes with valid data", () => {
    const result = discoverLeadsSchema.safeParse({
      businessType: "detailing",
      location: "Raleigh NC",
    });
    expect(result.success).toBe(true);
  });

  it("defaults limit to 25", () => {
    const result = discoverLeadsSchema.safeParse({
      businessType: "restaurant",
      location: "Durham NC",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.limit).toBe(25);
    }
  });

  it("clamps limit to max 25", () => {
    const result = discoverLeadsSchema.safeParse({
      businessType: "salon",
      location: "Cary NC",
      limit: 50,
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty location", () => {
    const result = discoverLeadsSchema.safeParse({
      businessType: "detailing",
      location: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty business type", () => {
    const result = discoverLeadsSchema.safeParse({
      businessType: "",
      location: "Raleigh NC",
    });
    expect(result.success).toBe(false);
  });
});
