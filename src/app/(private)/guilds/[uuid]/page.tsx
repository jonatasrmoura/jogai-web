"use client";

import Image from "next/image";
import {
  Send,
  Store,
  Users,
  Shield,
  Swords,
  Pin,
  ChevronLeft,
} from "lucide-react";

import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { NoAvatarProfile } from "../../../../components/no-avatar-profile";

// Mocks para ilustrar o UX que planejamos
const GUILD_INFO = {
  name: "Cavaleiros de Prata",
  gameFocus: "RPG & Souls-like",
  members: 142,
  online: 28,
};

const MOCK_CHAT = [
  {
    id: 1,
    user: { name: "Arthur Pendragon", rank: "Mestre", avatar: null },
    text: "Alguém jogando o DLC de Elden Ring hoje à noite?",
    type: "text",
    time: "18:42",
  },
  {
    id: 2,
    user: {
      name: "Jonatas Moura",
      rank: "Aventureiro",
      avatar: "https://github.com/shadcn.png",
    },
    text: "Estou no chefe final, tá absurdo de difícil!",
    type: "text",
    time: "18:45",
  },
  {
    id: 3,
    user: { name: "Mago Negro", rank: "Comerciante S", avatar: null },
    text: "Galera, acabei de platinar o Persona 5 Royal. Estou passando pra frente, preço de desapego pra quem for da Guilda!",
    type: "offer", // O pulo do gato! Uma mensagem tipo 'offer'
    offerData: {
      gameName: "Persona 5 Royal",
      platform: "PS5",
      price: 120.0,
      image:
        "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=400&auto=format&fit=crop",
    },
    time: "18:50",
  },
];

export default function GuildTavernPage() {
  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full overflow-hidden bg-background text-foreground">
      {/* ==========================================
          SIDEBAR: INFO DA GUILDA E MEMBROS 
          ========================================== */}
      <aside className="w-full lg:w-80 bg-card/30 border-r border-border flex flex-col overflow-hidden shrink-0 hidden lg:flex">
        {/* Banner da Guilda */}
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

        {/* Stats */}
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
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
              {GUILD_INFO.online}
            </span>
          </div>
        </div>

        {/* Lista de Membros (Ranks estimulam o engajamento) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
            Aventureiros Online
          </h3>

          {/* Exemplo de membro na lista */}
          <div
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors"
            aria-label="Ver perfil de Jonatas Moura"
          >
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

          {/* Outro membro */}
          <div
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors"
            aria-label="Ver perfil de Mago Negro"
          >
            <div className="relative w-9 h-9 rounded-full bg-muted flex items-center justify-center border-2 border-amber-500/50">
              <NoAvatarProfile userName="Mago Negro" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-card rounded-full" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none">Mago Negro</p>
              <p className="text-[10px] font-semibold text-amber-500 mt-1 uppercase tracking-wider">
                Comerciante S
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ==========================================
          ÁREA PRINCIPAL: A TAVERNA (CHAT)
          ========================================== */}
      <main className="flex-1 flex flex-col relative bg-background">
        {/* Header Mobile / Info Topo */}
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
          {/* Filtros Inteligentes (Planejamento de UX) */}
          <div className="hidden sm:flex items-center gap-2 bg-muted p-1 rounded-lg">
            <button className="px-3 py-1 text-xs font-bold rounded-md bg-background text-foreground shadow-sm">
              Todas
            </button>
            <button className="px-3 py-1 text-xs font-bold rounded-md text-muted-foreground hover:text-foreground">
              Só Ofertas
            </button>
          </div>
        </header>

        {/* Evento Fixado (Incentiva as pessoas a conversarem sobre algo) */}
        <div className="bg-primary/10 border-b border-primary/20 p-2.5 flex items-center gap-3 px-4 shrink-0">
          <Pin className="w-4 h-4 text-primary fill-primary" />
          <p className="text-xs sm:text-sm font-medium text-primary">
            <strong>Missão da Semana:</strong> Negociações de jogos Indie feitas
            nesta guilda não pagam taxa até sexta-feira!
          </p>
        </div>

        {/* FEED DE MENSAGENS */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 flex flex-col">
          {MOCK_CHAT.map((msg) => (
            <div key={msg.id} className="flex gap-4 max-w-3xl">
              {/* Avatar da mensagem */}
              <div className="w-10 h-10 rounded-full shrink-0 bg-muted overflow-hidden">
                {msg.user.avatar ? (
                  <Image
                    src={msg.user.avatar}
                    alt={msg.user.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                ) : (
                  <NoAvatarProfile userName={msg.user.name} />
                )}
              </div>

              <div className="flex flex-col gap-1 w-full">
                {/* Nome, Rank e Horário */}
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-foreground text-sm">
                    {msg.user.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${msg.user.rank === "Comerciante S" ? "bg-amber-500/10 text-amber-500" : "bg-primary/10 text-primary"}`}
                  >
                    {msg.user.rank}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {msg.time}
                  </span>
                </div>

                {/* Texto da Mensagem */}
                <p className="text-foreground text-sm md:text-base leading-relaxed">
                  {msg.text}
                </p>

                {/* O PULO DO GATO: Se for uma Oferta, renderiza um Rich Card dentro do chat */}
                {msg.type === "offer" && msg.offerData && (
                  <div className="mt-3 bg-card border border-border rounded-2xl p-3 flex flex-col sm:flex-row gap-4 max-w-sm hover:border-primary/50 transition-colors shadow-sm">
                    <div className="w-full sm:w-24 h-24 relative rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={msg.offerData.image}
                        alt="Jogo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-1 w-full">
                      <div>
                        <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                          Oferta da Guilda
                        </div>
                        <h4 className="font-bold text-foreground leading-tight">
                          {msg.offerData.gameName}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {msg.offerData.platform}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-black text-lg text-foreground">
                          R$ {msg.offerData.price.toFixed(2)}
                        </span>
                        <Button
                          size="sm"
                          className="h-8 shadow-md shadow-primary/20"
                          aria-label={`Negociar ${msg.offerData.gameName}`}
                        >
                          Negociar
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT DE MENSAGEM (Onde a ação acontece) */}
        <div className="p-4 bg-background border-t border-border shrink-0">
          <div className="max-w-4xl mx-auto flex items-end gap-2 relative">
            {/* O botão estratégico para não postar só texto */}
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-12 w-12 shrink-0 rounded-xl bg-card border-border hover:bg-muted hover:text-primary transition-colors"
              aria-label="Anexar item para negócio no chat"
            >
              <Store className="w-5 h-5" />
            </Button>

            <Input
              className="h-12 rounded-xl bg-card border-border px-4 shadow-inner"
              placeholder="Fale com a Taverna... ou clique na loja ao lado para fazer uma oferta."
              aria-label="Digite sua mensagem na taverna"
            />

            <Button
              type="button"
              className="h-12 px-6 rounded-xl font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all"
              aria-label="Enviar mensagem"
            >
              Enviar <Send className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Subcomponente de estilo
function BadgeRank({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/40 text-white/90 border border-white/20 backdrop-blur-md">
      {icon} {title}
    </span>
  );
}
