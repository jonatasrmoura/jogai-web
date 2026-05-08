import { api } from "../api";

interface UpdateGuildMessageResponse {
  message: string;
  data: {
    uuid: string;
    guildUuid: string;
    userUuid: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

export async function updateGuildMessage(
  guildUuid: string,
  messageUuid: string,
  content: string,
): Promise<UpdateGuildMessageResponse> {
  return api<UpdateGuildMessageResponse>(
    `/guilds/${guildUuid}/messages/${messageUuid}`,
    {
      method: "PUT",
      body: JSON.stringify({ content }),
    },
  );
}
