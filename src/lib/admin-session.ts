export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24;
export const ADMIN_SESSION_PURPOSE = "spiffy-admin-session";

export interface AdminTokenParts {
  expiresAt: number;
  signature: string;
}

export function buildAdminSessionPayload(expiresAt: number): string {
  return `${ADMIN_SESSION_PURPOSE}:${expiresAt}`;
}

export function formatAdminToken(expiresAt: number, signature: string): string {
  return `${expiresAt}.${signature}`;
}

export function parseAdminToken(token: string): AdminTokenParts | null {
  const [expiresAtRaw, signature] = token.split(".");

  if (!expiresAtRaw || !signature || token.split(".").length !== 2) {
    return null;
  }

  if (!/^\d+$/.test(expiresAtRaw) || !/^[a-f0-9]{64}$/i.test(signature)) {
    return null;
  }

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= 0) {
    return null;
  }

  return {
    expiresAt,
    signature: signature.toLowerCase(),
  };
}
