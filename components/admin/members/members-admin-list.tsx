import { AdminList } from "@/components/admin/admin-list";
import { Badge } from "@/components/ui/badge";
import type { AdminMemberRow } from "@/lib/queries/admin";
import { MemberActiveBadge } from "./member-active-badge";

type MembersAdminListProps = {
  members: AdminMemberRow[];
};

export function MembersAdminList({ members }: MembersAdminListProps) {
  return (
    <AdminList
      emptyTitle="Todavia no hay integrantes cargados."
      emptyDescription="Crea el primer integrante para poblar la pagina Nosotros."
      items={members.map((member) => ({
        id: member.id,
        title: member.name,
        href: `/admin/integrantes/${member.id}`,
        eyebrow: member.role,
        description: member.bio,
        badges: [<MemberActiveBadge key="active" active={member.is_active} />],
        meta: [
          <Badge key="order" variant="soft">
            Orden {member.sort_order}
          </Badge>,
        ],
      }))}
    />
  );
}
