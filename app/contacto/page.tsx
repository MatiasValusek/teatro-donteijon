import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { contactChannels } from "@/lib/mocks";
import { siteConfig } from "@/lib/site";

export default function ContactoPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contacto"
        title="Una página simple, clara y lista para crecer."
        description="Dejé una base liviana para sumar formulario, mapa o integración futura sin meter lógica ahora. El foco sigue siendo una experiencia móvil nítida."
      />

      <section className="section-divider py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(138,30,44,0.22),rgba(18,18,18,0.95))] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-200/80">
              Canales abiertos
            </p>
            <div className="mt-6 grid gap-4">
              {contactChannels.map((channel) => (
                <article
                  key={channel.title}
                  className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">
                    {channel.label}
                  </p>
                  <h2 className="mt-3 text-2xl text-white">{channel.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {channel.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-200/80">
              Próxima iteración
            </p>
            <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl">
              Formulario y contenidos reales cuando definamos la operación.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
              Ya queda lista la estructura para sumar un formulario conectado a
              Supabase, reservas, dossier y alianzas de programación. Mientras
              tanto, mantenemos vías directas y claras de contacto.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </ButtonLink>
              <ButtonLink href={siteConfig.instagram} variant="secondary" external>
                Instagram
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
