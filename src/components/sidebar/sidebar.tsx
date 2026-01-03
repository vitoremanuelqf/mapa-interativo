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

export function SidebarDashboard({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const menu = sidebarItems({ institute: "1" });

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
