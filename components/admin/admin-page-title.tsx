import { ButtonLink } from "@/components/ui/button-link";

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
        <h2 className="mt-3 font-display text-balance text-4xl leading-none text-white sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      {actionHref && actionLabel ? (
        <ButtonLink href={actionHref} size="md">
          {actionLabel}
        </ButtonLink>
      ) : null}
    </div>
  );
}
