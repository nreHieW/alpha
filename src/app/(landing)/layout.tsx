import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/main-header";
import MainHeader from "@/components/main-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "val: value any company",
  description: "Create a discounted cash flow valuation for any company",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={`${inter.className}`}>
          <MainHeader></MainHeader>
          {children}
      </div>
  );
}
