import { ContactItem } from "@/components/contact/contact-item";
import { SocialLinks } from "@/components/contact/social-links";
import type { SiteConfig, SocialLink } from "@/types/site";

type ContactInfoProps = {
  site: SiteConfig;
  socialLinks: SocialLink[];
};

export function ContactInfo({ site, socialLinks }: ContactInfoProps) {
  const infoItems = [
    {
      label: "Email principal",
      value: site.email,
      href: `mailto:${site.email}`,
      note: "Consultas generales, funciones, talleres y propuestas.",
    },
    {
      label: "Prensa",
      value: site.pressEmail ?? "A definir",
      href: site.pressEmail ? `mailto:${site.pressEmail}` : undefined,
      note: "Notas, entrevistas, dossier e imagenes de difusion.",
    },
    {
      label: "Instagram",
      value: site.instagramHandle,
      href: site.instagramUrl,
      note: "Seguimiento cotidiano del grupo, ensayos y agenda.",
    },
    {
      label: "Telefono",
      value: site.phone ?? "Proximamente",
      href: site.phone ? `tel:${site.phone.replace(/\s+/g, "")}` : undefined,
      note: "Canal preparado para coordinacion y reservas futuras.",
    },
    {
      label: "Zona",
      value: site.city,
      note: "Base de trabajo y referencia territorial del grupo.",
    },
  ];

  return (
    <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(138,30,44,0.22),rgba(18,18,18,0.96))] p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
        Informacion de contacto
      </p>
      <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl">
        Vias directas, claras y listas para crecer.
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
        La pagina se apoya en una estructura simple para sostener consultas
        publicas hoy y sumar despues respuestas, reservas o integraciones sin
        rehacer la interfaz.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {infoItems.map((item) => (
          <ContactItem
            key={item.label}
            label={item.label}
            value={item.value}
            href={item.href}
            note={item.note}
          />
        ))}
      </div>

      <div className="mt-8 border-t border-white/10 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/75">
          Tambien podes seguirnos en redes
        </p>
        <SocialLinks className="mt-4" links={socialLinks} />
      </div>
    </div>
  );
}
