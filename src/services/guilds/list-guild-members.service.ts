import { api } from "../api";
import type { GuildMember } from "../../types/guilds/guild-member";

interface GuildsMembersResponse {
  data: GuildMember[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

export async function listGuildMembers(
  guildUuid: string,
  page = 1,
  limit = 10,
  search = "",
): Promise<GuildsMembersResponse> {
  const url = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) url.append("search", search);

  // Limpo, direto e tipado!
  return api<GuildsMembersResponse>(
    `/guild/${guildUuid}/members?${url.toString()}`,
    { method: "GET" },
  );
}
