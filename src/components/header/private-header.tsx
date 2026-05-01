"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal } from "lucide-react";

import { JogaiIcon } from "../icons/jogai-icon";
import { ProfileMenu } from "../drop-down/profile-menu";
import { NotificationsMenu } from "../drop-down/notifications-menu";

export function PrivateHeader() {
  const pathname = usePathname();

  // Função auxiliar para verificar se o link atual está ativo
  const isActive = (path: string) =>
    pathname === path || pathname?.startsWith(`${path}/`);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Ir para a página inicial do Jogaí"
          className="flex items-center hover:scale-105 transition-transform duration-300"
        >
          <JogaiIcon />
        </Link>

        {/* Navegação interna */}
        <nav
          className="hidden gap-8 md:flex items-center"
          aria-label="Navegação principal"
        >
          <Link
            href="/"
            aria-label="Acessar página de Início"
            className={`text-sm font-bold transition-all duration-300 hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Início
          </Link>
          <Link
            href={{ pathname: "/marketplace", query: { name: "explore" } }}
            aria-label="Acessar Vitrine de jogos"
            className={`text-sm font-bold transition-all duration-300 hover:text-primary ${
              isActive("/marketplace")
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Vitrine
          </Link>
          <Link
            href="/guilds"
            aria-label="Acessar as Guildas da comunidade"
            className={`text-sm font-bold transition-all duration-300 hover:text-primary ${
              isActive("/guilds") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Guildas
          </Link>
        </nav>

        {/* Ações e Menus */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Controles de Idioma e Dev Mode */}
          <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full bg-muted/40 border border-border/50">
            <button
              aria-label="Alterar idioma da navegação para Português"
              className="text-[11px] font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors"
            >
              PT
            </button>
            <span className="text-border/60 text-xs">|</span>
            <button
              aria-label="Alterar idioma da navegação para Inglês"
              className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
            >
              EN
            </button>
            <span className="text-border/60 text-xs">|</span>
            <button
              aria-label="Alternar para visualização de codificação de desenvolvedor"
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              Dev
            </button>
          </div>

          <div className="h-6 w-px bg-border/60 hidden sm:block"></div>

          {/* Notificações + Avatar */}
          <div className="flex items-center gap-4">
            <div aria-label="Acessar suas notificações">
              <NotificationsMenu />
            </div>
            <div aria-label="Acessar opções do seu perfil">
              <ProfileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
