import SearchBar from "@/components/searchbar/search-bar";
import { JetBrains_Mono } from "next/font/google";

const jetBrains = JetBrains_Mono({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="h-2/3 grid">
      <div className="flex flex-col w-full">
        <div className={`${jetBrains.className} align-text-bottom pt-12`}>
          Value any company.
        </div>
        <div className="w-full pt-6">
          <SearchBar />
        </div>
      </div>
    </main>
  );
}
