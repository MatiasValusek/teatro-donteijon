import { PerformanceCard } from "@/components/cards/performance-card";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { performances } from "@/lib/mocks";

export default function FuncionesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Funciones"
        title="Agenda preparada para salas, giras y fechas especiales."
        description="Esta base ya soporta calendario, estado de entradas y vínculo con cada obra. El siguiente paso natural es conectar el origen de datos real."
      />

      <section className="section-divider py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {performances.map((performance) => (
            <PerformanceCard
              key={performance.id}
              performance={performance}
              showWorkTitle
            />
          ))}
        </Container>
      </section>
    </>
  );
}
