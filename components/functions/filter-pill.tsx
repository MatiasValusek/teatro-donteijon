import { cn } from "@/lib/utils";

type FilterPillProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export function FilterPill({
  label,
  active = false,
  onClick,
}: FilterPillProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none",
        active
          ? "border-orange-300/20 bg-orange-400/10 text-orange-100"
          : "border-white/10 bg-white/5 text-muted hover:border-white/20 hover:text-white",
      )}
    >
      {label}
    </button>
  );
}
