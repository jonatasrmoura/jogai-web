"use client";

import Link from "next/link";
import { JogaiIcon } from "../icons/jogai-icon";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <JogaiIcon />
        </Link>

        {/* Navegação */}
        <nav className="hidden gap-8 md:flex">
          <Link
            href="/sobre"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Sobre nós
          </Link>
          <Link
            href="/termos"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Termos de Uso
          </Link>
          <Link
            href="/contato"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Contato
          </Link>
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-4">
          <Link
            href={{ pathname: "/login", query: { name: "sign-in" } }}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Entrar
          </Link>
          <Link
            href={{ pathname: "/login", query: { name: "sign-up" } }}
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:shadow-[0_0_15px_rgba(79,70,229,0.4)]"
          >
            Criar Conta
          </Link>
        </div>
      </div>
    </header>
  );
}
