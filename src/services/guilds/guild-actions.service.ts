import { api } from "../api";

// --- AÇÕES GERAIS ---

export async function generateInviteLink(guildUuid: string) {
  return api<{ inviteLink: string; guildName: string }>(
    `/guilds/${guildUuid}/invite`,
    {
      method: "GET",
    },
  );
}

export async function leaveGuild(
  guildUuid: string,
): Promise<{ message: string }> {
  return api<{ message: string }>(`/guilds/${guildUuid}/leave`, {
    method: "DELETE",
  });
}

// --- AÇÕES DE ADMINISTRAÇÃO DA GUILDA ---

export async function updateGuildInfo(
  guildUuid: string,
  data: { name?: string; focus?: string; description?: string },
): Promise<{ message: string }> {
  return api(`/guilds/${guildUuid}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function updateGuildImages(guildUuid: string, formData: FormData) {
  // Nota: Quando usamos FormData, o fetch/axios geralmente calcula o boundary automaticamente.
  // No seu api.ts, certifique-se de não forçar "Content-Type: application/json" se o body for FormData.
  return api<{ message: string; guild: any }>(`/guilds/${guildUuid}/images`, {
    method: "PATCH",
    body: formData,
    // headers: { "Content-Type": "multipart/form-data" } -> Omitir no fetch nativo para ele gerar o boundary!
  });
}

export async function transferOwnership(
  guildUuid: string,
  newOwnerUuid: string,
): Promise<{ message: string }> {
  return api<{ message: string }>(`/guilds/${guildUuid}/transfer-ownership`, {
    method: "PATCH",
    body: JSON.stringify({ newOwnerUuid }),
  });
}

// --- AÇÕES DE MEMBROS E CARGOS ---

export async function createGuildRole(
  guildUuid: string,
  data: { name: string; isAdmin: boolean },
): Promise<{ name: string }> {
  return api<{ name: string; isAdmin: boolean }>(`/guilds/${guildUuid}/roles`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteGuildRole(
  guildUuid: string,
  roleUuid: string,
): Promise<{ message: string }> {
  return api<{ message: string }>(`/guilds/${guildUuid}/roles/${roleUuid}`, {
    method: "DELETE",
  });
}

export async function updateMemberRole(
  guildUuid: string,
  memberUuid: string,
  roleUuid: string,
): Promise<{ message: string }> {
  return api(`/guilds/${guildUuid}/members/${memberUuid}/role`, {
    method: "PATCH",
    body: JSON.stringify({ roleUuid }),
  });
}

export async function kickMember(
  guildUuid: string,
  memberUuid: string,
): Promise<{ message: string }> {
  return api<{ message: string }>(`/guilds/${guildUuid}/kick/${memberUuid}`, {
    method: "DELETE",
  });
}
