import { AdminList } from "@/components/admin/admin-list";
import { Badge } from "@/components/ui/badge";
import type { AdminNewsListItem } from "@/lib/queries/admin";
import { NewsStatusBadge } from "./news-status-badge";

type NewsAdminListProps = {
  posts: AdminNewsListItem[];
};

export function NewsAdminList({ posts }: NewsAdminListProps) {
  return (
    <AdminList
      emptyTitle="Todavia no hay novedades cargadas."
      emptyDescription="Crea la primera novedad para activar la seccion editorial del sitio."
      items={posts.map((post) => ({
        id: post.id,
        title: post.title,
        href: `/admin/novedades/${post.id}`,
        eyebrow: post.slug,
        description: post.excerpt,
        badges: [
          <NewsStatusBadge key="category" category={post.category} />,
          <Badge key="published" variant={post.is_published ? "success" : "soft"}>
            {post.is_published ? "Publicada" : "Borrador"}
          </Badge>,
          <Badge key="featured" variant={post.featured ? "success" : "soft"}>
            {post.featured ? "Destacada" : "Estandar"}
          </Badge>,
        ],
        meta: [
          <Badge key="published-at" variant="soft">
            {post.publishedAtLabel}
          </Badge>,
        ],
      }))}
    />
  );
}
