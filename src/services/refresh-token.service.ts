import { setAccessTokenCookies } from "../config/cookies/auth/set-access-token-cookies";

type RefreshTokenRequest = {
  refreshToken: string;
};

type RefreshTokenResponse = {
  accessToken: string;
};

export async function refreshTokenService({
  refreshToken,
}: RefreshTokenRequest): Promise<RefreshTokenResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // 👇 Usamos o fetch nativo aqui para não contaminar o Edge Runtime com o SweetAlert
  const response = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Erro ao fazer refresh do token");
  }

  const responseData = (await response.json()) as RefreshTokenResponse;

  setAccessTokenCookies(responseData.accessToken);
  return responseData;
}
