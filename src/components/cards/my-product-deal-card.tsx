"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { formatBRL } from "../../utils/formatBRL";

export type ProductDealCardProps = {
  uuid: string;
  name: string;
  brandOrPlatform: string | null; // Atualizado para a nova tipagem
  images: {
    url: string;
    order: number;
    isPrimary: boolean;
  }[]; // Atualizado para o array de imagens
  status?: "AVAILABLE" | "RESERVED" | "SOLD" | "INACTIVE"; // Atualizado com os novos status do backend
  value?: number;
  buyerName?: string; // Tornou-se opcional (se o produto estiver AVAILABLE, não tem comprador ainda)
};

export function MyProductDealCard({
  uuid,
  name,
  brandOrPlatform,
  images,
  status,
  value,
  buyerName,
}: ProductDealCardProps) {
  // Configuração atualizada refletindo os novos status do banco de dados
  const statusConfig = {
    SOLD: {
      label: "Vendido para",
      badgeText: "Vendido",
      color: "bg-primary text-primary-foreground",
    },
    RESERVED: {
      label: "Reservado para",
      badgeText: "Reservado",
      color: "bg-secondary text-secondary-foreground",
    },
    INACTIVE: {
      label: "Anúncio pausado",
      badgeText: "Inativo",
      color: "bg-muted text-muted-foreground border border-border",
    },
    AVAILABLE: {
      label: "Aguardando comprador",
      badgeText: "Disponível",
      color: "bg-green-600 text-white", // Destaque visual se quiser listar os disponíveis
    },
  };

  // Lógica de extração da imagem principal (com fallback)
  const primaryImage =
    images?.find((img) => img.isPrimary)?.url ||
    images?.[0]?.url ||
    "/placeholder-image.png";

  const currentStatus = status ? statusConfig[status] : null;

  return (
    <div
      className={cn(
        "relative w-full rounded-2xl overflow-hidden bg-card border border-border shadow-sm group transition-all duration-300 hover:scale-[1.02]",
      )}
    >
      <Link
        href={`/product/${uuid}`}
        aria-label={`Ver detalhes da negociação de ${name}`}
      >
        <div className="relative aspect-[3/4] w-full bg-muted/20 filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-500">
          <Image
            src={primaryImage}
            alt={`Capa do produto negociado ${name}`}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-background/20" />{" "}
          {/* Dimmer suave */}
        </div>

        {/* Badge de Preço se foi vendido ou está disponível/reservado */}
        {value !== undefined && value > 0 && (
          <span className="absolute top-3 left-3 text-[11px] font-bold text-primary-foreground px-2 py-1 rounded-md bg-primary shadow-md backdrop-blur-md">
            {formatBRL(value)}
          </span>
        )}

        {/* Status badge */}
        {currentStatus && (
          <span
            className={cn(
              "absolute top-3 right-3 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md shadow-sm backdrop-blur-md",
              currentStatus.color,
            )}
          >
            {currentStatus.badgeText}
          </span>
        )}

        {/* Info da Negociação */}
        <div className="p-4 bg-card border-t border-border">
          <h3 className="text-sm sm:text-base font-semibold text-foreground truncate">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 mb-3">
            {brandOrPlatform || "Geral"}
          </p>

          {/* Área do Comprador destacada - Só renderiza se houver status válido e um comprador associado */}
          {currentStatus &&
            buyerName &&
            (status === "SOLD" || status === "RESERVED") && (
              <div className="pt-3 border-t border-dashed border-border/60">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide">
                  {currentStatus.label}
                </p>
                <p className="text-sm font-medium text-foreground truncate mt-0.5">
                  {buyerName}
                </p>
              </div>
            )}
        </div>
      </Link>
    </div>
  );
}
