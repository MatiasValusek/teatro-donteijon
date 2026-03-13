import { Badge } from "@/components/ui/badge";

type MemberActiveBadgeProps = {
  active: boolean;
};

export function MemberActiveBadge({ active }: MemberActiveBadgeProps) {
  return (
    <Badge variant={active ? "success" : "soft"}>
      {active ? "Activo" : "Inactivo"}
    </Badge>
  );
}
