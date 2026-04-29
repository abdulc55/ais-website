jest.mock("@/lib/scraper", () => {
  const actual = jest.requireActual("@/lib/scraper");
  return {
    ...actual,
    execFileAsync: jest.fn(),
    getScraperPath: jest.fn(),
    readLatestReport: jest.fn(),
  };
});

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(async () => ({
    user: { id: "test-user", email: "abdul@spiffytec.com", role: "admin" },
  })),
}));

jest.mock("@/lib/auth", () => ({
  authOptions: {},
}));

import { POST } from "@/app/api/admin/leads/analyze/route";
import {
  execFileAsync,
  getScraperPath,
  readLatestReport,
} from "@/lib/scraper";

function makeRequest(body: Record<string, unknown>): Request {
  return new Request("http://localhost:3001/api/admin/leads/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/admin/leads/analyze", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getScraperPath as jest.Mock).mockReturnValue("/tmp/lead-scraper");
    (execFileAsync as jest.Mock).mockResolvedValue({ stdout: "analysis complete", stderr: "" });
    (readLatestReport as jest.Mock).mockReturnValue({ totalBusinesses: 2 });
  });

  it("rejects unsafe URLs before attempting to run the scraper", async () => {
    const response = await POST(
      makeRequest({
        urls: ["https://example.com/\nmalicious"],
      })
    );

    expect(response.status).toBe(400);
    expect(execFileAsync).not.toHaveBeenCalled();
    await expect(response.json()).resolves.toEqual({
      error: "Invalid URL(s): https://example.com/\nmalicious. Must be valid http:// or https:// URLs.",
    });
  });

  it("returns 503 when the scraper tool is unavailable", async () => {
    (getScraperPath as jest.Mock).mockImplementation(() => {
      throw new Error("missing");
    });

    const response = await POST(
      makeRequest({
        urls: ["https://example.com"],
      })
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: "Lead scanner is only available in local development. Deploy the scraper as a separate service for production use.",
    });
  });

  it("runs the scraper with the expected CLI arguments and returns the latest report", async () => {
    const response = await POST(
      makeRequest({
        urls: ["https://example.com", "https://acme.com"],
        type: "detailing",
      })
    );

    expect(execFileAsync).toHaveBeenCalledWith(
      "node",
      [
        "--import",
        "tsx",
        "/tmp/lead-scraper/src/index.ts",
        "--urls",
        "https://example.com",
        "https://acme.com",
        "--type",
        "detailing",
      ],
      expect.objectContaining({
        cwd: "/tmp/lead-scraper",
        timeout: 60000,
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      report: { totalBusinesses: 2 },
      output: "analysis complete",
    });
  });

  it("falls back to stdout when no report file is present", async () => {
    (readLatestReport as jest.Mock).mockReturnValue(null);

    const response = await POST(
      makeRequest({
        urls: ["https://example.com"],
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      output: "analysis complete",
    });
  });
});
