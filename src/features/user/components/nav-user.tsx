"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  Loader2,
  LogOut,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarMenuButton } from "@/components/ui/sidebar";

import { useUser } from "@/features/user/hooks/use-user";

import { formatNamePart } from "@/utils/formatting/format-name-part";
import { signOut } from "@/features/auth/services/sign-out";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function NavUser() {
  const { push } = useRouter();
  const [isLoading, setIsloading] = useState(false);

  const { user } = useUser();

  const userName = formatNamePart(user?.displayName, "first");
  const userEmail = user?.email ?? undefined;
  const userNameInitials = formatNamePart(user?.displayName, "initials");
  const userPhotoURL = user?.photoURL ?? undefined;

  const handleSignOut = async () => {
    setIsloading(true);

    try {
      await signOut();
      push("/sign-in");
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={userPhotoURL} alt={userName} />
            <AvatarFallback className="rounded-lg">
              {userNameInitials}
            </AvatarFallback>
          </Avatar>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{userName}</span>
            <span className="truncate text-xs">{userEmail}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="top"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={userPhotoURL} alt={userName} />
              <AvatarFallback className="rounded-lg">
                {userNameInitials}
              </AvatarFallback>
            </Avatar>

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{userName}</span>
              <span className="truncate text-xs">{userEmail}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Conta
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Bell />
            Notificações
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleSignOut} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <LogOut />
              Sair
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
