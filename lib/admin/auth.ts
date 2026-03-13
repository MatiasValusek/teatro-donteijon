import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  getAdminSessionTokensFromHeaders,
  getAdminSessionTokensFromStore,
  isAdminAccessConfigured,
  normalizeAdminRedirectPath,
  resolveAdminSession,
} from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function readAdminRequestTokens() {
  const headerStore = await headers();
  const headerTokens = getAdminSessionTokensFromHeaders(headerStore);

  if (headerTokens.accessToken || headerTokens.refreshToken) {
    return headerTokens;
  }

  const cookieStore = await cookies();
  return getAdminSessionTokensFromStore(cookieStore);
}

export { isAdminAccessConfigured, normalizeAdminRedirectPath };

export async function getAdminSession() {
  return resolveAdminSession(await readAdminRequestTokens());
}

export async function hasAdminSession() {
  const session = await getAdminSession();

  return Boolean(session.user && session.session?.accessToken);
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session.user || !session.session?.accessToken) {
    redirect("/login");
  }

  return session;
}

export async function getAdminQueryClient() {
  const session = await requireAdminSession();
  const accessToken = session.session?.accessToken;

  if (!accessToken) {
    redirect("/login");
  }

  const client = createSupabaseServerClient({
    accessToken,
  });

  if (!client) {
    throw new Error(
      "Supabase no esta configurado. Define NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return client;
}
