import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finanças Pessoais",
  description: "Controlo simples de despesas e receitas pessoais.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = { themeColor: "#2563eb" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt"><body>{children}</body></html>;
}
