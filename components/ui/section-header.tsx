import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
  headingAs?: ElementType;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  headingAs: Heading = "h2",
  className,
  contentClassName,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-3xl", contentClassName)}>
        <p className="section-eyebrow">{eyebrow}</p>
        <Heading
          className={cn(
            "mt-4 text-balance text-4xl leading-none text-white sm:text-5xl lg:text-[3.7rem]",
            titleClassName,
          )}
        >
          {title}
        </Heading>
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-8 text-muted",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
