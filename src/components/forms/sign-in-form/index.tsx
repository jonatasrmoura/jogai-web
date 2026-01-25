"use client";

import { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { signInSchema, type SignInSchema } from "./sign-in-schema";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { AuthContext } from "../../../contexts/auth-context";
import { ErrorMessageForm } from "../../forms/error-message-form";

export function SignInForm() {
  const { handleSignIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit({ email, password }: SignInSchema) {
    await handleSignIn(email, password);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
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
      </div>
      <div className="flex justify-end my-4">
        <Link href="/forgot-password" className="text-primary">
          Esqueceu a senha?
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <Button className="w-full" type="submit">
          Login
        </Button>
        <span className="text-neutral-500">Or continue with</span>
        <Button variant="outline">Continue with Google</Button>
      </div>
    </form>
  );
}
