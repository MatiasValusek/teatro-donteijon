import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { NewsPost } from "@/types/content";

type NewsContentProps = {
  post: NewsPost;
};

export function NewsContent({ post }: NewsContentProps) {
  const paragraphs = post.content
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <section className="section-divider section-space">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="space-y-5">
            {paragraphs.map((paragraph, index) => (
              <p
                key={`${post.id}-${index}`}
                className={
                  index === 0
                    ? "text-lg leading-8 text-muted-strong sm:text-xl"
                    : "text-base leading-8 text-muted sm:text-lg"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {post.gallery?.length ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {post.gallery.map((image) => (
                <div
                  key={image.src}
                  className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 media-overlay" />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
