import { api } from "../api";

export interface GuildDetails {
  uuid: string;
  name: string;
  focus: string;
  description: string;
  bannerUrl: string | null;
  emblemUrl: string | null;
  visibility: "PUBLIC" | "PRIVATE";
  ownerUuid: string;
  createdAt: string;
}

export interface GetGuildDetailsResponse {
  guild: GuildDetails;
}

export async function getGuildDetails(
  uuid: string,
): Promise<GetGuildDetailsResponse> {
  return api<GetGuildDetailsResponse>(`/guilds/${uuid}`);
}
