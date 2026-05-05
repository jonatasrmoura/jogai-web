"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Swords, Loader2 } from "lucide-react";

import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { createGuild } from "../../../../services/guilds/create-guild.service";

export default function NewGuildPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name") as string,
      focus: formData.get("focus") as string,
      description: formData.get("description") as string,
    };

    try {
      const response = await createGuild(data);
      const newGuildUuid = response.guild.uuid;

      if (newGuildUuid) {
        router.push(`/guilds/${newGuildUuid}`);
      } else {
        router.push("/guilds"); // Fallback
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        <Link
          href="/guilds"
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Voltar para Guildas
        </Link>

        <div className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
              <Swords className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-foreground tracking-tight">
                Fundar Guilda
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Reúna jogadores e crie o seu próprio império.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-bold text-foreground"
              >
                Nome da Guilda
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Ex: Cavaleiros de Prata"
                required
                disabled={isLoading}
                className="h-12 bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="focus"
                className="text-sm font-bold text-foreground"
              >
                Foco Principal
              </label>
              <Input
                id="focus"
                name="focus"
                placeholder="Ex: RPG, Competitivo, Casual, Souls-like"
                required
                disabled={isLoading}
                className="h-12 bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-bold text-foreground"
              >
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Conte para os outros jogadores o que torna sua guilda especial..."
                required
                disabled={isLoading}
                rows={4}
                className="w-full rounded-xl border border-input bg-background/50 px-3 py-3 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Forjando...
                </>
              ) : (
                "Criar Guilda"
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
