import { z } from "zod";

export const signUpSchema = z
  .object({
    fullname: z.string().min(8, {
      message: "Nome completo inválido.",
    }),
    nickname: z.string().min(3, {
      message: "Apelido muito curto.",
    }),
    dateOfBirth: z.string().min(10, {
      message: "Data de nascimento inválida.",
    }),
    cpf: z.string().min(11, {
      message: "CPF inválido.",
    }),
    email: z.email({
      message: "E-mail inválido.",
    }),
    password: z.string().min(8, {
      message: "Senha inválida.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
