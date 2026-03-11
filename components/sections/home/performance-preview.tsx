import { PerformanceCard } from "@/components/cards/performance-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionShell } from "@/components/ui/section-shell";
import { performances } from "@/lib/mocks";

export function PerformancePreviewSection() {
  return (
    <SectionShell
      eyebrow="Próximas funciones"
      title="Fechas destacadas con lectura rápida y CTA claros."
      description="Tarjetas mobile first, pensadas para calendario real, reservas y estados de disponibilidad cuando conectemos Supabase."
      action={
        <ButtonLink href="/funciones" size="md">
          Ver toda la agenda
        </ButtonLink>
      }
    >
      <Container className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {performances.slice(0, 3).map((performance) => (
          <PerformanceCard
            key={performance.id}
            performance={performance}
            showWorkTitle
          />
        ))}
      </Container>
    </SectionShell>
  );
}
