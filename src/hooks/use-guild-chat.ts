// src/hooks/use-guild-chat.ts
import { useEffect, useRef, useState, useCallback } from "react";
import { parseCookies } from "nookies";
import { env } from "../env";

// Tipagens para manter o TypeScript feliz
export interface ChatMessage {
  uuid: string;
  content: string;
  createdAt: string;
  author: {
    uuid: string;
    nickname: string;
    avatarUrl?: string;
  };
}

interface TypingUser {
  userUuid: string;
  nickname: string;
}

export function useGuildChat(guildUuid: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);

  const socketRef = useRef<WebSocket | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!guildUuid) return;

    // Pega o token para autenticar no WebSocket
    const cookies = parseCookies();
    const token = cookies["jogai-app.token"];

    if (!token) {
      console.error("Sem token para o WebSocket");
      return;
    }

    // Troca o http:// por ws:// dinamicamente usando nossa env
    const wsBaseUrl = env.NEXT_PUBLIC_API_BASE_URL.replace(/^http/, "ws");
    const ws = new WebSocket(`${wsBaseUrl}/guilds/${guildUuid}/chat`);

    socketRef.current = ws;

    ws.onopen = () => {
      // 1. Assim que conectar, manda o token para não tomar timeout de 5s!
      ws.send(JSON.stringify({ type: "auth", token }));
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);

      switch (payload.type) {
        case "system":
          console.log("Sistema:", payload.content);
          break;

        case "chat_message":
          // Nova mensagem chegando! Adicionamos no final da lista
          setMessages((prev) => [...prev, payload.data]);
          break;

        case "message_edited":
          // Atualiza o conteúdo da mensagem existente
          setMessages((prev) =>
            prev.map((msg) =>
              msg.uuid === payload.data.uuid
                ? {
                    ...msg,
                    content: payload.data.content,
                    updatedAt: payload.data.updatedAt,
                  }
                : msg,
            ),
          );
          break;

        case "message_deleted":
          // Remove a mensagem da tela (Soft delete visual)
          setMessages((prev) =>
            prev.filter((msg) => msg.uuid !== payload.data.uuid),
          );
          break;

        case "user_typing":
          // Adiciona o usuário na lista de quem está digitando
          setTypingUsers((prev) => {
            if (prev.find((u) => u.userUuid === payload.data.userUuid))
              return prev;
            return [...prev, payload.data];
          });

          // Remove o aviso de "digitando" depois de 3 segundos
          if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = setTimeout(() => {
            setTypingUsers((prev) =>
              prev.filter((u) => u.userUuid !== payload.data.userUuid),
            );
          }, 3000);
          break;

        case "error":
          console.error("Erro WS:", payload.message);
          break;
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket desconectado.");
    };

    // A MÁGICA DO REACT: Se o usuário sair da tela, fecha a conexão para não vazar memória!
    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [guildUuid]);

  // Função para enviar texto
  const sendMessage = useCallback((content: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "new_message", content }));
    }
  }, []);

  // Função para avisar que está digitando
  const sendTyping = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "typing" }));
    }
  }, []);

  return {
    messages,
    setMessages, // Exportado caso precise carregar o histórico REST inicial
    isConnected,
    typingUsers,
    sendMessage,
    sendTyping,
  };
}
