import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/ui/page-hero";
import { Panel } from "@/components/ui/panel";

type ContactHeroProps = {
  topics: string[];
};

export function ContactHero({ topics }: ContactHeroProps) {
  return (
    <PageHero
      eyebrow="Contacto"
      title="Contacto"
      description="Queres comunicarte con Vamos de Nuevo? Escribinos para funciones, prensa, talleres o propuestas. La pagina queda clara hoy y lista para sumar logica real despues."
      aside={
        <Panel className="max-w-sm rounded-[1.8rem]" variant="warm">
          <p className="section-eyebrow">Canales</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Badge key={topic} variant="soft" className="bg-black/30 text-orange-100/85">
                {topic}
              </Badge>
            ))}
          </div>
        </Panel>
      }
    />
  );
}
