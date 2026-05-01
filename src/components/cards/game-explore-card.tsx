import Link from "next/link";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { FavoriteButton } from "../buttons/favorite-button";

interface GameExploreCardProps {
  uuid: string;
  gameId: number;
  name: string;
  value: string;
  image: string;
  platform: string;
  isFavorite?: boolean; // Adicionado para receber o estado de favorito
}

export function GameExploreCard(props: GameExploreCardProps) {
  const typeLabel =
    props.value && props.value !== "0" && props.value !== "null"
      ? `R$ ${props.value}`
      : "Negociável";

  return (
    <Card className="w-full border border-border bg-card overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(79,70,229,0.15)] rounded-2xl relative">
      {/* O Botão de Favorito agora está AQUI, dentro do Card, flutuando sobre a imagem */}
      <FavoriteButton
        isFavorite={!!props.isFavorite}
        gameUuid={props.uuid}
        gameName={props.name}
      />

      <Link
        href={`/game-details/${props.uuid}`}
        aria-label={`Explorar oferta de ${props.name}`}
      >
        <div className="relative w-full aspect-[3/4] bg-muted/20 overflow-hidden">
          <Image
            src={props.image}
            alt={`Capa de ${props.name}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 w-full bg-background/90 backdrop-blur-md border-t border-border/50 text-foreground text-sm font-semibold px-3 py-2 flex items-center justify-center">
            {typeLabel}
          </div>
        </div>

        <div className="p-4">
          <div className="text-sm sm:text-base font-semibold text-foreground truncate">
            {props.name}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {props.platform}
          </div>
        </div>
      </Link>
    </Card>
  );
}
