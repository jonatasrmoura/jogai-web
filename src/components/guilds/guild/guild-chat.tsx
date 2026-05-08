"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import {
  Pin,
  Store,
  Send,
  Shield,
  MoreVertical,
  Edit2,
  Trash2,
  X,
  Check,
} from "lucide-react";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { NoAvatarProfile } from "../../no-avatar-profile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

import { updateGuildMessage } from "../../../services/guilds/update-guild-message.service";
import { deleteGuildMessage } from "../../../services/guilds/delete-guild-message.service";

interface GuildChatProps {
  guildUuid: string;
  hasPermission: boolean;
  messages: any[];
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  isConnected: boolean;
  typingUsers: any[];
  sendMessage: (content: string) => void;
  sendTyping: () => void;
  // currentUserUuid: string; // Opcional: Para verificar se a mensagem pertence ao usuário logado
}

export function GuildChat({
  guildUuid,
  hasPermission,
  messages,
  setMessages,
  isConnected,
  typingUsers,
  sendMessage,
  sendTyping,
}: GuildChatProps) {
  const [newMessage, setNewMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage("");
  };

  const handleDeleteMessage = async (messageUuid: string) => {
    Swal.fire({
      title: "Apagar mensagem?",
      text: "Esta ação não pode ser desfeita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--destructive)",
      confirmButtonText: "Sim, apagar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteGuildMessage(guildUuid, messageUuid);
          // Remove a mensagem da tela instantaneamente
          setMessages((prev) => prev.filter((m) => m.uuid !== messageUuid));
        } catch (error: any) {
          Swal.fire(
            "Erro",
            error.message || "Falha ao apagar mensagem.",
            "error",
          );
        }
      }
    });
  };

  const handleSaveEdit = async (messageUuid: string) => {
    if (!editContent.trim()) return;
    try {
      await updateGuildMessage(guildUuid, messageUuid, editContent);
      // Atualiza a mensagem na tela
      setMessages((prev) =>
        prev.map((m) =>
          m.uuid === messageUuid
            ? { ...m, content: editContent, isEdited: true }
            : m,
        ),
      );
      setEditingMessageId(null);
    } catch (error: any) {
      Swal.fire("Erro", error.message || "Falha ao editar mensagem.", "error");
    }
  };

  if (!hasPermission) {
    return (
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
    );
  }

  return (
    <>
      <div className="bg-primary/10 border-b border-primary/20 p-2.5 flex items-center gap-3 px-4 shrink-0">
        <Pin className="w-4 h-4 text-primary fill-primary" />
        <p className="text-xs sm:text-sm font-medium text-primary line-clamp-1">
          <strong>Missão da Semana:</strong> Negociações de jogos Indie não
          pagam taxa até sexta-feira!
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 flex flex-col scrollbar-thin scrollbar-thumb-border">
        {messages.map((msg) => (
          <div
            key={msg.uuid}
            className="flex gap-4 max-w-3xl animate-in slide-in-from-bottom-2 fade-in duration-300 group"
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

              {/* MODO DE EDIÇÃO vs MODO VISUALIZAÇÃO */}
              {editingMessageId === msg.uuid ? (
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="h-8 text-sm"
                    autoFocus
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSaveEdit(msg.uuid)
                    }
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10"
                    onClick={() => handleSaveEdit(msg.uuid)}
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => setEditingMessageId(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <p className="text-foreground text-sm md:text-base leading-relaxed">
                    {msg.content}
                    {msg.isEdited && (
                      <span className="text-[10px] text-muted-foreground ml-2">
                        (editado)
                      </span>
                    )}
                  </p>

                  {/* Menu de Opções da Mensagem (Fica visível no hover da div pai 'group') */}
                  {/* Você pode envolver isso num IF verificando se a mensagem pertence ao usuário logado */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground shrink-0 -mt-1"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-32 rounded-xl"
                    >
                      <DropdownMenuItem
                        className="cursor-pointer gap-2"
                        onClick={() => {
                          setEditContent(msg.content);
                          setEditingMessageId(msg.uuid);
                        }}
                      >
                        <Edit2 className="w-4 h-4" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
                        onClick={() => handleDeleteMessage(msg.uuid)}
                      >
                        <Trash2 className="w-4 h-4" /> Apagar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </div>
        ))}

        {typingUsers.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {typingUsers.map((u) => u.nickname).join(", ")}{" "}
            {typingUsers.length > 1 ? "estão" : "está"} digitando...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
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
    </>
  );
}
