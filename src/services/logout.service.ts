import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";

import { api } from "./api";

type LogoutResponse = {
  message: string;
};

export async function logoutService(): Promise<string> {
  const cookies = parseCookies();
  const token = cookies["jogai-app.token"];
  const { refreshToken } = jwtDecode<{ refreshToken: string }>(token);

  const responseApi = await api<LogoutResponse>("/auth/logout", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });

  if (!responseApi) {
    throw new Error("Erro ao fazer logout");
  }

  return responseApi.message;
}
