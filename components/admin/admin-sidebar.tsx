"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavigation, isAdminPathActive } from "@/lib/admin/navigation";
import { cn } from "@/lib/utils";

type AdminSidebarProps = {
  onNavigate?: () => void;
};

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,15,15,0.96),rgba(10,10,10,0.92))] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.24)]">
      <div className="border-b border-white/10 px-2 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-200/80">
          VdN admin
        </p>
        <h1 className="mt-3 font-display text-4xl leading-none text-white">
          Panel interno
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          Primera capa interna del sitio: gestion simple de obras, funciones, novedades, integrantes y configuracion general.
        </p>
      </div>

      <nav className="mt-4 grid gap-2">
        {adminNavigation.map((item) => {
          const active = isAdminPathActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-[1.2rem] px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none",
                active
                  ? "bg-[linear-gradient(135deg,rgba(244,92,44,0.18),rgba(255,255,255,0.08))] text-white"
                  : "text-muted hover:bg-white/6 hover:text-white",
              )}
            >
              <span className="block">{item.label}</span>
              <span className="mt-1 block text-xs leading-5 text-muted/85">
                {item.description}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
