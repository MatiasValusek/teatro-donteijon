import { notFound } from "next/navigation";
import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { FunctionForm } from "@/components/admin/functions/function-form";
import { getAdminFunctionById, getAdminWorkOptions } from "@/lib/queries/admin";

type AdminFunctionDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function AdminFunctionDetailPage({
  params,
  searchParams,
}: AdminFunctionDetailPageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const [event, works] = await Promise.all([
    getAdminFunctionById(id),
    getAdminWorkOptions(),
  ]);

  if (!event) {
    notFound();
  }

  return (
    <>
      <AdminPageTitle
        title="Editar funcion"
        description="Actualiza obra asociada, fecha, lugar y estado de la funcion."
      />
      <FunctionForm event={event} works={works} saved={query.saved === "1"} />
    </>
  );
}
