import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { WorksAdminList } from "@/components/admin/works/works-admin-list";
import { getAdminWorks } from "@/lib/queries/admin";

export default async function AdminWorksPage() {
  const works = await getAdminWorks();

  return (
    <>
      <AdminPageTitle
        title="Obras"
        description="Listado interno de obras publicadas y borradores."
        actionHref="/admin/obras/nueva"
        actionLabel="Nueva obra"
      />

      <WorksAdminList works={works} />
    </>
  );
}
