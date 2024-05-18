"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

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
        let results: TickerResult[] = await getTickers(debouncedSearchQuery);
        results = results.sort((a, b) => {
          if (a.Ticker.toLowerCase() === debouncedSearchQuery.toLowerCase())
            return -1;
          if (b.Ticker.toLowerCase() === debouncedSearchQuery.toLowerCase())
            return 1;
          return 0;
        });
        setItems(results);
      }
    };
    getResults();
  }, [debouncedSearchQuery]);

  return (
    <div className="w-2/3">
      <input
        type="text"
        placeholder="Search for a ticker..."
        className="search w-full flex-1 py-3 px-5 rounded-full text-zinc-200 outline-zinc-200 ring-zinc-200 bg-gray-900 outline-1"
        value={searchQuery}
        spellCheck="false"
        autoCorrect="off"
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      {items.length > 0 && (
        <ul className="results-list flex-1 py-3 px-5 mt-5 w-full bg-gray-900 max-h-64 overflow-auto">
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
      )}
    </div>
  );
}

interface SearchItemProps {
  text: string;
  url: string;
}

function SearchItem({ text, url }: SearchItemProps) {
  return (
    <li>
      <Link href={url}>{text}</Link>
    </li>
  );
}
