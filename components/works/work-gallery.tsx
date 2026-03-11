import Image from "next/image";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { Work } from "@/types/content";

type WorkGalleryProps = {
  work: Work;
};

export function WorkGallery({ work }: WorkGalleryProps) {
  if (work.gallery.length === 0) {
    return null;
  }

  return (
    <section className="section-divider py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-200/75">
            Galeria
          </p>
          <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl">
            Imagenes mock para probar ritmo, escala y atmosfera.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {work.gallery.slice(0, 4).map((image, index) => (
            <figure
              key={image.src}
              className={cn(
                "overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5",
                index === 0 && "sm:col-span-2",
              )}
            >
              <div
                className={cn(
                  "relative",
                  index === 0 ? "aspect-[16/9]" : "aspect-[4/3]",
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 639px) 100vw, 100vw"
                      : "(max-width: 639px) 100vw, 50vw"
                  }
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.08),rgba(10,10,10,0.52))]" />
              </div>
              <figcaption className="px-4 py-3 text-sm text-muted">
                {image.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
