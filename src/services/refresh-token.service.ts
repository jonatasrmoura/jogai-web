import { setAccessTokenCookies } from "../config/cookies/auth/set-access-token-cookies";
import { api } from "./api";

type RefreshTokenRequest = {
  refreshToken: string;
};

type RefreshTokenResponse = {
  accessToken: string;
};

export async function refreshTokenService({
  refreshToken,
}: RefreshTokenRequest): Promise<void> {
  const responseApi = await api<RefreshTokenResponse>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });

  if (!responseApi) {
    throw new Error("Erro ao fazer refresh do token");
  }

  setAccessTokenCookies(responseApi.accessToken);
}
