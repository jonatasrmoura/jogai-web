"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signInSchema, type SignInSchema } from "./sign-in-schema";
import { errorMessage } from "../../../lib/messages/error-message";
import { setAccessTokenCookies } from "../../../config/cookies/auth/set-access-token-cookies";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { FormMessage } from "../../form-message";

interface LoginFormProps {
  onSignInAuth: (email: string, password: string) => Promise<string | null>;
}

export function SignInForm({ onSignInAuth }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();

  async function onSubmit({ email, password }: SignInSchema) {
    const accessToken = await onSignInAuth(email, password);

    if (!accessToken) {
      return errorMessage(
        "Erro ao tentar fazer login",
        "Credenciais inválidas"
      );
    }

    setAccessTokenCookies(accessToken);

    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
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
