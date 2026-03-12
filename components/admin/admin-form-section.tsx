type AdminFormSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function AdminFormSection({
  title,
  description,
  children,
}: AdminFormSectionProps) {
  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.04),rgba(10,10,10,0.98))] p-5 sm:p-6">
      <div className="max-w-3xl">
        <h3 className="text-3xl leading-none text-white">{title}</h3>
        {description ? (
          <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
        ) : null}
      </div>
      <div className="mt-6 grid gap-5">{children}</div>
    </section>
  );
}
