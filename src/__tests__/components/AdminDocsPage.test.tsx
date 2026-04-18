import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import AdminDocsPage from "@/app/admin/docs/page";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: {
    children: ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("@/lib/admin-docs", () => ({
  loadSalesPlaybook: jest.fn().mockResolvedValue({
    title: "Spiffy Tec Sales Playbook",
    updated: "April 12, 2026",
    sections: [
      { id: "core-offer", title: "Core Offer" },
      { id: "outreach-workflow", title: "Outreach Workflow" },
    ],
    blocks: [
      { type: "heading", id: "sales-playbook", level: 1, text: "Spiffy Tec Sales Playbook" },
      { type: "heading", id: "core-offer", level: 2, text: "Core Offer" },
      { type: "paragraph", text: "Lead with outcome, not deliverable." },
      {
        type: "list",
        ordered: false,
        items: [{ depth: 0, text: "`Business`: $149/mo" }],
      },
      { type: "heading", id: "outreach-workflow", level: 2, text: "Outreach Workflow" },
      { type: "code", language: "text", code: "Hey [Name]" },
    ],
  }),
}));

describe("AdminDocsPage", () => {
  it("renders the playbook sections and admin shortcuts", async () => {
    render(await AdminDocsPage());

    expect(screen.getByText("Spiffy Tec Sales Playbook")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Lead Scanner" })).toHaveAttribute(
      "href",
      "/admin/leads"
    );
    expect(screen.getByRole("link", { name: "Core Offer" })).toHaveAttribute(
      "href",
      "#core-offer"
    );
    expect(screen.getByText("Lead with outcome, not deliverable.")).toBeInTheDocument();
    expect(screen.getByText("Hey [Name]")).toBeInTheDocument();
  });
});
