import { listMyFavoritesGamesService } from "../../services/games/list-my-favorites-games.service";
import { GameExploreCard } from "../cards/game-explore-card";

export async function ListMyFavoritesGames() {
  const listMyFavoritesGames = await listMyFavoritesGamesService();

  return (
    <>
      {!listMyFavoritesGames.length ? (
        <p className="text-center mt-5 text-lg font-semibold">
          Nenhum jogo favoritado.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
          {listMyFavoritesGames.map((game) => (
            <GameExploreCard
              key={game.uuid}
              uuid={game.uuid}
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
  );
}
