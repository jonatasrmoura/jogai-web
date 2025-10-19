"use server";
import { cookies } from "next/headers";
import { signOut } from "../utils/sign-out";
import Swal from "sweetalert2";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export async function api<T>(
  url: string,
  options?: RequestInit
): Promise<T | false> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("jogai-app.token")?.value;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout de 10 segundos

  try {
    const isRequestFile = url.includes("/file");

    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      signal: controller.signal,
      headers: !isRequestFile
        ? {
            "Content-Type": "application/json",
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
            ...(options?.headers || {}),
          }
        : {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
            ...(options?.headers || {}),
          },
    });

    clearTimeout(timeoutId);

    if (response.status === 401) {
      console.warn(
        "Token inválido ou expirado. Redirecionando para o login..."
      );
      await Swal.fire({
        title: "<strong>Sua sessão expirou</strong>",
        icon: "info",
        html: `Faça login novamente`,
        confirmButtonText: `Ok`,
      });
      signOut();
      throw new Error("Sessão expirada. Faça login novamente.");
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro na requisição");
    }

    return (await response.json()) as T;
  } catch (e: any) {
    console.error("Erro na requisição: " + e);
    return false;
  }
}
