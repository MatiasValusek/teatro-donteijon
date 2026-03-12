type FunctionActiveBadgeProps = {
  active: boolean;
};

export function FunctionActiveBadge({ active }: FunctionActiveBadgeProps) {
  return (
    <span
      className={
        active
          ? "rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-emerald-100"
          : "rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted"
      }
    >
      {active ? "Activa" : "Inactiva"}
    </span>
  );
}
