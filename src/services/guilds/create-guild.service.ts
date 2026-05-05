import { api } from "../api";

export interface CreateGuildData {
  name: string;
  focus: string;
  description: string;
}

interface CreateGuildResponse {
  message: string;
  guild: {
    uuid: string;
    name: string;
  };
}

export async function createGuild(
  data: CreateGuildData,
): Promise<CreateGuildResponse> {
  // Apenas uma linha de requisição! O token e o erro já são tratados lá dentro.
  return api<CreateGuildResponse>("/guilds", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
