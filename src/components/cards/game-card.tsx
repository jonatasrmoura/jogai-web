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
  const statusColors = {
    Sell: "bg-green-500",
    Trade: "bg-purple-500",
    Lend: "bg-blue-500",
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
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover"
          />
        </div>

        {/* Status badge */}
        {status && (
          <span
            className={cn(
              "absolute top-2 right-2 text-xs font-semibold text-white px-2 py-1 rounded-lg",
              statusColors[status]
            )}
          >
            {status}
          </span>
        )}

        {/* Info */}
        <div className="p-3 bg-white dark:bg-neutral-900">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100 truncate">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {platform}
          </p>
        </div>
      </Link>
    </div>
  );
}
