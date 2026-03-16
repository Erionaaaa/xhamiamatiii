import { NextResponse } from "next/server";
import { getPrayerTimesForPrishtina } from "@/lib/prayer-times";

export async function GET() {
  try {
    const data = await getPrayerTimesForPrishtina();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Nuk u arrit të merren oraret." },
      { status: 502 },
    );
  }
}

