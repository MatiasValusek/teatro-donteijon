import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { NewsAdminList } from "@/components/admin/news/news-admin-list";
import { getAdminNewsPosts } from "@/lib/queries/admin";

export default async function AdminNewsPage() {
  const posts = await getAdminNewsPosts();

  return (
    <>
      <AdminPageTitle
        title="Novedades"
        description="Gestion interna de noticias, estrenos, festivales, talleres, prensa y anuncios."
        actionHref="/admin/novedades/nueva"
        actionLabel="Nueva novedad"
      />

      <NewsAdminList posts={posts} />
    </>
  );
}
