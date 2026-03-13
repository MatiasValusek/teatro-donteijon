"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  clearAdminSessionCookies,
  getAdminSessionTokensFromStore,
  isAdminAccessConfigured,
  normalizeAdminRedirectPath,
  setAdminSessionCookies,
} from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminLoginState = {
  error?: string;
  fieldErrors?: {
    email?: string;
    password?: string;
  };
};

export async function loginAdmin(
  _previousState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = normalizeAdminRedirectPath(
    String(formData.get("redirect_to") ?? "/admin"),
  );

  if (!isAdminAccessConfigured()) {
    return {
      error:
        "Falta configurar NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY para usar el acceso admin.",
      };
  }

  const fieldErrors: NonNullable<AdminLoginState["fieldErrors"]> = {};

  if (!email) {
    fieldErrors.email = "Ingresa el email del admin.";
  }

  if (!password) {
    fieldErrors.password = "Ingresa la contrasena.";
  }

  if (fieldErrors.email || fieldErrors.password) {
    return {
      fieldErrors,
    };
  }

  const client = createSupabaseServerClient();

  if (!client) {
    return {
      error:
        "Supabase no esta disponible en este entorno. Revisa la configuracion local.",
    };
  }

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return {
      error:
        "No se pudo iniciar sesion. Revisa el email, la contrasena o el estado del usuario en Supabase Auth.",
    };
  }

  const cookieStore = await cookies();
  setAdminSessionCookies(cookieStore, {
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
  });

  redirect(redirectTo);
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  const tokens = getAdminSessionTokensFromStore(cookieStore);
  const client = createSupabaseServerClient();

  if (client && tokens.accessToken && tokens.refreshToken) {
    try {
      await client.auth.setSession({
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      });
      await client.auth.signOut();
    } catch {
      // The local cookies are still cleared below to avoid keeping a stale session.
    }
  }

  clearAdminSessionCookies(cookieStore);
  redirect("/login");
}
