import { Container } from "@/components/ui/container";
import { SectionShell } from "@/components/ui/section-shell";
import type { Member } from "@/types/about";
import { MemberCard } from "./member-card";

type MembersGridProps = {
  members: Member[];
};

export function MembersGrid({ members }: MembersGridProps) {
  return (
    <SectionShell
      id="integrantes"
      eyebrow="Quienes hacemos VdN"
      title="Un grupo sostenido por escena, tecnica y produccion."
      description="Las obras se construyen desde un entramado de miradas complementarias. Cada integrante sostiene una parte del proceso y, al mismo tiempo, participa de una identidad comun."
    >
      <Container className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </Container>
    </SectionShell>
  );
}
