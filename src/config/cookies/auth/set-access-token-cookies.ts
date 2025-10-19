import { setCookie } from "nookies";

export function setAccessTokenCookies(accessToken: string): void {
  setCookie(undefined, "jogai-app.token", accessToken, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}