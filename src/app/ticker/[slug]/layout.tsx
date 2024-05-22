import type { Metadata } from "next";
import "../../globals.css";
import SearchBar from "@/components/searchbar/search-bar";
import MainHeader from "@/components/main-header";
import HeaderSearchBar from "@/components/searchbar/header-search-bar";


export const metadata: Metadata = {
  title: "val: value any company",
  description: "Create any company valuation",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div
      >
          <MainHeader>
            <HeaderSearchBar></HeaderSearchBar>
          </MainHeader>
          {children}
      </div>
  );
}
