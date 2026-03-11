import { works } from "@/data/works";
import { WorksGrid } from "@/components/works/works-grid";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";

export default function ObrasPage() {
  const orderedWorks = [...works].sort((left, right) => {
    if (left.featured !== right.featured) {
      return Number(right.featured) - Number(left.featured);
    }

    if (left.status !== right.status) {
      return left.status === "active" ? -1 : 1;
    }

    return left.title.localeCompare(right.title);
  });

  return (
    <>
      <PageIntro
        eyebrow="Obras"
        title="Obras en cartel y archivo reciente del grupo."
        description="La seccion ya queda ordenada para vivir sobre datos reales mas adelante: listado responsive, cards reutilizables y un modelo de datos limpio para conectar Supabase sin rehacer la UI."
      />

      <section className="section-divider py-16 sm:py-20 lg:py-24">
        <Container>
          <WorksGrid works={orderedWorks} />
        </Container>
      </section>
    </>
  );
}
