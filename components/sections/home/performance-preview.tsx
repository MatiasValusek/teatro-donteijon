import { FunctionEventCard } from "@/components/functions/function-event-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionShell } from "@/components/ui/section-shell";
import type { FunctionEventWithWork } from "@/types/content";

type PerformancePreviewSectionProps = {
  items: FunctionEventWithWork[];
};

export function PerformancePreviewSection({
  items,
}: PerformancePreviewSectionProps) {
  return (
    <SectionShell
      eyebrow="Proximas funciones"
      title="Fechas destacadas con lectura rapida y CTA claros."
      description="Tarjetas mobile first, pensadas para agenda real, reservas y estados de disponibilidad sin duplicar logica entre secciones."
      action={
        <ButtonLink href="/funciones" size="md">
          Ver toda la agenda
        </ButtonLink>
      }
    >
      <Container className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.length > 0 ? (
          items.map((item) => (
            <FunctionEventCard
              key={item.event.id}
              event={item.event}
              workTitle={item.work.title}
            />
          ))
        ) : (
          <div className="md:col-span-2 xl:col-span-3">
            <EmptyState
              title="Todavia no hay funciones publicadas."
              description="La agenda publica ya esta conectada para mostrar nuevas fechas apenas queden activas en el panel."
              action={
                <ButtonLink href="/contacto" variant="secondary" size="md">
                  Contactar al grupo
                </ButtonLink>
              }
            />
          </div>
        )}
      </Container>
    </SectionShell>
  );
}
