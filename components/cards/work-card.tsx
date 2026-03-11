import Link from "next/link";
import { toneStyles, workStageLabel } from "@/lib/theme";
import type { Work } from "@/types/content";

type WorkCardProps = {
  work: Work;
};

export function WorkCard({ work }: WorkCardProps) {
  const tone = toneStyles[work.tone];

  return (
    <article
      className={`grain-mask overflow-hidden rounded-[2rem] border p-5 sm:p-6 ${tone.surface}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] ${tone.chip}`}
        >
          {workStageLabel[work.stage]}
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted">
          {work.durationMinutes} min
        </span>
      </div>

      <div className="mt-6">
        <h3 className="text-4xl leading-none text-white">{work.title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{work.summary}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {work.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.3em] text-orange-200/75">
          {work.premiereSeason}
        </p>
        <Link
          href={`/obras/${work.slug}`}
          className="inline-flex min-h-11 items-center rounded-full border border-white/10 px-4 text-sm font-medium text-white hover:bg-white/8"
        >
          Ver obra
        </Link>
      </div>
    </article>
  );
}
