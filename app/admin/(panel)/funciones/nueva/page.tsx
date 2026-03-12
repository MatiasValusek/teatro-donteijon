import Link from "next/link";
import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { FunctionForm } from "@/components/admin/functions/function-form";
import { AdminFormSection } from "@/components/admin/admin-form-section";
import { getAdminWorkOptions } from "@/lib/queries/admin";

export default async function NewFunctionPage() {
  const works = await getAdminWorkOptions();

  return (
    <>
      <AdminPageTitle
        title="Nueva funcion"
        description="Crea una nueva fecha de agenda asociada a una obra existente."
      />

      {works.length > 0 ? (
        <FunctionForm works={works} />
      ) : (
        <AdminFormSection
          title="Primero crea una obra"
          description="Para crear funciones necesitas al menos una obra cargada en Supabase."
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/admin/obras/nueva"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f45c2c,#ff8e3c)] px-5 text-sm font-semibold text-zinc-950 shadow-[0_18px_60px_rgba(244,92,44,0.2)] hover:brightness-105 focus-visible:outline-none"
            >
              Crear obra
            </Link>
            <Link
              href="/admin/obras"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-none"
            >
              Ver obras
            </Link>
          </div>
        </AdminFormSection>
      )}
    </>
  );
}
