import { api } from "../api";

export interface GuildMember {
  userUuid: string;
  nickname: string;
  avatarUrl: string | null;
  roleName: string;
  isAdmin: boolean;
  joinedAt: string;
}

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
  members: GuildMember[];
  totalMembers: number;
}

export async function getGuildDetails(
  uuid: string,
): Promise<GetGuildDetailsResponse> {
  return api<GetGuildDetailsResponse>(`/guilds/${uuid}`);
}
