import { sanitizeAdminRedirect } from "@/lib/admin-redirect";

describe("sanitizeAdminRedirect", () => {
  it("allows safe admin paths", () => {
    expect(sanitizeAdminRedirect("/admin/leads")).toBe("/admin/leads");
    expect(sanitizeAdminRedirect("/admin/leads?sort=name")).toBe("/admin/leads?sort=name");
  });

  it("falls back to the default route for unsafe redirects", () => {
    expect(sanitizeAdminRedirect(null)).toBe("/admin/leads");
    expect(sanitizeAdminRedirect("javascript:alert(1)")).toBe("/admin/leads");
    expect(sanitizeAdminRedirect("//evil.example.com")).toBe("/admin/leads");
    expect(sanitizeAdminRedirect("/contact")).toBe("/admin/leads");
  });
});
