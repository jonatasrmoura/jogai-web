import { listMyGamesService } from "../../services/games/list-my-games.service";
import { MyGameDealCard } from "../cards/my-game-deal-card";

export async function ListMyDeals() {
  const listMyDeals = await listMyGamesService({ sold: "true" });

  return (
    <>
      {!listMyDeals.length ? (
        <p className="text-center mt-5 text-lg font-semibold">
          Você não possui negociações
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
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
