import Link from "next/link";
import { JogaiIcon } from "./icons/jogai-icon";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center gap-8 text-center">
        {/* Logo */}
        <div className="opacity-80">
          <JogaiIcon />
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium">
          <Link
            href="/sobre"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Sobre o Jogaí
          </Link>
          <Link
            href="/termos"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Termos de Serviço
          </Link>
          <Link
            href="/privacidade"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Política de Privacidade
          </Link>
          <Link
            href="/contato"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Fale Conosco
          </Link>
        </div>

        {/* Copyright */}
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-24 h-px bg-border"></div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Jogaí. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
