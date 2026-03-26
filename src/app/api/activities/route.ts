import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
    const limit = Math.min(100, Number(url.searchParams.get("limit") ?? "10"));
    const skip = (page - 1) * limit;

    const activities = await prisma.activity.findMany({
      where: { isActive: true },
      orderBy: [{ startsAt: "desc" }, { createdAt: "desc" }],
      skip,
      take: limit,
    });

    const total = await prisma.activity.count({
      where: { isActive: true },
    });

    return NextResponse.json(
      {
        ok: true,
        data: activities,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Activities error:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          process.env.NODE_ENV === "development"
            ? String(error)
            : "Failed to fetch activities",
      },
      { status: 500 }
    );
  }
}
