const DEFAULT_ADMIN_REDIRECT = "/admin/leads";

export function sanitizeAdminRedirect(redirect: string | null | undefined): string {
  if (!redirect || !redirect.startsWith("/")) {
    return DEFAULT_ADMIN_REDIRECT;
  }

  if (redirect.startsWith("//")) {
    return DEFAULT_ADMIN_REDIRECT;
  }

  if (!redirect.startsWith("/admin")) {
    return DEFAULT_ADMIN_REDIRECT;
  }

  return redirect;
}
