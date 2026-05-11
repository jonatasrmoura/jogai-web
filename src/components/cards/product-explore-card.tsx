import Link from "next/link";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { FavoriteButton } from "../buttons/favorite-button";

interface ProductExploreCardProps {
  uuid: string;
  id: number;
  name: string;
  value: number;
  images: {
    url: string;
    order: number;
    isPrimary: boolean;
  }[];
  brandOrPlatform: string | null;
  isFavorite: boolean;
}

export function ProductExploreCard({
  uuid,
  name,
  value,
  images,
  brandOrPlatform,
  isFavorite,
}: ProductExploreCardProps) {
  const typeLabel =
    value > 0
      ? new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value)
      : "Negociável";

  // Lógica 2: Extração da Imagem
  // Procura a imagem marcada como principal. Se não achar, pega a primeira do array.
  const primaryImage =
    images?.find((img) => img.isPrimary)?.url ||
    images?.[0]?.url ||
    "/placeholder-image.png";

  return (
    <Card className="w-full border border-border bg-card overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(79,70,229,0.15)] rounded-2xl relative">
      <FavoriteButton
        isFavorite={isFavorite}
        productName={name}
        productUuid={uuid}
      />

      <Link href={`/product/${uuid}`} aria-label={`Explorar oferta de ${name}`}>
        <div className="relative w-full aspect-[3/4] bg-muted/20 overflow-hidden">
          <Image
            src={primaryImage}
            alt={`Capa de ${name}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 w-full bg-background/90 backdrop-blur-md border-t border-border/50 text-foreground text-sm font-semibold px-3 py-2 flex items-center justify-center">
            {typeLabel}
          </div>
        </div>

        <div className="p-4">
          <div className="text-sm sm:text-base font-semibold text-foreground truncate">
            {name}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {/* Lógica 3: Fallback caso não tenha marca/plataforma */}
            {brandOrPlatform || "Geral"}
          </div>
        </div>
      </Link>
    </Card>
  );
}
