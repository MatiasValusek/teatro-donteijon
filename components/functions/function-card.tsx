import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";
import { formatLongDate } from "@/lib/utils";
import type { FunctionEventWithWork } from "@/types/content";

type FunctionCardProps = {
  item: FunctionEventWithWork;
};

export function FunctionCard({ item }: FunctionCardProps) {
  const { event, work } = item;

  return (
    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(10,10,10,0.98))] p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-[6.5rem,1fr] sm:items-start">
        <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10">
          <div className="relative aspect-[4/5]">
            <Image
              src={work.coverImage}
              alt={work.coverAlt}
              fill
              sizes="(max-width: 639px) 100vw, 104px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.08),rgba(8,8,8,0.66))]" />
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <Badge variant="warm">{event.time} hs</Badge>
            <Badge>{work.genre}</Badge>
          </div>

          <h3 className="mt-4 text-3xl leading-none text-white">
            {work.title}
          </h3>
          <p className="mt-3 text-sm uppercase tracking-[0.28em] text-orange-100">
            {formatLongDate(event.date)}
          </p>
          <p className="mt-3 text-lg text-white">{event.venueName}</p>
          <p className="mt-2 text-sm leading-7 text-muted">
            {event.venueAddress}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={event.reservationUrl} external size="md">
          Reservar
        </ButtonLink>
        <ButtonLink href={`/obras/${work.slug}`} variant="secondary" size="md">
          Ver obra
        </ButtonLink>
      </div>
    </article>
  );
}
