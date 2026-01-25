"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type SignUpSchema, signUpSchema } from "./sign-up-schema";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { ErrorMessageForm } from "../../forms/error-message-form";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth-context";

export function RegisterForm() {
  const { handleSignUp } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      nickname: "",
      birthDay: "",
      document: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignUpSchema) {
    await handleSignUp(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-2">
          <Input placeholder="Nome completo" {...register("fullname")} />
          {errors?.fullname?.message && (
            <ErrorMessageForm message={errors.fullname.message} />
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <Input placeholder="Apelido" {...register("nickname")} />
          {errors?.nickname?.message && (
            <ErrorMessageForm message={errors.nickname.message} />
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <Input placeholder="Data de nascimento" {...register("birthDay")} />
          {errors?.birthDay?.message && (
            <ErrorMessageForm message={errors.birthDay.message} />
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <Input placeholder="CPF" {...register("document")} />
          {errors?.document?.message && (
            <ErrorMessageForm message={errors.document.message} />
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <Input placeholder="E-mail" {...register("email")} />
          {errors?.email?.message && (
            <ErrorMessageForm message={errors.email.message} />
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <Input
            placeholder="Senha"
            type="password"
            {...register("password")}
          />
          {errors?.password?.message && (
            <ErrorMessageForm message={errors.password.message} />
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <Input
            placeholder="Senha"
            type="password"
            {...register("confirmPassword")}
          />
          {errors?.confirmPassword?.message && (
            <ErrorMessageForm message={errors.confirmPassword.message} />
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
