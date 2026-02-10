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
        <p className="text-center mt-5 text-lg font-semibold">
          Nenhum jogo cadastrado
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
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
