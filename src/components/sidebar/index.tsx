"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavUser } from "@/features/user/components/nav-user";
import { sidebarItems } from "./sidebar-config";
import { SidebarNavMain } from "./sidebar-nav-main";
import { SidebarNavSwitcher } from "@/features/institute/components/nav-switcher";
import { useUser } from "@/features/user/hooks/use-user";

export function SidebarDashboard({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { profile } = useUser();

  const menu = sidebarItems({ instituteId: "1", rule: profile?.role });

  if (!profile) return null;

  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarNavSwitcher
              uid={"1"}
              institute={"1"}
              defaultInstitute={"1"}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarNavMain items={menu} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <NavUser />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
