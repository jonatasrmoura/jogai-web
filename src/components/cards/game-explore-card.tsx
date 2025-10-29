"use client";

import Image from "next/image";
import { Heart } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface GameExploreCardProps {
  title: string;
  city: string;
  state: string;
  price?: string;
  image: string;
  type: "trade" | "sell" | "lend";
  isFavorite: boolean;
}

export function GameExploreCard({
  title,
  city,
  state,
  price,
  image,
  type,
  isFavorite,
}: GameExploreCardProps) {
  const [gameExplore, setGameExplore] = useState<GameExploreCardProps>({
    title,
    city,
    state,
    price,
    image,
    type,
    isFavorite,
  });

  const handleFavorite = () => {
    setGameExplore((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
  };

  const typeLabel =
    gameExplore.type === "trade"
      ? "Trade"
      : gameExplore.type === "lend"
      ? "Lend"
      : gameExplore.price
      ? `R$ ${gameExplore.price}`
      : "Sell";

  return (
    <Card className="border-0 bg-transparent ">
      <div className="relative w-full h-[220px] rounded-xl overflow-hidden shadow-md">
        <Image
          src={gameExplore.image}
          alt={gameExplore.title}
          fill
          className="object-cover"
        />

        {/* Botão de favoritar */}
        <Button
          onClick={handleFavorite}
          className={`absolute top-2 right-2 ${
            gameExplore.isFavorite ? "bg-primary" : "bg-white"
          } rounded-full p-[6px] shadow-md hover:scale-105 transition`}
        >
          <Heart
            size={18}
            className={`${
              gameExplore.isFavorite ? "text-white" : "text-gray-500"
            }`}
          />
        </Button>

        {/* Barra roxa inferior */}
        <div className="absolute bottom-0 left-0 w-full bg-primary text-white text-sm font-semibold px-3 py-1 flex items-center justify-center">
          {typeLabel}
        </div>
      </div>

      {/* Texto abaixo */}
      <div className="mt-2 text-[14px] font-semibold truncate">
        {gameExplore.title}
      </div>
      <div className="text-[13px] text-gray-500">
        {gameExplore.city}, {gameExplore.state}
      </div>
    </Card>
  );
}
