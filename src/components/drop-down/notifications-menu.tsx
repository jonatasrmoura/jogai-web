import { Bell } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export function NotificationsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative rounded-full p-2 hover:bg-gray-100 cursor-pointer">
          <Bell className="h-5 w-5 text-gray-700" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[65%] ml-2 md:w-[90%] xl:w-[95%] h-[80vh] overflow-y-scroll">
        <DropdownMenuLabel>Hoje</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <strong>claudioborges</strong> pediu para seguir você.
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/evilrabbit.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <strong>jessi</strong> começou a seguir você.
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/evilrabbit.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <strong>jessi</strong> aceitou seu pedido para seguir.
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Ontem</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/maxleiter.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <strong>brunetpnet</strong> curtiu seu game.
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <AvatarGroup className="grayscale">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/maxleiter.png"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
          <strong>pedrinhop</strong> e mais 6 pessoas favoritaram seu game.
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Últimos 7 dias atrás</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/pranathip.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <strong>God of War</strong> publicado com sucesso!
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
