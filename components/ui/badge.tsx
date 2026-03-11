import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "warm" | "soft" | "active" | "archive";
};

const variantStyles = {
  warm: "border border-orange-300/20 bg-orange-400/10 text-orange-100",
  soft: "border border-white/10 bg-white/6 text-muted-strong",
  active: "border border-orange-300/20 bg-orange-400/10 text-orange-100",
  archive: "border border-white/12 bg-white/8 text-white",
};

export function Badge({
  className,
  variant = "soft",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em]",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
