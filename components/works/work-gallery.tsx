import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
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
    <section className="section-divider section-space">
      <Container>
        <SectionHeader
          eyebrow="Galeria"
          title="Imagenes de escena, proceso y atmosfera de la obra."
          description="La grilla se mantiene flexible para crecer con registros de escena, prensa o proceso sin cambiar la estructura base."
        />

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
                      ? "(min-width: 1280px) 1120px, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2rem)"
                      : "(min-width: 1280px) 540px, (min-width: 640px) calc(50vw - 2rem), calc(100vw - 2rem)"
                  }
                  className="object-cover"
                />
                <div className="absolute inset-0 media-overlay" />
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
