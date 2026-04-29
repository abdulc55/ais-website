/**
 * Tests for apiError and isError utilities.
 * We mock auth.ts to avoid ESM import issues with @auth/prisma-adapter.
 */

// Mock the auth module to avoid ESM @auth/prisma-adapter
jest.mock("@/lib/auth", () => ({
  authOptions: {},
}));

// Mock prisma
jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {},
}));

// Mock next-auth
jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

import { apiError, isError } from "@/lib/api-utils";
import { NextResponse } from "next/server";

describe("apiError", () => {
  it("returns NextResponse with error message", () => {
    const res = apiError("Something went wrong", 400);
    expect(res).toBeInstanceOf(NextResponse);
    expect(res.status).toBe(400);
  });

  it("defaults to 400 status", () => {
    const res = apiError("Bad request");
    expect(res.status).toBe(400);
  });

  it("supports different status codes", () => {
    expect(apiError("Not found", 404).status).toBe(404);
    expect(apiError("Unauthorized", 401).status).toBe(401);
    expect(apiError("Conflict", 409).status).toBe(409);
    expect(apiError("Server error", 500).status).toBe(500);
  });

  it("includes error message in JSON body", async () => {
    const res = apiError("Test error", 422);
    const body = await res.json();
    expect(body.error).toBe("Test error");
  });
});

describe("isError", () => {
  it("returns true for NextResponse", () => {
    const res = apiError("Error");
    expect(isError(res)).toBe(true);
  });

  it("returns false for plain objects", () => {
    expect(isError({ userId: "123", email: "test@test.com" })).toBe(false);
  });

  it("returns false for null/undefined", () => {
    expect(isError(null)).toBe(false);
    expect(isError(undefined)).toBe(false);
  });

  it("returns false for strings", () => {
    expect(isError("hello")).toBe(false);
  });
});
