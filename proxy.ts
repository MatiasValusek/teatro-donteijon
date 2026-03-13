import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  adminAuthCookieNames,
  applyAdminSessionHeaders,
  clearAdminSessionCookies,
  getAdminSessionTokensFromStore,
  normalizeAdminRedirectPath,
  resolveAdminSession,
  setAdminSessionCookies,
} from "@/lib/auth/session";

function applySessionState(
  response: NextResponse,
  state: Awaited<ReturnType<typeof resolveAdminSession>>,
) {
  if (state.session?.accessToken && state.session.refreshToken) {
    setAdminSessionCookies(response.cookies, state.session);
  } else if (state.shouldClear) {
    clearAdminSessionCookies(response.cookies);
  }

  return response;
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isLoginRoute = pathname === "/login";
  const isLegacyAdminLoginRoute = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin");

  if (!isLoginRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  const authState = await resolveAdminSession(
    getAdminSessionTokensFromStore(request.cookies),
  );

  const requestHeaders = new Headers(request.headers);
  applyAdminSessionHeaders(requestHeaders, authState.session);

  if (isLegacyAdminLoginRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = authState.user ? "/admin" : "/login";
    redirectUrl.search = "";

    return applySessionState(NextResponse.redirect(redirectUrl), authState);
  }

  if (isLoginRoute) {
    if (authState.user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = normalizeAdminRedirectPath(
        request.nextUrl.searchParams.get("redirectTo"),
      );
      redirectUrl.search = "";

      return applySessionState(NextResponse.redirect(redirectUrl), authState);
    }

    return applySessionState(
      NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      }),
      authState,
    );
  }

  if (!authState.user) {
    const loginUrl = request.nextUrl.clone();
    const redirectTo = `${pathname}${request.nextUrl.search}`;

    loginUrl.pathname = "/login";
    loginUrl.search = "";
    loginUrl.searchParams.set(
      "redirectTo",
      normalizeAdminRedirectPath(redirectTo),
    );

    const response = NextResponse.redirect(loginUrl);

    if (
      request.cookies.get(adminAuthCookieNames.accessToken) ||
      request.cookies.get(adminAuthCookieNames.refreshToken)
    ) {
      clearAdminSessionCookies(response.cookies);
    }

    return response;
  }

  return applySessionState(
    NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    }),
    authState,
  );
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
