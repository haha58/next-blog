import { ThemeProvider } from "./_components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
export { ThemeProvider };

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50 text-slate-800 transition-colors duration-300`}
      >
        <ThemeProvider
          // 告诉 next-themes 通过修改 <html> 元素的 class 来切换主题。配合 Tailwind CSS 的 dark: 前缀使用非常方便。
          attribute="class"
          // 默认跟随系统主题。用户第一次访问的时候会自动检测操作系统的主题偏好。
          defaultTheme="system"
          // 启用系统主题检测。用户第一次访问的时候会自动检测操作系统的主题偏好。
          enableSystem
          // 禁用主题切换时的过渡效果。默认是启用的。
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
