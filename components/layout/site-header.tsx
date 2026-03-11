"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { primaryNavigation, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" onClick={closeMenu} className="flex min-w-0 items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-orange-300/25 bg-[radial-gradient(circle_at_top,rgba(255,170,110,0.48),transparent_58%),linear-gradient(160deg,#2d110e,#0c0c0c)] text-sm font-semibold uppercase tracking-[0.28em] text-orange-50">
              VdN
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-2xl leading-none text-white">
                {siteConfig.name}
              </span>
              <span className="mt-1 block truncate text-[0.64rem] uppercase tracking-[0.34em] text-muted">
                Teatro independiente
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {primaryNavigation.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "rounded-full px-4 py-3 text-sm font-medium text-muted hover:bg-white/6 hover:text-white",
                    active && "bg-white/10 text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <ButtonLink href="/contacto" size="md">
              Contacto
            </ButtonLink>
          </div>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setIsOpen((current) => !current)}
            className="flex min-h-12 min-w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-all",
                  isOpen && "top-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition-all",
                  isOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-3 h-0.5 w-5 rounded-full bg-current transition-all",
                  isOpen && "top-1.5 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            "overflow-hidden transition-[max-height,opacity,padding] duration-300 md:hidden",
            isOpen ? "max-h-[32rem] pt-4 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.06),rgba(12,12,12,0.95))] p-3">
            <nav className="grid gap-1">
              {primaryNavigation.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "rounded-[1.25rem] px-4 py-4 text-base font-medium text-muted hover:bg-white/6 hover:text-white",
                      active && "bg-white/10 text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-3">
              <ButtonLink
                href="/contacto"
                onClick={closeMenu}
                className="w-full justify-center"
              >
                Hablar con el grupo
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
