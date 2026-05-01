"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gamepad2, ShieldCheck, Zap, Users } from "lucide-react";

import { Button } from "../../../components/ui/button";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center overflow-hidden">
      {/* 1. HERO SECTION - Typography & Glow Centered */}
      <section className="relative w-full max-w-7xl mx-auto px-6 py-32 md:py-48 flex flex-col justify-center items-center min-h-[90vh]">
        {/* Fundo Premium: Padrão de Grid estilo "Vercel/Linear" */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-20" />

        {/* Glow Centralizado e Suave */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 text-center relative z-10 max-w-4xl"
        >
          {/* Badge Premium */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            O Marketplace Definitivo
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold !leading-[1.1] tracking-tighter">
            Dê play na sua <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
              Economia Gamer
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-2">
            Negocie, venda ou troque os jogos que estão parados na sua estante.
            Conecte-se com jogadores de todo o Brasil de forma segura e moderna.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              aria-label="Começar Gratuitamente"
              className="h-14 px-8 text-base w-full sm:w-auto shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all"
            >
              <Link
                href={{ pathname: "/login", query: { name: "sign-up" } }}
                aria-label="Criar Conta"
              >
                Começar Gratuitamente
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              aria-label="Explorar Vitrine"
              className="h-14 px-8 text-base w-full sm:w-auto bg-background/50 border-border hover:bg-muted"
            >
              <Link href="/marketplace" aria-label="Explorar Vitrine">
                Explorar Vitrine
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="w-full bg-card/30 border-y border-border py-24 px-6 relative overflow-hidden">
        {/* Glow de fundo para as features */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que escolher o Jogaí?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar sua coleção e fazer negócios
              lucrativos em um só lugar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <FeatureCard
              icon={<Gamepad2 className="w-8 h-8 text-primary" />}
              title="Sua Vitrine"
              description="Anuncie seus jogos em poucos cliques e monte a loja dos seus sonhos."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8 text-primary" />}
              title="Negociação Segura"
              description="Sistema de avaliações e chat integrado para fechar negócios sem dor de cabeça."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-primary" />}
              title="Comunidade Ativa"
              description="Faça amizades, participe de grupos e encontre jogadores com os mesmos gostos."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-primary" />}
              title="Evolução SaaS"
              description="Planos Free, Plus e Premium para turbinar seus anúncios e vendas."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Subcomponente para organizar os cards de Vantagens
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col items-start p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-primary/10 transition-all duration-300 group z-10"
    >
      <div className="p-3 rounded-lg bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
