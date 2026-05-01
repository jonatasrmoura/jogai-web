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
    <section className="min-h-screen w-full flex bg-background text-foreground overflow-hidden">
      {/* Lado Esquerdo - Área de Imersão/Branding */}
      <div className="relative hidden lg:flex flex-col w-1/2 bg-card/30 border-r border-border p-12 justify-between overflow-hidden">
        {/* Efeito de luz premium usando as variáveis globais */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <Link
            href="/"
            className="text-3xl font-black tracking-tighter text-foreground flex items-center gap-2"
            aria-label="Jogaí - Voltar para Home"
          >
            <span className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-lg shadow-primary/30">
              🎮
            </span>
            Jogaí
          </Link>
        </div>

        <div className="relative z-10 max-w-lg mt-auto">
          <h2 className="text-4xl font-bold tracking-tight mb-4 leading-tight">
            A sua nova <br />
            {/* Gradiente dinâmico baseado na cor primária */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Economia Gamer.
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Plataforma definitiva para negociar, trocar e organizar sua
            biblioteca de jogos com jogadores de todo o Brasil.
          </p>

          {/* Card decorativo flutuante adaptável ao tema */}
          <div className="mt-8 p-4 rounded-2xl bg-card/60 border border-border backdrop-blur-md flex items-center gap-4 w-fit shadow-xl">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center font-bold">
              PRO
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Acesso Premium Liberado
              </p>
              <p className="text-xs text-muted-foreground">
                Taxa zero nas primeiras vendas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lado Direito - Formulários */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Efeito sutil para mobile */}
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 rounded-full blur-[100px] pointer-events-none lg:hidden" />

        <main className="w-full max-w-[420px] relative z-10">
          {/* Header Mobile */}
          <div className="lg:hidden flex justify-center mb-8">
            <span className="text-3xl font-black tracking-tighter text-foreground flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center text-sm">
                🎮
              </span>
              Jogaí
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              {isSignIn ? "Bem-vindo de volta" : "Comece sua jornada"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSignIn
                ? "Insira suas credenciais para acessar sua conta."
                : "Crie sua conta em segundos e acesse o marketplace."}
            </p>
          </div>

          {/* Segmented Control Moderno Adaptável */}
          <div className="flex bg-muted/50 p-1 rounded-xl mb-8 border border-border shadow-inner">
            <Link
              href={{ pathname: "/login", query: { name: "sign-in" } }}
              className={`flex-1 text-center py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                isSignIn
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Entrar"
            >
              Entrar
            </Link>
            <Link
              href={{ pathname: "/login", query: { name: "sign-up" } }}
              className={`flex-1 text-center py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                !isSignIn
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Criar Conta"
            >
              Criar Conta
            </Link>
          </div>

          {/* Formulários */}
          <div className="mt-4">
            {isSignIn ? <SignInForm /> : <RegisterForm />}
          </div>
        </main>
      </div>
    </section>
  );
}
