import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

import { refreshTokenService } from "./services/refresh-token.service";

const publicRoutes = [
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/", whenAuthenticated: "next" },
  { path: "/pricing", whenAuthenticated: "next" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);

  // No middleware, a forma mais segura de pegar cookies é pelo próprio 'request'
  const accessToken = request.cookies.get("jogai-app.token")?.value;

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
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  if (accessToken && !publicRoute) {
    try {
      // 1. Lemos o token e pegamos a data de expiração (exp)
      const decoded = jwtDecode<{ exp: number; refreshToken: string }>(
        accessToken,
      );

      // O 'exp' do JWT vem em segundos. O Date.now() é em milissegundos.
      const isExpired = Date.now() >= decoded.exp * 1000;

      // 2. Se NÃO estiver expirado, deixa a requisição passar normalmente!
      if (!isExpired) {
        return NextResponse.next();
      }

      // 3. Se ESTIVER expirado, fazemos o Refresh!
      // (Certifique-se que refreshTokenService retorna o { accessToken })
      const { accessToken: newAccessToken } = await refreshTokenService({
        refreshToken: decoded.refreshToken,
      });

      // 4. MÁGICA DO NEXT.JS: Criamos a resposta e ATUALIZAMOS o cookie no navegador!
      const response = NextResponse.next();

      response.cookies.set("jogai-app.token", newAccessToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 Dias (ajuste para o tempo que quiser manter o usuário logado)
      });

      return response;
    } catch (error: any) {
      // Se der qualquer erro (token malformado, refresh falhou, etc), joga pro Login
      console.warn(
        error.message ||
          "Sessão inválida ou falha no Refresh. Redirecionando para login.",
      );

      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
      const response = NextResponse.redirect(redirectUrl);

      // Limpa o cookie problemático para não ficar num loop infinito
      response.cookies.delete("jogai-app.token");

      return response;
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icons).*)",
  ],
};
