import { notFound } from "next/navigation";
import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { MemberForm } from "@/components/admin/members/member-form";
import { getAdminMemberById } from "@/lib/queries/admin";

type AdminMemberDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function AdminMemberDetailPage({
  params,
  searchParams,
}: AdminMemberDetailPageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const member = await getAdminMemberById(id);

  if (!member) {
    notFound();
  }

  return (
    <>
      <AdminPageTitle
        title={member.name}
        description="Edita el rol, la bio, el orden y el estado del integrante."
      />
      <MemberForm member={member} saved={query.saved === "1"} />
    </>
  );
}
