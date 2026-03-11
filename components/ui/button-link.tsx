import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const variantStyles = {
  primary:
    "bg-[linear-gradient(135deg,#f45c2c,#ff8e3c)] text-zinc-950 shadow-[0_18px_60px_rgba(244,92,44,0.25)] hover:brightness-105",
  secondary:
    "border border-white/12 bg-white/6 text-white hover:bg-white/10 hover:text-white",
};

const sizeStyles = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  size = "lg",
  external = false,
  onClick,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold transition-transform hover:-translate-y-0.5",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
