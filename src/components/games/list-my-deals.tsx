import { listMyGamesService } from "../../services/games/list-my-games.service";
import { MyGameDealCard } from "../cards/my-game-deal-card";

export async function ListMyDeals({ search }: { search?: string }) {
  const listMyDeals = await listMyGamesService({
    sold: "true",
    page: 1,
    limit: 30,
    name: search,
  });

  return (
    <>
      {!listMyDeals.length ? (
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
          {listMyDeals.map((game) => (
            <MyGameDealCard
              key={game.uuid}
              uuid={game.uuid}
              name={game.name}
              platform={game.platform}
              imageUrl={game.images[0].url}
              status={"Lend"}
              value={game.value}
              buyerName={"Jonatas Moura (MOCK)"}
            />
          ))}
        </div>
      )}
    </>
  );
}
