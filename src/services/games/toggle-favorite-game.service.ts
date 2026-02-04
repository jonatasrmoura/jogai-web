"use server";
import { revalidateTag } from "next/cache";

import { api } from "../api";
import type { ToggleFavoriteGameResponseDTO } from "../../types/games/toggle-favorite-game-response.dto";

export async function toggleFavoriteGameService(
  gameUuid: string,
): Promise<ToggleFavoriteGameResponseDTO | null> {
  const result = await api<ToggleFavoriteGameResponseDTO>(
    `/games/${gameUuid}/favorite`,
    {
      method: "POST",
      body: JSON.stringify(null),
    },
  );

  if (!result) {
    return null;
  }

  revalidateTag("toggle-favorite-game");

  return { favorited: result.favorited, message: result.message };
}
