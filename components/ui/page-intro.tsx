import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  actions,
}: PageIntroProps) {
  return (
    <section className="pb-8 pt-12 sm:pb-10 sm:pt-16 lg:pb-12 lg:pt-20">
      <Container>
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
            {eyebrow}
          </p>
          <h1 className="mt-5 text-[3rem] leading-[0.92] text-white sm:text-[4.2rem] lg:text-[5rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {description}
          </p>
        </div>

        {actions ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>
        ) : null}
      </Container>
    </section>
  );
}
