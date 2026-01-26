import { api } from "../api";
import type { CreateGameResponseDTO } from "../../types/games/create-game-response.dto";

export async function createGameService(formData: FormData) {
  const newGame = await api<CreateGameResponseDTO>("/games", {
    method: "POST",
    body: formData,
  });

  if (!newGame) {
    return null;
  }

  return newGame;
}
