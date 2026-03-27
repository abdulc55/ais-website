/**
 * POST /api/admin/leads/discover
 *
 * Discovers businesses via Google Places API, then analyzes each website.
 * This is the "Search by Area" feature — find businesses that need a website.
 *
 * Body: { businessType: string, location: string, limit?: number }
 * Returns: { success: true, report: object, count: number }
 */
import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execFileAsync = promisify(execFile);

/** Map business type slugs to Google Places search terms */
const SEARCH_TERMS: Record<string, string> = {
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

/** Find the lead scraper tool directory */
function getScraperPath(): string {
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
  throw new Error("Lead scraper tool not found. Set SCRAPER_PATH env var.");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessType, location, limit = 25 } = body as {
      businessType?: string;
      location?: string;
      limit?: number;
    };

    if (!location || !location.trim()) {
      return NextResponse.json(
        { error: "Location is required (e.g., 'Raleigh NC')" },
        { status: 400 }
      );
    }

    if (!businessType) {
      return NextResponse.json(
        { error: "Business type is required" },
        { status: 400 }
      );
    }

    const clampedLimit = Math.min(Math.max(1, limit), 25);

    // Check if scraper binary exists before attempting to exec
    let scraperDir: string;
    try {
      scraperDir = getScraperPath();
    } catch {
      return NextResponse.json(
        { error: "Lead scanner is only available in local development. Deploy the scraper as a separate service for production use." },
        { status: 503 }
      );
    }

    // Check for Google Places API key
    const envPath = path.join(scraperDir, ".env");
    let hasApiKey = false;
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf-8");
      hasApiKey = /GOOGLE_PLACES_API_KEY=.+/.test(envContent);
    }
    // Also check process.env
    if (process.env.GOOGLE_PLACES_API_KEY) {
      hasApiKey = true;
    }

    if (!hasApiKey) {
      return NextResponse.json(
        {
          error:
            "Google Places API key not configured. Add GOOGLE_PLACES_API_KEY to tools/lead-scraper/.env or to your environment variables. Get a key at console.cloud.google.com → APIs & Services → Credentials.",
        },
        { status: 400 }
      );
    }

    // Build the search query
    const searchTerm = SEARCH_TERMS[businessType] || businessType;
    const query = `${searchTerm} ${location.trim()}`;

    // Build CLI arguments
    const args = [
      "--import", "tsx",
      path.join(scraperDir, "src/index.ts"),
      "--query", query,
      "--limit", String(clampedLimit),
    ];
    if (businessType && businessType !== "other") {
      args.push("--type", businessType);
    }

    // Run the scraper — this can take 30-90 seconds for 25 businesses
    const { stdout, stderr } = await execFileAsync("node", args, {
      cwd: scraperDir,
      timeout: 180000, // 3 minute timeout for large searches
      env: { ...process.env, NODE_OPTIONS: "" },
    });

    if (stderr && !stderr.includes("ExperimentalWarning")) {
      console.error("Scraper stderr:", stderr);
    }

    // Find the most recent report JSON file
    const reportsDir = path.join(scraperDir, "reports");
    if (fs.existsSync(reportsDir)) {
      const files = fs
        .readdirSync(reportsDir)
        .filter((f) => f.endsWith(".json"))
        .sort()
        .reverse();

      if (files.length > 0) {
        const reportPath = path.join(reportsDir, files[0]);
        const report = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
        return NextResponse.json({
          success: true,
          report,
          count: report.totalBusinesses || 0,
          query,
        });
      }
    }

    return NextResponse.json({ success: true, output: stdout, count: 0, query });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Discovery failed";
    console.error("Lead discovery error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
