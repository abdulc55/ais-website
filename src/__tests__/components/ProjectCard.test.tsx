import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/ProjectCard";

describe("ProjectCard", () => {
  it("renders the featured proof layout with snapshot metrics and CTAs", () => {
    render(
      <ProjectCard
        title="Mike T Detailing"
        description="A full-stack booking platform for a mobile detailing business."
        tags={["Next.js", "Stripe", "React Native"]}
        featured
        metrics={[
          { value: "3 weeks", label: "Strategy call to live platform" },
          { value: "24/7", label: "Booking availability" },
        ]}
        proofPoints={[
          "5-step booking flow",
          "VIP memberships and referrals",
        ]}
        primaryCta={{ label: "Read the Case Study", href: "/portfolio/mike-t-detailing" }}
        secondaryCta={{ label: "See Pricing", href: "/pricing" }}
      />
    );

    expect(screen.getByText("Platform Snapshot")).toBeInTheDocument();
    expect(screen.getByText("3 weeks")).toBeInTheDocument();
    expect(screen.getByText("5-step booking flow")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Read the Case Study/i })
    ).toHaveAttribute("href", "/portfolio/mike-t-detailing");
    expect(screen.getByRole("link", { name: /See Pricing/i })).toHaveAttribute(
      "href",
      "/pricing"
    );
  });

  it("renders the standard card without the featured proof panels", () => {
    render(
      <ProjectCard
        title="ProspectIQ"
        description="Lead intelligence SaaS for sales teams."
        tags={["Next.js", "Prisma"]}
      />
    );

    expect(screen.getByText("Product preview")).toBeInTheDocument();
    expect(screen.queryByText("Platform Snapshot")).not.toBeInTheDocument();
    expect(screen.getByText("ProspectIQ")).toBeInTheDocument();
  });
});
