import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";

// const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "val: value any company",
  description: "Create any company valuation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.className} w-4/5 mx-auto h-screen sm:w-2/3`}>
        <ThemeProvider
        >
          {children}
        </ThemeProvider>
        <Footer></Footer>
      </body>
    </html>
  );
}
