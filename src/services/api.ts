"use server";
import { cookies } from "next/headers";
import { signOut } from "../utils/sign-out";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export async function api<T>(
  url: string,
  options?: RequestInit,
): Promise<T | false> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("jogai-app.token")?.value;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout de 10 segundos

  try {
    const isRequestFile = url.includes("/file");

    const isFormData = options?.body instanceof FormData;

    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      signal: controller.signal,
      headers: {
        // 1. Sempre envia o Authorization se houver token
        Authorization: accessToken ? `Bearer ${accessToken}` : "",

        // 2. Só adiciona JSON se NÃO for FormData e NÃO for uma rota de arquivo
        ...(!isFormData &&
          !isRequestFile && { "Content-Type": "application/json" }),

        // 3. Mantém outros headers caso você passe manualmente (exceto Content-Type se for FormData)
        ...(options?.headers || {}),
      },
    });

    clearTimeout(timeoutId);

    if (response.status === 401) {
      console.warn(
        "Token inválido ou expirado. Redirecionando para o login...",
      );

      // 👇 Só importa o SweetAlert no momento do erro e apenas no navegador
      if (typeof window !== "undefined") {
        const Swal = (await import("sweetalert2")).default;
        Swal.fire({
          title: "<strong>Sua sessão expirou</strong>",
          icon: "info",
          html: `Faça login novamente`,
          confirmButtonText: `Ok`,
        });
      }
      signOut();
      throw new Error("Sessão expirada. Faça login novamente.");
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro na requisição");
    }

    return (await response.json()) as T;
  } catch (e) {
    console.error("Erro na requisição: " + e);
    return false;
  }
}
