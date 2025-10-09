"use client";

import Link from "next/link";
import { JogaiIcon } from "../icons/jogai-icon";

export function PublicHeader() {
  return (
    <header className="w-full bg-secondary">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <JogaiIcon />

        {/* Navegação */}
        <nav className="hidden gap-6 md:flex">
          <Link
            href="/about"
            className="text-gray-600 transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/terms"
            className="text-gray-600 transition-colors hover:text-primary"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="bg-gray-200 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-secondary transition-opacity hover:opacity-85"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
