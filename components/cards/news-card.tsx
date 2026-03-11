import Link from "next/link";
import { newsCategoryLabel, toneStyles } from "@/lib/theme";
import { formatLongDate } from "@/lib/utils";
import type { NewsItem } from "@/types/content";

type NewsCardProps = {
  item: NewsItem;
};

export function NewsCard({ item }: NewsCardProps) {
  const tone = toneStyles[item.tone];

  return (
    <article
      className={`grain-mask overflow-hidden rounded-[2rem] border p-5 sm:p-6 ${tone.surface}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.25em] ${tone.chip}`}
        >
          {newsCategoryLabel[item.category]}
        </span>
        <span className="text-xs uppercase tracking-[0.24em] text-muted">
          {formatLongDate(item.publishedAt)}
        </span>
      </div>

      <h3 className="mt-6 text-3xl leading-none text-white">{item.title}</h3>
      <p className="mt-4 text-sm leading-7 text-muted">{item.excerpt}</p>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/novedades#${item.slug}`}
          className="inline-flex min-h-11 items-center rounded-full border border-white/10 px-4 text-sm font-medium text-white hover:bg-white/8"
        >
          Leer más
        </Link>
      </div>
    </article>
  );
}
