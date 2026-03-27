import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import crypto from "crypto";

/** Regenerate the expected token to compare against the cookie. Must match generateAdminToken in auth route. */
function verifyAdminToken(cookieToken: string, adminPassword: string): boolean {
  const expectedToken = crypto
    .createHmac("sha256", adminPassword)
    .update("ais-admin-session")
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(cookieToken, "hex"),
    Buffer.from(expectedToken, "hex")
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin/* routes (except /admin/login and /api/admin/auth)
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    !pathname.startsWith("/api/admin/auth")
  ) {
    const token = request.cookies.get("ais-admin-token")?.value;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || !token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      if (!verifyAdminToken(token, adminPassword)) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      // Invalid token format (e.g., not valid hex) — reject
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
