import { cn } from "@/lib/utils";

type ContactItemProps = {
  label: string;
  value: string;
  href?: string;
  note?: string;
  variant?: "card" | "inline";
  className?: string;
};

export function ContactItem({
  label,
  value,
  href,
  note,
  variant = "card",
  className,
}: ContactItemProps) {
  const content = href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="text-base leading-7 text-white hover:text-orange-100 focus-visible:outline-none"
    >
      {value}
    </a>
  ) : (
    <p className="text-base leading-7 text-white">{value}</p>
  );

  if (variant === "inline") {
    return (
      <div className={cn("space-y-1", className)}>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-200/70">
          {label}
        </p>
        {content}
        {note ? <p className="text-sm leading-7 text-muted">{note}</p> : null}
      </div>
    );
  }

  return (
    <article
      className={cn(
        "rounded-[1.5rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(12,12,12,0.95))] p-5",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-200/70">
        {label}
      </p>
      <div className="mt-3">{content}</div>
      {note ? <p className="mt-2 text-sm leading-7 text-muted">{note}</p> : null}
    </article>
  );
}
