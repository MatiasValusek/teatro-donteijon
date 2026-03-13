import { AdminList } from "@/components/admin/admin-list";
import { Badge } from "@/components/ui/badge";
import type { AdminWorkRow } from "@/lib/queries/admin";
import { WorksStatusBadge } from "./works-status-badge";

type WorksAdminListProps = {
  works: AdminWorkRow[];
};

export function WorksAdminList({ works }: WorksAdminListProps) {
  return (
    <AdminList
      emptyTitle="Todavia no hay obras cargadas."
      emptyDescription="Crea la primera obra para empezar a alimentar el repertorio del sitio."
      items={works.map((work) => ({
        id: work.id,
        title: work.title,
        href: `/admin/obras/${work.id}`,
        eyebrow: work.slug,
        description: work.short_description,
        badges: [
          <WorksStatusBadge key="status" status={work.status} />,
          <Badge key="published" variant={work.is_published ? "success" : "soft"}>
            {work.is_published ? "Publicada" : "Borrador"}
          </Badge>,
          <Badge key="featured" variant={work.featured ? "success" : "soft"}>
            {work.featured ? "Destacada" : "Estandar"}
          </Badge>,
        ],
        meta: [
          <Badge key="genre" variant="soft">
            {work.genre}
          </Badge>,
          <Badge key="duration" variant="soft">
            {work.duration_minutes} min
          </Badge>,
          <Badge key="order" variant="soft">
            Orden {work.sort_order}
          </Badge>,
        ],
      }))}
    />
  );
}
