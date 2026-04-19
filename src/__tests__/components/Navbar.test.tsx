/* eslint-disable @next/next/no-img-element */
import type { ImgHTMLAttributes } from "react";
import { render, waitFor } from "@testing-library/react";
import { Navbar } from "@/components/Navbar";

const mockUsePathname = jest.fn();

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    priority: _priority,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => (
    <img alt={props.alt ?? ""} {...props} />
  ),
}));

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("Navbar", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/services");
  });

  it("uses light styling on non-home routes", async () => {
    const { container } = render(
      <>
        <Navbar />
        <section className="bg-navy">CTA</section>
      </>
    );

    const brand = container.querySelector("header span.text-3xl");
    expect(brand).not.toBeNull();

    await waitFor(() => {
      expect(brand).toHaveClass("text-navy");
    });
  });

  it("uses dark-hero styling on the homepage", async () => {
    mockUsePathname.mockReturnValue("/");

    const { container } = render(
      <>
        <Navbar />
      </>
    );

    const brand = container.querySelector("header span.text-3xl");
    expect(brand).not.toBeNull();

    await waitFor(() => {
      expect(brand).toHaveClass("text-white");
    });
  });
});
