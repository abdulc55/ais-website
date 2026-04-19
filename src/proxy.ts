import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { buildAdminSessionPayload, parseAdminToken } from "@/lib/admin-session";

/** Convert a hex string to Uint8Array */
function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

/** Convert ArrayBuffer to hex string */
function bytesToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Constant-time comparison of two hex strings */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const aBytes = hexToBytes(a);
  const bBytes = hexToBytes(b);
  let result = 0;
  for (let i = 0; i < aBytes.length; i++) {
    result |= aBytes[i] ^ bBytes[i];
  }
  return result === 0;
}

/** Regenerate the expected token to compare against the cookie. Must match generateAdminToken in auth route. */
async function verifyAdminToken(cookieToken: string, adminPassword: string): Promise<boolean> {
  const parsedToken = parseAdminToken(cookieToken);
  if (!parsedToken || Date.now() > parsedToken.expiresAt) {
    return false;
  }

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(adminPassword),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(buildAdminSessionPayload(parsedToken.expiresAt))
  );
  const expectedSignature = bytesToHex(signature);
  return timingSafeEqual(parsedToken.signature, expectedSignature);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPage =
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login");
  const isAdminApi =
    pathname.startsWith("/api/admin") &&
    !pathname.startsWith("/api/admin/auth");

  if (isAdminPage || isAdminApi) {
    const token = request.cookies.get("spiffy-admin-token")?.value;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || !token) {
      if (isAdminApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      if (!(await verifyAdminToken(token, adminPassword))) {
        if (isAdminApi) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      if (isAdminApi) {
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
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
