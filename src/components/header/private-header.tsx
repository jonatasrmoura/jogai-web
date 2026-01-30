"use client";
import Link from "next/link";
import { Bell } from "lucide-react";

import { JogaiIcon } from "../icons/jogai-icon";
import { ProfileMenu } from "../drop-down/profile-menu";

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
          <button className="relative rounded-full p-2 hover:bg-gray-100 cursor-pointer">
            <Bell className="h-5 w-5 text-gray-700" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="relative">
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
