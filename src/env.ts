import { z } from "zod";

// 1. Desenhamos o "formato" (Schema) que esperamos
const envSchema = z.object({
  // Exigimos que seja uma string e que tenha formato de URL válida
  NEXT_PUBLIC_API_BASE_URL: z.url(),

  // No futuro, se tiver outras variáveis, coloque aqui:
  // NEXT_PUBLIC_IMAGE_DOMAIN: z.string(),
});

// 2. Fazemos o parse mapeando explicitamente (exigência do Next.js)
const _env = envSchema.safeParse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// 3. Se algo estiver errado ou faltando no .env, quebramos a build na hora!
if (!_env.success) {
  console.error("❌ Variáveis de ambiente inválidas:", _env.error.format());
  throw new Error("Variáveis de ambiente inválidas");
}

// 4. Exportamos a variável já validada, tipada e com autocomplete
export const env = _env.data;
