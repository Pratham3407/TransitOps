import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth, isResponse, handleApiError } from "@/lib/api-guard";

const driverSchema = z.object({
  name: z.string().min(1),
  licenseNumber: z.string().min(1),
  licenseCategory: z.enum(["LMV", "HMV", "OTHER"]),
  licenseExpiryDate: z.string().min(1),
  contactNumber: z.string().min(1),
  safetyScore: z.number().min(0).max(100).default(100),
  status: z.enum(["AVAILABLE", "ON_TRIP", "OFF_DUTY", "SUSPENDED"]).default("AVAILABLE"),
});

export async function GET(request: NextRequest) {
  const session = withAuth(request, null);
  if (isResponse(session)) return session;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const eligibleOnly = searchParams.get("eligibleOnly") === "true";

  const drivers = await prisma.driver.findMany({
    where: {
      ...(status ? { status: status as never } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { licenseNumber: { contains: search } },
            ],
          }
        : {}),
      ...(eligibleOnly
        ? {
            status: "AVAILABLE",
            licenseExpiryDate: { gte: new Date() },
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ drivers });
}

export async function POST(request: NextRequest) {
  const session = withAuth(request, ["SAFETY_OFFICER"]);
  if (isResponse(session)) return session;

  try {
    const body = await request.json();
    const parsed = driverSchema.parse(body);
    const driver = await prisma.driver.create({
      data: { ...parsed, licenseExpiryDate: new Date(parsed.licenseExpiryDate) },
    });
    return NextResponse.json({ driver }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
    }
    return handleApiError(error);
  }
}
