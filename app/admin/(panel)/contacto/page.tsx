import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { ContactMessagesAdminList } from "@/components/admin/contact/contact-messages-admin-list";
import { getAdminContactMessages } from "@/lib/queries/admin";

export default async function AdminContactPage() {
  const items = await getAdminContactMessages();

  return (
    <>
      <AdminPageTitle
        title="Contacto"
        description="Mensajes generales enviados desde la pagina publica de contacto."
      />

      <ContactMessagesAdminList items={items} />
    </>
  );
}
