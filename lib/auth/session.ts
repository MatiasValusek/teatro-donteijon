import type { User } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseClient } from "@/lib/supabase/base";

export const adminAuthCookieNames = {
  accessToken: "vdn-admin-access-token",
  refreshToken: "vdn-admin-refresh-token",
} as const;

export const adminAuthHeaderNames = {
  accessToken: "x-vdn-admin-access-token",
  refreshToken: "x-vdn-admin-refresh-token",
} as const;

type ReadableTokenStore = {
  get(name: string): { value?: string } | undefined;
};

type ReadableHeaderStore = {
  get(name: string): string | null;
};

type MutableTokenStore = {
  set(
    name: string,
    value: string,
    options?: {
      httpOnly?: boolean;
      sameSite?: "lax" | "strict" | "none";
      secure?: boolean;
      path?: string;
      maxAge?: number;
    },
  ): void;
  delete(name: string): void;
};

export type AdminSessionTokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

export type ResolvedAdminSession = {
  user: User | null;
  session: AdminSessionTokens | null;
  shouldClear: boolean;
};

function getAuthCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export function isAdminAccessConfigured() {
  return isSupabaseConfigured;
}

export function getAdminSessionTokensFromStore(
  store: ReadableTokenStore,
): AdminSessionTokens {
  return {
    accessToken: store.get(adminAuthCookieNames.accessToken)?.value ?? null,
    refreshToken: store.get(adminAuthCookieNames.refreshToken)?.value ?? null,
  };
}

export function getAdminSessionTokensFromHeaders(headers: ReadableHeaderStore) {
  return {
    accessToken: headers.get(adminAuthHeaderNames.accessToken),
    refreshToken: headers.get(adminAuthHeaderNames.refreshToken),
  };
}

export function setAdminSessionCookies(
  store: MutableTokenStore,
  session: AdminSessionTokens,
) {
  if (session.accessToken) {
    store.set(
      adminAuthCookieNames.accessToken,
      session.accessToken,
      getAuthCookieOptions(),
    );
  }

  if (session.refreshToken) {
    store.set(
      adminAuthCookieNames.refreshToken,
      session.refreshToken,
      getAuthCookieOptions(),
    );
  }
}

export function clearAdminSessionCookies(store: MutableTokenStore) {
  store.delete(adminAuthCookieNames.accessToken);
  store.delete(adminAuthCookieNames.refreshToken);
}

export function applyAdminSessionHeaders(
  headers: Headers,
  session: AdminSessionTokens | null,
) {
  if (!session?.accessToken || !session.refreshToken) {
    headers.delete(adminAuthHeaderNames.accessToken);
    headers.delete(adminAuthHeaderNames.refreshToken);
    return;
  }

  headers.set(adminAuthHeaderNames.accessToken, session.accessToken);
  headers.set(adminAuthHeaderNames.refreshToken, session.refreshToken);
}

export function normalizeAdminRedirectPath(value?: string | null) {
  if (!value || !value.startsWith("/admin")) {
    return "/admin";
  }

  return value === "/admin/login" ? "/admin" : value;
}

export async function resolveAdminSession(
  tokens: AdminSessionTokens,
): Promise<ResolvedAdminSession> {
  if (!isAdminAccessConfigured()) {
    return {
      user: null,
      session: null,
      shouldClear: false,
    };
  }

  const client = createSupabaseClient();

  if (!client) {
    return {
      user: null,
      session: null,
      shouldClear: false,
    };
  }

  if (tokens.accessToken) {
    const { data, error } = await client.auth.getUser(tokens.accessToken);

    if (!error && data.user) {
      return {
        user: data.user,
        session: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
        shouldClear: false,
      };
    }
  }

  if (tokens.refreshToken) {
    const { data, error } = await client.auth.refreshSession({
      refresh_token: tokens.refreshToken,
    });

    if (!error && data.session) {
      const { data: refreshedUser, error: userError } = await client.auth.getUser(
        data.session.access_token,
      );

      if (!userError && refreshedUser.user) {
        return {
          user: refreshedUser.user,
          session: {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
          },
          shouldClear: false,
        };
      }
    }
  }

  return {
    user: null,
    session: null,
    shouldClear: Boolean(tokens.accessToken || tokens.refreshToken),
  };
}
