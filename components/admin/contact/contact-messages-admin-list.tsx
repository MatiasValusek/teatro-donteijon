import type { AdminContactMessageListItem } from "@/types/inbox";
import { Badge } from "@/components/ui/badge";

type ContactMessagesAdminListProps = {
  items: AdminContactMessageListItem[];
};

export function ContactMessagesAdminList({
  items,
}: ContactMessagesAdminListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-[1.8rem] border border-dashed border-white/12 bg-white/[0.03] p-6 sm:p-8">
        <h3 className="text-2xl text-white">Todavia no llegaron mensajes.</h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Las consultas generales enviadas desde /contacto van a mostrarse aca
          para que el grupo pueda responderlas desde sus canales habituales.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.04),rgba(10,10,10,0.98))] p-5 sm:p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-200/75">
            {item.createdAtLabel}
          </p>
          <h3 className="mt-2 text-balance text-3xl leading-none text-white">
            {item.subject}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="soft">{item.fullName}</Badge>
            <Badge variant="soft">{item.email}</Badge>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted">{item.message}</p>
        </article>
      ))}
    </div>
  );
}
