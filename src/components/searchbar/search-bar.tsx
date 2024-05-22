"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Loading } from "../ui/loading";

type TickerResult = {
  Ticker: string;
  name: string;
};

const getTickers = async (query: string): Promise<TickerResult[]> => {
  const tickers = (
    await fetch(`/api/tickers?query=${encodeURIComponent(query)}`)
  ).json();
  return tickers;
};

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(""); // To prevent overcall
  const [items, setItems] = useState<TickerResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
  return (
    <>
      <input
        type="text"
        className="search w-full flex-1 py-3 px-5 dark:outline-white outline outline-1 outline-zinc-950"
        value={searchQuery}
        spellCheck="false"
        autoCorrect="off"
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      {isLoading ? (
        <div className="py-8 justify-center flex">
          <Loading />
        </div>
      ) : items.length > 0 && searchQuery.length > 0 ? (
        <ul className="results-list flex-1 py-2 w-full max-h-64 overflow-auto scrollbar scrollbar-track-transparent dark:scrollbar-thumb-white scrollbar-thumb-black dark:bg-zinc-900 bg-zinc-100">
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
        searchQuery.length > 0 &&
        items.length === 0 && (
          <div className="text-center text-sm py-5">No results found</div>
        )
      )}
    </>
  );
}

interface SearchItemProps {
  text: string;
  url: string;
}

function SearchItem({ text, url }: SearchItemProps) {
  return (
    <li className="pt-1 text-sm hover:dark:bg-zinc-700 hover:py-1 hover:rounded px-5 hover:bg-zinc-300 w-full">
      <Link href={url} style={{display: 'inline-block'}}>{text}</Link>
    </li>
  );
}
