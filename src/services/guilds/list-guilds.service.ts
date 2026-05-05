export interface Guild {
  uuid: string;
  name: string;
  focus: string;
  membersCount: number;
  description?: string;
  bannerUrl?: string;
  emblemUrl?: string;
}

interface FetchGuildsResponse {
  data: Guild[];
  total: number;
  page: number;
  limit: number;
}

import { api } from "../api";

export async function fetchGuilds(
  page = 1,
  limit = 10,
  search = "",
): Promise<FetchGuildsResponse> {
  const url = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) url.append("search", search);

  // Limpo, direto e tipado!
  return api<FetchGuildsResponse>(`/guilds?${url.toString()}`);
}
