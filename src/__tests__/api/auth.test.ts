/**
 * Tests for the proxy.ts rate limiter on POST /api/auth/callback/credentials.
 * Replaces the previous shared-password test from before the NextAuth migration.
 */
import { NextRequest } from "next/server";
import { proxy, _resetLoginRateLimit } from "@/proxy";

function makeCredentialsRequest(ip = "127.0.0.1"): NextRequest {
  const headers = new Headers({
    "x-forwarded-for": ip,
    "Content-Type": "application/x-www-form-urlencoded",
  });
  return new NextRequest(
    new Request("http://localhost:3001/api/auth/callback/credentials", {
      method: "POST",
      headers,
      body: "csrfToken=fake&email=test@example.com&password=wrong",
    })
  );
}

describe("proxy: credentials sign-in rate limiter", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, NEXTAUTH_SECRET: "test-secret" };
    _resetLoginRateLimit();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("allows the first 5 attempts from an IP", async () => {
    const ip = "10.0.0.1";
    for (let i = 0; i < 5; i++) {
      const res = await proxy(makeCredentialsRequest(ip));
      expect(res.status).not.toBe(429);
    }
  });

  it("returns 429 on the 6th attempt within the window", async () => {
    const ip = "10.0.0.2";
    for (let i = 0; i < 5; i++) {
      await proxy(makeCredentialsRequest(ip));
    }
    const res = await proxy(makeCredentialsRequest(ip));
    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.error).toContain("Too many login attempts");
    expect(res.headers.get("Retry-After")).toBeTruthy();
  });

  it("isolates throttle counters across IPs", async () => {
    const blockedIp = "10.0.0.3";
    for (let i = 0; i < 5; i++) {
      await proxy(makeCredentialsRequest(blockedIp));
    }
    const blocked = await proxy(makeCredentialsRequest(blockedIp));
    expect(blocked.status).toBe(429);

    const freshIp = "10.0.0.4";
    const allowed = await proxy(makeCredentialsRequest(freshIp));
    expect(allowed.status).not.toBe(429);
  });

  it("does not throttle GET requests to the callback path", async () => {
    const headers = new Headers({ "x-forwarded-for": "10.0.0.5" });
    const getReq = new NextRequest(
      new Request("http://localhost:3001/api/auth/callback/credentials", {
        method: "GET",
        headers,
      })
    );
    for (let i = 0; i < 10; i++) {
      const res = await proxy(getReq);
      expect(res.status).not.toBe(429);
    }
  });

  it("does not throttle non-credential auth callbacks", async () => {
    const headers = new Headers({ "x-forwarded-for": "10.0.0.6" });
    const googleReq = new NextRequest(
      new Request("http://localhost:3001/api/auth/callback/google", {
        method: "POST",
        headers,
        body: "",
      })
    );
    for (let i = 0; i < 10; i++) {
      const res = await proxy(googleReq);
      expect(res.status).not.toBe(429);
    }
  });
});
