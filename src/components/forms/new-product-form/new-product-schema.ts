import { z } from "zod";
import { ProductConditionEnum } from "../../../enums/product-condition.enum";

export const createProductSchema = z.object({
  categoryUuid: z.uuid("O ID da categoria deve ser um UUID válido"),
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  brand: z.string().min(1, "A marca é obrigatória"),
  model: z.string().min(1, "O modelo é obrigatório"),
  gtin: z.string().optional(),
  attributes: z.record(z.string(), z.any()).optional(),
  quantity: z.number().int().positive("A quantidade deve ser maior que zero"),
  condition: z.enum(ProductConditionEnum),
  value: z.union([z.string(), z.number()]).transform((val) => {
    if (typeof val === "number") return val;
    return val;
  }),
  description: z
    .string()
    .min(10, "A descrição deve ter no mínimo 10 caracteres"),

  // CORREÇÃO 1: Definimos um valor padrão para não travar o Zod
  isDigital: z.boolean().default(false).optional(),

  // CORREÇÃO 2: Deixamos opcional no momento da validação do botão,
  // pois a sua função onSubmit já faz a verificação dos 'files' manualmente!
  imageUrls: z.array(z.url("A URL da imagem é inválida")).optional(),
});
