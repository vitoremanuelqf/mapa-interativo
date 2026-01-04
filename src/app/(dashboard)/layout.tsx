import { SidebarDashboard } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mapa Interativo IFSP | Instituto",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarDashboard />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
