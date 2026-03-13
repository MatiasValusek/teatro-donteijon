import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { siteMetadata } from "@/lib/seo/metadata";
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

export const metadata: Metadata = siteMetadata;

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
          {children}
        </div>
      </body>
    </html>
  );
}
