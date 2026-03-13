import Link from "next/link";
import { ContactItem } from "@/components/contact/contact-item";
import { SocialLinks } from "@/components/contact/social-links";
import { Container } from "@/components/ui/container";
import { footerNavigation, siteConfig, socialLinks } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-divider mt-10 border-t border-white/10 py-14 sm:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.15fr,0.75fr,1fr]">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
              {siteConfig.shortName}
            </p>
            <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl">
              {siteConfig.groupName}
            </h2>
            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-orange-100/70">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">
              {siteConfig.footerDescription}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
              Navegacion
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
              Contacto y redes
            </p>
            <div className="mt-4 space-y-4">
              <ContactItem
                label="Email"
                value={siteConfig.email}
                href={`mailto:${siteConfig.email}`}
                variant="inline"
              />
              {siteConfig.pressEmail ? (
                <ContactItem
                  label="Prensa"
                  value={siteConfig.pressEmail}
                  href={`mailto:${siteConfig.pressEmail}`}
                  variant="inline"
                />
              ) : null}
              {siteConfig.phone ? (
                <ContactItem
                  label="Telefono"
                  value={siteConfig.phone}
                  href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                  variant="inline"
                />
              ) : null}
              <ContactItem
                label="Ciudad"
                value={siteConfig.city}
                variant="inline"
              />
              <SocialLinks links={socialLinks} itemClassName="bg-transparent" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright {year} {siteConfig.groupName}. Todos los derechos
            reservados.
          </p>
          <p>{siteConfig.city}</p>
        </div>
      </Container>
    </footer>
  );
}
