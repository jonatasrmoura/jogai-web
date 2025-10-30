"use client";

import Image from "next/image";
import { Button } from "../../../components/ui/button";

export default function GameDetailsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl gap-6">
      <aside className="flex justify-center">
        <div className="relative h-min max-w-sm bg-gradient-to-t from-primary to-primary/80 px-14 md:px-16 py-10 rounded-2xl">
          <Image
            className="object-cover border-2 border-amber-50"
            src="https://i.pinimg.com/736x/47/ed/15/47ed15a815ac011fa2b4f27470f12f36.jpg"
            alt=""
            height={500}
            width={500}
          />
          <span className="absolute bottom-12 left-16 md:left-18 text-xs font-semibold text-white px-2 py-1 rounded-lg bg-purple-500">
            PlayStation 5
          </span>
        </div>
      </aside>

      <main className="grid grid-cols-1 grid-rows-2 gap-5">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Demons Souls: Remake</h1>
          <p className="text-neutral-600">
            Demon`s Souls se desenrola no reino de Boletaria, que foi tomado por
            uma névoa profunda e incolor após o rei Allant despertar o ser
            demoníaco conhecido como {`"O Antigo"`}. Essa névoa consome as almas dos
            humanos, transformando-os em criaturas demoníacas que também se
            alimentam de almas.{" "}
          </p>
        </div>

        <div className="space-y-5">
          <h4 className="font-bold text-lg">Detalhes</h4>

          <div className="grid grid-cols-2">
            <span className="text-neutral-600">Vendedor</span>
            <strong className="font-medium">Samuel da Silva Sauro</strong>
          </div>

          <div className="grid grid-cols-2">
            <span className="text-neutral-600">Plataforma</span>
            <strong className="font-medium">PlayStation 5</strong>
          </div>

          <div className="grid grid-cols-2">
            <span className="text-neutral-600">Gênero</span>
            <strong className="font-medium">RPG de ação</strong>
          </div>

          <div className="grid grid-cols-2">
            <span className="text-neutral-600">Estado</span>
            <strong className="font-medium">Semi novo</strong>
          </div>

          <div className="grid grid-cols-2">
            <span>PREÇO</span>
            <span className="text-primary text-3xl font-semibold">
              R$ 199,99
            </span>
          </div>

          <div className="grid grid-cols-1">
            <Button className="h-12">Comprar</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
