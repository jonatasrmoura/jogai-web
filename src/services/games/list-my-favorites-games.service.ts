import { api } from "../api";

type QueryListMyFavoriteGameService = {
  page: number;
  limit: number;
  name?: string;
  platform?: string;
  condition?: string;
  isDigital?: boolean;
  genreUuid?: string;
};

export async function listMyFavoritesGamesService(
  props: QueryListMyFavoriteGameService,
) {
  const query = `page=${props.page}&limit=${props.limit}&name=${
    props.name || ""
  }&platform=${props.platform || ""}&condition=${
    props.condition || ""
  }&isDigital=${props.isDigital ? "true" : "false"}&genreUuid=${
    props.genreUuid || ""
  }`;

  const games = await api<ListGamesResponse>(`/games/favorites?${query}`, {
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
