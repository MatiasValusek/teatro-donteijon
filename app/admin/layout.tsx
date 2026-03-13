import type { Metadata } from "next";
import { noIndexRobots } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  robots: noIndexRobots,
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#090909_0%,#111111_100%)]">
      {children}
    </div>
  );
}
