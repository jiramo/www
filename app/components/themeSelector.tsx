"use client";

import { JSX, useEffect, useState } from "react";

const THEMES = ["light", "system", "dark"] as const;
type Theme = (typeof THEMES)[number];

export default function ThemePill() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme && THEMES.includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const isDark =
        theme === "dark" || (theme === "system" && mediaQuery.matches);
      
      root.setAttribute("data-theme", isDark ? "dark" : "light");
    };

    applyTheme();
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      mediaQuery.addEventListener("change", applyTheme);
      return () => mediaQuery.removeEventListener("change", applyTheme);
    }
  }, [theme, mounted]);

  if (!mounted) return <div className="h-9 w-32" />; 

  const activeIndex = THEMES.indexOf(theme);

  return (
    <div className="flex items-center justify-end">
      <div className="relative grid h-9 w-32 grid-cols-3 items-center rounded-full bg-neutral-200/50 p-1 shadow-inner dark:bg-neutral-800/50">
        
        <div
          className="absolute left-1 h-7 w-[calc(33.33%-5px)] rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] dark:bg-neutral-950 dark:ring-white/10"
          style={{
            transform: `translateX(calc(${activeIndex * 100}% + ${activeIndex * 4}px))`
          }}
        />

        {THEMES.map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            aria-label={`Select ${t} theme`}
            className={`
              z-10 flex h-full items-center justify-center rounded-full
              transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500
              ${theme === t ? "text-neutral-900 dark:text-white" : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"}
            `}
          >
            <ThemeIcon type={t} />
          </button>
        ))}
      </div>
    </div>
  );
}

function ThemeIcon({ type }: { type: Theme }) {
  const className = "h-4 w-4 stroke-2";
  
  switch (type) {
    case "light":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
        </svg>
      );
    case "dark":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      );
    case "system":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      );
  }
}