"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Loading } from "../ui/loading";
import { Search, X } from "lucide-react";
import { getTickers } from "./search-bar"
import Logo from "../logo";
import { useRouter } from "next/navigation";

type TickerResult = {
  Ticker: string;
  name: string;
};

export default function HeaderSearchBar() {
  const [openMobileSearch, setOpenMobileSearch] = useState(false);
  return (
    <div >
      <div className="block sm:hidden ">
        <Search
          className="h-[1.2rem] w-[1.2rem] mr-10"
          onClick={() => setOpenMobileSearch(true)}
        />
        {openMobileSearch && (
          <div
            className="bg-white/95 dark:bg-[#121212]/95 m-auto top-0 left-0 flex flex-col items-center w-full z-10 absolute"
            style={{ width: "100%", height: "100%", position: "fixed" }}
          >
            <div className="top-10 absolute">
              <Logo />
            </div>
            <div className="w-2/3 h-full" style={{ marginTop: "25vh" }}>
              <BaseSearchBar />
            </div>
              <X onClick={
                () => setOpenMobileSearch(false)
              
              } className="mb-10"/>
          </div>
        )}
      </div>
      <div className="align-baseline mx-auto hidden sm:block absolute top-11 rounded" style={{right: "30vw", width:"19vw"}}>
        <BaseSearchBar />
      </div>
    </div>
  );
}

interface SearchItemProps {
  text: string;
  url: string;
}

function SearchItem({ text, url }: SearchItemProps) {
  return (
    <li className="pt-1 text-xxs hover:dark:bg-zinc-700 hover:py-1 hover:rounded px-5 hover:bg-zinc-300 w-full">
      <Link href={url} style={{ display: "inline-block" }}>
        {text}
      </Link>
    </li>
  );
}

function BaseSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(""); // To prevent overcall
  const [items, setItems] = useState<TickerResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const getResults = async () => {
      if (debouncedSearchQuery) {
        setIsLoading(true);
        let results: TickerResult[] = await getTickers(debouncedSearchQuery);
        results = results.sort((a, b) => {
          if (a.Ticker.toLowerCase() === debouncedSearchQuery.toLowerCase())
            return -1;
          if (b.Ticker.toLowerCase() === debouncedSearchQuery.toLowerCase())
            return 1;
          return 0;
        });
        setItems(results);
        setIsLoading(false);
      }
    };
    getResults();
  }, [debouncedSearchQuery]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && items.length > 0) {
      const firstItem = items[0];
      const displayText = firstItem.Ticker + "  -  " + firstItem.name;

      const urlSlug = displayText
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .split(/\s+/)
        .join("-");
      router.push(`/ticker/${urlSlug}`);
    }
  };
  return (
    <>
      <input
        type="text"
        className="search w-full flex-1 py-2 px-4 dark:outline-zinc-300 outline outline-1 outline-zinc-800 text-xxs dark:text-white rounded"
        placeholder="Ticker Search..."
        value={searchQuery}
        spellCheck="false"
        autoCorrect="off"
        onChange={(event) => setSearchQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      {isLoading ? (
        <div className="py-8 justify-center flex">
          <Loading />
        </div>
      ) : items.length > 0 && searchQuery.length > 0 ? (
        <ul className="results-list flex-1 py-2 w-full max-h-64 overflow-auto scrollbar scrollbar-track-transparent dark:scrollbar-thumb-white scrollbar-thumb-black bg-slate-50 dark:bg-zinc-900">
          {items.map((item: TickerResult, index) => {
            const ticker = item.Ticker;
            const name = item.name;
            const displayText = ticker + "  -  " + name;
            const urlSlug = displayText
              .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
              .split(/\s+/)
              .join("-");
            return (
              <SearchItem
                key={index}
                text={displayText}
                url={`/ticker/${urlSlug}`}
              />
            );
          })}
        </ul>
      ) : (
        debouncedSearchQuery.length > 0 &&
        items.length === 0 && (
          <div className="text-center text-xs py-5">No results found</div>
        )
      )}
    </>
  );
}
