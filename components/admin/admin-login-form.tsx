"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAdmin, type AdminLoginState } from "@/lib/actions/admin-auth";

const initialState: AdminLoginState = {};

type AdminLoginFormProps = {
  redirectTo?: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f45c2c,#ff8e3c)] px-6 text-sm font-semibold text-zinc-950 shadow-[0_18px_60px_rgba(244,92,44,0.2)] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Ingresando..." : "Iniciar sesion"}
    </button>
  );
}

export function AdminLoginForm({ redirectTo = "/admin" }: AdminLoginFormProps) {
  const [state, action] = useActionState(loginAdmin, initialState);

  return (
    <form action={action} className="mt-8 grid gap-4">
      <input type="hidden" name="redirect_to" value={redirectTo} />

      <label className="grid gap-2">
        <span className="text-sm font-medium text-white">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          className="min-h-12 rounded-[1.1rem] border border-white/10 bg-black/35 px-4 text-sm text-white"
        />
        {state.fieldErrors?.email ? (
          <span className="text-sm text-red-200">{state.fieldErrors.email}</span>
        ) : null}
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-white">Contrasena</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          className="min-h-12 rounded-[1.1rem] border border-white/10 bg-black/35 px-4 text-sm text-white"
        />
        {state.fieldErrors?.password ? (
          <span className="text-sm text-red-200">
            {state.fieldErrors.password}
          </span>
        ) : null}
      </label>

      {state.error ? (
        <div className="rounded-[1.2rem] border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {state.error}
        </div>
      ) : null}

      <SubmitButton />
    </form>
  );
}
