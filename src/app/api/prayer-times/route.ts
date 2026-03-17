import { NextResponse } from "next/server";
import { getPrayerTimesForPrishtina } from "@/lib/prayer-times";

export async function GET() {
  try {
    const data = await getPrayerTimesForPrishtina();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Nuk u arrit të merren oraret." },
      {
        status: 502,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}

