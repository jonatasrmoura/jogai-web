"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { type SignUpSchema, signUpSchema } from "./sign-up-schema";
import { errorMessage } from "../../../lib/messages/error-message";
import { setAccessTokenCookies } from "../../../config/cookies/auth/set-access-token-cookies";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { FormMessage } from "../../form-message";

interface RegisterFormProps {
  onSignUpAuth: (data: SignUpSchema) => Promise<string | null>;
}

export function RegisterForm({ onSignUpAuth }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      nickname: "",
      dateOfBirth: "",
      cpf: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  async function onSubmit(data: SignUpSchema) {
    const accessToken = await onSignUpAuth(data);

    if (!accessToken) {
      return errorMessage(
        "Erro ao tentar criar usuário",
        "Credenciais inválidas"
      );
    }

    setAccessTokenCookies(accessToken);

    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-2">
          <Input placeholder="Nome completo" {...register("fullname")} />
          {errors?.fullname?.message && (
            <FormMessage message={errors.fullname.message} />
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <Input placeholder="Apelido" {...register("nickname")} />
          {errors?.nickname?.message && (
            <FormMessage message={errors.nickname.message} />
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <Input
            placeholder="Data de nascimento"
            {...register("dateOfBirth")}
          />
          {errors?.dateOfBirth?.message && (
            <FormMessage message={errors.dateOfBirth.message} />
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <Input placeholder="CPF" {...register("cpf")} />
          {errors?.cpf?.message && <FormMessage message={errors.cpf.message} />}
        </div>
        <div className="flex flex-col items-start gap-2">
          <Input placeholder="E-mail" {...register("email")} />
          {errors?.email?.message && (
            <FormMessage message={errors.email.message} />
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <Input
            placeholder="Senha"
            type="password"
            {...register("password")}
          />
          {errors?.password?.message && (
            <FormMessage message={errors.password.message} />
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <Input
            placeholder="Senha"
            type="password"
            {...register("confirmPassword")}
          />
          {errors?.confirmPassword?.message && (
            <FormMessage message={errors.confirmPassword.message} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Button className="w-full" type="submit">
          Salvar e entrar
        </Button>
        <span className="text-neutral-500">Or continue with</span>
        <Button variant="outline">Continue with Google</Button>
      </div>
    </form>
  );
}
