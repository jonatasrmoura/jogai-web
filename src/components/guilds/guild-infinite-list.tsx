"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, Lock, Globe, DoorOpen, Plus, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

import {
  fetchGuilds,
  type Guild,
} from "../../services/guilds/list-guilds.service";
import {
  joinPublicGuild,
  requestJoinPrivateGuild,
} from "../../services/guilds/join-guild.service";

import { Button } from "../../components/ui/button";

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

  // 👇 Estado para controlar qual botão de guilda está carregando
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastGuildElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  useEffect(() => {
    async function loadGuilds() {
      try {
        setLoading(true);
        const response = await fetchGuilds(page, 10, searchQuery);

        setGuilds((prev) => {
          if (page === 1) return response.data;
          return [...prev, ...response.data];
        });

        setHasMore(response.data.length === 10);
      } catch (error) {
        console.error("Falha ao carregar guildas:", error);
      } finally {
        setLoading(false);
      }
    }

    loadGuilds();
  }, [page, searchQuery]);

  useEffect(() => {
    setPage(1);
    setGuilds([]);
    setHasMore(true);
  }, [searchQuery]);

  // 👇 A Mágica Acontece Aqui: Função para lidar com o clique nos botões
  const handleGuildAction = async (guild: Guild) => {
    setActionLoading(guild.uuid); // Trava o botão clicado

    try {
      if (guild.visibility === "PUBLIC") {
        const response = await joinPublicGuild(guild.uuid);

        // Atualiza a lista localmente: transforma o cara em membro na hora!
        setGuilds((prevGuilds) =>
          prevGuilds.map((g) =>
            g.uuid === guild.uuid
              ? { ...g, hasAccess: true, membersCount: g.membersCount + 1 }
              : g,
          ),
        );

        Swal.fire({
          title: "Sucesso!",
          text: response.message,
          icon: "success",
          confirmButtonColor: "var(--primary)",
        });
      } else {
        const response = await requestJoinPrivateGuild(guild.uuid);

        Swal.fire({
          title: "Solicitação Enviada!",
          text: response.message,
          icon: "info",
          confirmButtonColor: "var(--primary)",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Ops!",
        text: error.message || "Ocorreu um erro inesperado.",
        icon: "error",
        confirmButtonColor: "var(--destructive)",
      });
    } finally {
      setActionLoading(null); // Libera o botão
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guilds.map((guild, index) => {
        const isLastElement = guilds.length === index + 1;
        const isThisActionLoading = actionLoading === guild.uuid; // 👈 Verifica se ESTE botão está carregando

        return (
          <div
            key={guild.uuid}
            ref={isLastElement ? lastGuildElementRef : null}
            className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all"
          >
            {/* Header do Card (Banner) - Mantido exatamente igual ao seu */}
            <div className="h-28 bg-gradient-to-r from-muted to-muted/50 relative p-4 flex flex-col justify-between">
              {guild.bannerUrl && (
                <Image
                  src={guild.bannerUrl}
                  alt={guild.name}
                  fill
                  className="object-cover opacity-30 group-hover:opacity-40 transition-opacity"
                />
              )}

              <div className="relative z-10 flex justify-end">
                {guild.visibility === "PUBLIC" ? (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase border border-emerald-500/20 backdrop-blur-sm">
                    <Globe className="w-3 h-3" /> Pública
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase border border-amber-500/20 backdrop-blur-sm">
                    <Lock className="w-3 h-3" /> Privada
                  </span>
                )}
              </div>

              <div className="relative z-10">
                <h3 className="font-bold text-lg text-foreground line-clamp-1">
                  {guild.name}
                </h3>
                <span className="text-[10px] text-primary font-black uppercase tracking-widest">
                  {guild.focus}
                </span>
              </div>
            </div>

            {/* Corpo do Card */}
            <div className="p-5 flex-1 flex flex-col gap-4">
              <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                {guild.description || "Sem descrição disponível."}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase">
                    Membros
                  </span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    {guild.membersCount}
                  </div>
                </div>

                {/* 👇 Lógica de Botões Atualizada com Loading e OnClick 👇 */}
                {guild.hasAccess ? (
                  <Link href={`/guilds/${guild.uuid}`}>
                    <Button size="sm" className="rounded-xl font-bold gap-2">
                      Entrar <DoorOpen className="w-4 h-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="sm"
                    variant={
                      guild.visibility === "PUBLIC" ? "default" : "outline"
                    }
                    disabled={isThisActionLoading} // Desabilita se estiver carregando
                    className={`rounded-xl font-bold gap-2 w-28 ${
                      // w-28 para evitar que o botão mude de tamanho no loading
                      guild.visibility === "PUBLIC"
                        ? "bg-primary/90 hover:bg-primary"
                        : "border-primary/50 text-primary hover:bg-primary/10"
                    }`}
                    onClick={() => handleGuildAction(guild)} // 👈 Chama a nossa função
                  >
                    {isThisActionLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : guild.visibility === "PUBLIC" ? (
                      <>
                        Unir-se <Plus className="w-4 h-4" />
                      </>
                    ) : (
                      <>Solicitar</>
                    )}
                  </Button>
                )}
              </div>
            </div>
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
