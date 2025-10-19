import { destroyAccessTokenCookies } from "@/config/cookies/auth/destroy-access-token-cookies";

export function signOut() {
  destroyAccessTokenCookies();
}
