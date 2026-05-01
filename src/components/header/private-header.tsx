"use client";
import Link from "next/link";

import { JogaiIcon } from "../icons/jogai-icon";
import { ProfileMenu } from "../drop-down/profile-menu";
import { NotificationsMenu } from "../drop-down/notifications-menu";

export function PrivateHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <JogaiIcon />
        </Link>

        {/* Navegação interna */}
        <nav className="hidden gap-8 md:flex items-center">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Início
          </Link>
          <Link
            href={{ pathname: "/marketplace", query: { name: "explore" } }}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Vitrine
          </Link>
          <Link
            href="/players"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Jogadores
          </Link>
          <Link
            href="/community"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Comunidade
          </Link>
        </nav>

        {/* Notificações + Avatar */}
        <div className="flex items-center gap-5">
          <NotificationsMenu />
          <div className="h-6 w-px bg-border"></div>{" "}
          {/* Divisor vertical charmoso */}
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
