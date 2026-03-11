import { FunctionEventCard } from "@/components/functions/function-event-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionShell } from "@/components/ui/section-shell";
import { getActiveFunctionEvents, getWorkById } from "@/lib/catalog";

export function PerformancePreviewSection() {
  const events = getActiveFunctionEvents().slice(0, 3);

  return (
    <SectionShell
      eyebrow="Proximas funciones"
      title="Fechas destacadas con lectura rapida y CTA claros."
      description="Tarjetas mobile first, pensadas para calendario real, reservas y estados de disponibilidad cuando conectemos Supabase."
      action={
        <ButtonLink href="/funciones" size="md">
          Ver toda la agenda
        </ButtonLink>
      }
    >
      <Container className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <FunctionEventCard
            key={event.id}
            event={event}
            workTitle={getWorkById(event.workId)?.title}
          />
        ))}
      </Container>
    </SectionShell>
  );
}
