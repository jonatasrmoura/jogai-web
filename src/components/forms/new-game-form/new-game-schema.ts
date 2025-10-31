import { z } from "zod";

export const newGameSchema = z.object({
  name: z.string().min(1, "O nome do jogo é obrigatório"),
  price: z.string().min(1, "O valor é obrigatório"),
  platform: z.string().min(1, "Escolha uma plataforma"),
  genre: z.string().min(1, "Escolha o gênero"),
  condition: z.string().min(1, "Escolha a condição"),
  description: z
    .string()
    .min(10, "A descrição deve conter pelo menos 10 caracteres"),
  image: z.instanceof(File, { message: "A imagem do jogo é obrigatória" }),
});
