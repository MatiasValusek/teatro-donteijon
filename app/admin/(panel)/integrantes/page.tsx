import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { MembersAdminList } from "@/components/admin/members/members-admin-list";
import { getAdminMembers } from "@/lib/queries/admin";

export default async function AdminMembersPage() {
  const members = await getAdminMembers();

  return (
    <>
      <AdminPageTitle
        title="Integrantes"
        description="Gestion interna de quienes forman parte del grupo y aparecen en la pagina Nosotros."
        actionHref="/admin/integrantes/nuevo"
        actionLabel="Nuevo integrante"
      />

      <MembersAdminList members={members} />
    </>
  );
}
