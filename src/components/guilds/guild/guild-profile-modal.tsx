"use client";

import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  Crown,
  ShoppingBag,
  Tag,
  ShoppingCart,
  Shield,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

import type { GuildMember } from "../../../types/guilds/guild-member";
// import { updateMemberRole } from "../../../services/guilds/guild-actions.service";

// IMPORTANTE: Ajuste os caminhos de importação para onde seus componentes realmente estão!
// import { GameExploreCard } from "../../games/game-explore-card";
// import { MyGameDealCard } from "../../games/my-game-deal-card";

interface GuildProfileModalProps {
  guildUuid: string;
  member: GuildMember | null;
  isOpen: boolean;
  onClose: () => void;
  currentUserIsAdmin?: boolean; // Diz se quem está vendo o modal tem poder para mudar cargos
  // guildRoles: { uuid: string; name: string }[]; // No futuro, receba a lista de cargos da guilda aqui
}

// ⚠️ MOCK DE CARGOS PARA TESTE (Remova quando tiver a lista real da API)
const MOCK_ROLES = [
  { uuid: "role-1", name: "Líder" },
  { uuid: "role-2", name: "Guardião" },
  { uuid: "role-3", name: "Membro" },
  { uuid: "role-4", name: "Iniciante" },
];

export function GuildProfileModal({
  // guildUuid,
  member,
  isOpen,
  onClose,
  currentUserIsAdmin = true, // Deixei true por padrão para você testar a UI
}: GuildProfileModalProps) {
  const [activeTab, setActiveTab] = useState("selling");

  if (!member) return null;

  const handleRoleChange = async (newRoleUuid: string, newRoleName: string) => {
    try {
      // 1. Chama a API real (descomente quando for testar de verdade)
      // await updateMemberRole(guildUuid, member.userUuid, newRoleUuid);

      Swal.fire({
        title: "Cargo Atualizado!",
        text: `${member.nickname} agora é um ${newRoleName}.`,
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });

      // TODO: Disparar um callback para atualizar a lista de membros na tela principal (onRoleChanged)
    } catch (error: any) {
      Swal.fire(
        "Erro",
        error.message || "Não foi possível alterar o cargo.",
        "error",
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-background border-border p-0 overflow-hidden rounded-2xl flex flex-col h-[85vh] sm:h-auto sm:max-h-[85vh]">
        {/* Header / Mini-Banner */}
        <div
          className={`h-24 shrink-0 relative flex items-start justify-end p-4 ${member.isAdmin ? "bg-gradient-to-r from-amber-600 to-amber-900" : "bg-gradient-to-r from-primary to-indigo-900"}`}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Informações Principais */}
        <div className="px-6 pb-2 relative shrink-0">
          <div className="flex justify-between items-end mb-4">
            <div className="-mt-12 relative z-10">
              <div className="w-24 h-24 rounded-2xl border-4 border-background bg-muted overflow-hidden flex items-center justify-center shadow-xl">
                {member.avatarUrl ? (
                  <Image
                    src={member.avatarUrl}
                    alt={member.nickname}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-3xl font-black text-muted-foreground">
                    {member.nickname.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* 👇 GERENCIADOR DE CARGO 👇 */}
            {currentUserIsAdmin ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-colors hover:opacity-80 cursor-pointer ${member.isAdmin ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "bg-primary/10 text-primary border border-primary/20"}`}
                  >
                    {member.isAdmin ? (
                      <Crown className="w-3 h-3" />
                    ) : (
                      <Shield className="w-3 h-3" />
                    )}
                    {member.roleName}
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Alterar Cargo</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {MOCK_ROLES.map((role) => (
                    <DropdownMenuItem
                      key={role.uuid}
                      className="cursor-pointer font-medium"
                      onClick={() => handleRoleChange(role.uuid, role.name)}
                    >
                      {role.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Badge Simples se não for admin
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm ${member.isAdmin ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "bg-primary/10 text-primary border border-primary/20"}`}
              >
                {member.isAdmin ? (
                  <Crown className="w-3 h-3" />
                ) : (
                  <Shield className="w-3 h-3" />
                )}
                {member.roleName}
              </div>
            )}
          </div>

          <div className="space-y-1 mb-2">
            <DialogTitle className="text-2xl font-black text-foreground flex items-center gap-2">
              {member.nickname}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Um aventureiro de respeito desta guilda.
            </p>
          </div>
        </div>

        {/* 👇 ABAS DE MERCADO 👇 */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="px-6 pt-2 shrink-0 border-b border-border">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-6">
              <TabsTrigger
                value="selling"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 font-bold text-muted-foreground data-[state=active]:text-foreground"
              >
                <Tag className="w-4 h-4 mr-2 text-emerald-500" />À Venda{" "}
                <span className="ml-1.5 bg-muted text-foreground px-2 py-0.5 rounded-full text-[10px]">
                  12
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="sold"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 font-bold text-muted-foreground data-[state=active]:text-foreground"
              >
                <ShoppingBag className="w-4 h-4 mr-2 text-blue-500" />
                Vendidos{" "}
                <span className="ml-1.5 bg-muted text-foreground px-2 py-0.5 rounded-full text-[10px]">
                  45
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="bought"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 font-bold text-muted-foreground data-[state=active]:text-foreground"
              >
                <ShoppingCart className="w-4 h-4 mr-2 text-purple-500" />
                Comprados{" "}
                <span className="ml-1.5 bg-muted text-foreground px-2 py-0.5 rounded-full text-[10px]">
                  8
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-border bg-card/10">
            {/* ABA: À VENDA (GameExploreCard) */}
            <TabsContent
              value="selling"
              className="mt-0 outline-none animate-in fade-in duration-300"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ⚠️ AQUI ENTRA SEU MAP REAL: {gamesForSale.map(game => <GameExploreCard key={game.id} data={game} />)} */}
                <div className="border border-dashed border-border rounded-xl h-40 flex items-center justify-center bg-card">
                  <p className="text-sm font-bold text-muted-foreground">
                    [GameExploreCard 1]
                  </p>
                </div>
                <div className="border border-dashed border-border rounded-xl h-40 flex items-center justify-center bg-card">
                  <p className="text-sm font-bold text-muted-foreground">
                    [GameExploreCard 2]
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* ABA: VENDIDOS (MyGameDealCard) */}
            <TabsContent
              value="sold"
              className="mt-0 outline-none animate-in fade-in duration-300"
            >
              <div className="flex flex-col gap-4">
                {/* ⚠️ AQUI ENTRA SEU MAP REAL: {gamesSold.map(deal => <MyGameDealCard key={deal.id} data={deal} />)} */}
                <div className="border border-dashed border-border rounded-xl h-24 flex items-center justify-center bg-card">
                  <p className="text-sm font-bold text-muted-foreground">
                    [MyGameDealCard - Venda Concluída]
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* ABA: COMPRADOS (MyGameDealCard) */}
            <TabsContent
              value="bought"
              className="mt-0 outline-none animate-in fade-in duration-300"
            >
              <div className="flex flex-col gap-4">
                {/* ⚠️ AQUI ENTRA SEU MAP REAL */}
                <div className="border border-dashed border-border rounded-xl h-24 flex items-center justify-center bg-card">
                  <p className="text-sm font-bold text-muted-foreground">
                    [MyGameDealCard - Compra Recebida]
                  </p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
