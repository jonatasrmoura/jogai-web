import type { RegisterUserAuthDTO } from "../types/users/register-user-auth.dto";
import { api } from "./api";

interface RegisterUserAuthResponse {
  message: string;
  user: {
    uuid: string;
    fullname: string;
    tag: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export async function registerUserAuthService(
  data: RegisterUserAuthDTO,
): Promise<string | null> {
  const response = await api<RegisterUserAuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      fullname: data.fullname,
      nickname: data.nickname,
      birthDay: data.birthDay,
      document: data.document,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }),
  });

  if (!response) {
    return null;
  }

  return response.tokens.accessToken;
}
