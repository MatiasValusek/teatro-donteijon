import { Badge } from "@/components/ui/badge";
import type { ReservationFunctionSummary } from "@/types/inbox";

type ReservationSummaryProps = {
  item: ReservationFunctionSummary;
};

export function ReservationSummary({ item }: ReservationSummaryProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(138,30,44,0.2),rgba(18,18,18,0.96))] p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
        Reserva interna
      </p>
      <h1 className="mt-4 text-balance text-4xl leading-none text-white sm:text-5xl">
        {item.workTitle}
      </h1>
      <p className="mt-5 text-base leading-8 text-muted">
        Completa este formulario para que el grupo reciba tu consulta y pueda
        confirmar la reserva por sus canales habituales.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Badge variant="warm">{item.startsAtLabel}</Badge>
        {item.ticketPriceText ? (
          <Badge variant="soft">{item.ticketPriceText}</Badge>
        ) : null}
      </div>

      <dl className="mt-8 grid gap-4 text-sm leading-7 text-muted">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-200/75">
            Sala
          </dt>
          <dd className="mt-1 text-base text-white">{item.venueName}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-200/75">
            Direccion
          </dt>
          <dd className="mt-1 text-base text-white">{item.venueAddress}</dd>
        </div>
      </dl>
    </div>
  );
}
