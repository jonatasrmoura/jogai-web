import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const publicRoutes = [
  { path: "/sign-in", whenAuthenticated: "redirect" },
  { path: "/register", whenAuthenticated: "redirect" },
  { path: "/home", whenAuthenticated: "redirect" },
  { path: "/pricing", whenAuthenticated: "next" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("jogai-app.token")?.value;

  if (!accessToken && publicRoute) {
    return NextResponse.next();
  }

  if (!accessToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (
    accessToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/"; // Dashboard
    return NextResponse.redirect(redirectUrl);
  }

  if (accessToken && !publicRoute) {
    // Checar se o JWT esta EXPIRADO
    // Se sim, remover o cookie e redirecionar o usuario pro login

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */

    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
