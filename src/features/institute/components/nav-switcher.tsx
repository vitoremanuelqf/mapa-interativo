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
import { useUser } from "@/features/user/hooks/use-user";
import { useUserInstitutes } from "@/features/user/hooks/use-user-institutes";

interface ISidebarNavSwitcherProps {
  uid: string;
  defaultInstitute?: string;
}

export function SidebarNavSwitcher({
  uid,
  defaultInstitute,
}: ISidebarNavSwitcherProps) {
  const { profile } = useUser();

  const { data: institutes, isLoading } = useUserInstitutes({
    instituteIds: profile?.institutes,
  });
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
            <span className="truncate font-medium">
              {defaultInstitute ?? "Selecione um instituto"}
            </span>
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
          Institutos
        </DropdownMenuLabel>

        {!isLoading &&
          institutes?.map((institute, index) => (
            <DropdownMenuItem key={institute.id} className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border">
                <University className="size-3.5 shrink-0" />
              </div>

              <span className="truncate">{institute.institute}</span>

              <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2 p-2">
          <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
            <Plus className="size-4" />
          </div>
          <div className="text-muted-foreground font-medium">
            Adicionar um novo Instituto
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
