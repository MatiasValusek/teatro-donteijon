"use server";

import { redirect } from "next/navigation";
import { clearAdminSession, createAdminSession, isAdminAccessConfigured } from "@/lib/admin/auth";

export type AdminLoginState = {
  error?: string;
};

export async function loginAdmin(
  _previousState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const accessToken = String(formData.get("access_token") ?? "").trim();
  const expectedToken = (process.env.ADMIN_ACCESS_TOKEN ?? "").trim();

  if (!isAdminAccessConfigured()) {
    return {
      error:
        "Falta configurar ADMIN_ACCESS_TOKEN en el entorno antes de usar el panel.",
    };
  }

  if (!accessToken) {
    return {
      error: "Ingresa la clave interna del admin.",
    };
  }

  if (accessToken !== expectedToken) {
    return {
      error: "La clave interna no coincide.",
    };
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}
