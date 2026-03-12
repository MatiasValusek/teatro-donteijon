import type { ReactNode } from "react";
import { PageHero } from "@/components/ui/page-hero";

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
    <PageHero
      eyebrow={eyebrow}
      title={title}
      description={description}
      actions={actions}
    />
  );
}
