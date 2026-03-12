import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { GroupForm } from "@/components/admin/group-form";
import { getAdminGroupInfo } from "@/lib/queries/admin";

type AdminGroupPageProps = {
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function AdminGroupPage({
  searchParams,
}: AdminGroupPageProps) {
  const [group, query] = await Promise.all([getAdminGroupInfo(), searchParams]);

  return (
    <>
      <AdminPageTitle
        title="Grupo"
        description="Edita la informacion institucional principal de Vamos de Nuevo en una sola pantalla."
      />
      <GroupForm group={group} saved={query.saved === "1"} />
    </>
  );
}
