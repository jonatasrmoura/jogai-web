import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  LockKeyhole,
  CircleUserRound,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "../../contexts/auth-context";
import { NoAvatarProfile } from "../no-avatar-profile";

export function ProfileMenu() {
  const { user, handleLogout } = useContext(AuthContext);

  if (!user) return <div>Carregando...</div>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link
          href="/marketplace?my-games"
          className="flex items-center gap-2 rounded-full border border-primary hover:bg-gray-50"
        >
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.fullname || "User Avatar"}
              className="h-10 w-10 rounded-full object-cover"
              width={700}
              height={700}
            />
          ) : (
            <div className="w-10 h-10 text-2xl">
              <NoAvatarProfile userName={user.fullname} />
            </div>
          )}
        </Link>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <Link href="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <CircleUserRound />
            Profile
          </DropdownMenuItem>
        </Link>

        <Link href="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <CreditCardIcon />
            Account
          </DropdownMenuItem>
        </Link>

        <Link href="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <LockKeyhole />
            Private
          </DropdownMenuItem>
        </Link>

        <Link href="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <SettingsIcon />
            Settings
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={handleLogout}
        >
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
