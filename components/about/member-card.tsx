import Image from "next/image";
import type { Member } from "@/types/about";

type MemberCardProps = {
  member: Member;
};

export function MemberCard({ member }: MemberCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.05),rgba(12,12,12,0.96))]">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={member.image}
          alt={`Retrato de ${member.name}`}
          fill
          sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.56))]" />
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-200/75">
          {member.role}
        </p>
        <h3 className="mt-3 text-3xl leading-none text-white">
          {member.name}
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted">{member.bio}</p>
      </div>
    </article>
  );
}
