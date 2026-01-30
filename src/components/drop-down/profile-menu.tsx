import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "../../contexts/auth-context";

export function ProfileMenu() {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link
          href="/marketplace?my-games"
          className="flex items-center gap-2 rounded-full border border-primary hover:bg-gray-50"
        >
          <Image
            src={
              user?.avatarUrl ||
              "https://avatars.githubusercontent.com/u/66448546?v=4"
            }
            alt={user?.fullname || "User Avatar"}
            className="h-12 w-12 rounded-full object-cover"
            width={500}
            height={500}
          />
        </Link>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <Link href="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <UserIcon />
            Profile
          </DropdownMenuItem>
        </Link>

        <Link href="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <CreditCardIcon />
            Billing
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
