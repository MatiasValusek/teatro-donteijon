import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { MemberForm } from "@/components/admin/members/member-form";

export default function NewMemberPage() {
  return (
    <>
      <AdminPageTitle
        title="Nuevo integrante"
        description="Crea una nueva ficha para el equipo del grupo."
      />
      <MemberForm />
    </>
  );
}
