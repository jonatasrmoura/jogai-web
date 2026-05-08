"use client";

import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { Crown, MoreVertical, ShieldAlert, UserMinus } from "lucide-react";

import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

import type { GuildMember } from "../../../services/guilds/get-guild-details.service";
import {
  kickMember,
  transferOwnership,
} from "../../../services/guilds/guild-actions.service";

// 👇 Importando o nosso novo modal!
import { GuildProfileModal } from "./guild-profile-modal";

interface GuildMembersListProps {
  guildUuid: string;
  guildMembers: GuildMember[];
  onMemberKicked: (memberUuid: string) => void;
}

export function GuildMembersList({
  guildUuid,
  guildMembers,
  onMemberKicked,
}: GuildMembersListProps) {
  // 👇 Estado para controlar quem foi clicado para abrir o perfil
  const [selectedMember, setSelectedMember] = useState<GuildMember | null>(
    null,
  );

  return (
    <>
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
              {/* Adicionamos o onClick aqui para abrir o modal! */}
              <div
                className="flex items-center gap-3 overflow-hidden cursor-pointer flex-1"
                onClick={() => setSelectedMember(member)}
              >
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

                <DropdownMenuContent align="end" className="w-48 rounded-xl">
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
                            await transferOwnership(guildUuid, member.userUuid);
                            Swal.fire(
                              "Feito!",
                              "A liderança foi transferida.",
                              "success",
                            );
                          } catch (error: any) {
                            Swal.fire(
                              "Erro",
                              error.message ||
                                "Não foi possível transferir a liderança.",
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
                            await kickMember(guildUuid, member.userUuid);
                            onMemberKicked(member.userUuid);
                            Swal.fire(
                              "Expulso",
                              "O membro foi removido da guilda.",
                              "success",
                            );
                          } catch (error: any) {
                            Swal.fire(
                              "Erro",
                              error.message ||
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

      {/* 👇 RENDERIZANDO O MODAL DE PERFIL AQUI 👇 */}
      <GuildProfileModal
        guildUuid={guildUuid} // <-- Adicione esta linha!
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        // currentUserIsAdmin={...} <- Se quiser limitar quem muda o cargo, passe o teste aqui
      />
    </>
  );
}
