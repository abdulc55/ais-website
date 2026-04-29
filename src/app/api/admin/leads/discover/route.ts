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
import path from "path";
import fs from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  execFileAsync,
  getScraperPath,
  readLatestReport,
  SEARCH_TERMS,
} from "@/lib/scraper";
import { discoverLeadsSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = discoverLeadsSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => i.message);
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }

    const { businessType, location, limit } = parsed.data;
    const clampedLimit = limit;

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
    const searchTerm = businessType in SEARCH_TERMS
      ? SEARCH_TERMS[businessType]
      : businessType;
    const query = [searchTerm, location.trim()].filter(Boolean).join(" ");

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

    // Read the most recent report
    const report = readLatestReport(scraperDir);
    if (report) {
      return NextResponse.json({
        success: true,
        report,
        count: (report.totalBusinesses as number) || 0,
        query,
      });
    }

    return NextResponse.json({ success: true, output: stdout, count: 0, query });
  } catch (err: unknown) {
    console.error("Lead discovery error:", err);
    return NextResponse.json({ error: "Discovery failed. Please try again." }, { status: 500 });
  }
}
