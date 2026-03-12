import Link from "next/link";
import type { AdminWorkRow } from "@/lib/queries/admin";
import { WorksStatusBadge } from "./works-status-badge";

type WorksAdminListProps = {
  works: AdminWorkRow[];
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

export function WorksAdminList({ works }: WorksAdminListProps) {
  if (works.length === 0) {
    return (
      <div className="rounded-[1.8rem] border border-dashed border-white/12 bg-white/[0.03] p-6 sm:p-8">
        <h3 className="text-2xl text-white">Todavia no hay obras cargadas.</h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Crea la primera obra para empezar a alimentar el repertorio del sitio.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {works.map((work) => (
        <article
          key={work.id}
          className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.04),rgba(10,10,10,0.98))] p-5 sm:p-6"
        >
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-200/75">
                {work.slug}
              </p>
              <h3 className="mt-2 text-3xl leading-none text-white">
                {work.title}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                {work.short_description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <WorksStatusBadge status={work.status} />
                {flagBadge("Publicada", work.is_published)}
                {flagBadge("Destacada", work.featured)}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted">
                  {work.genre}
                </span>
                <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted">
                  {work.duration_minutes} min
                </span>
                <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted">
                  sort_order {work.sort_order}
                </span>
              </div>
            </div>

            <Link
              href={`/admin/obras/${work.id}`}
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
