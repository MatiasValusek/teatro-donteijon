import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button-link";

export type AdminListItem = {
  id: string;
  title: string;
  href: string;
  description?: string;
  eyebrow?: string;
  badges?: ReactNode[];
  meta?: ReactNode[];
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

              <h3 className="mt-2 text-balance text-3xl leading-none text-white">
                {item.title}
              </h3>

              {item.description ? (
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                  {item.description}
                </p>
              ) : null}

              {item.meta?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.meta.map((entry, index) => (
                    <div key={`${item.id}-meta-${index}`}>{entry}</div>
                  ))}
                </div>
              ) : null}

              {item.badges?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.badges.map((badge, index) => (
                    <div key={`${item.id}-badge-${index}`}>{badge}</div>
                  ))}
                </div>
              ) : null}
            </div>

            <ButtonLink
              href={item.href}
              variant="secondary"
              size="md"
              className="shrink-0"
            >
              Editar
            </ButtonLink>
          </div>
        </article>
      ))}
    </div>
  );
}
