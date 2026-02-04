"use client";

import { Heart } from "lucide-react";

import { Button } from "../ui/button";
import { toggleFavoriteGameService } from "../../services/games/toggle-favorite-game.service";
import { errorMessage } from "../../lib/messages/error-message";
import { successMessage } from "../../lib/messages/success-message";

interface FavoriteButtonProps {
  gameName: string;
  gameUuid: string;
  isFavorite: boolean;
}

export function FavoriteButton({
  gameUuid,
  gameName,
  isFavorite,
}: FavoriteButtonProps) {
  const handleSetFavoriteGame = async () => {
    const isFavorited = await toggleFavoriteGameService(gameUuid);

    if (!isFavorited)
      return errorMessage("Erro ao favoritar jogo", "Jogo inválido!");

    if (isFavorited.favorited === true)
      return successMessage(
        "Jogo favoritado!",
        `${gameName} adicionado aos favoritos!`,
      );
  };

  return (
    <Button
      type="button"
      onClick={handleSetFavoriteGame}
      className={`relative top-18 left-2 z-50 ${
        isFavorite ? "bg-primary" : "bg-white"
      } rounded-full p-[6px] shadow-md hover:scale-105 transition`}
    >
      <Heart
        size={18}
        className={`${isFavorite ? "text-white" : "text-gray-500"}`}
      />
    </Button>
  );
}
