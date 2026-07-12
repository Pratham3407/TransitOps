import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth, isResponse, handleApiError } from "@/lib/api-guard";

const suggestSchema = z.object({
  cargoWeightKg: z.number().positive(),
  plannedDistanceKm: z.number().positive().optional(),
});

export async function POST(request: NextRequest) {
  const session = withAuth(request, ["DISPATCHER"]);
  if (isResponse(session)) return session;

  try {
    const body = await request.json();
    const parsed = suggestSchema.parse(body);

    const [vehicles, drivers] = await Promise.all([
      prisma.vehicle.findMany({
        where: { status: "AVAILABLE", maxLoadCapacityKg: { gte: parsed.cargoWeightKg } },
        orderBy: { maxLoadCapacityKg: "asc" },
      }),
      prisma.driver.findMany({
        where: {
          status: "AVAILABLE",
          licenseExpiryDate: { gte: new Date() },
          NOT: { status: "SUSPENDED" },
        },
        orderBy: { name: "asc" },
      }),
    ]);

    if (vehicles.length === 0) {
      return NextResponse.json({
        suggestions: [],
        message: "No available vehicles can handle this cargo weight.",
      });
    }
    if (drivers.length === 0) {
      return NextResponse.json({
        suggestions: [],
        message: "No eligible drivers are currently available.",
      });
    }

    const suggestions = vehicles.slice(0, 3).map((vehicle) => ({
      vehicle,
      driver: drivers[0],
      capacityUtilization:
        Math.round((parsed.cargoWeightKg / vehicle.maxLoadCapacityKg) * 100),
    }));

    return NextResponse.json({ suggestions });
  } catch (error) {
    return handleApiError(error);
  }
}
