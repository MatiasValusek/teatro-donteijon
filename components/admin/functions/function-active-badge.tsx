import { Badge } from "@/components/ui/badge";

type FunctionActiveBadgeProps = {
  active: boolean;
};

export function FunctionActiveBadge({ active }: FunctionActiveBadgeProps) {
  return (
    <Badge variant={active ? "success" : "soft"}>
      {active ? "Activa" : "Inactiva"}
    </Badge>
  );
}
