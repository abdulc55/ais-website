/**
 * Tests for POST /api/contact
 */

// Mock the email module
jest.mock("@/lib/email", () => ({
  sendContactEmail: jest.fn().mockResolvedValue(undefined),
}));

import { POST } from "@/app/api/contact/route";
import { sendContactEmail } from "@/lib/email";

const mockSendEmail = sendContactEmail as jest.MockedFunction<typeof sendContactEmail>;

function makeRequest(body: Record<string, unknown>): Request {
  return new Request("http://localhost:3001/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 200 and sends email with valid data", async () => {
    const res = await POST(
      makeRequest({
        name: "John Doe",
        email: "john@example.com",
        message: "I need a website.",
      })
    );

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual({ success: true });
    expect(mockSendEmail).toHaveBeenCalledTimes(1);
  });

  it("returns 400 when name is missing", async () => {
    const res = await POST(
      makeRequest({
        email: "john@example.com",
        message: "Hello",
      })
    );

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.errors).toBeDefined();
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it("returns 400 when email is invalid", async () => {
    const res = await POST(
      makeRequest({
        name: "John",
        email: "not-an-email",
        message: "Hello",
      })
    );

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.errors).toBeDefined();
  });

  it("returns 400 when message is missing", async () => {
    const res = await POST(
      makeRequest({
        name: "John",
        email: "john@example.com",
      })
    );

    expect(res.status).toBe(400);
  });

  it("passes optional fields through to email", async () => {
    await POST(
      makeRequest({
        name: "Jane",
        email: "jane@example.com",
        message: "Need SaaS platform",
        phone: "(919) 555-0123",
        businessName: "Jane Corp",
        service: "SaaS Platform",
        budget: "$149/mo",
      })
    );

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Jane",
        email: "jane@example.com",
        phone: "(919) 555-0123",
        businessName: "Jane Corp",
        service: "SaaS Platform",
        budget: "$149/mo",
      })
    );
  });

  it("returns 500 when email service fails", async () => {
    mockSendEmail.mockRejectedValueOnce(new Error("Resend API error"));

    const res = await POST(
      makeRequest({
        name: "John",
        email: "john@example.com",
        message: "Hello",
      })
    );

    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  it("trims whitespace from inputs", async () => {
    await POST(
      makeRequest({
        name: "  John  ",
        email: "  john@example.com  ",
        message: "  Hello  ",
      })
    );

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "John",
        email: "john@example.com",
        message: "Hello",
      })
    );
  });
});
