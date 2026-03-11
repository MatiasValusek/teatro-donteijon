import { WorkCard } from "@/components/works/work-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionShell } from "@/components/ui/section-shell";
import { getWorks } from "@/lib/catalog";

export function WorkPreviewSection() {
  const works = getWorks().slice(0, 3);

  return (
    <SectionShell
      eyebrow="Obras"
      title="Piezas pensadas como fichas visuales, no como listados frios."
      description="La base ya contempla ruta dinamica por slug, metadatos por obra y un sistema de tarjetas que puede expandirse a galeria, prensa y tecnica."
      action={
        <ButtonLink href="/obras" variant="secondary" size="md">
          Entrar a obras
        </ButtonLink>
      }
    >
      <Container className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {works.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </Container>
    </SectionShell>
  );
}
