"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Pin, Loader2, Shield, Store, Send } from "lucide-react";

import { useGuildChat } from "../../../../hooks/use-guild-chat";
import { api } from "../../../../services/api";
import {
  getGuildDetails,
  type GuildDetails,
  type GuildMember,
} from "../../../../services/guilds/get-guild-details.service";

// Nossos novos componentes:
import { GuildHeader } from "../../../../components/guilds/guild/guild-header";
import { GuildSidebar } from "../../../../components/guilds/guild/guild-sidebar";
import { GuildOffersFeed } from "../../../../components/guilds/guild/guild-offers-feed";
import { GuildSettingsModal } from "../../../../components/guilds/guild/guild-settings-modal";

import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { NoAvatarProfile } from "../../../../components/no-avatar-profile";

export default function GuildTavernPage() {
  const params = useParams();
  const guildUuid = params.uuid as string;

  // Estados de Visualização e Modais
  const [activeView, setActiveView] = useState<"chat" | "offers">("chat");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Hook do WebSocket e Scroll
  const {
    messages,
    setMessages,
    isConnected,
    typingUsers,
    sendMessage,
    sendTyping,
  } = useGuildChat(guildUuid);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Estados da Guilda
  const [guildDetails, setGuildDetails] = useState<GuildDetails | null>(null);
  const [guildMembers, setGuildMembers] = useState<GuildMember[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [hasPermission, setHasPermission] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Busca inicial
  useEffect(() => {
    async function loadTavernData() {
      try {
        setIsLoading(true);
        const [chatResponse, detailsResponse] = await Promise.all([
          api<{ messages: any[] }>(`/guilds/${guildUuid}/messages`),
          getGuildDetails(guildUuid),
        ]);
        setMessages(chatResponse.messages || []);
        setGuildDetails(detailsResponse.guild);
        setGuildMembers(detailsResponse.members);
        setTotalMembers(detailsResponse.totalMembers);
        setHasPermission(true);
      } catch (error: any) {
        if (error.message.includes("permissão")) setHasPermission(false);
      } finally {
        setIsLoading(false);
      }
    }
    loadTavernData();
  }, [guildUuid, setMessages]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers]);

  // Envio de mensagem
  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full overflow-hidden bg-background text-foreground">
      {/* 1. SIDEBAR (Componente isolado) */}
      {!isLoading && guildDetails && (
        <GuildSidebar
          guildUuid={guildUuid}
          guildDetails={guildDetails}
          guildMembers={guildMembers}
          totalMembers={totalMembers}
          isConnected={isConnected}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onMemberKicked={(uuid) => {
            setGuildMembers((prev) => prev.filter((m) => m.userUuid !== uuid));
            setTotalMembers((prev) => prev - 1);
          }}
        />
      )}

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        </div>
      ) : (
        <main className="flex-1 flex flex-col relative bg-background overflow-hidden">
          {/* 2. HEADER (Componente isolado) */}
          <GuildHeader activeView={activeView} setActiveView={setActiveView} />

          {/* Renderização Condicional (Chat vs Ofertas) */}
          {activeView === "offers" ? (
            <GuildOffersFeed />
          ) : (
            <>
              {/* Avisos do Chat */}
              <div className="bg-primary/10 border-b border-primary/20 p-2.5 flex items-center gap-3 px-4 shrink-0">
                <Pin className="w-4 h-4 text-primary fill-primary" />
                <p className="text-xs sm:text-sm font-medium text-primary line-clamp-1">
                  <strong>Missão da Semana:</strong> Negociações de jogos Indie
                  não pagam taxa até sexta-feira!
                </p>
              </div>

              {!hasPermission ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                    <Shield className="w-10 h-10 text-destructive" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground tracking-tight">
                    Taverna Fechada
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    Você não tem permissão para ler este chat.
                  </p>
                  <Button className="mt-6 shadow-lg shadow-primary/20">
                    Solicitar Entrada
                  </Button>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 flex flex-col">
                  {/* Mensagens */}
                  {messages.map((msg) => (
                    <div
                      key={msg.uuid}
                      className="flex gap-4 max-w-3xl animate-in slide-in-from-bottom-2 fade-in duration-300"
                    >
                      <div className="w-10 h-10 rounded-full shrink-0 bg-muted overflow-hidden flex items-center justify-center">
                        {msg.author?.avatarUrl ? (
                          <Image
                            src={msg.author.avatarUrl}
                            alt={msg.author.nickname}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <NoAvatarProfile
                            userName={msg.author?.nickname || "Desconhecido"}
                          />
                        )}
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-foreground text-sm">
                            {msg.author?.nickname || "Desconhecido"}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-primary/10 text-primary">
                            Membro
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-foreground text-sm md:text-base leading-relaxed">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Indicador de Digitação */}
                  {typingUsers.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {typingUsers.map((u) => u.nickname).join(", ")}{" "}
                      {typingUsers.length > 1 ? "estão" : "está"} digitando...
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}

              {/* INPUT DE MENSAGENS */}
              {hasPermission && (
                <div className="p-4 bg-background border-t border-border shrink-0">
                  <form
                    onSubmit={handleSendMessage}
                    className="max-w-4xl mx-auto flex items-end gap-2 relative"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 shrink-0 rounded-xl bg-card border-border hover:bg-muted hover:text-primary transition-colors"
                    >
                      <Store className="w-5 h-5" />
                    </Button>
                    <Input
                      value={newMessage}
                      onChange={(e) => {
                        setNewMessage(e.target.value);
                        sendTyping();
                      }}
                      className="h-12 rounded-xl bg-card border-border px-4 shadow-inner"
                      placeholder="Fale com a Taverna..."
                      disabled={!isConnected}
                    />
                    <Button
                      type="submit"
                      disabled={!isConnected || !newMessage.trim()}
                      className="h-12 px-6 rounded-xl font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all"
                    >
                      Enviar <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </div>
              )}
            </>
          )}
        </main>
      )}

      {/* 3. O MODAL DE CONFIGURAÇÕES */}
      {guildDetails && (
        <GuildSettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          guild={guildDetails}
        />
      )}
    </div>
  );
}
