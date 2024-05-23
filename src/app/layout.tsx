import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "val: value any company",
  description: "Value any company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body
        className={`${jetbrainsMono.className} w-4/5 mx-auto h-screen sm:w-2/3 dark:bg-zinc-950 bg-slate-50`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Footer></Footer>
      </body>
    </html>
  );
}
