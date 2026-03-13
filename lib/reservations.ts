import type { FunctionEvent } from "@/types/content";

export function hasExternalReservation(
  event: Pick<FunctionEvent, "reservationUrl">,
) {
  return Boolean(event.reservationUrl?.trim());
}

export function getFunctionReservationHref(
  event: Pick<FunctionEvent, "id" | "reservationUrl">,
) {
  if (hasExternalReservation(event)) {
    return event.reservationUrl ?? "";
  }

  return `/reservas/${event.id}`;
}

export function getFunctionReservationLabel(
  event: Pick<FunctionEvent, "reservationUrl">,
) {
  return hasExternalReservation(event) ? "Reservar" : "Consultar / reservar";
}
