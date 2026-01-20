import Link from "next/link";
import { Plus } from "lucide-react";

import { GameExploreCard } from "../../../components/cards/game-explore-card";
import { Button } from "../../../components/ui/button";
import { LandingNavigation } from "../../../components/navigations/landing-navigation";
import { GameCard } from "../../../components/cards/game-card";
import { MyGameDealCard } from "../../../components/cards/my-game-deal-card";

import { myWishlistGames } from "./mocks/my-wishlist-games";
import { myGamesMock } from "./mocks/my-games-mock";
import { myGamesDealsMock } from "./mocks/my-games-deals-mock";
import { listGamesApi } from "./api/list-games";

interface LoginPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DashboardPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const currentUrl = params.name as
    | "my-games"
    | "explore"
    | "my-deals"
    | "wishlist"
    | undefined;

  const defaultUrl = !currentUrl ? "my-games" : currentUrl;

  // PROSIMO PASSO: SEPARAR LISTAGEM DE JOGOS EM SEUS DEVIDOS COMPONENTES!!!
  // E TRATAR PAGINACAO, NO CASO AQUI NESTE ARQUIVO.
  const { data: listGamesExplore } = await listGamesApi({
    page: 1,
    limit: 10,
  });

  return (
    <main>
      <div className="flex flex-col justify-between items-center gap-6 md:flex-row md:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Welcome back, Jonatas</h1>
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

      {defaultUrl === "my-games" ? (
        <>
          {!myGamesMock.length ? (
            <p className="text-center mt-5 text-lg font-semibold">
              Nenhum jogo negociado.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
              {myGamesMock.map((game) => (
                <GameCard
                  key={game.title}
                  imageUrl={game.imageUrl}
                  title={game.title}
                  platform={game.platform}
                  status={game.status}
                />
              ))}
            </div>
          )}
        </>
      ) : defaultUrl === "explore" ? (
        <>
          {!listGamesExplore.length ? (
            <p className="text-center mt-5 text-lg font-semibold">
              Nenhum jogo encontrado.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
              {listGamesExplore.map((game) => (
                <GameExploreCard
                  key={game.uuid}
                  gameId={game.id}
                  isFavorite={false}
                  image={game.images[0].url}
                  name={game.name}
                  platform={game.platform}
                  value={String(game.value)}
                />
              ))}
            </div>
          )}
        </>
      ) : defaultUrl === "my-deals" ? (
        <>
          {!myGamesDealsMock.length ? (
            <p className="text-center mt-5 text-lg font-semibold">
              Você não possui negociações.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
              {myGamesDealsMock.map((game) => (
                <MyGameDealCard key={game.title} {...game} />
              ))}
            </div>
          )}
        </>
      ) : defaultUrl === "wishlist" ? (
        <>
          {!myWishlistGames.length ? (
            <p className="text-center mt-5 text-lg font-semibold">
              Nenhum jogo favoritado.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
              {myWishlistGames.map((game) => (
                <GameExploreCard
                  key={game.uuid}
                  gameId={game.id}
                  isFavorite={false}
                  image={game.images[0].url}
                  name={game.name}
                  platform={game.platform}
                  value={String(game.value)}
                />
              ))}
            </div>
          )}
        </>
      ) : null}
    </main>
  );
}
