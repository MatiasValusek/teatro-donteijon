import type { Metadata } from "next";
import { AboutCta } from "@/components/about/about-cta";
import { AboutHero } from "@/components/about/about-hero";
import { GroupGallery } from "@/components/about/group-gallery";
import { GroupHistory } from "@/components/about/group-history";
import { GroupManifesto } from "@/components/about/group-manifesto";
import { MembersGrid } from "@/components/about/members-grid";
import { getGroupGallery, getGroupInfo, getMembers } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Historia, identidad, integrantes y mirada artistica de Vamos de Nuevo.",
};

export default async function NosotrosPage() {
  const [groupInfo, galleryImages, members] = await Promise.all([
    getGroupInfo(),
    getGroupGallery(),
    getMembers(),
  ]);

  return (
    <>
      <AboutHero group={groupInfo} />
      <GroupHistory group={groupInfo} />
      <GroupManifesto group={groupInfo} />
      <MembersGrid members={members} />
      <GroupGallery images={galleryImages} />
      <AboutCta
        contactEmail={groupInfo.contactEmail}
        instagramUrl={groupInfo.instagramUrl}
      />
    </>
  );
}
