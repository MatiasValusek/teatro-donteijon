import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { WorkForm } from "@/components/admin/works/work-form";

export default function NewWorkPage() {
  return (
    <>
      <AdminPageTitle
        title="Nueva obra"
        description="Carga una nueva ficha para el repertorio."
      />
      <WorkForm />
    </>
  );
}
