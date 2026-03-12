import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { newsCategoryLabel, newsCategoryStyles } from "@/lib/theme";
import { formatLongDate } from "@/lib/utils";
import type { NewsPost } from "@/types/content";

type NewsCardProps = {
  post: NewsPost;
};

export function NewsCard({ post }: NewsCardProps) {
  const categoryStyle = newsCategoryStyles[post.category];

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border ${categoryStyle.surface} transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-white/14 hover:shadow-[0_18px_50px_rgba(0,0,0,0.22)]`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.coverAlt ?? post.title}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.56))]" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.25em] ${categoryStyle.chip}`}
          >
            {newsCategoryLabel[post.category]}
          </span>
          <span className="text-xs uppercase tracking-[0.24em] text-muted">
            {formatLongDate(post.publishedAt)}
          </span>
        </div>

        <h3 className="mt-5 text-3xl leading-none text-white">{post.title}</h3>
        <p className="mt-4 text-sm leading-7 text-muted">{post.excerpt}</p>

        <div className="mt-8">
          <ButtonLink href={`/novedades/${post.slug}`} variant="secondary" size="md">
            Leer mas
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
