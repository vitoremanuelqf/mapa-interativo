import { LucideIcon, Settings, Users, Shield, Map } from "lucide-react";

type UserRule = "admin" | "manager" | "user";

interface SidebarSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  allowedRoles: UserRule[];
}

interface SidebarMenu {
  title: string;
  url: string;
  icon: LucideIcon;
  allowedRoles: UserRule[];
  isActive?: boolean;
  items?: SidebarSubItem[];
}

interface SidebarDashboardItemsProps {
  instituteId: string;
  rule: UserRule;
}

export const sidebarItems = ({
  instituteId,
  rule,
}: SidebarDashboardItemsProps): SidebarMenu[] => {
  const menus: SidebarMenu[] = [
    {
      title: "Instituições",
      icon: Settings,
      url: "/institutes",
      isActive: true,
      allowedRoles: ["admin"],
    },
    {
      title: "Mapa",
      icon: Map,
      url: "#",
      isActive: true,
      allowedRoles: ["admin", "manager", "user"],
      items: [
        {
          title: "Mapa Interativo",
          url: `/institute/${instituteId}/map`,
          allowedRoles: ["admin", "manager", "user"],
        },
      ],
    },
  ];

  return menus
    .map((menu) => {
      // 🔹 Menu SEM submenu
      if (!menu.items) {
        return menu;
      }

      // 🔹 Menu COM submenu → filtra itens
      const filteredItems = menu.items.filter((item) =>
        item.allowedRoles.includes(rule),
      );

      return {
        ...menu,
        items: filteredItems,
      };
    })
    .filter((menu) => {
      // 🔹 Regra do menu
      if (!menu.allowedRoles.includes(rule)) return false;

      // 🔹 Se não tem submenu, mantém
      if (!menu.items) return true;

      // 🔹 Se tem submenu, só mantém se sobrou item
      return menu.items.length > 0;
    });
};
