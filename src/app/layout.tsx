import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "../contexts/auth-context";
import { HeartbeatRunner } from "../components/heartbeat-runner";

const roboto = Roboto({
  variable: "--font-roboto-sans",
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jogaí | A sua plataforma nerd",
  description:
    "Plataforma definitiva para negociar, trocar e organizar sua biblioteca de jogos.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <body
        className={`${roboto.variable} ${robotoMono.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <HeartbeatRunner />
          <main className="flex-grow flex flex-col">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
