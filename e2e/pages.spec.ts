import { test, expect } from "@playwright/test";

/**
 * E2E tests for all public pages.
 * Verifies pages load, render key content, and have correct titles.
 */

test.describe("Public Pages", () => {
  test("homepage loads and shows hero", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Spiffy Tec/);
    await expect(page.locator("text=Websites that look sharp and book real work.")).toBeVisible();
    await expect(
      page.locator("[data-page-hero]").getByRole("link", { name: "Book a Strategy Call" })
    ).toBeVisible();
    await expect(page.locator("text=Platform Snapshot")).toBeVisible();
  });

  test("services page loads", async ({ page }) => {
    await page.goto("/services");
    await expect(page).toHaveTitle(/Web Development, Booking Platforms & AI Tools/);
    await expect(
      page.getByRole("heading", { name: /The revenue-generating foundation\./i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Layer in retention, reach, and automation\./i })
    ).toBeVisible();
  });

  test("pricing page loads with correct tiers", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page).toHaveTitle(/Monthly Website Plans from \$99\/mo/);
    // Check tier names exist on the page
    await expect(page.locator("text=Starter").first()).toBeVisible();
    await expect(page.locator("text=Business").first()).toBeVisible();
    await expect(page.locator("text=Growth").first()).toBeVisible();
  });

  test("portfolio page loads", async ({ page }) => {
    await page.goto("/portfolio");
    await expect(page).toHaveTitle(/Client Work/);
    await expect(page.locator("text=Mike T Detailing").first()).toBeVisible();
    await expect(page.locator("text=Platform Snapshot")).toBeVisible();
    await expect(page.locator("text=Project Screenshot")).toHaveCount(0);
  });

  test("case study page loads without placeholder proof blocks", async ({ page }) => {
    await page.goto("/portfolio/mike-t-detailing");
    await expect(page).toHaveTitle(/Mike T Detailing/);
    await expect(page.locator("text=What This Build Proves")).toBeVisible();
    await expect(page.locator("text=Testimonial coming soon")).toHaveCount(0);
  });

  test("about page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveTitle(/Raleigh-Durham Web Developer/i);
  });

  test("how it works page loads", async ({ page }) => {
    await page.goto("/how-it-works");
    await expect(page).toHaveTitle(/Our 5-Step Process/i);
  });

  test("contact page loads with form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Book a Free Web Strategy Call/i);
    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator("text=Send Message")).toBeVisible();
  });

  test("404 page shows for invalid routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.locator("text=404")).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("navbar links navigate correctly", async ({ page }) => {
    await page.goto("/");

    // Click Services link
    await page.click('nav a[href="/services"]');
    await expect(page).toHaveURL(/\/services/);

    // Click Pricing link
    await page.click('nav a[href="/pricing"]');
    await expect(page).toHaveURL(/\/pricing/);

    // Click logo to go home
    await page.click('a[href="/"]');
    await expect(page).toHaveURL(/\/$/);
  });

  test("footer contains Spiffy Tec branding", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer")).toContainText("Spiffy Tec");
  });
});

test.describe("Contact Form Validation", () => {
  test("shows validation errors on empty submit", async ({ page }) => {
    await page.goto("/contact");

    // Click submit without filling anything
    await page.click('button[type="submit"]');

    // Should show validation errors
    await expect(page.locator("text=Name is required")).toBeVisible();
    await expect(page.locator("text=Email is required")).toBeVisible();
    await expect(page.locator("text=Message is required")).toBeVisible();
  });

  test("shows email validation error for invalid email", async ({ page }) => {
    await page.goto("/contact");

    await page.fill("#cf-name", "John Doe");
    await page.fill("#cf-email", "not-an-email");
    await page.fill("#cf-message", "Test message");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=valid email")).toBeVisible();
  });
});
