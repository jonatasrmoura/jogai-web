"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type GameCardProps = {
  title: string;
  platform: string;
  imageUrl: string;
  status?: "Sell" | "Trade" | "Lend";
};

export function GameCard({ title, platform, imageUrl, status }: GameCardProps) {
  // Traduzido para o público brasileiro e usando cores do tema
  const statusConfig = {
    Sell: { label: "Venda", color: "bg-primary text-primary-foreground" },
    Trade: { label: "Troca", color: "bg-secondary text-secondary-foreground" },
    Lend: {
      label: "Empréstimo",
      color: "bg-muted text-muted-foreground border border-border",
    },
  };

  return (
    <div
      className={cn(
        "relative w-full rounded-2xl overflow-hidden bg-card border border-border shadow-sm group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(79,70,229,0.15)]",
      )}
    >
      <Link href="#" aria-label={`Ver detalhes de ${title} para ${platform}`}>
        <div className="relative aspect-[3/4] w-full bg-muted/20">
          <Image
            src={imageUrl}
            alt={`Capa do jogo ${title}`}
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
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {platform}
          </p>
        </div>
      </Link>
    </div>
  );
}
