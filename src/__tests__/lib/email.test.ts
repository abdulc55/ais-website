/**
 * Tests for the email module.
 * We mock Resend to avoid sending real emails.
 */

// Mock Resend before importing
jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: "mock-email-id" }, error: null }),
    },
  })),
}));

import { sendContactEmail } from "@/lib/email";

describe("sendContactEmail()", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv, RESEND_API_KEY: "test-key", CONTACT_EMAIL: "test@spiffytec.com" };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("sends an email with required fields", async () => {
    await expect(
      sendContactEmail({
        name: "John Doe",
        email: "john@example.com",
        message: "Hello, I need a website.",
      })
    ).resolves.toBeUndefined();
  });

  it("sends an email with all optional fields", async () => {
    await expect(
      sendContactEmail({
        name: "Jane Smith",
        email: "jane@example.com",
        message: "I want a booking platform.",
        phone: "(919) 555-0123",
        businessName: "Jane's Salon",
        service: "SaaS Platform",
        budget: "$149/mo (Business)",
      })
    ).resolves.toBeUndefined();
  });

  it("throws when RESEND_API_KEY is missing", async () => {
    delete process.env.RESEND_API_KEY;
    await expect(
      sendContactEmail({
        name: "Test",
        email: "test@example.com",
        message: "Test",
      })
    ).rejects.toThrow("RESEND_API_KEY is not configured");
  });
});

// Test the escapeHtml function indirectly through the module
// Since escapeHtml is not exported, we test it through sendContactEmail behavior
describe("HTML escaping (via sendContactEmail)", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_EMAIL = "test@spiffytec.com";
  });

  it("handles special characters in name without throwing", async () => {
    await expect(
      sendContactEmail({
        name: '<script>alert("xss")</script>',
        email: "test@example.com",
        message: 'Test with "quotes" & <tags>',
      })
    ).resolves.toBeUndefined();
  });
});
