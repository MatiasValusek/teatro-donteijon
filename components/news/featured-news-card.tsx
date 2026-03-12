import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { newsCategoryLabel, newsCategoryStyles } from "@/lib/theme";
import { formatLongDate } from "@/lib/utils";
import type { NewsPost } from "@/types/content";

type FeaturedNewsCardProps = {
  post: NewsPost;
};

export function FeaturedNewsCard({ post }: FeaturedNewsCardProps) {
  const categoryStyle = newsCategoryStyles[post.category];

  return (
    <article
      className={`grain-mask overflow-hidden rounded-[2.4rem] border ${categoryStyle.surface}`}
    >
      <div className="grid gap-0 lg:grid-cols-[1.08fr,0.92fr]">
        <div className="relative min-h-[18rem] sm:min-h-[24rem]">
          <Image
            src={post.coverImage}
            alt={post.coverAlt ?? post.title}
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 media-overlay" />
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] ${categoryStyle.chip}`}
            >
              {newsCategoryLabel[post.category]}
            </span>
            <span className="text-xs uppercase tracking-[0.24em] text-muted">
              {formatLongDate(post.publishedAt)}
            </span>
          </div>

          <h2 className="mt-6 max-w-xl text-4xl leading-none text-white sm:text-5xl">
            {post.title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted sm:text-lg">
            {post.excerpt}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`/novedades/${post.slug}`}>Leer la nota</ButtonLink>
            <ButtonLink href="/funciones" variant="secondary">
              Ver funciones
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}
