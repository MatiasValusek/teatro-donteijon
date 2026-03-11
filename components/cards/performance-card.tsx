import Link from "next/link";
import { works } from "@/lib/mocks";
import {
  performanceAvailabilityLabel,
  performanceAvailabilityStyles,
} from "@/lib/theme";
import { formatLongDate } from "@/lib/utils";
import type { Performance } from "@/types/content";

type PerformanceCardProps = {
  performance: Performance;
  showWorkTitle?: boolean;
};

export function PerformanceCard({
  performance,
  showWorkTitle = false,
}: PerformanceCardProps) {
  const work = works.find((item) => item.slug === performance.workSlug);
  const availabilityStyles =
    performanceAvailabilityStyles[performance.availability];

  return (
    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(12,12,12,0.95))] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-orange-200/80">
            {formatLongDate(performance.date)}
          </p>
          <h3 className="mt-3 text-3xl leading-none text-white">
            {performance.venue}
          </h3>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.25em] ${availabilityStyles}`}
        >
          {performanceAvailabilityLabel[performance.availability]}
        </span>
      </div>

      {showWorkTitle && work ? (
        <p className="mt-4 text-base text-white">{work.title}</p>
      ) : null}

      <p className="mt-2 text-sm leading-7 text-muted">
        {performance.city} · {performance.time}
      </p>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {performance.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={performance.ticketUrl ?? "/contacto"}
          target={performance.ticketUrl ? "_blank" : undefined}
          rel={performance.ticketUrl ? "noreferrer" : undefined}
          className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-white/10 px-4 text-sm font-medium text-white hover:bg-white/8"
        >
          {performance.ticketUrl ? "Reservar" : "Consultar"}
        </Link>
      </div>
    </article>
  );
}
