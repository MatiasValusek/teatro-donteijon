import type { ReactNode } from "react";

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
    <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/5 p-6 sm:p-8">
      <h3 className="text-3xl leading-none text-white">{title}</h3>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
