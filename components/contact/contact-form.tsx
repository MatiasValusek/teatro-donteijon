type ContactFormProps = {
  fallbackEmail: string;
};

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-[1.1rem] border border-white/10 bg-black/30 px-4 text-base text-white outline-none transition focus:border-orange-300/35 focus:bg-black/40";

export function ContactForm({ fallbackEmail }: ContactFormProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-200/80">
        Formulario visual
      </p>
      <h2 className="mt-4 text-4xl leading-none text-white sm:text-5xl">
        Dejanos un mensaje.
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
        El formulario queda maquetado y listo para conectarse despues con envio
        real. Mientras tanto, el canal activo sigue siendo{" "}
        <a href={`mailto:${fallbackEmail}`} className="text-white underline-offset-4 hover:underline">
          {fallbackEmail}
        </a>
        .
      </p>

      <form className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block" htmlFor="contact-name">
            <span className="text-sm font-medium text-white">Nombre</span>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Tu nombre"
              className={fieldClassName}
            />
          </label>

          <label className="block" htmlFor="contact-email">
            <span className="text-sm font-medium text-white">Email</span>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="tu@email.com"
              className={fieldClassName}
            />
          </label>
        </div>

        <label className="block" htmlFor="contact-subject">
          <span className="text-sm font-medium text-white">Asunto</span>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            placeholder="Funciones, prensa, talleres o propuesta"
            className={fieldClassName}
          />
        </label>

        <label className="block" htmlFor="contact-message">
          <span className="text-sm font-medium text-white">Mensaje</span>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder="Contanos en que podemos ayudarte."
            className={`${fieldClassName} min-h-40 py-3`}
          />
        </label>

        <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
          <p className="text-sm leading-7 text-muted">
            El envio todavia no esta activado. Esta UI queda lista para
            conectar con la logica real en un siguiente paso.
          </p>
        </div>

        <button
          type="button"
          disabled
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f45c2c,#ff8e3c)] px-6 text-base font-semibold text-zinc-950 opacity-70 disabled:cursor-not-allowed"
        >
          Enviar consulta
        </button>
      </form>
    </div>
  );
}
