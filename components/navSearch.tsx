"use client";

import { useRef } from "react";

interface NavSearchProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setInput?: (value: string) => void;
}

export default function NavSearch({
  isOpen,
  setIsOpen,
  setInput = () => {}
}: NavSearchProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    const next = !isOpen;
    setIsOpen(next);

    if (next) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    } else {
      setInput("");
    }
  };

  return (
    <div
      onClick={toggleSearch}
      style={{ width: isOpen ? "320px" : "56px" }}
      className={`
        relative flex items-center shrink-0
        h-14 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] rounded-2xl
        glass
        ${
          isOpen
            ? "cursor-text pl-2 pr-2"
            : "hover:bg-white/5 cursor-pointer justify-center"
        }
      `}
    >
      <div
        className={`
          flex items-center justify-center shrink-0 text-neutral-400 transition-colors
          ${isOpen ? "w-10 h-10 text-white" : "w-full h-full hover:text-white"}
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
          placeholder="Search..."
          className="w-full bg-transparent text-[14px] text-white placeholder-neutral-500 focus:outline-none font-medium h-full pb-px"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsOpen(false);
              setInput("");
            }
          }}
        />
      </div>

      <div
        className={`
          flex items-center gap-2 shrink-0 overflow-hidden transition-all duration-300
          ${isOpen ? "w-auto opacity-100 mr-1" : "w-0 opacity-0"}
        `}
      >
        <span className="hidden sm:inline-flex items-center border border-white/10 rounded px-1.5 py-0.5 text-[10px] text-neutral-500 font-mono bg-white/5">
          ESC
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
            setInput("");
          }}
          className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
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
  );
}