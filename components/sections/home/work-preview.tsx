import { WorkCard } from "@/components/cards/work-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionShell } from "@/components/ui/section-shell";
import { works } from "@/lib/mocks";

export function WorkPreviewSection() {
  return (
    <SectionShell
      eyebrow="Obras"
      title="Piezas pensadas como fichas visuales, no como listados fríos."
      description="La base ya contempla ruta dinámica por slug, metadatos por obra y un sistema de tarjetas que puede expandirse a galería, prensa y técnica."
      action={
        <ButtonLink href="/obras" variant="secondary" size="md">
          Entrar a obras
        </ButtonLink>
      }
    >
      <Container className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {works.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </Container>
    </SectionShell>
  );
}
