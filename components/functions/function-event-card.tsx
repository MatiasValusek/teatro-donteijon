import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  formatDayNumber,
  formatLongDate,
  formatShortMonth,
} from "@/lib/utils";
import type { FunctionEvent } from "@/types/content";

type FunctionEventCardProps = {
  event: FunctionEvent;
  workTitle?: string;
};

export function FunctionEventCard({
  event,
  workTitle,
}: FunctionEventCardProps) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(12,12,12,0.95))] p-5 sm:p-6">
      <div className="flex gap-4">
        <div className="flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-[1.4rem] border border-orange-300/15 bg-[linear-gradient(160deg,rgba(244,92,44,0.18),rgba(15,15,15,0.98))] text-center">
          <span className="text-2xl font-semibold text-white">
            {formatDayNumber(event.date)}
          </span>
          <span className="mt-1 text-[0.68rem] uppercase tracking-[0.28em] text-orange-100">
            {formatShortMonth(event.date)}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          {workTitle ? (
            <p className="text-xs uppercase tracking-[0.3em] text-orange-200/75">
              {workTitle}
            </p>
          ) : null}
          <h3 className="mt-2 text-3xl leading-none text-white">
            {event.venueName}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            {event.venueAddress}
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.28em] text-orange-100">
            {formatLongDate(event.date)} · {event.time} hs
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Badge variant="warm">Reservas abiertas</Badge>
        <Link
          href={event.reservationUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 px-5 text-sm font-semibold text-white hover:bg-white/8"
        >
          Reservar
        </Link>
      </div>
    </article>
  );
}
