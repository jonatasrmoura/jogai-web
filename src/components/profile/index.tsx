"use client";

import { Calendar, User, AtSign, Info, CalendarDays } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ShowUserDTO } from "../../types/users/show-user.dto";
import { avatarUrlMock } from "../../utils/mocks/avatar-url-mock";

interface ProfileProps {
  user: ShowUserDTO;
}

export default function Profile({ user }: ProfileProps) {
  // const formattedBirthDate = format(
  //   new Date(user.birthDay),
  //   "dd 'de' MMMM 'de' yyyy",
  //   { locale: ptBR },
  // );
  const formattedJoinedDate = format(
    new Date(user.createdAt),
    "MMMM 'de' yyyy",
    { locale: ptBR },
  );

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header do Perfil / Cover Area */}
        <div className="relative h-48 w-full bg-primary/80 rounded-3xl overflow-hidden shadow-lg">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        </div>

        {/* Card Principal de Informações */}
        <Card className="relative -mt-20 border-none shadow-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-3xl">
          <CardContent className="pt-0 p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
              {/* Avatar com Borda */}
              <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-zinc-900 overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={user.avatarUrl || avatarUrlMock}
                    alt={user.fullname}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Nome e Nickname */}
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {user.fullname}
                  </h1>
                  <Badge
                    variant="secondary"
                    className="w-fit mx-auto md:mx-0 text-sm font-medium py-1 px-3"
                  >
                    #{user.tag}
                  </Badge>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium flex items-center justify-center md:justify-start">
                  <AtSign className="w-4 h-4" />
                  {user.nickname}
                </p>
              </div>

              <Button variant="outline" className="rounded-full px-6">
                Editar Perfil
              </Button>
            </div>

            <hr className="my-8 border-zinc-200 dark:border-zinc-800" />

            {/* Grid de Detalhes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Esquerda: Bio */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Info className="w-5 h-5 text-violet-500" />
                  Sobre mim
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {user.bio ||
                    "Este usuário ainda não adicionou uma biografia."}
                </p>
              </div>

              {/* Direita: Datas e Infos Técnicas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="w-5 h-5 text-violet-500" />
                  Informações
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                    <span className="text-sm">
                      Nascido em <strong>{user.birthDay}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                    <CalendarDays className="w-4 h-4 text-zinc-400" />
                    <span className="text-sm">
                      Membro desde <strong>{formattedJoinedDate}</strong>
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
