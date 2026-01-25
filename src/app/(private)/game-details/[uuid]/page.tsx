import Image from "next/image";

import { Button } from "../../../../components/ui/button";
import { api } from "../../../../services/api";
import type { GetGameDetailsResponseDTO } from "../../../../types/games/get-game-details-response.dto";

export default async function GameDetailsPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;

  const game = await api<GetGameDetailsResponseDTO>(`/games/${uuid}`, {
    method: "GET",
  });

  if (!game) {
    return <div>Erro ao carregar os detalhes do jogo.</div>;
  }

  return (
    /* CONTAINER PRINCIPAL
       - Mobile: Fluxo normal (coluna)
       - Desktop (md:): Flex Row, altura fixa da tela (100vh - header) para travar o layout e permitir scrolls internos
    */
    <div className="flex flex-col md:flex-row md:h-[calc(100vh-64px)] w-full overflow-hidden bg-white dark:bg-zinc-950">
      {/* ASIDE: GALERIA DE IMAGENS
          - Mobile: Scroll horizontal (flex-row + overflow-x-auto)
          - Desktop (md:): Coluna vertical, largura fixa (ex: 60%), scroll vertical
      */}
      <aside
        className="
        w-full md:w-[50%] lg:w-[55%]
        flex flex-row md:flex-col 
        overflow-x-auto md:overflow-y-auto 
        gap-4 p-4
        bg-zinc-50 dark:bg-zinc-950
        scrollbar-hide
        snap-x md:snap-none
      "
      >
        {game.images.map((image) => (
          <div
            key={image.url}
            className="
              /* MOBILE: Define largura baseada na tela e altura proporcional */
              min-w-[85vw] md:min-w-0 
              aspect-[4/3] md:aspect-auto
              
              /* DESKTOP: Altura fixa e largura total */
              md:w-full 
              md:h-[600px] 
              
              relative 
              shrink-0 
              rounded-2xl 
              overflow-hidden
              bg-zinc-200 dark:bg-zinc-900
              snap-center
            "
          >
            <Image
              src={image.url}
              alt={game.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 85vw, 65vw"
              priority={image.position === 1}
            />
          </div>
        ))}
      </aside>

      {/* MAIN: DETALHES DO PRODUTO
          - Desktop (md:): Scroll independente, largura fixa (ex: 40%)
      */}
      <main
        className="
        flex-1 
        overflow-y-auto 
        p-6 md:p-12
        flex flex-col
      "
      >
        <div className="max-w-xl mx-auto w-full space-y-8">
          {/* Header do Jogo */}
          <header className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-tighter">
              <span>{game.platform}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300" />
              <span>
                {game.condition === "NEW_SEALED" ? "Lacre Original" : "Usado"}
              </span>
            </div>
            <h1 className="text-4xl font-black leading-none">{game.name}</h1>
          </header>

          {/* Seção do Vendedor */}
          <div className="flex items-center gap-4 py-6 border-y border-zinc-100 dark:border-zinc-800">
            {game.user.avatarUrl && (
              <Image
                src={game.user.avatarUrl}
                alt={game.user.fullname}
                className="w-20 h-20 rounded-full border-2 border-primary p-0.5"
                width={160}
                height={160}
              />
            )}
            <div>
              <p className="text-xs text-zinc-500 font-medium uppercase">
                Anunciado por
              </p>
              <p className="font-bold text-zinc-900 dark:text-zinc-100">
                {game.user.fullname}
              </p>
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Descrição do jogo</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
              {game.description}
            </p>
          </div>

          {/* Footer de Compra (Sticky no mobile, normal no desktop scrollable) */}
          <div className="pt-10 mt-auto">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-sm font-medium">R$</span>
              <span className="text-5xl font-black text-primary">
                {game.value.toFixed(2)}
              </span>
            </div>
            <div className="grid grid-cols-1">
              <Button className="h-12 font-bold text-lg">Comprar</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
