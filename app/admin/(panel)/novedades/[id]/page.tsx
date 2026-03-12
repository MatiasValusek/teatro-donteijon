import { notFound } from "next/navigation";
import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { NewsForm } from "@/components/admin/news/news-form";
import { getAdminNewsPostById } from "@/lib/queries/admin";

type AdminNewsDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function AdminNewsDetailPage({
  params,
  searchParams,
}: AdminNewsDetailPageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const post = await getAdminNewsPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <AdminPageTitle
        title={post.title}
        description="Edita contenido, categoria y estado editorial de la novedad."
      />
      <NewsForm post={post} saved={query.saved === "1"} />
    </>
  );
}
