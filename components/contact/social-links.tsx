import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types/site";

type SocialLinksProps = {
  links: SocialLink[];
  className?: string;
  itemClassName?: string;
};

export function SocialLinks({
  links,
  className,
  itemClassName,
}: SocialLinksProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noreferrer" : undefined}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/8 focus-visible:outline-none",
            itemClassName,
          )}
        >
          <span>{link.label}</span>
          <span className="text-muted">{link.value}</span>
        </a>
      ))}
    </div>
  );
}
