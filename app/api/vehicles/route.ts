import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth, isResponse, handleApiError } from "@/lib/api-guard";

const vehicleSchema = z.object({
  registrationNumber: z.string().min(1),
  nameModel: z.string().min(1),
  type: z.enum(["VAN", "TRUCK", "MINI", "OTHER"]),
  maxLoadCapacityKg: z.number().positive(),
  odometerKm: z.number().min(0).default(0),
  acquisitionCost: z.number().min(0),
  region: z.string().optional(),
  status: z.enum(["AVAILABLE", "ON_TRIP", "IN_SHOP", "RETIRED"]).default("AVAILABLE"),
});

export async function GET(request: NextRequest) {
  const session = withAuth(request, null);
  if (isResponse(session)) return session;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const region = searchParams.get("region");
  const search = searchParams.get("search");

  const vehicles = await prisma.vehicle.findMany({
    where: {
      ...(type ? { type: type as never } : {}),
      ...(status ? { status: status as never } : {}),
      ...(region ? { region } : {}),
      ...(search
        ? {
            OR: [
              { registrationNumber: { contains: search } },
              { nameModel: { contains: search } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ vehicles });
}

export async function POST(request: NextRequest) {
  const session = withAuth(request, ["FLEET_MANAGER"]);
  if (isResponse(session)) return session;

  try {
    const body = await request.json();
    const data = vehicleSchema.parse(body);
    const vehicle = await prisma.vehicle.create({ data });
    return NextResponse.json({ vehicle }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
    }
    return handleApiError(error);
  }
}
