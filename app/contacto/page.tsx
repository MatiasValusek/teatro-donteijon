import type { Metadata } from "next";
import { ContactCta } from "@/components/contact/contact-cta";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactTopics } from "@/components/contact/contact-topics";
import { Container } from "@/components/ui/container";
import { contactTopics, siteConfig, socialLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Canales de contacto, prensa, talleres y futuras reservas de Vamos de Nuevo.",
};

export default function ContactoPage() {
  return (
    <>
      <ContactHero topics={contactTopics.map((topic) => topic.label)} />

      <section className="section-divider section-space">
        <Container className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <ContactInfo site={siteConfig} socialLinks={socialLinks} />
          <ContactForm fallbackEmail={siteConfig.email} />
        </Container>
      </section>

      <ContactTopics topics={contactTopics} />
      <ContactCta />
    </>
  );
}
