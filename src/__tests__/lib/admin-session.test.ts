import {
  ADMIN_SESSION_MAX_AGE_SECONDS,
  ADMIN_SESSION_PURPOSE,
  buildAdminSessionPayload,
  formatAdminToken,
  parseAdminToken,
} from "@/lib/admin-session";

describe("admin-session helpers", () => {
  it("builds the signed payload using the session purpose and expiry", () => {
    expect(buildAdminSessionPayload(1_700_000_000_000)).toBe(
      `${ADMIN_SESSION_PURPOSE}:1700000000000`
    );
  });

  it("formats and parses a valid admin session token", () => {
    const token = formatAdminToken(1_700_000_000_000, "a".repeat(64));

    expect(parseAdminToken(token)).toEqual({
      expiresAt: 1_700_000_000_000,
      signature: "a".repeat(64),
    });
  });

  it("normalizes uppercase signatures when parsing", () => {
    const token = formatAdminToken(1_700_000_000_000, "A".repeat(64));

    expect(parseAdminToken(token)).toEqual({
      expiresAt: 1_700_000_000_000,
      signature: "a".repeat(64),
    });
  });

  it("rejects malformed token values", () => {
    expect(parseAdminToken("not-a-token")).toBeNull();
    expect(parseAdminToken("123.bad")).toBeNull();
    expect(parseAdminToken("-1." + "a".repeat(64))).toBeNull();
    expect(parseAdminToken("123." + "z".repeat(64))).toBeNull();
  });

  it("keeps the configured max age at 24 hours", () => {
    expect(ADMIN_SESSION_MAX_AGE_SECONDS).toBe(60 * 60 * 24);
  });
});
