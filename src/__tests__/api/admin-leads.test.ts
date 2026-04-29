jest.mock("@/lib/leads-db", () => ({
  getAllDashboardData: jest.fn(),
  markContacted: jest.fn(),
}));

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(async () => ({
    user: { id: "test-user", email: "abdul@spiffytec.com", role: "admin" },
  })),
}));

jest.mock("@/lib/auth", () => ({
  authOptions: {},
}));

import { GET, POST } from "@/app/api/admin/leads/route";
import { getAllDashboardData, markContacted } from "@/lib/leads-db";

function makeGetRequest(query = ""): Request {
  return new Request(`http://localhost:3001/api/admin/leads${query}`);
}

function makePostRequest(body: Record<string, unknown>): Request {
  return new Request("http://localhost:3001/api/admin/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("GET /api/admin/leads", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("passes filters and sorting options through to the dashboard query", async () => {
    (getAllDashboardData as jest.Mock).mockReturnValue({
      stats: { total: 1, avgScore: 7.4, hotLeads: 1, potentialMRR: 149 },
      byLabel: [],
      byType: [],
      leads: [],
      noWebsiteLeads: [],
      noWebsiteCount: 0,
    });

    const response = await GET(
      makeGetRequest("?type=detailing&label=critical,poor&sort=name&order=asc")
    );

    expect(getAllDashboardData).toHaveBeenCalledWith({
      type: "detailing",
      label: "critical,poor",
      sort: "name",
      order: "asc",
    });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(
      expect.objectContaining({
        stats: expect.objectContaining({ total: 1 }),
      })
    );
  });

  it("returns a 500 when the data layer throws", async () => {
    (getAllDashboardData as jest.Mock).mockImplementation(() => {
      throw new Error("DB unavailable");
    });

    const response = await GET(makeGetRequest());

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Failed to load leads. Please try again.",
    });
  });
});

describe("POST /api/admin/leads", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("logs outreach when the payload is valid", async () => {
    const response = await POST(
      makePostRequest({
        businessId: 42,
        method: "email",
        notes: "Sent a follow-up email",
      })
    );

    expect(markContacted).toHaveBeenCalledWith(42, "email", "Sent a follow-up email");
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
  });

  it("rejects invalid outreach payloads", async () => {
    const response = await POST(
      makePostRequest({
        businessId: 0,
        method: "fax",
      })
    );

    expect(markContacted).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "businessId must be a positive integer., Method must be email, phone, or sms.",
    });
  });

  it("returns a 500 when outreach logging fails", async () => {
    (markContacted as jest.Mock).mockImplementation(() => {
      throw new Error("Insert failed");
    });

    const response = await POST(
      makePostRequest({
        businessId: 5,
        method: "phone",
      })
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Failed to log outreach. Please try again.",
    });
  });
});
