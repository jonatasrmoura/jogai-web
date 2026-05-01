"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { GuildCard, type GuildCardProps } from "../cards/guild-card";

// MOCK: Simulando o Banco de Dados (Substitua depois pela chamada na sua API)
const MOCK_DB: GuildCardProps[] = Array.from({ length: 45 }).map((_, i) => ({
  uuid: `guild-${i}`,
  name: `Guilda ${i + 1} - ${["Cavaleiros", "Lendas", "Espectros", "Caçadores"][i % 4]}`,
  focus: [
    "RPG & Souls-like",
    "FPS Competitivo",
    "Caçadores de Platina",
    "Retrogames",
  ][i % 4],
  members: Math.floor(Math.random() * 500) + 10,
  bannerUrl: `https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop&sig=${i}`, // Imagens aleatórias de games
  emblemUrl: `https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=150&auto=format&fit=crop&sig=${i}`,
}));

const ITEMS_PER_PAGE = 12;

export function GuildInfiniteList() {
  const [guilds, setGuilds] = useState<GuildCardProps[]>([]);
  const [, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Referência para o elemento invisível no final da lista
  const observerTarget = useRef<HTMLDivElement>(null);

  // Função que simula o fetch na API
  const fetchGuilds = useCallback(async (pageNumber: number) => {
    setLoading(true);
    // Simulando delay de rede de 800ms
    await new Promise((resolve) => setTimeout(resolve, 800));

    const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newGuilds = MOCK_DB.slice(startIndex, endIndex);

    if (newGuilds.length === 0) {
      setHasMore(false);
    } else {
      setGuilds((prev) => {
        // O SEGREDO: Filtra os novos itens, garantindo que nenhum UUID que já está na tela seja adicionado de novo.
        const uniqueNewGuilds = newGuilds.filter(
          (newGuild) =>
            !prev.some((existingGuild) => existingGuild.uuid === newGuild.uuid),
        );
        return [...prev, ...uniqueNewGuilds];
      });
    }
    setLoading(false);
  }, []);

  // Dispara o fetch inicial
  useEffect(() => {
    fetchGuilds(1);
  }, [fetchGuilds]);

  // Lógica do Intersection Observer (Verifica se o scroll chegou no final)
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => {
            const nextPage = prev + 1;
            fetchGuilds(nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 0.1 }, // Dispara quando 10% do elemento invisível aparecer na tela
    );

    observer.observe(target);
    return () => observer.unobserve(target);
  }, [hasMore, loading, fetchGuilds]);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Grid de Guildas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {guilds.map((guild) => (
          <GuildCard key={guild.uuid} {...guild} />
        ))}
      </div>

      {/* Gatilho e Loader do Infinite Scroll */}
      <div
        ref={observerTarget}
        className="w-full py-10 flex items-center justify-center text-muted-foreground"
      >
        {loading && (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <span className="text-sm font-semibold tracking-wider uppercase">
              Encontrando mais guildas...
            </span>
          </div>
        )}

        {!hasMore && !loading && guilds.length > 0 && (
          <p className="text-sm font-medium">
            Você explorou todas as Guildas disponíveis!
          </p>
        )}
      </div>
    </div>
  );
}
