"use client";

import Image from "next/image";
import Swal from "sweetalert2";
import { Users, Settings, LogOut, Link as LinkIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";

import type { GuildDetails } from "../../../services/guilds/get-guild-details.service";
import {
  generateInviteLink,
  leaveGuild,
} from "../../../services/guilds/guild-actions.service";

// Importando a lista de membros que isolamos!
import { GuildMembersList } from "./guild-members-list";
import type { GuildMember } from "../../../types/guilds/guild-member";

interface GuildSidebarProps {
  guildUuid: string;
  guildDetails: GuildDetails;
  guildMembers: GuildMember[];
  totalMembers: number;
  isConnected: boolean;
  onOpenSettings: () => void;
  // onMemberKicked: (uuid: string) => void;
}

export function GuildSidebar({
  guildUuid,
  guildDetails,
  guildMembers,
  totalMembers,
  isConnected,
  onOpenSettings,
  // onMemberKicked,
}: GuildSidebarProps) {
  // Lógica restaurada e funcionando!
  const handleLeaveGuild = async () => {
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
          console.log("Ação bloqueada:", error.message);
          Swal.fire(
            "Erro",
            error.message || "Não foi possível sair da guilda.",
            "error",
          );
        }
      }
    });
  };

  // Lógica restaurada e funcionando!
  const handleGenerateInvite = async () => {
    try {
      const res = await generateInviteLink(guildUuid);
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
      Swal.fire("Ops!", "Falha ao gerar convite.", "error");
    }
  };

  return (
    <aside className="w-full lg:w-80 bg-card/30 border-r border-border flex flex-col overflow-hidden shrink-0 hidden lg:flex">
      {/* Banner Dinâmico */}
      <div className="h-32 relative p-4 flex flex-col justify-end bg-gradient-to-br from-indigo-900 via-primary/50 to-purple-900">
        {guildDetails.bannerUrl && (
          <Image
            src={guildDetails.bannerUrl}
            alt={guildDetails.name}
            fill
            priority // <--- ADICIONE ESTA PROPRIEDADE
            className="object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-black text-white">
              {guildDetails.name}
            </h1>
            <p className="text-xs text-white/80">Foco: {guildDetails.focus}</p>
          </div>

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
            <DropdownMenuContent align="end" className="w-48 rounded-xl">
              <DropdownMenuItem
                onClick={handleGenerateInvite}
                className="cursor-pointer gap-2 font-medium text-emerald-500 focus:text-emerald-500 focus:bg-emerald-500/10"
              >
                <LinkIcon className="w-4 h-4" /> Copiar Convite
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={onOpenSettings}
                className="cursor-pointer gap-2 font-medium"
              >
                <Settings className="w-4 h-4" /> Configurar Guilda
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLeaveGuild}
                className="cursor-pointer gap-2 font-bold text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <LogOut className="w-4 h-4" /> Sair da Guilda
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Estatísticas */}
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

      {/* 👇 CHAMADA DO COMPONENTE FILHO 👇 */}
      <GuildMembersList
        guildUuid={guildUuid}
        guildMembers={guildMembers}
        // onMemberKicked={onMemberKicked}
      />
    </aside>
  );
}
