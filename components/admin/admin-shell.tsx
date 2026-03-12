"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { cn } from "@/lib/utils";

type AdminShellProps = {
  children: React.ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="hidden w-[18rem] shrink-0 lg:block xl:w-[19rem]">
          <div className="sticky top-6">
            <AdminSidebar />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="grid gap-6">
            <AdminHeader onOpenNavigation={() => setMobileNavOpen(true)} />
            <main className="grid gap-6">{children}</main>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        onClick={() => setMobileNavOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/70 transition-opacity duration-200 lg:hidden",
          mobileNavOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navegacion del panel admin"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[min(88vw,22rem)] p-4 transition-transform duration-200 lg:hidden",
          mobileNavOpen
            ? "pointer-events-auto translate-x-0"
            : "pointer-events-none -translate-x-full",
        )}
      >
        <div className="relative max-h-full overflow-y-auto">
          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-white/12 bg-black/40 text-white"
          >
            <span className="sr-only">Cerrar navegacion</span>
            <span aria-hidden="true" className="text-lg leading-none">
              x
            </span>
          </button>
          <AdminSidebar onNavigate={() => setMobileNavOpen(false)} />
        </div>
      </div>
    </div>
  );
}
