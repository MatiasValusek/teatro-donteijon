"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const syncScroll = () => {
      const nextScrolled = window.scrollY > 16;

      setIsScrolled((current) =>
        current === nextScrolled ? current : nextScrolled,
      );
    };

    syncScroll();
    window.addEventListener("scroll", syncScroll, { passive: true });

    return () => window.removeEventListener("scroll", syncScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        isScrolled
          ? "border-white/12 bg-black/78 shadow-[0_14px_40px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
          : "border-white/8 bg-black/52 backdrop-blur-xl",
      )}
    >
      <Container className={cn("transition-[padding] duration-300", isScrolled ? "py-2.5" : "py-3.5")}>
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex min-w-0 items-center gap-3 rounded-full focus-visible:outline-none"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-orange-300/25 bg-[radial-gradient(circle_at_top,rgba(255,170,110,0.48),transparent_58%),linear-gradient(160deg,#2d110e,#0c0c0c)] text-sm font-semibold uppercase tracking-[0.28em] text-orange-50 sm:size-12">
              {siteConfig.shortName}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-2xl leading-none text-white">
                {siteConfig.name}
              </span>
              <span className="mt-1 block truncate text-[0.64rem] uppercase tracking-[0.34em] text-muted">
                {siteConfig.tagline}
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-4 lg:flex">
            <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
              {primaryNavigation.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-4 py-3 text-sm font-medium focus-visible:outline-none",
                      active
                        ? "bg-[linear-gradient(135deg,rgba(244,92,44,0.18),rgba(255,255,255,0.08))] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                        : "text-muted hover:bg-white/6 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <ButtonLink href="/funciones" size="md">
              Ver funciones
            </ButtonLink>
          </div>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
            onClick={() => setIsOpen((current) => !current)}
            className="flex min-h-12 min-w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
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
            "overflow-hidden transition-[max-height,opacity,padding] duration-300 lg:hidden",
            isOpen ? "max-h-[40rem] pt-4 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="surface-panel-strong rounded-[1.9rem] border border-white/10 p-4">
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/10 bg-black/25 px-4 py-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-orange-200/75">
                  {siteConfig.shortName}
                </p>
                <p className="mt-1 text-sm text-white">{siteConfig.description}</p>
              </div>
            </div>

            <nav className="mt-4 grid gap-2">
              {primaryNavigation.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-[1.25rem] px-4 py-4 text-base font-medium focus-visible:outline-none",
                      active
                        ? "bg-[linear-gradient(135deg,rgba(244,92,44,0.18),rgba(255,255,255,0.08))] text-white"
                        : "text-muted hover:bg-white/6 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/funciones"
                onClick={closeMenu}
                className="w-full justify-center"
              >
                Ver funciones
              </ButtonLink>
              <ButtonLink
                href="/obras"
                variant="secondary"
                onClick={closeMenu}
                className="w-full justify-center"
              >
                Ver obras
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
