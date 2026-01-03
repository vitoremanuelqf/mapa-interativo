import { ShoppingBag } from "lucide-react";

interface SidebarDashboardItemsProps {
  institute: string;
}

export const sidebarItems = ({ institute }: SidebarDashboardItemsProps) => {
  const platformMenu = [
    {
      title: "Listas",
      url: "#",
      icon: ShoppingBag,
      isActive: true,
      items: [
        {
          title: "Lista de Compras",
          url: `/institute/${institute}/shopping-list`,
        },
      ],
    },
  ];

  return platformMenu;
};
