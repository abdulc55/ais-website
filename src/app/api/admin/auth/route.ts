import { NextResponse } from "next/server";
import crypto from "crypto";
import { adminAuthSchema } from "@/lib/validations";

/** Generate a signed session token from the admin password. Never store the raw password in a cookie. */
export function generateAdminToken(adminPassword: string): string {
  return crypto
    .createHmac("sha256", adminPassword)
    .update("spiffy-admin-session")
    .digest("hex");
}

// ─── Rate Limiter (In-Memory) ───────────────────────────────────────────────
// NOTE: This in-memory rate limiter resets on every Vercel cold start.
// Acceptable for launch — migrate to Upstash Redis if brute-force attacks persist.

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const loginAttempts = new Map<string, RateLimitEntry>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

/** Extract client IP from request headers */
function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/** Check if the IP is rate limited. Returns retryAfterMs if blocked, 0 if allowed. */
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

export async function POST(request: Request) {
  try {
    // Rate limit check — 5 attempts per IP per 15 minutes
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

    const body = await request.json();
    const parsed = adminAuthSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    const { password } = parsed.data;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { error: "Admin access not configured" },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const token = generateAdminToken(adminPassword);

    const response = NextResponse.json({ success: true });
    response.cookies.set("spiffy-admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
