import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "warm" | "soft" | "active" | "archive" | "success";
  size?: "sm" | "md";
};

const variantStyles = {
  warm: "border border-orange-300/20 bg-orange-400/10 text-orange-100",
  soft: "border border-white/10 bg-white/6 text-muted-strong",
  active: "border border-orange-300/20 bg-orange-400/10 text-orange-100",
  archive: "border border-white/12 bg-white/8 text-white",
  success: "border border-emerald-300/20 bg-emerald-400/10 text-emerald-100",
};

export function Badge({
  className,
  variant = "soft",
  size = "sm",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold uppercase",
        size === "sm"
          ? "px-3 py-1 text-[0.68rem] tracking-[0.24em]"
          : "px-4 py-2 text-[0.72rem] tracking-[0.28em]",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
