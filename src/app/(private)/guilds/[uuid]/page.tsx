"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Send,
  Store,
  Users,
  Shield,
  Swords,
  Pin,
  ChevronLeft,
  Loader2,
} from "lucide-react";

import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { NoAvatarProfile } from "../../../../components/no-avatar-profile";
import { useGuildChat } from "../../../../hooks/use-guild-chat";
import { api } from "../../../../services/api";

// Mantemos o mock da Guilda e Membros por enquanto (para não perder o design)
const GUILD_INFO = {
  name: "Cavaleiros de Prata",
  gameFocus: "RPG & Souls-like",
  members: 142,
  online: 28,
};

export default function GuildTavernPage() {
  const params = useParams();
  const guildUuid = params.uuid as string;

  // 1. Invocamos o nosso Hook Customizado!
  const {
    messages,
    setMessages,
    isConnected,
    typingUsers,
    sendMessage,
    sendTyping,
  } = useGuildChat(guildUuid);

  const [hasPermission, setHasPermission] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 2. Busca o Histórico REST ao entrar na sala
  useEffect(() => {
    async function loadHistory() {
      try {
        // Ajustamos a tipagem para o formato real que o Fastify envia
        const response = await api<{ messages: any[] }>(
          `/guilds/${guildUuid}/messages`,
        );

        // Pegamos apenas o array de mensagens de dentro da resposta
        setMessages(response.messages || []);
        setHasPermission(true);
      } catch (error: any) {
        console.error("Falha ao carregar histórico", error);

        // Se o erro for de permissão, mudamos a UI em vez de quebrar a tela
        if (error.message.includes("permissão")) {
          setHasPermission(false);
        }
      } finally {
        setIsLoadingHistory(false);
      }
    }
    loadHistory();
  }, [guildUuid, setMessages]);

  // 3. Auto-scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers]);

  // 4. Lida com o envio da mensagem
  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;

    sendMessage(newMessage);
    setNewMessage(""); // Limpa o input
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full overflow-hidden bg-background text-foreground">
      {/* ==========================================
          SIDEBAR: INFO DA GUILDA E MEMBROS (MANTIDO SEU MOCK VISUAL)
          ========================================== */}
      <aside className="w-full lg:w-80 bg-card/30 border-r border-border flex flex-col overflow-hidden shrink-0 hidden lg:flex">
        <div className="h-32 bg-gradient-to-br from-indigo-900 via-primary/50 to-purple-900 relative p-4 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <BadgeRank
                title="Rank 8"
                icon={<Shield className="w-3 h-3 mr-1" />}
              />
              <h1 className="text-xl font-black text-white tracking-tight mt-1 shadow-black drop-shadow-md">
                {GUILD_INFO.name}
              </h1>
              <p className="text-xs text-white/80 font-medium">
                Foco: {GUILD_INFO.gameFocus}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-around py-3 border-b border-border bg-card/50">
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              Membros
            </span>
            <span className="text-lg font-bold flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary" /> {GUILD_INFO.members}
            </span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              Na Taverna
            </span>
            <span className="text-lg font-bold flex items-center gap-1.5">
              <span
                className={`w-2.5 h-2.5 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-destructive"}`}
              />
              {isConnected ? GUILD_INFO.online : "Offline"}
            </span>
          </div>
        </div>

        {/* Lista de Membros (Mockada) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
            Aventureiros Online
          </h3>
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors">
            <div className="relative">
              <Image
                src="https://github.com/shadcn.png"
                alt="Avatar"
                width={36}
                height={36}
                className="rounded-full border-2 border-primary/50"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-card rounded-full" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none">Jonatas Moura</p>
              <p className="text-[10px] font-semibold text-primary mt-1 uppercase tracking-wider">
                Aventureiro
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ==========================================
          ÁREA PRINCIPAL: A TAVERNA (CHAT REAL)
          ========================================== */}
      <main className="flex-1 flex flex-col relative bg-background">
        <header className="h-14 border-b border-border bg-card/30 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Voltar para Guildas"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2 text-foreground font-bold">
              <Swords className="w-5 h-5 text-primary" />
              Taverna Geral
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-muted p-1 rounded-lg">
            <button className="px-3 py-1 text-xs font-bold rounded-md bg-background text-foreground shadow-sm">
              Todas
            </button>
            <button className="px-3 py-1 text-xs font-bold rounded-md text-muted-foreground hover:text-foreground">
              Só Ofertas
            </button>
          </div>
        </header>

        <div className="bg-primary/10 border-b border-primary/20 p-2.5 flex items-center gap-3 px-4 shrink-0">
          <Pin className="w-4 h-4 text-primary fill-primary" />
          <p className="text-xs sm:text-sm font-medium text-primary">
            <strong>Missão da Semana:</strong> Negociações de jogos Indie feitas
            nesta guilda não pagam taxa até sexta-feira!
          </p>
        </div>

        {/* FEED DE MENSAGENS */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 flex flex-col">
          {isLoadingHistory && (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Mapeando o Array Real de Mensagens! */}
          {!isLoadingHistory &&
            messages.map((msg) => (
              <div key={msg.uuid} className="flex gap-4 max-w-3xl">
                <div className="w-10 h-10 rounded-full shrink-0 bg-muted overflow-hidden flex items-center justify-center">
                  <NoAvatarProfile
                    userName={msg.author.nickname || "Desconhecido"}
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-foreground text-sm">
                      {msg.author.nickname || "Desconhecido"}
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

          {/* Indicador de quem está digitando */}
          {typingUsers.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {typingUsers.map((u) => u.nickname).join(", ")}{" "}
              {typingUsers.length > 1 ? "estão" : "está"} digitando...
            </div>
          )}

          {/* Elemento invisível para forçar o scroll até o final */}
          <div ref={messagesEndRef} />
        </div>

        {/* FEED DE MENSAGENS */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 flex flex-col">
          {isLoadingHistory && (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Tratamento para usuários sem permissão */}
          {!isLoadingHistory && !hasPermission && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-10 h-10 text-destructive" />
              </div>
              <h3 className="text-2xl font-black text-foreground tracking-tight">
                Taverna Fechada
              </h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Você não tem permissão para ler este chat. Você precisa se
                juntar à guilda para conversar com os membros.
              </p>
              <Button className="mt-6 shadow-lg shadow-primary/20">
                Solicitar Entrada na Guilda
              </Button>
            </div>
          )}

          {/* Mapeando o Array Real de Mensagens com "author" em vez de "user" */}
          {!isLoadingHistory &&
            hasPermission &&
            messages.map((msg) => (
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

          {/* Elemento invisível para forçar o scroll até o final */}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT DE MENSAGEM (Escondido se não tiver permissão) */}
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
      </main>
    </div>
  );
}

// Subcomponente de estilo mantido
function BadgeRank({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/40 text-white/90 border border-white/20 backdrop-blur-md">
      {icon} {title}
    </span>
  );
}
