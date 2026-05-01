import { listGamesService } from "../../services/games/list-games.service";
import { FavoriteButton } from "../buttons/favorite-button";
import { GameExploreCard } from "../cards/game-explore-card";

export async function ListGamesExplore({ search }: { search?: string }) {
  const { data: listGames } = await listGamesService({
    page: 1,
    limit: 30,
    name: search,
  });

  return (
    <>
      {!listGames.length ? (
        <div className="flex flex-col items-center justify-center p-12 mt-8 text-center border border-dashed border-border rounded-2xl bg-card/20">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <span className="text-2xl">🎮</span>
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            Nenhum jogo cadastrado
          </h3>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Você ainda não adicionou nenhum jogo à sua vitrine. Que tal começar
            anunciando aquele jogo que está parado?
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4 w-full">
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
