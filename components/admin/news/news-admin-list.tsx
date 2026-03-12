import Link from "next/link";
import type { AdminNewsListItem } from "@/lib/queries/admin";
import { NewsStatusBadge } from "./news-status-badge";

type NewsAdminListProps = {
  posts: AdminNewsListItem[];
};

function flagBadge(label: string, active: boolean) {
  return (
    <span
      className={
        active
          ? "rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-emerald-100"
          : "rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted"
      }
    >
      {label}
    </span>
  );
}

export function NewsAdminList({ posts }: NewsAdminListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-[1.8rem] border border-dashed border-white/12 bg-white/[0.03] p-6 sm:p-8">
        <h3 className="text-2xl text-white">Todavia no hay novedades cargadas.</h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Crea la primera novedad para activar la seccion editorial del sitio.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <article
          key={post.id}
          className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.04),rgba(10,10,10,0.98))] p-5 sm:p-6"
        >
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-200/75">
                {post.slug}
              </p>
              <h3 className="mt-2 text-3xl leading-none text-white">
                {post.title}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                {post.excerpt}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <NewsStatusBadge category={post.category} />
                {flagBadge("Publicada", post.is_published)}
                {flagBadge("Destacada", post.featured)}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted">
                  {post.publishedAtLabel}
                </span>
              </div>
            </div>

            <Link
              href={`/admin/novedades/${post.id}`}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-none"
            >
              Editar
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
