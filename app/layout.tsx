import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteChrome } from "@/components/layout/site-chrome";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vamosdenuevo.ar"),
  title: {
    default: "Vamos de Nuevo | Teatro independiente",
    template: "%s | Vamos de Nuevo",
  },
  description:
    "Base web de Vamos de Nuevo, grupo de teatro independiente con obras, funciones y novedades.",
  applicationName: "Vamos de Nuevo",
  keywords: [
    "teatro independiente",
    "Vamos de Nuevo",
    "obras teatrales",
    "funciones",
    "novedades culturales",
  ],
  openGraph: {
    title: "Vamos de Nuevo",
    description:
      "Teatro independiente con una presencia digital contemporánea, cálida y móvil primero.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${manrope.variable} ${cormorant.variable} bg-background text-foreground antialiased`}
      >
        <div className="relative isolate min-h-screen overflow-x-hidden">
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-x-0 top-[-12rem] h-[28rem] bg-[radial-gradient(circle_at_top,rgba(255,119,55,0.22),transparent_58%)]" />
            <div className="absolute right-[-10rem] top-[18rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(161,28,33,0.18),transparent_65%)] blur-3xl" />
            <div className="absolute bottom-[-14rem] left-[-12rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,176,89,0.14),transparent_68%)] blur-3xl" />
          </div>
          <SiteChrome>{children}</SiteChrome>
        </div>
      </body>
    </html>
  );
}
