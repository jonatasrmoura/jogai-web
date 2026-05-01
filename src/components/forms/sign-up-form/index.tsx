"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { motion } from "framer-motion";

import { type SignUpSchema, signUpSchema } from "./sign-up-schema";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { ErrorMessageForm } from "../../forms/error-message-form";
import { AuthContext } from "../../../contexts/auth-context";

export function RegisterForm() {
  const { handleSignUp } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col items-start gap-1.5">
          <Input
            placeholder="Nome completo"
            className="bg-background/50"
            {...register("fullname")}
          />
          {errors?.fullname?.message && (
            <ErrorMessageForm message={errors.fullname.message} />
          )}
        </div>

        <div className="flex flex-col items-start gap-1.5">
          <Input
            placeholder="E-mail"
            type="email"
            className="bg-background/50"
            {...register("email")}
          />
          {errors?.email?.message && (
            <ErrorMessageForm message={errors.email.message} />
          )}
        </div>

        {/* Grid para agrupar inputs menores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col items-start gap-1.5">
            <Input
              placeholder="Apelido na plataforma"
              className="bg-background/50"
              {...register("nickname")}
            />
            {errors?.nickname?.message && (
              <ErrorMessageForm message={errors.nickname.message} />
            )}
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <Input
              placeholder="Data de nascimento"
              className="bg-background/50"
              {...register("birthDay")}
            />
            {errors?.birthDay?.message && (
              <ErrorMessageForm message={errors.birthDay.message} />
            )}
          </div>
        </div>

        <div className="flex flex-col items-start gap-1.5">
          <Input
            placeholder="CPF (Apenas números)"
            className="bg-background/50"
            {...register("document")}
          />
          {errors?.document?.message && (
            <ErrorMessageForm message={errors.document.message} />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col items-start gap-1.5">
            <Input
              placeholder="Senha"
              type="password"
              className="bg-background/50"
              {...register("password")}
            />
            {errors?.password?.message && (
              <ErrorMessageForm message={errors.password.message} />
            )}
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <Input
              placeholder="Confirmar senha"
              type="password"
              className="bg-background/50"
              {...register("confirmPassword")}
            />
            {errors?.confirmPassword?.message && (
              <ErrorMessageForm message={errors.confirmPassword.message} />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <Button
          className="w-full h-11 font-medium"
          type="submit"
          disabled={isSubmitting}
          aria-label="Criar conta e entrar"
        >
          {isSubmitting ? "Criando conta..." : "Criar conta e entrar"}
        </Button>
      </div>
    </motion.form>
  );
}
