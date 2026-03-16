import { NextResponse } from "next/server";
import { createAdminSessionHeaders } from "@/lib/admin-auth";

const ADMIN_USER = process.env.ADMIN_USER ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "123";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const username = String(body.username ?? "").trim();
  const password = String(body.password ?? "").trim();

  if (!username || !password) {
    return NextResponse.json(
      { ok: false, error: "Ju lutem vendosni përdoruesin dhe fjalëkalimin." },
      { status: 400 },
    );
  }

  if (username !== ADMIN_USER || password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, error: "Kredencialet nuk janë të sakta." },
      { status: 401 },
    );
  }

  const headers = createAdminSessionHeaders();
  return new NextResponse(JSON.stringify({ ok: true }), {
    status: 200,
    headers,
  });
}

