"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Settings,
  Image as ImageIcon,
  ShieldAlert,
  UserPlus,
} from "lucide-react";
import type { GuildDetails } from "../../../services/guilds/get-guild-details.service";

interface GuildSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  guild: GuildDetails;
  // Depois podemos passar callbacks para atualizar a tela principal quando salvar
}

export function GuildSettingsModal({
  isOpen,
  onClose,
  guild,
}: GuildSettingsModalProps) {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-background border-border p-0 overflow-hidden rounded-2xl flex flex-col h-[85vh] sm:h-auto sm:max-h-[85vh]">
        {/* Header do Modal */}
        <DialogHeader className="p-6 pb-4 border-b border-border bg-card/50 shrink-0">
          <DialogTitle className="text-2xl font-black flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary" />
            Configurações da Guilda
          </DialogTitle>
          <DialogDescription>
            Gerencie os detalhes, imagens, cargos e convites de{" "}
            <strong className="text-foreground">{guild.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        {/* Corpo com as Abas */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="px-6 pt-4 shrink-0">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1">
              <TabsTrigger
                value="general"
                className="font-bold text-xs sm:text-sm"
              >
                Geral
              </TabsTrigger>
              <TabsTrigger
                value="images"
                className="font-bold text-xs sm:text-sm"
              >
                Imagens
              </TabsTrigger>
              <TabsTrigger
                value="roles"
                className="font-bold text-xs sm:text-sm"
              >
                Cargos
              </TabsTrigger>
              <TabsTrigger
                value="requests"
                className="font-bold text-xs sm:text-sm"
              >
                Solicitações
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-border">
            {/* ABA: GERAL */}
            <TabsContent
              value="general"
              className="mt-0 space-y-4 animate-in fade-in zoom-in-95 duration-200"
            >
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" /> Informações
                Básicas
              </h3>
              <p className="text-sm text-muted-foreground">
                Em breve: Formulário para alterar nome, foco e descrição.
              </p>
              {/* Aqui entrará o formulário de PUT /guilds/:uuid */}
            </TabsContent>

            {/* ABA: IMAGENS */}
            <TabsContent
              value="images"
              className="mt-0 space-y-4 animate-in fade-in zoom-in-95 duration-200"
            >
              <h3 className="text-lg font-bold flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" /> Identidade Visual
              </h3>
              <p className="text-sm text-muted-foreground">
                Em breve: Upload Multipart do Banner e Emblema.
              </p>
              {/* Aqui entrará o input tipo file e a lógica do FormData */}
            </TabsContent>

            {/* ABA: CARGOS */}
            <TabsContent
              value="roles"
              className="mt-0 space-y-4 animate-in fade-in zoom-in-95 duration-200"
            >
              <h3 className="text-lg font-bold flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-primary" /> Gestão de
                Cargos
              </h3>
              <p className="text-sm text-muted-foreground">
                Em breve: Lista de cargos e criação de novos.
              </p>
            </TabsContent>

            {/* ABA: SOLICITAÇÕES */}
            <TabsContent
              value="requests"
              className="mt-0 space-y-4 animate-in fade-in zoom-in-95 duration-200"
            >
              <h3 className="text-lg font-bold flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-primary" /> Recrutamento
              </h3>
              <p className="text-sm text-muted-foreground">
                Em breve: Histórico de aprovação e recusa de membros.
              </p>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
