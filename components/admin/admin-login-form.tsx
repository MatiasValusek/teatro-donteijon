"use client";

import { useActionState } from "react";
import { loginAdmin, type AdminLoginState } from "@/lib/actions/admin-auth";

const initialState: AdminLoginState = {};

export function AdminLoginForm() {
  const [state, action] = useActionState(loginAdmin, initialState);

  return (
    <form action={action} className="mt-8 grid gap-4">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-white">Clave interna</span>
        <input
          name="access_token"
          type="password"
          className="min-h-12 rounded-[1.1rem] border border-white/10 bg-black/35 px-4 text-sm text-white"
        />
      </label>

      {state.error ? (
        <div className="rounded-[1.2rem] border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {state.error}
        </div>
      ) : null}

      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f45c2c,#ff8e3c)] px-6 text-sm font-semibold text-zinc-950 shadow-[0_18px_60px_rgba(244,92,44,0.2)] hover:brightness-105"
      >
        Entrar al panel
      </button>
    </form>
  );
}
