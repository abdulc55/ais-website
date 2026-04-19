import crypto from "crypto";
import { cookies } from "next/headers";
import { buildAdminSessionPayload, parseAdminToken } from "@/lib/admin-session";

/**
 * Defense-in-depth admin auth check for route handlers.
 * Middleware is the primary gate; this catches any edge-case bypass.
 * Returns a 401 Response if unauthenticated, or null if the request is valid.
 */
export async function requireAdmin(): Promise<Response | null> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("spiffy-admin-token")?.value;
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = parseAdminToken(token);
  if (!parsed || Date.now() > parsed.expiresAt) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const expectedSig = crypto
    .createHmac("sha256", adminPassword)
    .update(buildAdminSessionPayload(parsed.expiresAt))
    .digest("hex");

  const expectedBytes = Buffer.from(expectedSig, "hex");
  const actualBytes = Buffer.from(parsed.signature, "hex");

  if (
    expectedBytes.length !== actualBytes.length ||
    !crypto.timingSafeEqual(expectedBytes, actualBytes)
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
