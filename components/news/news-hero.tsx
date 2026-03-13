import Image from "next/image";
import { Container } from "@/components/ui/container";
import { newsCategoryLabel, newsCategoryStyles } from "@/lib/theme";
import { formatLongDate } from "@/lib/utils";
import type { NewsPost } from "@/types/content";

type NewsHeroProps = {
  post: NewsPost;
};

export function NewsHero({ post }: NewsHeroProps) {
  const categoryStyle = newsCategoryStyles[post.category];

  return (
    <section className="page-hero-space-compact">
      <Container>
        <div
          className={`relative overflow-hidden rounded-[2.5rem] border ${categoryStyle.surface}`}
        >
          <div className="absolute inset-0">
            <Image
              src={post.coverImage}
              alt={post.coverAlt ?? post.title}
              fill
              priority
              sizes="(min-width: 1280px) 1120px, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2rem)"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 media-overlay-strong" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,150,82,0.2),transparent_28rem)]" />

          <div className="relative grid min-h-[26rem] content-end gap-6 p-6 sm:min-h-[32rem] sm:p-8 lg:min-h-[38rem] lg:p-12">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] ${categoryStyle.chip}`}
                >
                  {newsCategoryLabel[post.category]}
                </span>
                <span className="text-xs uppercase tracking-[0.26em] text-orange-100/75">
                  {formatLongDate(post.publishedAt)}
                </span>
              </div>

              <h1 className="mt-5 text-balance text-[3rem] leading-[0.92] text-white sm:text-[4.3rem] lg:text-[5.2rem]">
                {post.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-strong sm:text-lg">
                {post.excerpt}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
