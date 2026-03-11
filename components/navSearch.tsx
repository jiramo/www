"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchPosts, SearchResult } from "@/lib/search";

interface NavSearchProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setInput?: (value: string) => void;
}

const HighlightedText = ({ text, query }: { text?: string; query: string }) => {
  if (!text) return null;
  if (!query.trim()) return <>{text}</>;

  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span
            key={i}
            className="text-orange-400 font-bold bg-orange-400/10 rounded px-0.5"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
};

export default function NavSearch({
  isOpen,
  setIsOpen,
  setInput = () => {},
}: NavSearchProps) {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [localQuery, setLocalQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (!localQuery.trim()) {
        setResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const data = await searchPosts(localQuery);
        setResults(data);
      } catch (error) {
        console.error("Errore durante la ricerca:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeoutId);
  }, [localQuery]);

  useEffect(() => {
    setSelectedIndex(results.length > 0 ? 0 : -1);
  }, [results]);

  const toggleSearch = () => {
    const next = !isOpen;
    setIsOpen(next);

    if (next) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    } else {
      clearSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    setInput(value);
  };

  const clearSearch = () => {
    setIsOpen(false);
    setInput("");
    setLocalQuery("");
    setResults([]);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      clearSearch();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0 && selectedIndex >= 0) {
        const selectedPost = results[selectedIndex];
        router.push(`/blog/${selectedPost.slug}`);
        clearSearch();
      }
    }
  };

  return (
    <div className="relative flex flex-col justify-end">
      <div
        className={`
      absolute bottom-[calc(100%+12px)] left-0 w-[320px] 
      glass border border-black/10 dark:border-white/10 rounded-2xl p-2 flex flex-col gap-1
      transition-all duration-300 origin-bottom shadow-xl
      bg-white/80 dark:bg-transparent
      ${isOpen && localQuery ? "opacity-100 scale-100 visible z-50" : "opacity-0 scale-95 invisible -z-10"}
    `}
      >
        {isSearching ? (
          <div className="p-3 text-sm text-neutral-500 dark:text-neutral-400 text-center animate-pulse">
            Ricerca in corso...
          </div>
        ) : results.length > 0 ? (
          results.map((post, index) => {
            const isSelected = index === selectedIndex;
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                onClick={clearSearch}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`
              group flex flex-col p-3 rounded-lg transition-colors cursor-pointer
              ${isSelected ? "bg-black/5 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/10"}
            `}
              >
                <span className="text-sm font-medium text-neutral-900 dark:text-white transition-colors line-clamp-1">
                  <HighlightedText text={post.title} query={localQuery} />
                </span>
                {post.excerpt && (
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                    <HighlightedText text={post.excerpt} query={localQuery} />
                  </span>
                )}
              </Link>
            );
          })
        ) : !isSearching && localQuery ? (
          <div className="p-3 text-sm text-neutral-500 dark:text-neutral-400 text-center">
            Nessun risultato trovato.
          </div>
        ) : null}
      </div>

      <div
        onClick={toggleSearch}
        style={{ width: isOpen ? "320px" : "56px" }}
        className={`
      relative flex items-center shrink-0
      h-14 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] rounded-2xl
      glass border border-black/10 dark:border-white/10
      bg-white/70 dark:bg-transparent
      ${
        isOpen
          ? "cursor-text pl-2 pr-2 shadow-lg"
          : "hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer justify-center"
      }
    `}
      >
        <div
          className={`
        flex items-center justify-center shrink-0 transition-colors
        ${isOpen ? "w-10 h-10 text-neutral-900 dark:text-white" : "w-full h-full text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}
      `}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        <div
          className={`
        flex flex-1 items-center overflow-hidden transition-all duration-500 ease-out
        ${isOpen ? "opacity-100 w-full ml-1" : "opacity-0 w-0 ml-0"}
      `}
        >
          <input
            ref={searchInputRef}
            type="text"
            value={localQuery}
            placeholder="Search..."
            className="w-full bg-transparent text-[14px] text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none font-medium h-full pb-px"
            onClick={(e) => e.stopPropagation()}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div
          className={`
        flex items-center gap-2 shrink-0 overflow-hidden transition-all duration-300
        ${isOpen ? "w-auto opacity-100 mr-1" : "w-0 opacity-0"}
      `}
        >
          <span className="hidden sm:inline-flex items-center border border-black/10 dark:border-white/10 rounded px-1.5 py-0.5 text-[10px] text-neutral-500 font-mono bg-black/5 dark:bg-white/5">
            ESC
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              clearSearch();
            }}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-neutral-400 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
