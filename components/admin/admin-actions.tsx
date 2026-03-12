"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";

type AdminActionsProps = {
  cancelHref: string;
  cancelLabel?: string;
  submitLabel: string;
  pendingLabel?: string;
};

export function AdminActions({
  cancelHref,
  cancelLabel = "Cancelar",
  submitLabel,
  pendingLabel,
}: AdminActionsProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
      <Link
        href={cancelHref}
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-none"
      >
        {cancelLabel}
      </Link>
      <AdminSubmitButton
        submitLabel={submitLabel}
        pendingLabel={pendingLabel}
      />
    </div>
  );
}

type AdminSubmitButtonProps = {
  submitLabel: string;
  pendingLabel?: string;
};

function AdminSubmitButton({
  submitLabel,
  pendingLabel = "Guardando...",
}: AdminSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f45c2c,#ff8e3c)] px-5 text-sm font-semibold text-zinc-950 shadow-[0_18px_60px_rgba(244,92,44,0.2)] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-65"
    >
      {pending ? pendingLabel : submitLabel}
    </button>
  );
}
