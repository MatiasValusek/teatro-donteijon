import Link from "next/link";
import { Container } from "@/components/ui/container";
import { footerNavigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="section-divider mt-10 border-t border-white/10 py-14 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr,0.8fr]">
        <div className="max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
            {siteConfig.shortName}
          </p>
          <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl">
            Teatro independiente con lenguaje visual propio.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Base inicial pensada para crecer con contenidos reales, agenda,
            prensa y una capa de datos sobre Supabase sin rehacer la estructura.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
            Navegación
          </p>
          <nav className="mt-4 grid gap-2">
            {footerNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-sm text-muted hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
            Contacto
          </p>
          <div className="mt-4 space-y-3 text-sm text-muted">
            <p>{siteConfig.email}</p>
            <p>{siteConfig.city}</p>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-xl border border-white/10 px-3 py-3 text-white hover:bg-white/5"
            >
              Instagram
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
