import Link from "next/link";
import { SignInForm } from "../../../components/forms/sign-in-form";
import { api } from "../../../services/api";

export default function SignInPage() {
  async function signInAuth(
    email: string,
    password: string
  ): Promise<string | null> {
    "use server";
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
              href="/sign-in"
              className="w-full text-neutral-500 font-semibold border-b border-primary/30 py-3 transition-colors hover:text-primary/50"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="w-full text-neutral-500 font-semibold border-b border-primary/30 py-3 transition-colors hover:text-primary/50"
            >
              Sign Up
            </Link>
          </div>

          <div className="mt-8">
            <SignInForm onSignInAuth={signInAuth} />
          </div>
        </main>
      </div>
    </section>
  );
}
