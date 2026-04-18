/**
 * Tests for POST /api/admin/auth
 * Tests login flow, rate limiting, and token generation.
 */
import { POST, generateAdminToken } from "@/app/api/admin/auth/route";

function makeRequest(body: Record<string, unknown>, ip = "127.0.0.1"): Request {
  return new Request("http://localhost:3001/api/admin/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

describe("generateAdminToken()", () => {
  it("returns an expiring token with a signed suffix", () => {
    const token = generateAdminToken("test-password", 1_700_000_000_000);
    expect(token).toMatch(/^\d+\.[a-f0-9]{64}$/);
  });

  it("generates consistent tokens for same input", () => {
    const now = 1_700_000_000_000;
    const token1 = generateAdminToken("test-password", now);
    const token2 = generateAdminToken("test-password", now);
    expect(token1).toBe(token2);
  });

  it("generates different tokens for different passwords", () => {
    const now = 1_700_000_000_000;
    const token1 = generateAdminToken("password-a", now);
    const token2 = generateAdminToken("password-b", now);
    expect(token1).not.toBe(token2);
  });
});

describe("POST /api/admin/auth", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, ADMIN_PASSWORD: "test-admin-pass" };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("returns 200 with correct password", async () => {
    const res = await POST(makeRequest({ password: "test-admin-pass" }, "10.0.0.1"));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual({ success: true });
  });

  it("sets httpOnly cookie on success", async () => {
    const res = await POST(makeRequest({ password: "test-admin-pass" }, "10.0.0.2"));
    const setCookie = res.headers.get("set-cookie");
    expect(setCookie).toContain("spiffy-admin-token=");
    expect(setCookie).toContain("HttpOnly");
    expect(setCookie?.toLowerCase()).toContain("samesite=strict");
  });

  it("returns 401 with wrong password", async () => {
    const res = await POST(makeRequest({ password: "wrong-password" }, "10.0.0.3"));
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toBe("Invalid password");
  });

  it("returns 400 when password is missing", async () => {
    const res = await POST(makeRequest({}, "10.0.0.4"));
    expect(res.status).toBe(400);
  });

  it("returns 500 when ADMIN_PASSWORD is not set", async () => {
    delete process.env.ADMIN_PASSWORD;
    const res = await POST(makeRequest({ password: "anything" }, "10.0.0.5"));
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe("Admin access not configured");
  });

  it("returns 429 after too many attempts from same IP", async () => {
    const testIp = "10.99.99.99";
    // Exhaust the rate limit (5 attempts)
    for (let i = 0; i < 5; i++) {
      await POST(makeRequest({ password: "wrong" }, testIp));
    }

    // 6th attempt should be rate limited
    const res = await POST(makeRequest({ password: "wrong" }, testIp));
    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.error).toContain("Too many login attempts");
    expect(res.headers.get("Retry-After")).toBeDefined();
  });
});
