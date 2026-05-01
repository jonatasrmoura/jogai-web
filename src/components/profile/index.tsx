"use client";

import Link from "next/link";
import {
  Calendar,
  User,
  AtSign,
  Info,
  CalendarDays,
  Edit3,
} from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ShowUserDTO } from "../../types/users/show-user.dto";
import { NoAvatarProfile } from "../no-avatar-profile";

interface ProfileProps {
  user: ShowUserDTO;
}

export function Profile({ user }: ProfileProps) {
  const formattedJoinedDate = format(
    new Date(user.createdAt),
    "MMMM 'de' yyyy",
    { locale: ptBR },
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header do Perfil / Cover Area Premium */}
        <div className="relative h-48 md:h-64 w-full rounded-3xl overflow-hidden shadow-lg border border-border">
          {/* Efeito de Gradiente Fluido */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background to-primary/10 opacity-80" />
          <div className="absolute top-[-50%] left-[-20%] w-[70%] h-[150%] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        </div>

        {/* Card Principal de Informações */}
        <Card className="relative -mt-24 border border-border shadow-xl bg-card/80 backdrop-blur-xl rounded-3xl overflow-hidden">
          <CardContent className="pt-0 p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 mt-10">
              {/* Avatar com Borda Recortada */}
              <div className="relative group -mt-12 md:-mt-16">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-card bg-muted overflow-hidden shadow-xl transition-transform duration-300 ">
                  {user?.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={`Avatar de ${user.fullname}`}
                      fill
                      className="object-cover w-full h-full rounded-full"
                      sizes="(max-width: 768px) 128px, 160px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">
                      <NoAvatarProfile userName={user.fullname} />
                    </div>
                  )}
                </div>
              </div>

              {/* Nome e Nickname */}
              <div className="flex-1 text-center md:text-left space-y-2 pb-2">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                    {user.fullname}
                  </h1>
                  <Badge
                    variant="outline"
                    className="w-fit mx-auto md:mx-0 text-xs font-bold py-1 px-3 bg-primary/10 text-primary border-primary/20 uppercase tracking-wider"
                  >
                    #{user.tag}
                  </Badge>
                </div>
                <p className="text-muted-foreground font-medium flex items-center justify-center md:justify-start">
                  <AtSign className="w-4 h-4 mr-1" />
                  {user.nickname}
                </p>
              </div>

              <div className="pb-2 w-full md:w-auto">
                <Button
                  asChild
                  variant="outline"
                  className="w-full md:w-auto rounded-full px-6 h-11 border-border bg-background/50 hover:bg-muted font-semibold transition-all"
                >
                  <Link
                    href={{
                      pathname: "/profile",
                      query: { name: "edit-profile" },
                    }}
                    aria-label="Editar informações do seu perfil"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Link>
                </Button>
              </div>
            </div>

            <hr className="my-8 border-border" />

            {/* Grid de Detalhes */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Esquerda: Bio (Ocupa mais espaço) */}
              <div className="md:col-span-3 space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2 text-foreground tracking-tight">
                  <Info className="w-5 h-5 text-primary" />
                  Sobre mim
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg whitespace-pre-wrap">
                  {user.bio ||
                    "Este usuário ainda não adicionou uma biografia. O mistério faz parte do jogo!"}
                </p>
              </div>

              {/* Direita: Datas e Infos Técnicas */}
              <div className="md:col-span-2 space-y-5 bg-background/50 p-6 rounded-2xl border border-border">
                <h3 className="text-lg font-bold flex items-center gap-2 text-foreground tracking-tight">
                  <User className="w-5 h-5 text-primary" />
                  Informações
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="p-2 rounded-lg bg-card border border-border shadow-sm">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">
                      Nascido em{" "}
                      <strong className="text-foreground">
                        {user.birthDay}
                      </strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="p-2 rounded-lg bg-card border border-border shadow-sm">
                      <CalendarDays className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">
                      Membro desde{" "}
                      <strong className="text-foreground">
                        {formattedJoinedDate}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
