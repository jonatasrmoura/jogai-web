"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";
import {
  Send,
  Store,
  Users,
  Shield,
  Swords,
  Pin,
  ChevronLeft,
  Loader2,
  Crown,
  Settings,
  LogOut,
  Link as LinkIcon,
  MoreVertical,
  UserMinus,
  ShieldAlert,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";

import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { NoAvatarProfile } from "../../../../components/no-avatar-profile";
import { useGuildChat } from "../../../../hooks/use-guild-chat";
import { api } from "../../../../services/api";
import {
  getGuildDetails,
  type GuildDetails,
  type GuildMember,
} from "../../../../services/guilds/get-guild-details.service";
import {
  generateInviteLink,
  leaveGuild,
  kickMember,
  transferOwnership,
} from "../../../../services/guilds/guild-actions.service";

export default function GuildTavernPage() {
  const params = useParams();
  const guildUuid = params.uuid as string;

  // 1. Hook do WebSocket
  const {
    messages,
    setMessages,
    isConnected,
    typingUsers,
    sendMessage,
    sendTyping,
  } = useGuildChat(guildUuid);

  // 2. Estados da Guilda e Chat
  const [guildDetails, setGuildDetails] = useState<GuildDetails | null>(null);
  const [guildMembers, setGuildMembers] = useState<GuildMember[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);

  const [hasPermission, setHasPermission] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 3. Busca os Detalhes da Guilda e o Histórico juntos
  useEffect(() => {
    async function loadTavernData() {
      try {
        setIsLoading(true);

        // Fazemos as duas requisições em paralelo para carregar mais rápido
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
        console.error("Falha ao carregar dados da Taverna", error);
        if (error.message.includes("permissão")) {
          setHasPermission(false);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadTavernData();
  }, [guildUuid, setMessages]);

  // 4. Auto-scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers]);

  // 5. Lida com o envio da mensagem
  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;

    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full overflow-hidden bg-background text-foreground">
      {/* ==========================================
          SIDEBAR: INFO DA GUILDA E MEMBROS 
          ========================================== */}
      <aside className="w-full lg:w-80 bg-card/30 border-r border-border flex flex-col overflow-hidden shrink-0 hidden lg:flex">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-sm text-muted-foreground">
              Abrindo as portas...
            </p>
          </div>
        ) : (
          guildDetails && (
            <>
              {/* Banner Dinâmico da Guilda */}
              <div className="h-32 relative p-4 flex flex-col justify-end bg-gradient-to-br from-indigo-900 via-primary/50 to-purple-900">
                {guildDetails.bannerUrl && (
                  <Image
                    src={guildDetails.bannerUrl}
                    alt={guildDetails.name}
                    fill
                    className="object-cover opacity-50"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <BadgeRank
                      title="Rank 1"
                      icon={<Shield className="w-3 h-3 mr-1" />}
                    />
                    <h1 className="text-xl font-black text-white tracking-tight mt-1 shadow-black drop-shadow-md line-clamp-1">
                      {guildDetails.name}
                    </h1>
                    <p className="text-xs text-white/80 font-medium line-clamp-1">
                      Foco: {guildDetails.focus}
                    </p>
                  </div>

                  {/* 👇 MENU DE OPÇÕES DA GUILDA 👇 */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white hover:bg-white/20 rounded-full shrink-0"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 rounded-xl"
                    >
                      <DropdownMenuItem
                        className="cursor-pointer gap-2 font-medium text-emerald-500 focus:text-emerald-500 focus:bg-emerald-500/10"
                        onClick={async () => {
                          try {
                            const res = await generateInviteLink(guildUuid);
                            // Copia para a área de transferência do usuário
                            navigator.clipboard.writeText(res.inviteLink);
                            Swal.fire({
                              title: "Convite Copiado!",
                              text: "Envie este link para convocar novos aventureiros.",
                              icon: "success",
                              toast: true,
                              position: "top-end",
                              showConfirmButton: false,
                              timer: 3000,
                            });
                          } catch (error: any) {
                            console.error("Erro ao gerar convite", error);
                            Swal.fire(
                              "Ops!",
                              "Falha ao gerar convite.",
                              "error",
                            );
                          }
                        }}
                      >
                        <LinkIcon className="w-4 h-4" /> Copiar Convite
                      </DropdownMenuItem>

                      {/* Condicional: Apenas admins podem ver a opção de configurar */}
                      {/* Aqui você verifica se o usuário logado é admin. Ex: currentUser.isAdmin */}
                      <DropdownMenuItem className="cursor-pointer gap-2 font-medium">
                        <Settings className="w-4 h-4" /> Configurar Guilda
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className="cursor-pointer gap-2 font-bold text-destructive focus:text-destructive focus:bg-destructive/10"
                        onClick={() => {
                          Swal.fire({
                            title: "Tem certeza?",
                            text: "Você perderá acesso à taverna e precisará de um convite para voltar.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "var(--destructive)",
                            cancelButtonColor: "var(--muted)",
                            confirmButtonText: "Sim, Sair da Guilda",
                            cancelButtonText: "Cancelar",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              try {
                                await leaveGuild(guildUuid);
                                window.location.href = "/guilds"; // Redireciona para a lista
                              } catch (error: any) {
                                console.error("Erro ao sair da guilda", error);
                                Swal.fire(
                                  "Erro",
                                  "Não foi possível sair da guilda.",
                                  "error",
                                );
                              }
                            }
                          });
                        }}
                      >
                        <LogOut className="w-4 h-4" /> Sair da Guilda
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex items-center justify-around py-3 border-b border-border bg-card/50">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    Membros
                  </span>
                  <span className="text-lg font-bold flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-primary" /> {totalMembers}
                  </span>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="flex flex-col items-center">
                  <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    Sua Conexão
                  </span>
                  <span className="text-sm font-bold flex items-center gap-1.5 mt-1">
                    <span
                      className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-destructive"}`}
                    />
                    {isConnected ? "Online" : "Offline"}
                  </span>
                </div>
              </div>

              {/* Lista Real de Membros */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Aventureiros ({guildMembers.length})
                </h3>

                <div className="space-y-1">
                  {guildMembers.map((member) => (
                    <div
                      key={member.userUuid}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/50 transition-colors group"
                    >
                      {/* 👇 GRUPO 1: AVATAR + TEXTO JUNTOS 👇 */}
                      <div className="flex items-center gap-3 overflow-hidden cursor-pointer">
                        {/* Container do Avatar */}
                        <div className="relative shrink-0">
                          {member.avatarUrl ? (
                            <Image
                              src={member.avatarUrl}
                              alt={member.nickname}
                              width={36}
                              height={36}
                              className={`object-cover w-9 h-9 rounded-full border-2 ${member.isAdmin ? "border-amber-500" : "border-primary/50"}`}
                            />
                          ) : (
                            <div
                              className={`w-9 h-9 rounded-full border-2 flex items-center justify-center bg-muted ${member.isAdmin ? "border-amber-500 text-amber-500" : "border-primary/50 text-primary"}`}
                            >
                              {member.nickname.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-card rounded-full" />
                        </div>

                        {/* Container do Nome e Cargo */}
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold leading-none truncate flex items-center gap-1.5">
                            {member.nickname}
                            {member.isAdmin && (
                              <Crown className="w-3.5 h-3.5 text-amber-500" />
                            )}
                          </p>
                          <p
                            className={`text-[10px] font-semibold mt-1 uppercase tracking-wider truncate ${member.isAdmin ? "text-amber-500" : "text-primary"}`}
                          >
                            {member.roleName}
                          </p>
                        </div>
                      </div>
                      {/* 👆 FIM DO GRUPO 1 👆 */}

                      {/* 👇 GRUPO 2: MENU DE CONTEXTO (Fica encostado na direita) 👇 */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground shrink-0"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-48 rounded-xl"
                        >
                          <DropdownMenuItem className="cursor-pointer gap-2 font-medium">
                            <ShieldAlert className="w-4 h-4" /> Mudar Cargo
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="cursor-pointer gap-2 font-medium text-amber-500 focus:text-amber-500 focus:bg-amber-500/10"
                            onClick={() => {
                              Swal.fire({
                                title: "Transferir Liderança?",
                                text: `Você passará o controle da guilda para ${member.nickname}. Esta ação é irreversível.`,
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "var(--amber-500)",
                                confirmButtonText: "Sim, Transferir",
                                cancelButtonText: "Cancelar",
                              }).then(async (result) => {
                                if (result.isConfirmed) {
                                  try {
                                    await transferOwnership(
                                      guildUuid,
                                      member.userUuid,
                                    );
                                    Swal.fire(
                                      "Feito!",
                                      "A liderança foi transferida.",
                                      "success",
                                    );
                                    // Atualize o estado local de membros ou force um reload leve
                                  } catch (error: any) {
                                    console.error(
                                      "Erro ao transferir liderança",
                                      error,
                                    );
                                    Swal.fire(
                                      "Erro",
                                      "Falha ao transferir liderança.",
                                      "error",
                                    );
                                  }
                                }
                              });
                            }}
                          >
                            <Crown className="w-4 h-4" /> Passar Liderança
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            className="cursor-pointer gap-2 font-bold text-destructive focus:text-destructive focus:bg-destructive/10"
                            onClick={() => {
                              Swal.fire({
                                title: "Expulsar Aventureiro?",
                                text: `Tem certeza que deseja expulsar ${member.nickname}?`,
                                icon: "error",
                                showCancelButton: true,
                                confirmButtonColor: "var(--destructive)",
                                confirmButtonText: "Expulsar",
                                cancelButtonText: "Cancelar",
                              }).then(async (result) => {
                                if (result.isConfirmed) {
                                  try {
                                    await kickMember(
                                      guildUuid,
                                      member.userUuid,
                                    );
                                    // Remove o membro instantaneamente do estado local da UI!
                                    setGuildMembers((prev) =>
                                      prev.filter(
                                        (m) => m.userUuid !== member.userUuid,
                                      ),
                                    );
                                    setTotalMembers((prev) => prev - 1);
                                    Swal.fire(
                                      "Expulso",
                                      "O membro foi removido da guilda.",
                                      "success",
                                    );
                                  } catch (error: any) {
                                    console.error(
                                      "Erro ao expulsar membro",
                                      error,
                                    );
                                    Swal.fire(
                                      "Erro",
                                      "Não foi possível expulsar o membro.",
                                      "error",
                                    );
                                  }
                                }
                              });
                            }}
                          >
                            <UserMinus className="w-4 h-4" /> Expulsar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )
        )}
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
          {isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Tratamento para usuários sem permissão */}
          {!isLoading && !hasPermission && (
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

          {/* Mapeando o Array Real de Mensagens */}
          {!isLoading &&
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
