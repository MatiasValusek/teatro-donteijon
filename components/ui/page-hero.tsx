import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
  compact?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  className,
  compact = false,
  titleClassName,
  descriptionClassName,
}: PageHeroProps) {
  return (
    <section
      className={cn(compact ? "page-hero-space-compact" : "page-hero-space", className)}
    >
      <Container
        className={cn(
          "grid gap-8",
          aside ? "xl:grid-cols-[minmax(0,1fr),auto] xl:items-end" : "",
        )}
      >
        <div className="max-w-4xl">
          <p className="section-eyebrow">{eyebrow}</p>
          <h1
            className={cn(
              "mt-5 text-balance text-[3rem] leading-[0.92] text-white sm:text-[4.2rem] lg:text-[5rem]",
              titleClassName,
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg",
              descriptionClassName,
            )}
          >
            {description}
          </p>

          {actions ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>
          ) : null}
        </div>

        {aside ? <div className="xl:justify-self-end">{aside}</div> : null}
      </Container>
    </section>
  );
}
