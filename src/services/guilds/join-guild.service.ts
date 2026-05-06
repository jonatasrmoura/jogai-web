import { api } from "../api";

export async function joinPublicGuild(
  uuid: string,
): Promise<{ message: string }> {
  return api<{ message: string }>(`/guilds/${uuid}/join`, {
    method: "POST",
    body: JSON.stringify({}),
  });
}

export async function requestJoinPrivateGuild(
  uuid: string,
): Promise<{ message: string }> {
  return api<{ message: string }>(`/guilds/${uuid}/request-join`, {
    method: "POST",
    body: JSON.stringify({}),
  });
}
