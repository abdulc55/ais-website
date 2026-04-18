import { webcrypto } from "crypto";
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";
import { generateAdminToken } from "@/app/api/admin/auth/route";

function makeRequest(url: string, cookieToken?: string): NextRequest {
  const headers = new Headers();

  if (cookieToken) {
    headers.set("cookie", `spiffy-admin-token=${cookieToken}`);
  }

  return new NextRequest(new Request(url, { headers }));
}

describe("middleware", () => {
  const originalEnv = process.env;
  const originalCrypto = globalThis.crypto;

  beforeAll(() => {
    Object.defineProperty(globalThis, "crypto", {
      value: webcrypto,
      configurable: true,
    });
  });

  afterAll(() => {
    process.env = originalEnv;
    Object.defineProperty(globalThis, "crypto", {
      value: originalCrypto,
      configurable: true,
    });
  });

  beforeEach(() => {
    process.env = { ...originalEnv, ADMIN_PASSWORD: "test-admin-pass" };
  });

  it("rejects unauthenticated admin API requests", async () => {
    const response = await middleware(makeRequest("http://localhost/api/admin/leads"));

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({ error: "Unauthorized" });
  });

  it("allows authenticated admin API requests", async () => {
    const token = generateAdminToken("test-admin-pass", 1_700_000_000_000);
    const nowSpy = jest.spyOn(Date, "now").mockReturnValue(1_700_000_000_000);

    const response = await middleware(
      makeRequest("http://localhost/api/admin/leads", token)
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("x-middleware-next")).toBe("1");

    nowSpy.mockRestore();
  });

  it("redirects expired admin page sessions to login", async () => {
    const now = 1_700_000_000_000;
    const expiredToken = generateAdminToken(
      "test-admin-pass",
      now - (25 * 60 * 60 * 1000)
    );
    const nowSpy = jest.spyOn(Date, "now").mockReturnValue(now);

    const response = await middleware(
      makeRequest("http://localhost/admin/leads", expiredToken)
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost/admin/login?redirect=%2Fadmin%2Fleads"
    );

    nowSpy.mockRestore();
  });
});
