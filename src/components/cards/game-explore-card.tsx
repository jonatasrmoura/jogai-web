import Link from "next/link";
import Image from "next/image";

import { Card } from "@/components/ui/card";

interface GameExploreCardProps {
  uuid: string;
  gameId: number;
  name: string;
  value: string;
  image: string;
  platform: string;
}

export function GameExploreCard(props: GameExploreCardProps) {
  const typeLabel = props.value ? `R$ ${props.value}` : "Sell";

  return (
    <Card className="md:max-w-[250px] border-0 bg-transparent group transition-all duration-300 hover:scale-[1.03]">
      <Link href={`/game-details/${props.uuid}`} className="relative">
        <div className="relative w-full h-[370px] rounded-xl overflow-hidden shadow-md">
          <Image
            src={props.image}
            alt={`${props.name}-${props.gameId}`}
            fill
            className="object-cover"
          />

          {/* Barra roxa inferior */}
          <div className="absolute bottom-0 left-0 w-full bg-primary text-white text-sm font-semibold px-3 py-1 flex items-center justify-center">
            {typeLabel}
          </div>
        </div>

        {/* Texto abaixo */}
        <div className="mt-2 text-[14px] font-semibold truncate">
          {props.name}
        </div>
        <div className="text-[13px] text-gray-500">
          <p>{props.platform}</p>
        </div>
      </Link>
    </Card>
  );
}
