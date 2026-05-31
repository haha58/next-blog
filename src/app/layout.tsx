import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/_components/theme-provider";
import Navbar from "@/app/_components/nav-bar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "精选专栏 - Next.js 版",
  description: "深入浅出，探索技术的无限可能",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navbar = await Navbar();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-[#f7fbff] text-slate-800 transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {navbar}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
