import Image from "next/image";
import Link from "next/link";
import { Users, Swords } from "lucide-react";

import { Button } from "@/components/ui/button";

export interface GuildCardProps {
  uuid: string;
  name: string;
  focus: string;
  members: number;
  bannerUrl: string;
  emblemUrl: string;
}

export function GuildCard({
  uuid,
  name,
  focus,
  members,
  bannerUrl,
  emblemUrl,
}: GuildCardProps) {
  return (
    <div className="group relative flex flex-col bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_0_25px_rgba(79,70,229,0.15)] transition-all duration-300 hover:-translate-y-1">
      {/* Banner da Guilda */}
      <div className="relative h-32 w-full bg-muted overflow-hidden">
        <Image
          src={bannerUrl}
          alt={`Banner da guilda ${name}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      </div>

      {/* Corpo do Card com Emblema Flutuante */}
      <div className="relative flex flex-col p-5 pt-0 flex-1">
        {/* Emblema */}
        <div className="relative w-16 h-16 -mt-8 mb-3 rounded-2xl overflow-hidden border-4 border-card bg-muted shadow-lg shrink-0 z-10 transform transition-transform group-hover:scale-105 group-hover:-rotate-3">
          <Image
            src={emblemUrl}
            alt={`Emblema de ${name}`}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        {/* Informações */}
        <div className="flex-1 space-y-1 mb-4">
          <h3 className="text-xl font-bold tracking-tight text-foreground line-clamp-1">
            {name}
          </h3>
          <p className="text-sm font-medium text-primary flex items-center gap-1.5">
            <Swords className="w-3.5 h-3.5" />
            {focus}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-semibold">
            <Users className="w-4 h-4" />
            <span>
              {members} <span className="hidden sm:inline">membros</span>
            </span>
          </div>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full border-border bg-background/50 hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Link
              href={`/guilds/${uuid}`}
              aria-label={`Explorar a guilda ${name}`}
            >
              Explorar
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
