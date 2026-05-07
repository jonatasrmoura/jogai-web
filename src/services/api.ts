import { parseCookies } from "nookies";
import { signOut } from "../utils/sign-out";
import { env } from "../env";

export async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const BASE_URL = env.NEXT_PUBLIC_API_BASE_URL;
  let accessToken = "";

  // 1. O "PULO DO GATO": Leitura inteligente de Cookies
  if (typeof window === "undefined") {
    // Se estiver rodando no SERVIDOR (Server Components)
    // Usamos um import dinâmico para o Next.js não reclamar no front-end
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    accessToken = cookieStore.get("jogai-app.token")?.value || "";
  } else {
    // Se estiver rodando no NAVEGADOR (Client Components)
    const clientCookies = parseCookies();
    accessToken = clientCookies["jogai-app.token"] || "";
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout de 10 segundos

  try {
    const isRequestFile = url.includes("/file");
    const isFormData = options?.body instanceof FormData;

    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        ...(!isFormData &&
          !isRequestFile &&
          options?.body && { "Content-Type": "application/json" }),
        ...(options?.headers || {}),
      },
    });

    clearTimeout(timeoutId);

    if (response.status === 401) {
      console.warn("Token inválido ou expirado.");

      if (typeof window !== "undefined") {
        // COMPORTAMENTO NO NAVEGADOR: Pop-up e Logout
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
      } else {
        // COMPORTAMENTO NO SERVIDOR: Redirecionamento forçado para o login
        const { redirect } = await import("next/navigation");
        redirect("/login");
      }

      throw new Error("Sessão expirada. Faça login novamente.");
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Erro na requisição");
    }

    return (await response.json()) as T;
  } catch (error: any) {
    console.warn("Aviso na API:", error.message);
    throw error;
  }
}
