import Link from "next/link";
import { SignInForm } from "../../../components/forms/sign-in-form";
// import { api } from "../../../services/api";

interface LoginPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SignInPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const currentUrl = params.name;

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
                currentUrl === "sign-in"
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
                currentUrl === "sign-up"
                  ? "text-primary border-b-2 border-primary"
                  : "text-neutral-500 border-b border-primary/30 transition-all hover:opacity-85"
              }`}
            >
              Sign Up
            </Link>
          </div>

          <div className="mt-8">
            {currentUrl === "sign-up" ? (
              <div>Sign Up Form Placeholder</div>
            ) : (
              <SignInForm onSignInAuth={signInAuth} />
            )}
          </div>
        </main>
      </div>
    </section>
  );
}
