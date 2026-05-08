"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useGuildChat } from "../../../../hooks/use-guild-chat";
import { api } from "../../../../services/api";
import {
  getGuildDetails,
  type GuildDetails,
  type GuildMember,
} from "../../../../services/guilds/get-guild-details.service";

import { GuildHeader } from "../../../../components/guilds/guild/guild-header";
import { GuildSidebar } from "../../../../components/guilds/guild/guild-sidebar";
import { GuildOffersFeed } from "../../../../components/guilds/guild/guild-offers-feed";
import { GuildSettingsModal } from "../../../../components/guilds/guild/guild-settings-modal";
import { GuildChat } from "../../../../components/guilds/guild/guild-chat";

export default function GuildTavernPage() {
  const params = useParams();
  const guildUuid = params.uuid as string;

  const [activeView, setActiveView] = useState<"chat" | "offers">("chat");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // O Hook do WebSocket reage a eventos em tempo real
  const {
    messages,
    setMessages,
    isConnected,
    typingUsers,
    sendMessage,
    sendTyping,
  } = useGuildChat(guildUuid);

  const [guildDetails, setGuildDetails] = useState<GuildDetails | null>(null);
  const [guildMembers, setGuildMembers] = useState<GuildMember[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [hasPermission, setHasPermission] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full overflow-hidden bg-background text-foreground">
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
          <GuildHeader activeView={activeView} setActiveView={setActiveView} />

          {activeView === "offers" ? (
            <GuildOffersFeed />
          ) : (
            <GuildChat
              guildUuid={guildUuid}
              hasPermission={hasPermission}
              messages={messages}
              setMessages={setMessages}
              isConnected={isConnected}
              typingUsers={typingUsers}
              sendMessage={sendMessage}
              sendTyping={sendTyping}
            />
          )}
        </main>
      )}

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
