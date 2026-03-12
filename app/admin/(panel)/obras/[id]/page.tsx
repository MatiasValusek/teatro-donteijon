import { notFound } from "next/navigation";
import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { WorkForm } from "@/components/admin/works/work-form";
import { getAdminWorkById } from "@/lib/queries/admin";

type AdminWorkDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function AdminWorkDetailPage({
  params,
  searchParams,
}: AdminWorkDetailPageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const work = await getAdminWorkById(id);

  if (!work) {
    notFound();
  }

  return (
    <>
      <AdminPageTitle
        title={work.title}
        description="Editar la ficha interna de la obra."
      />
      <WorkForm work={work} saved={query.saved === "1"} />
    </>
  );
}
