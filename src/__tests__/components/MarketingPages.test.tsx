import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import ServicesPage from "@/app/services/page";
import PortfolioPage from "@/app/portfolio/page";
import MikeTCaseStudyPage from "@/app/portfolio/mike-t-detailing/page";

jest.mock("@/components/HeroBackground", () => ({
  HeroBackground: () => null,
}));

describe("marketing pages", () => {
  it("upgrades the homepage with stronger proof sections", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /Websites that look sharp and/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Platform Snapshot")).toBeInTheDocument();
    expect(
      screen.getByText(/Built for the way local service businesses sell\./i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/Client Retention/i)).not.toBeInTheDocument();
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

  it("replaces the portfolio screenshot placeholder with a project snapshot", () => {
    render(<PortfolioPage />);

    expect(screen.getByText("Platform Snapshot")).toBeInTheDocument();
    expect(screen.queryByText(/Project Screenshot/i)).not.toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /Read the Full Case Study/i })[0]
    ).toHaveAttribute("href", "/portfolio/mike-t-detailing");
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
