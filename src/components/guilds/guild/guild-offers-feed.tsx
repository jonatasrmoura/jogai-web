"use client";

import { ShoppingBag, Tag } from "lucide-react";
import { Button } from "../../../components/ui/button";

export function GuildOffersFeed() {
  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
      <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
        <ShoppingBag className="w-12 h-12 text-emerald-500" />
      </div>
      <h2 className="text-2xl font-black tracking-tight mb-2">
        Mercado Restrito
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Aqui ficam as negociações exclusivas dos membros desta guilda. Venda
        seus jogos ou encontre preços de camaradagem!
      </p>
      <Button className="font-bold gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 px-6 shadow-lg shadow-emerald-500/20">
        <Tag className="w-4 h-4" /> Anunciar um Jogo
      </Button>
    </div>
  );
}
