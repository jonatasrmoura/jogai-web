import { listGamesService } from "../../services/games/list-games.service";
import { FavoriteButton } from "../buttons/favorite-button";
import { GameExploreCard } from "../cards/game-explore-card";

export async function ListGamesExplore({ search }: { search?: string }) {
  const { data: listGames } = await listGamesService({
    page: 1,
    limit: 10,
    name: search,
  });

  return (
    <>
      {!listGames.length ? (
        <p className="text-center mt-5 text-lg font-semibold">
          Nenhum jogo encontrado
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
          {listGames.map((game) => (
            <div key={game.uuid}>
              <FavoriteButton
                isFavorite={!!game.favorites[0]}
                gameUuid={game.uuid}
                gameName={game.name}
              />
              <GameExploreCard
                uuid={game.uuid}
                gameId={game.id}
                image={game.images[0].url}
                name={game.name}
                platform={game.platform}
                value={String(game.value)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
