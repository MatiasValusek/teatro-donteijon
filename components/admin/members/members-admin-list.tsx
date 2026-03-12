import Link from "next/link";
import type { AdminMemberRow } from "@/lib/queries/admin";
import { MemberActiveBadge } from "./member-active-badge";

type MembersAdminListProps = {
  members: AdminMemberRow[];
};

export function MembersAdminList({ members }: MembersAdminListProps) {
  if (members.length === 0) {
    return (
      <div className="rounded-[1.8rem] border border-dashed border-white/12 bg-white/[0.03] p-6 sm:p-8">
        <h3 className="text-2xl text-white">Todavia no hay integrantes cargados.</h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Crea el primer integrante para poblar la pagina Nosotros.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {members.map((member) => (
        <article
          key={member.id}
          className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.04),rgba(10,10,10,0.98))] p-5 sm:p-6"
        >
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-200/75">
                {member.role}
              </p>
              <h3 className="mt-2 text-3xl leading-none text-white">
                {member.name}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                {member.bio}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <MemberActiveBadge active={member.is_active} />
                <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted">
                  orden {member.sort_order}
                </span>
              </div>
            </div>

            <Link
              href={`/admin/integrantes/${member.id}`}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-none"
            >
              Editar
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
