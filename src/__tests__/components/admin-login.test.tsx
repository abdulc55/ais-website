import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const pushMock = jest.fn();
let redirectParam: string | null = "/admin/leads";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => ({
    get: (key: string) => (key === "redirect" ? redirectParam : null),
  }),
}));

import AdminLoginPage from "@/app/admin/login/page";

describe("AdminLoginPage", () => {
  beforeEach(() => {
    pushMock.mockReset();
    redirectParam = "/admin/leads";
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    }) as jest.Mock;
  });

  it("preserves safe in-app admin redirects", async () => {
    redirectParam = "/admin/leads?sort=score";

    render(<AdminLoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "secret" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/admin/leads?sort=score");
    });
  });

  it("falls back to the default admin route for unsafe redirects", async () => {
    redirectParam = "javascript:alert(1)";

    render(<AdminLoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "secret" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/admin/leads");
    });
  });
});
