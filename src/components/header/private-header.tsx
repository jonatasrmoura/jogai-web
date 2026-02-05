"use client";
import Link from "next/link";

import { JogaiIcon } from "../icons/jogai-icon";
import { ProfileMenu } from "../drop-down/profile-menu";
import { NotificationsMenu } from "../drop-down/notifications-menu";

export function PrivateHeader() {
  return (
    <header className="w-full bg-secondary">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <JogaiIcon />

        {/* Navegação interna */}
        <nav className="hidden gap-6 md:flex">
          <Link href="/" className="text-gray-700 hover:text-primary">
            Home
          </Link>
          <Link
            href={{
              pathname: "/marketplace",
              query: { name: "explore" },
            }}
            className="text-gray-700 hover:text-primary"
          >
            Explore
          </Link>
          <Link href="/players" className="text-gray-700 hover:text-primary">
            Players
          </Link>
          <Link href="/community" className="text-gray-700 hover:text-primary">
            Community
          </Link>
        </nav>

        {/* Notificações + Avatar */}
        <div className="flex items-center gap-4">
          <NotificationsMenu />

          <div className="relative">
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
