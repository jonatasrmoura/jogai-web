"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, Swords, ShoppingBag } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface GuildHeaderProps {
  activeView: "chat" | "offers";
  setActiveView: (view: "chat" | "offers") => void;
}

export function GuildHeader({ activeView, setActiveView }: GuildHeaderProps) {
  const router = useRouter();

  return (
    <header className="h-14 border-b border-border bg-card/30 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        {/* Botão Voltar - Visível apenas no Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => router.push("/guilds")}
          aria-label="Voltar para Guildas"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2 text-foreground font-bold">
          {activeView === "chat" ? (
            <>
              <Swords className="w-5 h-5 text-primary" /> Taverna Geral
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5 text-emerald-500" /> Mercado da
              Guilda
            </>
          )}
        </div>
      </div>

      {/* Tabs de Navegação */}
      <div className="flex items-center gap-1 sm:gap-2 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setActiveView("chat")}
          className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
            activeView === "chat"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setActiveView("offers")}
          className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
            activeView === "offers"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Só Ofertas
        </button>
      </div>
    </header>
  );
}
