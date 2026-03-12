import { PageHero } from "@/components/ui/page-hero";
import { Panel } from "@/components/ui/panel";
import { formatLongDate } from "@/lib/utils";
import type { NewsPost } from "@/types/content";

type NewsHeaderProps = {
  posts: NewsPost[];
};

export function NewsHeader({ posts }: NewsHeaderProps) {
  const categoryCount = new Set(posts.map((post) => post.category)).size;
  const latestDate = posts[0] ? formatLongDate(posts[0].publishedAt) : null;

  return (
    <PageHero
      eyebrow="Novedades"
      title="Noticias, estrenos y movimiento del grupo en clave editorial."
      description="Un espacio para publicar anuncios, festivales, talleres, prensa y procesos con una presencia visual coherente con la identidad de VdN."
      aside={
        <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
          <Panel className="rounded-[1.5rem] px-4 py-4" padding="none">
            <p className="text-2xl font-semibold text-white sm:text-3xl">
              {String(posts.length).padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-muted">
              Publicaciones
            </p>
          </Panel>
          <Panel className="rounded-[1.5rem] px-4 py-4" padding="none">
            <p className="text-2xl font-semibold text-white sm:text-3xl">
              {String(categoryCount).padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-muted">
              Categorias
            </p>
          </Panel>
          <Panel
            className="col-span-2 rounded-[1.5rem] px-4 py-4"
            padding="none"
            variant="strong"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-orange-200/75">
              Ultima publicacion
            </p>
            <p className="mt-2 text-sm leading-7 text-white">
              {latestDate ?? "Sin publicaciones"}
            </p>
          </Panel>
        </div>
      }
    />
  );
}
