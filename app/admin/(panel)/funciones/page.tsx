import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { FunctionsAdminList } from "@/components/admin/functions/functions-admin-list";
import { getAdminFunctions } from "@/lib/queries/admin";

export default async function AdminFunctionsPage() {
  const items = await getAdminFunctions();

  return (
    <>
      <AdminPageTitle
        title="Funciones"
        description="Agenda interna conectada a las obras existentes del repertorio."
        actionHref="/admin/funciones/nueva"
        actionLabel="Nueva funcion"
      />

      <FunctionsAdminList items={items} />
    </>
  );
}
