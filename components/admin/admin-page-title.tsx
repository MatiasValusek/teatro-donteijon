import Link from "next/link";

type AdminPageTitleProps = {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
};

export function AdminPageTitle({
  title,
  description,
  actionHref,
  actionLabel,
}: AdminPageTitleProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-200/80">
          Panel
        </p>
        <h2 className="mt-3 font-display text-5xl leading-none text-white">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f45c2c,#ff8e3c)] px-5 text-sm font-semibold text-zinc-950 shadow-[0_18px_60px_rgba(244,92,44,0.2)] hover:brightness-105 focus-visible:outline-none"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
