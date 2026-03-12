import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type PanelProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "aside" | "section";
  variant?: "card" | "soft" | "strong" | "warm" | "inset" | "cta";
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
};

const variantStyles = {
  card: "surface-card",
  soft: "surface-panel",
  strong: "surface-panel-strong",
  warm: "surface-warm",
  inset: "surface-inset",
  cta: "surface-cta",
};

const paddingStyles = {
  none: "",
  sm: "p-4 sm:p-5",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8 lg:p-10",
};

export function Panel({
  as = "div",
  variant = "soft",
  padding = "md",
  interactive = false,
  className,
  ...props
}: PanelProps) {
  const Component = as;

  return (
    <Component
      className={cn(
        "rounded-[2rem] border border-white/10",
        variantStyles[variant],
        paddingStyles[padding],
        interactive &&
          "transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-white/14 hover:shadow-[0_18px_50px_rgba(0,0,0,0.22)]",
        className,
      )}
      {...props}
    />
  );
}
