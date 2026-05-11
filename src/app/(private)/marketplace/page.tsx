import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { LandingNavigation } from "../../../components/navigations/landing-navigation";
import { ListMyProducts } from "../../../components/products/list-my-products";
import { ListProductsExplore } from "../../../components/products/list-products-explore";
import { ListMyDeals } from "../../../components/products/list-my-deals";
import { ListMyFavoritesProducts } from "../../../components/products/list-my-favorites-products";
import { SearchInput } from "../../../components/products/search-input";

import { meAuthService } from "../../../services/me-auth.service";

interface LoginPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MarketplacePage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;
  const searchTerm = params.search as string;
  const currentUrl = params.name as
    | "explore"
    | "wishlist"
    | "my-games"
    | "my-deals"
    | undefined;
  const defaultUrl = !currentUrl ? "my-games" : currentUrl;

  const user = await meAuthService();

  if (!user) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <p className="text-xl font-bold text-primary animate-pulse">
          Carregando vitrine...
        </p>
      </div>
    );
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header do Dashboard */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Bem-vindo de volta, {user.fullname.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground text-lg">
            Aqui está o que está rolando no seu mundo gamer hoje.
          </p>
        </div>

        <Button
          asChild
          className="shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all h-11 px-6"
          aria-label="Adicionar novo jogo para venda ou troca"
        >
          <Link
            href="/new-game"
            aria-label="Ir para a página de anúncio de novo jogo"
          >
            <Plus className="mr-2 w-5 h-5" />
            Anunciar Jogo
          </Link>
        </Button>
      </div>

      {/* Navegação e Busca Integradas */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-1">
        <LandingNavigation defaultUrl={defaultUrl} />
        <div className="w-full md:w-auto pb-1 md:pb-0">
          <SearchInput />
        </div>
      </div>

      {/* Renderização Condicional das Listas */}
      <section className="min-h-[50vh]">
        {defaultUrl === "my-games" ? (
          <ListMyProducts search={searchTerm} />
        ) : defaultUrl === "explore" ? (
          <ListProductsExplore search={searchTerm} />
        ) : defaultUrl === "my-deals" ? (
          <ListMyDeals search={searchTerm} />
        ) : defaultUrl === "wishlist" ? (
          <ListMyFavoritesProducts search={searchTerm} />
        ) : null}
      </section>
    </main>
  );
}
