import Link from "next/link";
import { JogaiIcon } from "./icons/jogai-icon";

export function Footer() {
  return (
    <footer className="bg-border dark:bg-subtle-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center gap-6 text-center">
        {/* Logo */}
        <JogaiIcon />

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
          <Link
            href="#about"
            className="text-foreground-light/80 dark:text-foreground-dark/80 hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="#terms-of-services"
            className="text-foreground-light/80 dark:text-foreground-dark/80 hover:text-primary transition-colors"
          >
            Terms of Services
          </Link>
          <Link
            href="#privacy-policy"
            className="text-foreground-light/80 dark:text-foreground-dark/80 hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="#contact"
            className="text-foreground-light/80 dark:text-foreground-dark/80 hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-foreground-light/10 dark:bg-foreground-dark/10"></div>

        {/* Copyright */}
        <p className="text-xs sm:text-sm text-foreground-light/60 dark:text-foreground-dark/60">
          © {new Date().getFullYear()} Jogaí. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
