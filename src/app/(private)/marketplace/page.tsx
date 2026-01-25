import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { LandingNavigation } from "../../../components/navigations/landing-navigation";
import { ListMyGames } from "../../../components/games/list-my-games";
import { ListGamesExplore } from "../../../components/games/list-games-explore";
import { ListMyDeals } from "../../../components/games/list-my-deals";
import { ListMyFavoritesGames } from "../../../components/games/list-my-favorites-games";
import { SearchInput } from "../../../components/games/search-input";
import { meAuthService } from "../../../services/me-auth.service";

interface LoginPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MarketplacePage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;
  const searchTerm = params.search as string; // Pegando o termo da URL
  const currentUrl = params.name as
    | "explore"
    | "wishlist"
    | "my-games"
    | "my-deals"
    | undefined;
  const defaultUrl = !currentUrl ? "my-games" : currentUrl;

  const user = await meAuthService();

  if (!user) {
    return <p className="text-xl font-bold">Carregando...</p>;
  }

  return (
    <main>
      <div className="flex flex-col justify-between items-center gap-6 md:flex-row md:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Welcome back, {user.fullname}</h1>
          <p className="text-neutral-500">
            Here`s what`s happening in your gaming world.
          </p>
        </div>

        <Link href="/new-game">
          <Button>
            <Plus />
            Add new Game
          </Button>
        </Link>
      </div>

      <div className="border-b border-neutral-300 overflow-x-auto w-full mt-2">
        <LandingNavigation defaultUrl={defaultUrl} />
      </div>

      <div className="flex items-center justify-center">
        <SearchInput />
      </div>

      {defaultUrl === "my-games" ? (
        <ListMyGames />
      ) : defaultUrl === "explore" ? (
        <ListGamesExplore search={searchTerm} />
      ) : defaultUrl === "my-deals" ? (
        <ListMyDeals />
      ) : defaultUrl === "wishlist" ? (
        <ListMyFavoritesGames />
      ) : null}
    </main>
  );
}
