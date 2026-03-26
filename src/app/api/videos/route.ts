import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const categorySlug = url.searchParams.get("category");
    const featured = url.searchParams.get("featured") === "true";
    const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
    const limit = Math.min(100, Number(url.searchParams.get("limit") ?? "10"));
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { isActive: true };

    if (categorySlug) {
      where.category = { slug: categorySlug, isActive: true };
    }

    if (featured) {
      where.isFeatured = true;
    }

    const videos = await prisma.video.findMany({
      where,
      include: { category: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      skip,
      take: limit,
    });

    const total = await prisma.video.count({ where });

    return NextResponse.json(
      {
        ok: true,
        data: videos,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Videos error:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          process.env.NODE_ENV === "development"
            ? String(error)
            : "Failed to fetch videos",
      },
      { status: 500 }
    );
  }
}
