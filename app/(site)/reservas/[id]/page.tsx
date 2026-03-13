import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ReservationForm } from "@/components/reservations/reservation-form";
import { ReservationSummary } from "@/components/reservations/reservation-summary";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { getReservationFunctionById } from "@/lib/queries/reservations";
import {
  buildDescriptionFallback,
  buildPageTitle,
  createNotFoundMetadata,
  createPageMetadata,
} from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

type ReservationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: ReservationPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = await getReservationFunctionById(id);

  if (!item) {
    return createNotFoundMetadata(
      "Reserva no disponible",
      "Reservas",
      `/reservas/${id}`,
    );
  }

  return createPageMetadata({
    title: buildPageTitle(`Reservar ${item.workTitle}`, "Funciones"),
    description: buildDescriptionFallback(
      `Reserva interna para ${item.workTitle} el ${item.startsAtLabel} en ${item.venueName}.`,
    ),
    path: `/reservas/${item.id}`,
    noIndex: true,
  });
}

export default async function ReservationPage({ params }: ReservationPageProps) {
  const { id } = await params;
  const item = await getReservationFunctionById(id);

  if (!item) {
    notFound();
  }

  if (item.reservationUrl?.trim()) {
    redirect(item.reservationUrl);
  }

  return (
    <section className="section-space">
      <Container className="grid gap-6 lg:grid-cols-[0.92fr,1.08fr]">
        <ReservationSummary item={item} />
        <ReservationForm item={item} />
      </Container>

      <Container className="mt-6">
        <EmptyState
          title="Necesitas otra via de contacto?"
          description={`Si prefieres resolver la reserva por correo o conversar primero con el grupo, tambien puedes escribir a ${siteConfig.email}.`}
          action={
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/funciones" variant="secondary" size="md">
                Volver a funciones
              </ButtonLink>
              <ButtonLink href="/contacto" size="md">
                Contactar al grupo
              </ButtonLink>
            </div>
          }
        />
      </Container>
    </section>
  );
}
