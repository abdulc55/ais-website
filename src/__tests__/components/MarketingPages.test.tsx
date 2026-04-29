import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import ServicesPage from "@/app/services/page";
import PortfolioPage from "@/app/portfolio/page";
import MikeTCaseStudyPage from "@/app/portfolio/mike-t-detailing/page";

describe("marketing pages", () => {
  it("renders the repositioned homepage with audit-led messaging", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /Your website should be your best salesperson/i,
      })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/leaking revenue/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Not just a website/i)).toBeInTheDocument();
    expect(screen.getAllByText("Get Your Free Audit").length).toBeGreaterThan(0);
  });

  it("reframes the services page around decision-making instead of repeated bands", () => {
    render(<ServicesPage />);

    expect(
      screen.getByRole("heading", {
        name: /Start with the piece that unlocks revenue first\./i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Core Builds")).toBeInTheDocument();
    expect(screen.getByText("Platform Add-Ons")).toBeInTheDocument();
  });

  it("features the live Valueati build with a snapshot panel and external link", () => {
    render(<PortfolioPage />);

    expect(screen.getByText("Platform Snapshot")).toBeInTheDocument();
    expect(screen.queryByText(/Project Screenshot/i)).not.toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /See Valueati Live/i })[0]
    ).toHaveAttribute("href", "https://valueati.com");
  });

  it("replaces case-study placeholders with walkthrough and proof content", () => {
    render(<MikeTCaseStudyPage />);

    expect(
      screen.getByRole("heading", {
        name: /Built for how mobile service businesses actually operate\./i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText("What This Build Proves")).toBeInTheDocument();
    expect(screen.queryByText(/Testimonial coming soon/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Screenshot$/i)).not.toBeInTheDocument();
  });
});
