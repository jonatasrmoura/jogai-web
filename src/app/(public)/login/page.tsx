import Link from "next/link";
import { SignInForm } from "../../../components/forms/sign-in-form";
import { RegisterForm } from "../../../components/forms/sign-up-form";
import { SignUpSchema } from "../../../components/forms/sign-up-form/sign-up-schema";
// import { api } from "../../../services/api";

interface LoginPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SignInPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const currentUrl = params.name as "sign-up" | "sign-in" | undefined;
  const defaultUrl = !currentUrl ? "sign-in" : currentUrl;

  async function signInAuth(
    email: string,
    password: string
  ): Promise<string | null> {
    "use server";
    console.log({
      email,
      password,
    });
    // const response = await api<{ accessToken: string }>("/auth/signIn", {
    //   method: "POST",
    //   body: JSON.stringify({ email, password }),
    // });

    // if (!response) {
    //   return null;
    // }

    // return response.accessToken;
    return "mocked-access-token";
  }

  async function signUpAuth(
    signUpSchema: SignUpSchema
  ): Promise<string | null> {
    "use server";
    console.log(signUpSchema);
    return JSON.stringify(signUpSchema, null, 2);
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">Welcome to Jogaí</h1>
          <p>Trade, sell, or lend games with other players.</p>
        </div>

        <main className="w-full max-w-md p-2">
          <div className="w-full flex justify-between">
            <Link
              href={{
                pathname: "/login",
                query: { name: "sign-in" },
              }}
              className={`w-full font-semibold py-3 rounded-l-lg ${
                defaultUrl === "sign-in"
                  ? "text-primary border-b-2 border-primary"
                  : "text-neutral-500 border-b border-primary/30 transition-all hover:opacity-85"
              }`}
            >
              Sign In
            </Link>
            <Link
              href={{
                pathname: "/login",
                query: { name: "sign-up" },
              }}
              className={`w-full font-semibold py-3 rounded-r-lg ${
                defaultUrl === "sign-up"
                  ? "text-primary border-b-2 border-primary"
                  : "text-neutral-500 border-b border-primary/30 transition-all hover:opacity-85"
              }`}
            >
              Sign Up
            </Link>
          </div>

          <div className="mt-8">
            {defaultUrl === "sign-up" ? (
              <div className="grid grid-cols-1 gap-6">
                <h2 className="font-bold text-2xl text-primary">
                  Crie sua conta
                </h2>
                <RegisterForm onSignUpAuth={signUpAuth} />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                <h2 className="font-bold text-2xl text-primary">
                  Entre na sua conta
                </h2>
                <SignInForm onSignInAuth={signInAuth} />
              </div>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}
