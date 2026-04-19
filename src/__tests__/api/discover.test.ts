jest.mock("fs", () => ({
  __esModule: true,
  default: {
    existsSync: jest.fn(),
    readFileSync: jest.fn(),
  },
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
}));

jest.mock("@/lib/scraper", () => {
  const actual = jest.requireActual("@/lib/scraper");
  return {
    ...actual,
    execFileAsync: jest.fn(),
    getScraperPath: jest.fn(),
    readLatestReport: jest.fn(),
  };
});

jest.mock("@/lib/require-admin", () => ({
  requireAdmin: jest.fn(async () => null),
}));

import fs from "fs";
import { POST } from "@/app/api/admin/leads/discover/route";
import {
  execFileAsync,
  getScraperPath,
  readLatestReport,
} from "@/lib/scraper";

function makeRequest(body: Record<string, unknown>): Request {
  return new Request("http://localhost:3001/api/admin/leads/discover", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/admin/leads/discover", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, GOOGLE_PLACES_API_KEY: "test-api-key" };
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    (getScraperPath as jest.Mock).mockReturnValue("/tmp/lead-scraper");
    (execFileAsync as jest.Mock).mockResolvedValue({ stdout: "ok", stderr: "" });
    (readLatestReport as jest.Mock).mockReturnValue({ totalBusinesses: 3 });
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("does not send the literal other keyword when businessType is other", async () => {
    const response = await POST(
      makeRequest({
        businessType: "other",
        location: "Raleigh NC",
        limit: 5,
      })
    );

    expect(response.status).toBe(200);

    const [, args] = (execFileAsync as jest.Mock).mock.calls[0];
    const query = args[args.indexOf("--query") + 1];

    expect(query).toBe("Raleigh NC");

    const data = await response.json();
    expect(data.query).toBe("Raleigh NC");
  });
});
