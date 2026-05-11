"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type ProductCardProps = {
  uuid: string; // Adicionado para a rota funcionar
  name: string; // Atualizado
  brandOrPlatform: string | null; // Atualizado
  images: {
    url: string;
    order: number;
    isPrimary: boolean;
  }[]; // Atualizado para o novo padrão de array
  status?: "AVAILABLE" | "RESERVED" | "SOLD" | "INACTIVE"; // Atualizado para os novos status
};

export function ProductCard({
  uuid,
  name,
  brandOrPlatform,
  images,
  status,
}: ProductCardProps) {
  // Dicionário de Status alinhado com o Backend
  const statusConfig = {
    AVAILABLE: { label: "Disponível", color: "bg-green-600 text-white" },
    RESERVED: {
      label: "Reservado",
      color: "bg-secondary text-secondary-foreground",
    },
    SOLD: { label: "Vendido", color: "bg-primary text-primary-foreground" },
    INACTIVE: {
      label: "Inativo",
      color: "bg-muted text-muted-foreground border border-border",
    },
  };

  // Lógica de extração da imagem principal com fallback
  const primaryImage =
    images?.find((img) => img.isPrimary)?.url ||
    images?.[0]?.url ||
    "/placeholder-image.png";

  return (
    <div
      className={cn(
        "relative w-full rounded-2xl overflow-hidden bg-card border border-border shadow-sm group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(79,70,229,0.15)]",
      )}
    >
      {/* Link agora direciona para o produto correto usando o UUID */}
      <Link href={`/product/${uuid}`} aria-label={`Ver detalhes de ${name}`}>
        <div className="relative aspect-[3/4] w-full bg-muted/20">
          <Image
            src={primaryImage}
            alt={`Capa do produto ${name}`}
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
          />
          {/* Overlay escuro no fundo da imagem para o texto não sumir caso a capa seja clara */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Status badge */}
        {status && (
          <span
            className={cn(
              "absolute top-3 right-3 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md shadow-sm backdrop-blur-md",
              statusConfig[status].color,
            )}
          >
            {statusConfig[status].label}
          </span>
        )}

        {/* Info */}
        <div className="p-4 bg-card">
          <h3 className="text-sm sm:text-base font-semibold text-foreground truncate">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {brandOrPlatform || "Geral"}
          </p>
        </div>
      </Link>
    </div>
  );
}
