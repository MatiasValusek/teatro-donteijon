import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { hasAdminSession, isAdminAccessConfigured } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: "Admin login",
};

export default async function AdminLoginPage() {
  if (await hasAdminSession()) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl rounded-[2.4rem] border border-white/10 bg-[linear-gradient(160deg,rgba(18,18,18,0.98),rgba(10,10,10,0.96))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
          VdN admin
        </p>
        <h1 className="mt-4 font-display text-5xl leading-none text-white sm:text-6xl">
          Acceso interno
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
          Login minimo por token interno. Es una capa temporal para operar el
          panel hasta integrar autenticacion completa.
        </p>

        {!isAdminAccessConfigured() ? (
          <div className="mt-8 rounded-[1.2rem] border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm leading-7 text-amber-100">
            Falta configurar <code>ADMIN_ACCESS_TOKEN</code> en el entorno.
          </div>
        ) : (
          <AdminLoginForm />
        )}
      </div>
    </div>
  );
}
