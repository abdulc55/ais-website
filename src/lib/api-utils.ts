import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "./prisma";

/** Standard error response */
export function apiError(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

/** Parse and validate JSON body, return error response if invalid */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function requireJson(request: Request): Promise<any | NextResponse> {
  try {
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return apiError("Content-Type must be application/json", 415);
    }
    return await request.json();
  } catch {
    return apiError("Invalid JSON body", 400);
  }
}

/** Require authentication, return user session or error response */
export async function requireAuth(): Promise<
  { userId: string; email: string; name: string; role: string } | NextResponse
> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return apiError("Unauthorized", 401);
  }
  const userId = (session.user as { id: string }).id;

  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });
  if (!dbUser) {
    return apiError("Session expired — please sign in again", 401);
  }

  return {
    userId: dbUser.id,
    email: session.user.email,
    name: session.user.name || "",
    role: dbUser.role,
  };
}

/** Check if a response is an error (NextResponse) */
export function isError(result: unknown): result is NextResponse {
  return result instanceof NextResponse;
}
