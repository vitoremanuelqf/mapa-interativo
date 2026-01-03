import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/contexts/user-context";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mapa Interativo IFSP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} antialiased`}>
        <Toaster theme="light" />
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
