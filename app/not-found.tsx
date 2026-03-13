import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";

export default function NotFound() {
  return (
    <section className="section-space">
      <Container>
        <EmptyState
          title="No encontramos la pagina que buscas."
          description="Puede que la ruta haya cambiado, el contenido ya no este publicado o el enlace este incompleto."
          action={
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/" size="md">
                Volver al inicio
              </ButtonLink>
              <ButtonLink href="/contacto" variant="secondary" size="md">
                Contactar al grupo
              </ButtonLink>
            </div>
          }
        />
      </Container>
    </section>
  );
}
