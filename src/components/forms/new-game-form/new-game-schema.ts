import z from "zod";

export const newGameSchema = z.object({
  name: z.string().min(1, "O nome do jogo é obrigatório"),
  price: z.string().min(1, "O valor é obrigatório"),
  platform: z.string().min(1, "Escolha uma plataforma"),
  genresUuid: z
    .array(z.string().uuid()) // Usando o formato padrão do zod para uuid (versões compatíveis com v4 e v7)
    .min(1, "Selecione pelo menos um gênero para o jogo"),
  condition: z.string().min(1, "Escolha a condição"),
  description: z
    .string()
    .min(10, "A descrição deve conter pelo menos 10 caracteres"),
  files: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "A imagem do jogo é obrigatória")
    .refine(
      (files) => files?.length <= 5,
      "Você pode enviar no máximo 5 imagens",
    ),
});
