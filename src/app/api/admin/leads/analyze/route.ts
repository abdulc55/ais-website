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
import path from "path";
import {
  execFileAsync,
  getScraperPath,
  isValidUrl,
  readLatestReport,
} from "@/lib/scraper";
import { analyzeUrlsSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/require-admin";

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await request.json();

    // Zod validation for structure
    const parsed = analyzeUrlsSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => i.message);
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }

    const { urls, type } = parsed.data;

    // Additional security validation (control chars, null bytes, length)
    const invalidUrls = urls.filter((u) => !isValidUrl(u));
    if (invalidUrls.length > 0) {
      return NextResponse.json(
        { error: `Invalid URL(s): ${invalidUrls.join(", ")}. Must be valid http:// or https:// URLs.` },
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

    // Read the most recent report
    const report = readLatestReport(scraperDir);
    if (report) {
      return NextResponse.json({ success: true, report, output: stdout });
    }

    // If no report file, return the stdout
    return NextResponse.json({ success: true, output: stdout });
  } catch (err: unknown) {
    console.error("Lead analysis error:", err);
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }
}
