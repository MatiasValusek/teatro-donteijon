"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/lib/actions/admin-auth";
import { getAdminHeaderMeta } from "@/lib/admin/navigation";

type AdminHeaderProps = {
  onOpenNavigation?: () => void;
};

export function AdminHeader({ onOpenNavigation }: AdminHeaderProps) {
  const pathname = usePathname();
  const meta = getAdminHeaderMeta(pathname);

  return (
    <header className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(20,20,20,0.96),rgba(10,10,10,0.94))] px-5 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={onOpenNavigation}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white lg:hidden"
          >
            <span className="sr-only">Abrir navegacion</span>
            <span aria-hidden="true" className="grid gap-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-200/80">
              {meta.breadcrumb}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">
              {meta.title}
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              {meta.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-none"
          >
            Ver sitio
          </Link>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Cerrar sesion
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
