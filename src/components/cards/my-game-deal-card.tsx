"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { formatBRL } from "../../utils/formatBRL";

export type GameDealCardProps = {
  title: string;
  platform: string;
  imageUrl: string;
  status?: "Sell" | "Trade" | "Lend";
  price?: number;
  buyerName: string;
};

export function MyGameDealCard(props: GameDealCardProps) {
  const statusColors = {
    Sell: "bg-green-500",
    Trade: "bg-purple-500",
    Lend: "bg-blue-500",
  };

  const statusDeal = {
    Sell: "Vendido para",
    Trade: "Trocado com",
    Lend: "Emprestado para",
  };

  return (
    <div
      className={cn(
        "relative w-full rounded-2xl overflow-hidden shadow-lg group transition-all duration-300 hover:scale-[1.03]"
      )}
    >
      <Link href="#">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={props.imageUrl}
            alt={props.title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover"
          />
        </div>

        {props.status && props.status === "Sell" && props.price && (
          <span className="absolute top-2 left-2 text-xs font-semibold text-white px-2 py-1 rounded-lg bg-primary">
            {formatBRL(props.price)}
          </span>
        )}

        {/* Status badge */}
        {props.status && (
          <span
            className={cn(
              "absolute top-2 right-2 text-xs font-semibold text-white px-2 py-1 rounded-lg",
              statusColors[props.status]
            )}
          >
            {props.status}
          </span>
        )}

        {/* Info */}
        <div className="p-3 bg-white dark:bg-neutral-900">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100 truncate">
            {props.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {props.platform}
          </p>

          {props.status && (
            <div className="mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <span>
                {statusDeal[props.status]}: <strong>{props.buyerName}</strong>
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
