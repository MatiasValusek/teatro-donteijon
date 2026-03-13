import type { ReactNode } from "react";
import { Panel } from "@/components/ui/panel";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <Panel
      variant="soft"
      padding="lg"
      className="border-dashed border-white/15"
    >
      <h3 className="text-balance text-3xl leading-none text-white">{title}</h3>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </Panel>
  );
}
