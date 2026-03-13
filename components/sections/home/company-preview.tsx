import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionShell } from "@/components/ui/section-shell";
import { companyHighlights } from "@/lib/site";

export function CompanyPreviewSection() {
  return (
    <SectionShell
      id="nosotros"
      eyebrow="Nosotros"
      title="Un grupo que hace del ensayo una forma de pensamiento colectivo."
      description="La homepage deja un preview breve y claro para invitar a seguir navegando sin saturar el primer scroll en mobile."
      action={
        <ButtonLink href="/nosotros" variant="secondary" size="md">
          Conocer al grupo
        </ButtonLink>
      }
    >
      <Container className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {companyHighlights.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(16,16,16,0.95))] p-5 sm:p-6"
          >
            <p className="text-xs uppercase tracking-[0.32em] text-orange-200/75">
              {item.kicker}
            </p>
            <h3 className="mt-3 text-3xl leading-none text-white">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              {item.description}
            </p>
          </article>
        ))}
      </Container>
    </SectionShell>
  );
}
