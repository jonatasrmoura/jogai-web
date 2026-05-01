import { Search, Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { GuildInfiniteList } from "../../../components/guilds/guild-infinite-list";

export default function GuildsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section das Guildas */}
      <section className="relative w-full border-b border-border bg-card/30 overflow-hidden">
        {/* Efeito visual de luz abstrata */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
              ⚔️ Comunidade
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
              Encontre a sua{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">
                Guilda
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Junte-se a grupos de jogadores apaixonados, desbloqueie preços
              exclusivos e crie sua própria história no Jogaí.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            {/* Input de Busca Falso para estética Premium */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9 h-12 bg-background/50 border-border rounded-xl shadow-sm"
                placeholder="Buscar guilda..."
                aria-label="Buscar guilda por nome"
              />
            </div>
            <Button
              asChild
              className="h-12 px-6 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
              aria-label="Criar uma nova guilda"
            >
              <Link href="/guilds/new">
                <Plus className="w-5 h-5 mr-2" />
                Fundar Guilda
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Container da Lista de Scroll Infinito */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <GuildInfiniteList />
      </section>
    </main>
  );
}
