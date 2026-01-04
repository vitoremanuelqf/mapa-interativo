"use client";

import { University, ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import useInstitute from "../../user/hooks/use-user-institutes";
import { useUser } from "@/features/user/hooks/use-user";

interface ISidebarNavSwitcherProps {
  uid: string;
  institute?: string;
  defaultInstitute: string;
}

export function SidebarNavSwitcher({
  uid,
  institute,
  defaultInstitute,
}: ISidebarNavSwitcherProps) {
  const { institutes } = useInstitute({ uid });

  const { profile } = useUser();
  console.log("🚀 ~ SidebarNavSwitcher ~ profile:", profile);

  console.log("🚀 ~ SidebarNavSwitcher ~ institutes:", institutes);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <University className="size-4" />
          </div>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Olá</span>
            <span className="truncate text-xs">Plano Free</span>
          </div>

          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-muted-foreground text-xs">
          Instituto
        </DropdownMenuLabel>
        <DropdownMenuItem className="gap-2 p-2">
          <div className="flex size-6 items-center justify-center rounded-md border">
            <University className="size-3.5 shrink-0" />
          </div>
          IFSP
          <DropdownMenuShortcut>⌘1</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {profile?.role === "admin" && (
          <DropdownMenuItem className="gap-2 p-2">
            <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
              <Plus className="size-4" />
            </div>
            <div className="text-muted-foreground font-medium">
              Adicionar um novo Instituto
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
