import { api } from "../api";

interface ListMyGamesServiceRequest {
  sold: "false" | "true";
  page: number;
  limit: number;
  name?: string;
  platform?: string;
  condition?: string;
  isDigital?: boolean;
  genreUuid?: string;
}

export async function listMyGamesService(
  props: ListMyGamesServiceRequest,
): Promise<ListGamesDTO[]> {
  const query = `page=${props.page}&limit=${props.limit}&sold=${props.sold}&name=${
    props.name || ""
  }&platform=${props.platform || ""}&condition=${
    props.condition || ""
  }&isDigital=${props.isDigital ? "true" : "false"}&genreUuid=${
    props.genreUuid || ""
  }`;

  const myGames = await api<ListGamesResponse>(`/games/me?${query}`, {
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
        favorites: game.favorites,
        genres: game.genres,
      }))
    : [];
}
