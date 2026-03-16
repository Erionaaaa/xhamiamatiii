import { NextResponse } from "next/server";
import { clearAdminSessionHeaders } from "@/lib/admin-auth";

export async function POST() {
  const headers = clearAdminSessionHeaders();
  return new NextResponse(JSON.stringify({ ok: true }), {
    status: 200,
    headers,
  });
}

