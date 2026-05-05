"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, Shield } from "lucide-react";
import {
  fetchGuilds,
  type Guild,
} from "../../services/guilds/list-guilds.service";

interface GuildInfiniteListProps {
  searchQuery?: string;
}

export function GuildInfiniteList({
  searchQuery = "",
}: GuildInfiniteListProps) {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Referência para o último elemento da lista
  const observer = useRef<IntersectionObserver | null>(null);

  const lastGuildElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      // Desconecta o observador anterior
      if (observer.current) observer.current.disconnect();

      // Cria um novo observador
      observer.current = new IntersectionObserver((entries) => {
        // Se o último elemento apareceu na tela e ainda tem mais itens para carregar
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      // Manda observar o novo nó final
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  // Efeito para carregar os dados quando a página ou a busca mudam
  useEffect(() => {
    async function loadGuilds() {
      try {
        setLoading(true);
        const response = await fetchGuilds(page, 10, searchQuery);

        setGuilds((prev) => {
          // Se for a página 1 (nova busca), substitui tudo. Se não, concatena.
          if (page === 1) return response.data;
          return [...prev, ...response.data];
        });

        // Verifica se a quantidade que voltou é menor que o limite, significando que acabou.
        setHasMore(response.data.length === 10);
      } catch (error) {
        console.error("Falha ao carregar guildas:", error);
      } finally {
        setLoading(false);
      }
    }

    loadGuilds();
  }, [page, searchQuery]);

  // Se a busca mudar, resetamos a lista para a página 1
  useEffect(() => {
    setPage(1);
    setGuilds([]);
    setHasMore(true);
  }, [searchQuery]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guilds.map((guild, index) => {
        // Verifica se é o último item do array para colocar a Ref do observador
        const isLastElement = guilds.length === index + 1;

        return (
          <div
            key={guild.uuid}
            ref={isLastElement ? lastGuildElementRef : null}
            className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer"
          >
            <Link
              href={`/guilds/${guild.uuid}`}
              className="flex flex-col h-full"
            >
              {/* Header do Card (Banner) */}
              <div className="h-24 bg-gradient-to-r from-muted to-muted/50 relative p-4 flex flex-col justify-end">
                {guild.bannerUrl && (
                  <Image
                    src={guild.bannerUrl}
                    alt={guild.name}
                    fill // 👈 A mágica que substitui o w-full e h-full absolutos
                    className="object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                  />
                )}
                <div className="relative z-10">
                  <h3 className="font-bold text-lg text-foreground line-clamp-1">
                    {guild.name}
                  </h3>
                  <span className="text-xs text-primary font-bold uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded backdrop-blur-sm inline-block mt-1">
                    {guild.focus}
                  </span>
                </div>
              </div>

              {/* Corpo do Card */}
              <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {guild.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    {guild.membersCount}{" "}
                    <span className="text-muted-foreground font-normal">
                      membros
                    </span>
                  </div>
                  <Shield className="w-4 h-4 text-muted-foreground opacity-50 group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
          </div>
        );
      })}

      {loading && (
        <div className="col-span-full py-8 flex justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!hasMore && guilds.length > 0 && (
        <div className="col-span-full py-8 text-center text-sm text-muted-foreground font-medium">
          Fim da lista. Que tal fundar a sua própria guilda?
        </div>
      )}
    </div>
  );
}
