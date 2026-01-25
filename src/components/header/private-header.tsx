"use client";

import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell } from "lucide-react";

import { JogaiIcon } from "../icons/jogai-icon";
import { AuthContext } from "../../contexts/auth-context";

export function PrivateHeader() {
  const { user, handleLogout } = useContext(AuthContext);

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
              pathname: "/dashboard",
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
            <Link
              href="/dashboard?my-games"
              className="flex items-center gap-2 rounded-full border border-primary hover:bg-gray-50"
            >
              <Image
                src={
                  user?.avatarUrl ||
                  "https://avatars.githubusercontent.com/u/66448546?v=4"
                }
                alt={user?.fullname || "User Avatar"}
                className="h-12 w-12 rounded-full object-cover"
                width={500}
                height={500}
              />
            </Link>

            {/* Dropdown simulando menu */}
            <div className="absolute right-0 mt-2 w-40 rounded-md border bg-secondary shadow-md group-hover:block">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
