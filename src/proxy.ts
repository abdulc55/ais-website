import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// ─── Rate Limiter (In-Memory) ───────────────────────────────────────────────
// Resets on every cold start. Acceptable for launch — migrate to Upstash if
// brute-force becomes a real signal in logs.

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const loginAttempts = new Map<string, RateLimitEntry>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string): number {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return 0;
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return entry.resetAt - now;
  }

  entry.count++;
  return 0;
}

// Test-only escape hatch so the regression test can isolate per-IP state.
export function _resetLoginRateLimit(): void {
  loginAttempts.clear();
}

// ─── Proxy ──────────────────────────────────────────────────────────────────

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Throttle credential sign-in attempts at the edge. NextAuth's callback POST
  // is the chokepoint; any successful or failed attempt flows through it.
  if (
    request.method === "POST" &&
    pathname === "/api/auth/callback/credentials"
  ) {
    const ip = getClientIp(request);
    const retryAfterMs = checkRateLimit(ip);
    if (retryAfterMs > 0) {
      const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfterSeconds) },
        }
      );
    }
  }

  const isAdminPage =
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isPortalApi =
    pathname.startsWith("/api/submissions") ||
    pathname.startsWith("/api/demos");

  if (isAdminPage || isAdminApi || isPortalApi) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      if (isAdminApi || isPortalApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/submissions/:path*",
    "/api/demos/:path*",
    "/api/auth/callback/:path*",
  ],
};
