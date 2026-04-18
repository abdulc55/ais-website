/* eslint-disable @next/next/no-img-element */
import type { ImgHTMLAttributes } from "react";
import { render, waitFor } from "@testing-library/react";
import { Navbar } from "@/components/Navbar";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={props.alt ?? ""} {...props} />
  ),
}));

describe("Navbar", () => {
  it("keeps light hero styling even if a lower section is dark", async () => {
    const { container } = render(
      <>
        <Navbar />
        <section data-page-hero data-hero-tone="light" />
        <section className="bg-navy">CTA</section>
      </>
    );

    const brand = container.querySelector("header span.text-3xl");
    expect(brand).not.toBeNull();

    await waitFor(() => {
      expect(brand).toHaveClass("text-navy");
    });
  });

  it("uses dark-hero styling when the page hero is dark", async () => {
    const { container } = render(
      <>
        <Navbar />
        <section data-page-hero data-hero-tone="dark" />
      </>
    );

    const brand = container.querySelector("header span.text-3xl");
    expect(brand).not.toBeNull();

    await waitFor(() => {
      expect(brand).toHaveClass("text-white");
    });
  });
});
