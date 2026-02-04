import { api } from "../../services/api";

type ListGamesType = {
  page: number;
  limit: number;
  name?: string;
  platform?: string;
  condition?: string;
  isDigital?: boolean;
  genreUuid?: string;
};

export async function listGamesService(
  props: ListGamesType,
): Promise<ListGamesResponse> {
  const query = `page=${props.page}&limit=${props.limit}&name=${
    props.name || ""
  }&platform=${props.platform || ""}&condition=${
    props.condition || ""
  }&isDigital=${props.isDigital ? "true" : "false"}&genreUuid=${
    props.genreUuid || ""
  }`;

  const response = await api<ListGamesResponse>(`/games?${query}`, {
    method: "GET",
    cache: "force-cache",
    next: {
      tags: ["toggle-favorite-game"],
    },
  });

  if (!response) {
    return {
      data: [],
      meta: { page: props.page, limit: props.limit, total: 0, totalPages: 0 },
    };
  }

  return response;
}
