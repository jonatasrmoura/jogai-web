import { destroyCookie } from "nookies";

export function destroyAccessTokenCookies() {
  destroyCookie(null, "jogai-app.token", {
    path: "/",
  });
}
