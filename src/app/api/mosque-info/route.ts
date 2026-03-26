import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const info = await prisma.mosqueInfo.findFirst();

    if (!info) {
      return NextResponse.json(
        { ok: true, data: null }
      );
    }

    return NextResponse.json(
      { ok: true, data: info },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
        },
      }
    );
  } catch (error) {
    console.error("Mosque info error:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          process.env.NODE_ENV === "development"
            ? String(error)
            : "Failed to fetch mosque info",
      },
      { status: 500 }
    );
  }
}
