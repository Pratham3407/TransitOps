import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth, isResponse, handleApiError } from "@/lib/api-guard";

const patchSchema = z.object({
  status: z.enum(["PENDING", "COMPLETED"]).optional(),
  toll: z.number().min(0).optional(),
  otherMisc: z.number().min(0).optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = withAuth(request, null);
  if (isResponse(session)) return session;

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = patchSchema.parse(body);

    const existing = await prisma.expense.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    const data: Record<string, unknown> = {};
    if (parsed.status !== undefined) data.status = parsed.status;
    if (parsed.toll !== undefined) data.toll = parsed.toll;
    if (parsed.otherMisc !== undefined) data.otherMisc = parsed.otherMisc;
    if (parsed.toll !== undefined || parsed.otherMisc !== undefined) {
      data.total = (parsed.toll ?? existing.toll) + (parsed.otherMisc ?? existing.otherMisc);
    }

    const expense = await prisma.expense.update({
      where: { id },
      data,
      include: { vehicle: true, trip: true },
    });
    return NextResponse.json({ expense });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = withAuth(request, null);
  if (isResponse(session)) return session;

  try {
    const { id } = await params;
    await prisma.expense.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
