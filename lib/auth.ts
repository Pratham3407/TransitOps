import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { UserRole } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET as string;
const COOKIE_NAME = "transitops_token";

export type SessionPayload = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};

export function signToken(payload: SessionPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

export function getSession(request: NextRequest): SessionPayload | null {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function getServerSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function requireRole(
  session: SessionPayload | null,
  roles: UserRole[]
): boolean {
  if (!session) return false;
  return roles.includes(session.role);
}

export { COOKIE_NAME };
