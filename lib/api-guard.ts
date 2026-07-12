import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@prisma/client";
import { getSession, SessionPayload } from "@/lib/auth";
import { RuleViolation } from "@/lib/rules";

export function withAuth(
  request: NextRequest,
  roles: UserRole[] | null
): SessionPayload | NextResponse {
  const session = getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.role === "SUPER_ADMIN") return session;
  if (roles && !roles.includes(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return session;
}

export function isResponse(x: unknown): x is NextResponse {
  return x instanceof NextResponse;
}

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof RuleViolation) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "P2002"
  ) {
    return NextResponse.json(
      { error: "A record with this unique value already exists" },
      { status: 409 }
    );
  }
  console.error(error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
