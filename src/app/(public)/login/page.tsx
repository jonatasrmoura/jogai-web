import Link from "next/link";
import { SignInForm } from "../../../components/forms/sign-in-form";
import { RegisterForm } from "../../../components/forms/sign-up-form";

interface LoginPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SignInPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const currentUrl = params.name as "sign-up" | "sign-in" | undefined;
  const defaultUrl = !currentUrl ? "sign-in" : currentUrl;

  const isSignIn = defaultUrl === "sign-in";

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-neutral-50 dark:bg-neutral-950 p-4 overflow-hidden">
      {/* Elementos decorativos de fundo para dar o aspecto premium */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] opacity-50 pointer-events-none" />

      <main className="w-full max-w-md bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-8 relative z-10">
        <div className="text-center mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Jogaí</h1>
          <p className="text-muted-foreground text-sm">
            Compre, venda e troque jogos com a comunidade.
          </p>
        </div>

        {/* Controle de Abas Premium */}
        <div className="flex bg-muted/50 p-1 rounded-lg mb-8">
          <Link
            href={{ pathname: "/login", query: { name: "sign-in" } }}
            className={`flex-1 text-center py-2.5 text-sm font-medium rounded-md transition-all duration-300 ${
              isSignIn
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            Entrar
          </Link>
          <Link
            href={{ pathname: "/login", query: { name: "sign-up" } }}
            className={`flex-1 text-center py-2.5 text-sm font-medium rounded-md transition-all duration-300 ${
              !isSignIn
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            Cadastrar
          </Link>
        </div>

        <div>{isSignIn ? <SignInForm /> : <RegisterForm />}</div>
      </main>
    </section>
  );
}
