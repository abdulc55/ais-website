/**
 * POST /api/admin/leads/analyze
 *
 * Triggers the lead scraper CLI to analyze one or more URLs.
 * Runs the tool as a child process and returns the JSON report.
 *
 * Body: { urls: string[], type?: string }
 * Returns: { success: true, report: object } or { error: string }
 */
import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execFileAsync = promisify(execFile);

/** Path to the lead scraper tool (sibling directory in the workspace) */
function getScraperPath(): string {
  // In production (Vercel), the scraper won't be available as a sibling directory.
  // This feature only works in local development or self-hosted deployments.
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

  throw new Error("Lead scraper tool not found. Set SCRAPER_PATH env var or ensure tools/lead-scraper exists.");
}

/** Validate a URL string — must be http(s) */
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { urls, type } = body as { urls?: string[]; type?: string };

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: "At least one URL is required" },
        { status: 400 }
      );
    }

    // Limit to 10 URLs per request to prevent abuse
    if (urls.length > 10) {
      return NextResponse.json(
        { error: "Maximum 10 URLs per request" },
        { status: 400 }
      );
    }

    // Validate all URLs
    const invalidUrls = urls.filter((u) => !isValidUrl(u));
    if (invalidUrls.length > 0) {
      return NextResponse.json(
        { error: `Invalid URL(s): ${invalidUrls.join(", ")}. Must start with http:// or https://` },
        { status: 400 }
      );
    }

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

    // Build CLI arguments
    const args = ["--import", "tsx", path.join(scraperDir, "src/index.ts"), "--urls", ...urls];
    if (type) {
      args.push("--type", type);
    }

    // Run the scraper as a child process
    const { stdout, stderr } = await execFileAsync("node", args, {
      cwd: scraperDir,
      timeout: 60000, // 60 second timeout
      env: { ...process.env, NODE_OPTIONS: "" },
    });

    if (stderr && !stderr.includes("ExperimentalWarning")) {
      console.error("Scraper stderr:", stderr);
    }

    // Find the most recent report JSON file
    const reportsDir = path.join(scraperDir, "reports");
    if (fs.existsSync(reportsDir)) {
      const files = fs.readdirSync(reportsDir)
        .filter((f) => f.endsWith(".json"))
        .sort()
        .reverse();

      if (files.length > 0) {
        const reportPath = path.join(reportsDir, files[0]);
        const report = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
        return NextResponse.json({ success: true, report, output: stdout });
      }
    }

    // If no report file, return the stdout
    return NextResponse.json({ success: true, output: stdout });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Analysis failed";
    console.error("Lead analysis error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
