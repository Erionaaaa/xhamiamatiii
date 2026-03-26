import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
    const limit = Math.min(100, Number(url.searchParams.get("limit") ?? "10"));
    const skip = (page - 1) * limit;
    const featured = url.searchParams.get("featured") === "true";

    const posts = await prisma.academyPost.findMany({
      where: {
        isActive: true,
        ...(featured && { publishedAt: { not: null } }),
      },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      skip,
      take: limit,
    });

    const total = await prisma.academyPost.count({
      where: { isActive: true },
    });

    return NextResponse.json(
      {
        ok: true,
        data: posts,
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
    console.error("Academy posts error:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          process.env.NODE_ENV === "development"
            ? String(error)
            : "Failed to fetch posts",
      },
      { status: 500 }
    );
  }
}
