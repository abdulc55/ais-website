import { sanitizeAdminRedirect } from "@/lib/admin-redirect";

describe("sanitizeAdminRedirect", () => {
  it("allows safe admin paths", () => {
    expect(sanitizeAdminRedirect("/admin")).toBe("/admin");
    expect(sanitizeAdminRedirect("/admin/leads?sort=name")).toBe("/admin/leads?sort=name");
  });

  it("falls back to the default route for unsafe redirects", () => {
    expect(sanitizeAdminRedirect(null)).toBe("/admin");
    expect(sanitizeAdminRedirect("javascript:alert(1)")).toBe("/admin");
    expect(sanitizeAdminRedirect("//evil.example.com")).toBe("/admin");
    expect(sanitizeAdminRedirect("/contact")).toBe("/admin");
  });
});
