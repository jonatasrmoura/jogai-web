import z from "zod";

export const newProductSchema = z.object({
  name: z.string().min(1, "O nome do produto é obrigatório"),
  price: z.string().min(1, "O valor é obrigatório"),
  platform: z.string().min(1, "Escolha uma plataforma"),
  condition: z.string().min(1, "Escolha a condição"),
  description: z
    .string()
    .min(10, "A descrição deve conter pelo menos 10 caracteres"),
  files: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "A imagem do produto é obrigatória")
    .refine(
      (files) => files?.length <= 5,
      "Você pode enviar no máximo 5 imagens",
    ),
});
