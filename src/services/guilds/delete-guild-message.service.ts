import { api } from "../api";

export async function deleteGuildMessage(
  guildUuid: string,
  messageUuid: string,
) {
  return api<{ message: string }>(
    `/guilds/${guildUuid}/messages/${messageUuid}`,
    {
      method: "DELETE",
    },
  );
}
