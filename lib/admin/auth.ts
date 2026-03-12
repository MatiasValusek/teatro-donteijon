import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const adminSessionCookieName = "vdn-admin-session";

export function isAdminAccessConfigured() {
  return (process.env.ADMIN_ACCESS_TOKEN ?? "").trim().length > 0;
}

export async function hasAdminSession() {
  const accessToken = (process.env.ADMIN_ACCESS_TOKEN ?? "").trim();

  if (!accessToken) {
    return false;
  }

  const cookieStore = await cookies();

  return cookieStore.get(adminSessionCookieName)?.value === accessToken;
}

export async function requireAdminSession() {
  if (!(await hasAdminSession())) {
    redirect("/admin/login");
  }
}

export async function createAdminSession() {
  const accessToken = (process.env.ADMIN_ACCESS_TOKEN ?? "").trim();

  if (!accessToken) {
    throw new Error("ADMIN_ACCESS_TOKEN is not configured.");
  }

  const cookieStore = await cookies();

  cookieStore.set(adminSessionCookieName, accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete(adminSessionCookieName);
}
