import { api } from "./api";

export async function signInAuthService(
  email: string,
  password: string,
): Promise<string | null> {
  const response = await api<{ accessToken: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!response) {
    return null;
  }

  return response.accessToken;
}
