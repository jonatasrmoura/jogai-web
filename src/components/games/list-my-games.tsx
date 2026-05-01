import { listMyGamesService } from "../../services/games/list-my-games.service";
import { GameCard } from "../cards/game-card";

export async function ListMyGames({ search }: { search?: string }) {
  const myGames = await listMyGamesService({
    sold: "false",
    page: 1,
    limit: 30,
    name: search,
  });

  return (
    <>
      {!myGames.length ? (
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
          {myGames.map((game) => (
            <GameCard
              key={game.uuid}
              imageUrl={game.images[0].url}
              title={game.name}
              platform={game.platform}
              status={"Lend"}
            />
          ))}
        </div>
      )}
    </>
  );
}
