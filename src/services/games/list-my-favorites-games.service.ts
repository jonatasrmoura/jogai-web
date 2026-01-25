import { api } from "../api";

export async function listMyFavoritesGamesService() {
  const games = await api<ListGamesResponse>(`/games/favorites`, {
    method: "GET",
  });

  if (!games) return [];

  return games.data.length >= 0
    ? games.data.map((game) => ({
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
