import { parseCookies } from "nookies";
import { signOut } from "../utils/sign-out";
import { env } from "../env";

const BASE_URL = env.NEXT_PUBLIC_API_BASE_URL;

export async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const cookies = parseCookies();
  const accessToken = cookies["jogai-app.token"];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const isRequestFile = url.includes("/file");
    const isFormData = options?.body instanceof FormData;

    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        ...(!isFormData &&
          !isRequestFile && { "Content-Type": "application/json" }),
        ...(options?.headers || {}),
      },
    });

    clearTimeout(timeoutId);

    if (response.status === 401) {
      console.warn(
        "Token inválido ou expirado. Redirecionando para o login...",
      );

      // 👇 O ESCUDO: Só executa se o código estiver rodando no navegador do usuário
      if (typeof window !== "undefined") {
        // Envolvemos a lógica numa função assíncrona auto-executável para não travar o fluxo
        (async () => {
          const Swal = (await import("sweetalert2")).default;
          await Swal.fire({
            title: "<strong>Sua sessão expirou</strong>",
            icon: "info",
            html: `Faça login novamente para continuar.`,
            confirmButtonText: `Ok`,
            confirmButtonColor: "var(--primary)",
          });
          signOut();
        })();
      }

      throw new Error("Sessão expirada. Faça login novamente.");
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // Lançamos o erro exato que o Fastify mandou (ex: "Nome já existe")
      throw new Error(errorData.message || "Ocorreu um erro inesperado.");
    }

    return (await response.json()) as T;
  } catch (error: any) {
    // Em vez de retornar false, deixamos o erro "estourar" para cima
    // Assim, o catch do formulário pode pegar a mensagem e mostrar na tela!
    throw error;
  }
}
