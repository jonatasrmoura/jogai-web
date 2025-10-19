import { z } from "zod";

export const signInSchema = z.object({
  email: z.email({
    message: "E-mail inválido.",
  }),
  password: z.string().min(8, {
    message: "Senha inválida.",
  }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
