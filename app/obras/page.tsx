import { WorkCard } from "@/components/cards/work-card";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { works } from "@/lib/mocks";

export default function ObrasPage() {
  return (
    <>
      <PageIntro
        eyebrow="Obras"
        title="Un repertorio que cruza intimidad, riesgo y temperatura escénica."
        description="La sección queda lista para crecer con fichas completas, galería, prensa y materiales de producción. Por ahora parte de datos mock con tipado real."
      />

      <section className="section-divider py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {works.map((work) => (
            <WorkCard key={work.slug} work={work} />
          ))}
        </Container>
      </section>
    </>
  );
}
