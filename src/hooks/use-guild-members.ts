"use client";
import { useEffect, useState } from "react";
import { listGuildMembers } from "../services/guilds/list-guild-members.service";
import type { GuildMember } from "../types/guilds/guild-member";
import { env } from "../env";

export function useGuildMembers(
  guildUuid: string,
  page: number = 1,
  limit: number = 20,
  search: string = "",
) {
  const [members, setMembers] = useState<GuildMember[]>([]);
  const [totalMembers, setTotalMembers] = useState<number>(0);

  // 1. CARGA INICIAL (HTTP): Adicionamos o 'limit' aqui
  useEffect(() => {
    listGuildMembers(guildUuid, page, limit, search).then((response) => {
      setMembers(response.data);
      setTotalMembers(response.pagination.totalItems);
    });
  }, [guildUuid, page, limit, search]); // 'limit' adicionado aqui

  // 2. TEMPO REAL (WebSocket): Otimizamos para apenas o guildUuid
  useEffect(() => {
    const wsBaseUrl = env.NEXT_PUBLIC_API_BASE_URL.replace(/^http/, "ws");
    const socket = new WebSocket(`${wsBaseUrl}/ws/guilds/${guildUuid}`);

    socket.onopen = () => console.log("🟢 WebSocket Presença conectado!");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("[Front] Recebi mensagem WS:", data);

      switch (data.type) {
        case "STATUS_CHANGED":
          setMembers((prev) =>
            prev.map((m) =>
              m.userUuid === data.userUuid
                ? { ...m, isOnline: data.isOnline }
                : m,
            ),
          );
          break;

        case "MEMBER_JOINED":
          // Adiciona o novo membro na lista
          setMembers((prev) => [...prev, data.member]);
          break;

        case "MEMBER_LEFT":
          // Remove o membro da lista
          setMembers((prev) =>
            prev.filter((m) => m.userUuid !== data.userUuid),
          );
          break;
      }
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [guildUuid]);

  return { members, totalMembers };
}
