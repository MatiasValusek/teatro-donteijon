import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import {
  hasAdminSession,
  isAdminAccessConfigured,
  normalizeAdminRedirectPath,
} from "@/lib/admin/auth";
import { noIndexRobots } from "@/lib/seo/metadata";

type LoginPageProps = {
  searchParams: Promise<{
    redirectTo?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Iniciar sesion",
  robots: noIndexRobots,
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirectTo } = await searchParams;
  const nextPath = normalizeAdminRedirectPath(redirectTo);

  if (await hasAdminSession()) {
    redirect(nextPath);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl rounded-[2.4rem] border border-white/10 bg-[linear-gradient(160deg,rgba(18,18,18,0.98),rgba(10,10,10,0.96))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
          VdN admin
        </p>
        <h1 className="mt-4 font-display text-balance text-5xl leading-none text-white sm:text-6xl">
          Iniciar sesion
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
          Acceso reservado al panel interno. Los usuarios admin se gestionan de
          forma manual desde Supabase Auth con email y contrasena.
        </p>

        {!isAdminAccessConfigured() ? (
          <div className="mt-8 rounded-[1.2rem] border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm leading-7 text-amber-100">
            Falta configurar <code>NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> para usar el acceso
            admin.
          </div>
        ) : (
          <AdminLoginForm redirectTo={nextPath} />
        )}

        <p className="mt-6 text-xs leading-6 text-muted">
          Para probar localmente, crea el usuario admin en Supabase Auth y usa
          ese email y contrasena en este formulario.
        </p>
      </div>
    </div>
  );
}
