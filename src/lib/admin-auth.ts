import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";

export async function isAdminLoggedInAsync() {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  return value === "ok";
}

export function createAdminSessionHeaders() {
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `${SESSION_COOKIE}=ok; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 8}`,
  );
  return headers;
}

export function clearAdminSessionHeaders() {
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
  );
  return headers;
}

