import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

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
    <section id={id} className="section-divider section-space">
      <Container className="mb-10 md:mb-12">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={action}
        />
      </Container>

      {children}
    </section>
  );
}
