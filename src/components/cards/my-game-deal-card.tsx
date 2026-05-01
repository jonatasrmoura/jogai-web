"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { formatBRL } from "../../utils/formatBRL";

export type GameDealCardProps = {
  uuid: string;
  name: string;
  platform: string;
  imageUrl: string;
  status?: "Sell" | "Trade" | "Lend";
  value?: number;
  buyerName: string;
};

export function MyGameDealCard(props: GameDealCardProps) {
  const statusConfig = {
    Sell: {
      label: "Vendido para",
      color: "bg-primary text-primary-foreground",
    },
    Trade: {
      label: "Trocado com",
      color: "bg-secondary text-secondary-foreground",
    },
    Lend: {
      label: "Emprestado para",
      color: "bg-muted text-muted-foreground border border-border",
    },
  };

  return (
    <div
      className={cn(
        "relative w-full rounded-2xl overflow-hidden bg-card border border-border shadow-sm group transition-all duration-300 hover:scale-[1.02]",
      )}
    >
      <Link href="#" aria-label={`Ver detalhes da negociação de ${props.name}`}>
        <div className="relative aspect-[3/4] w-full bg-muted/20 filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-500">
          <Image
            src={props.imageUrl}
            alt={`Capa do jogo negociado ${props.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-background/20" />{" "}
          {/* Dimmer suave */}
        </div>

        {/* Badge de Preço se foi vendido */}
        {props.status === "Sell" && props.value && (
          <span className="absolute top-3 left-3 text-[11px] font-bold text-primary-foreground px-2 py-1 rounded-md bg-primary shadow-md backdrop-blur-md">
            {formatBRL(props.value)}
          </span>
        )}

        {/* Status badge (Traduzido) */}
        {props.status && (
          <span
            className={cn(
              "absolute top-3 right-3 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md shadow-sm backdrop-blur-md",
              statusConfig[props.status].color,
            )}
          >
            {props.status === "Sell"
              ? "Vendido"
              : props.status === "Trade"
                ? "Trocado"
                : "Emprestado"}
          </span>
        )}

        {/* Info da Negociação */}
        <div className="p-4 bg-card border-t border-border">
          <h3 className="text-sm sm:text-base font-semibold text-foreground truncate">
            {props.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 mb-3">
            {props.platform}
          </p>

          {/* Área do Comprador destacada */}
          {props.status && (
            <div className="pt-3 border-t border-dashed border-border/60">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wide">
                {statusConfig[props.status].label}
              </p>
              <p className="text-sm font-medium text-foreground truncate mt-0.5">
                {props.buyerName}
              </p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
