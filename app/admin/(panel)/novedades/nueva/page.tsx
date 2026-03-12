import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { NewsForm } from "@/components/admin/news/news-form";

export default function NewNewsPage() {
  return (
    <>
      <AdminPageTitle
        title="Nueva novedad"
        description="Crea una nueva publicacion editorial para el sitio."
      />
      <NewsForm />
    </>
  );
}
