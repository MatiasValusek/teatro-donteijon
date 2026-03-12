import Link from "next/link";

export type AdminListItem = {
  id: string;
  title: string;
  href: string;
  description?: string;
  eyebrow?: string;
  badges?: string[];
  meta?: string[];
};

type AdminListProps = {
  emptyTitle: string;
  emptyDescription: string;
  items: AdminListItem[];
};

export function AdminList({
  emptyTitle,
  emptyDescription,
  items,
}: AdminListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-[1.8rem] border border-dashed border-white/12 bg-white/[0.03] p-6 sm:p-8">
        <h3 className="text-2xl text-white">{emptyTitle}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.04),rgba(10,10,10,0.98))] p-5 sm:p-6"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              {item.eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-200/75">
                  {item.eyebrow}
                </p>
              ) : null}

              <h3 className="mt-2 text-3xl leading-none text-white">
                {item.title}
              </h3>

              {item.description ? (
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                  {item.description}
                </p>
              ) : null}

              {item.meta?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.meta.map((entry) => (
                    <span
                      key={`${item.id}-${entry}`}
                      className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted"
                    >
                      {entry}
                    </span>
                  ))}
                </div>
              ) : null}

              {item.badges?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.badges.map((badge) => (
                    <span
                      key={`${item.id}-${badge}`}
                      className="rounded-full border border-orange-300/18 bg-orange-300/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-orange-100"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <Link
              href={item.href}
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
