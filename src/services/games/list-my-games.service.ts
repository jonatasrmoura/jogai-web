import { api } from "../api";

interface ListMyGamesServiceRequest {
  sold: "false" | "true";
}

export async function listMyGamesService({
  sold,
}: ListMyGamesServiceRequest): Promise<ListGamesDTO[]> {
  const myGames = await api<ListGamesResponse>(`/games/me?sold=${sold}`, {
    method: "GET",
  });

  if (!myGames) return [];

  return myGames.data.length >= 0
    ? myGames.data.map((game) => ({
        uuid: game.uuid,
        id: game.id,
        name: game.name,
        platform: game.platform,
        condition: game.condition,
        value: game.value,
        description: game.description,
        sold: game.sold,
        images: game.images,
        genres: game.genres,
      }))
    : [];
}
