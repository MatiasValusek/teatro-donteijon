import Image from "next/image";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionShell } from "@/components/ui/section-shell";
import { cn } from "@/lib/utils";
import type { GroupGalleryImage } from "@/types/about";

type GroupGalleryProps = {
  images: GroupGalleryImage[];
};

const layoutClasses = [
  "md:col-span-2 xl:col-span-7",
  "xl:col-span-5",
  "xl:col-span-4",
  "xl:col-span-4",
  "xl:col-span-4",
  "md:col-span-2 xl:col-span-12",
];

const aspectClasses = [
  "aspect-[4/5] md:aspect-[16/10]",
  "aspect-[4/5] md:aspect-[10/11]",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[4/5] md:aspect-[16/8]",
];

const imageSizes = [
  "(min-width: 1280px) 640px, (min-width: 768px) calc(100vw - 4rem), calc(100vw - 2rem)",
  "(min-width: 1280px) 420px, (min-width: 768px) calc(50vw - 2rem), calc(100vw - 2rem)",
  "(min-width: 1280px) 360px, (min-width: 768px) calc(50vw - 2rem), calc(100vw - 2rem)",
  "(min-width: 1280px) 360px, (min-width: 768px) calc(50vw - 2rem), calc(100vw - 2rem)",
  "(min-width: 1280px) 360px, (min-width: 768px) calc(50vw - 2rem), calc(100vw - 2rem)",
  "(min-width: 1280px) 1120px, (min-width: 768px) calc(100vw - 4rem), calc(100vw - 2rem)",
];

export function GroupGallery({ images }: GroupGalleryProps) {
  return (
    <SectionShell
      id="galeria"
      eyebrow="Ensayos, escena y backstage"
      title="Imagenes del grupo cuando la obra todavia esta ocurriendo."
      description="Una grilla sobria y flexible para mostrar ensayos, materiales de proceso, escena y encuentros del grupo sin depender de sliders pesados."
    >
      <Container className="grid gap-4 md:grid-cols-2 xl:grid-cols-12">
        {images.length > 0 ? (
          images.map((image, index) => (
            <article
              key={image.id}
              className={cn(
                "group overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/40",
                layoutClasses[index] ?? "xl:col-span-4",
              )}
            >
              <div
                className={cn(
                  "relative overflow-hidden",
                  aspectClasses[index] ?? "aspect-[4/5]",
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    imageSizes[index] ??
                    "(min-width: 1280px) 360px, (min-width: 768px) calc(50vw - 2rem), calc(100vw - 2rem)"
                  }
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.68))]" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-200/75">
                    {image.category}
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/88">
                    {image.caption}
                  </p>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="md:col-span-2 xl:col-span-12">
            <EmptyState
              title="Todavia no hay imagenes publicadas."
              description="La galeria del grupo va a aparecer aca en cuanto haya material visible cargado."
            />
          </div>
        )}
      </Container>
    </SectionShell>
  );
}
