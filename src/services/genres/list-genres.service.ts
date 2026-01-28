import { ListGenresDTO } from "../../types/genres/list-genres.dto";
import { api } from "../api";

type ListGenresType = {
  page: number;
  limit: number;
  searchName?: string;
  platform?: string;
  condition?: string;
  isDigital?: boolean;
  genreUuid?: string;
};

export async function listGenresService(
  data: ListGenresType,
): Promise<ListGenresDTO> {
  const query = `page=${data.page}&limit=${data.limit}&searchName=${
    data.searchName || ""
  }`;

  const response = await api<ListGenresDTO>(`/genres?${query}`, {
    method: "GET",
  });

  if (!response) {
    return {
      data: [],
      metadata: { page: data.page, limit: data.limit, total: 0, totalPages: 0 },
    };
  }

  return response;
}
