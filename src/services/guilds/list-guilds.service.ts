import { env } from "../../env";

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

export async function fetchGuilds(
  page = 1,
  limit = 10,
  search = "",
): Promise<FetchGuildsResponse> {
  // Construindo a URL com os Query Params
  const url = new URL(`${env.NEXT_PUBLIC_API_BASE_URL}/guilds`);
  url.searchParams.append("page", String(page));
  url.searchParams.append("limit", String(limit));

  if (search) {
    url.searchParams.append("search", search);
  }

  const response = await fetch(url.toString(), {
    headers: {
      // Supondo que você tenha o token salvo nos cookies ou localStorage
      Authorization: `Bearer ${localStorage.getItem("jogai_token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar guildas");
  }

  return response.json();
}
