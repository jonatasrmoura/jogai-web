import Link from "next/link";

interface LandingNavigationProps {
  defaultUrl: "my-games" | "explore" | "my-deals" | "wishlist";
}

export function LandingNavigation({ defaultUrl }: LandingNavigationProps) {
  return (
    <nav
      className="flex gap-6 overflow-x-auto scrollbar-hide w-full md:w-auto"
      aria-label="Navegação da Vitrine"
    >
      <Link
        href={{ pathname: "/marketplace", query: { name: "explore" } }}
        aria-label="Acessar aba Explorar Vitrine"
        className={`whitespace-nowrap font-medium text-sm py-3 transition-colors relative ${
          defaultUrl === "explore"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Explorar
        {defaultUrl === "explore" && (
          <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-primary rounded-t-full" />
        )}
      </Link>

      <Link
        href={{ pathname: "/marketplace", query: { name: "wishlist" } }}
        aria-label="Acessar aba Meus Favoritos"
        className={`whitespace-nowrap font-medium text-sm py-3 transition-colors relative ${
          defaultUrl === "wishlist"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Meus Favoritos
        {defaultUrl === "wishlist" && (
          <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-primary rounded-t-full" />
        )}
      </Link>

      <Link
        href={{ pathname: "/marketplace", query: { name: "my-games" } }}
        aria-label="Acessar aba Meus Jogos"
        className={`whitespace-nowrap font-medium text-sm py-3 transition-colors relative ${
          defaultUrl === "my-games"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Meus Jogos
        {defaultUrl === "my-games" && (
          <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-primary rounded-t-full" />
        )}
      </Link>

      <Link
        href={{ pathname: "/marketplace", query: { name: "my-deals" } }}
        aria-label="Acessar aba Minhas Negociações"
        className={`whitespace-nowrap font-medium text-sm py-3 transition-colors relative ${
          defaultUrl === "my-deals"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Minhas Negociações
        {defaultUrl === "my-deals" && (
          <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-primary rounded-t-full" />
        )}
      </Link>
    </nav>
  );
}
