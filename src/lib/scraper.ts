/**
 * Shared utilities for the lead scraper integration.
 * Used by /api/admin/leads/analyze and /api/admin/leads/discover routes.
 */
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

export const execFileAsync = promisify(execFile);

/** Map business type slugs to Google Places search terms */
export const SEARCH_TERMS: Record<string, string> = {
  detailing: "auto detailing",
  "pressure-washing": "pressure washing",
  "lawn-care": "lawn care landscaping",
  cleaning: "house cleaning service",
  restaurant: "restaurant",
  "law-firm": "law firm attorney",
  dental: "dentist dental office",
  salon: "hair salon barbershop",
  gym: "gym fitness center",
  boutique: "clothing boutique store",
  plumber: "plumber plumbing",
  electrician: "electrician electrical",
  hvac: "hvac heating cooling",
  other: "",
};

/**
 * Find the lead scraper tool directory.
 * Checks common locations relative to the project root and the SCRAPER_PATH env var.
 * @throws Error if the scraper tool is not found
 */
export function getScraperPath(): string {
  const candidates = [
    path.resolve(process.cwd(), "../tools/lead-scraper"),
    path.resolve(process.cwd(), "../../tools/lead-scraper"),
    path.resolve(process.env.SCRAPER_PATH || ""),
  ];

  for (const dir of candidates) {
    if (dir && fs.existsSync(path.join(dir, "src/index.ts"))) {
      return dir;
    }
  }

  throw new Error(
    "Lead scraper tool not found. Set SCRAPER_PATH env var or ensure tools/lead-scraper exists."
  );
}

/**
 * Validate a URL string — must be http(s) and free of dangerous characters.
 * Rejects URLs containing null bytes, newlines, or other control characters
 * that could be used for argument injection.
 */
export function isValidUrl(url: string): boolean {
  // Reject null bytes, newlines, carriage returns, and other control characters
  if (/[\x00-\x1f\x7f]/.test(url)) return false;

  // Reject excessively long URLs (prevent buffer abuse)
  if (url.length > 2048) return false;

  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Read the most recent JSON report from the scraper's reports directory.
 * @returns The parsed report object, or null if no report found
 */
export function readLatestReport(scraperDir: string): Record<string, unknown> | null {
  const reportsDir = path.join(scraperDir, "reports");
  if (!fs.existsSync(reportsDir)) return null;

  const files = fs
    .readdirSync(reportsDir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .reverse();

  if (files.length === 0) return null;

  const reportPath = path.join(reportsDir, files[0]);
  return JSON.parse(fs.readFileSync(reportPath, "utf-8")) as Record<string, unknown>;
}
