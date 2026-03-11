import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

type SectionShellProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  action,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className="section-divider py-16 sm:py-20 lg:py-24">
      <Container className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl lg:text-[3.7rem]">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
            {description}
          </p>
        </div>

        {action ? <div className="shrink-0">{action}</div> : null}
      </Container>

      {children}
    </section>
  );
}
