"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import Button from "./button";
import { Icon } from "./Icon";
import NavSearch from "./navSearch";
import { Logo } from "./icons/logo";

const NAV_CONFIG = [
  { label: "Download", href: "/download" },
  { label: "Blog", href: "/blog" },
  {
    label: "About",
    href: "/about",
    menuWidth: "520px",
    subMenu: [
      {
        title: "Team",
        desc: "Who build your software",
        icon: "team",
        href: "/team",
      },
      { title: "Brand", icon: "brand", href: "/brand" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(
    null,
  );
  const [navBaseWidth, setNavBaseWidth] = useState(500);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const navButtonRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeItemConfig = useMemo(
    () => NAV_CONFIG.find((item) => item.label === activeMenu),
    [activeMenu],
  );

  const hasSubMenu = !!activeItemConfig?.subMenu;
  const isMenuOpen = hasSubMenu && !isSearchOpen;

  useEffect(() => {
    if (navLinksRef.current && navButtonRef.current) {
      const linksWidth = navLinksRef.current.offsetWidth;
      const btnWidth = navButtonRef.current.offsetWidth;
      const totalWidth = 56 + linksWidth + btnWidth + 20 + 32;
      setNavBaseWidth(totalWidth);
    }
  }, []);

  useEffect(() => {
    if (isSearchOpen) setTimeout(() => searchInputRef.current?.focus(), 150);
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setActiveMenu(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseEnter = (menuLabel: string) => {
    if (isSearchOpen) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuLabel);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const handleMobileMenuToggle = (
    label: string,
    hasSub: boolean,
    e: React.MouseEvent,
  ) => {
    if (hasSub) {
      e.preventDefault();
      setExpandedMobileMenu(expandedMobileMenu === label ? null : label);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const currentWidth = isSearchOpen
    ? "56px"
    : isMenuOpen
      ? activeItemConfig?.menuWidth || "520px"
      : `${navBaseWidth}px`;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-end gap-2 sm:gap-3 isolate font-sans antialiased justify-center">
      <nav
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => {
          if (timeoutRef.current && !isSearchOpen)
            clearTimeout(timeoutRef.current);
        }}
        style={{ width: currentWidth }}
        className={`
          relative flex flex-col-reverse overflow-hidden
          transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-bottom will-change-[width,height] rounded-2xl
          glass border border-black/10 dark:border-white/10
          ${isMobileMenuOpen ? "max-sm:w-70!" : "max-sm:w-14!"}
        `}
      >
        <div className="relative z-20 flex items-center h-14 w-full shrink-0 sm:pr-2">
          <Link
            href="/"
            onClick={(e) => {
              if (window.innerWidth < 640) {
                e.preventDefault();
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsSearchOpen(false);
                setExpandedMobileMenu(null);
              } else {
                setIsSearchOpen(false);
                setActiveMenu(null);
              }
            }}
            className="group w-14 h-14 shrink-0 flex items-center justify-center transition-transform duration-300 active:scale-95 z-10"
          >
            <div
              className={`
              relative h-10 w-10 flex items-center justify-center rounded-full transition-all duration-300
              ${
                isMobileMenuOpen
                  ? "bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10"
                  : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/5"
              }
            `}
            >
              <div
                className={`
                relative h-5 w-5 transition-all duration-500 flex items-center justify-center
                ${isMobileMenuOpen ? "scale-90 rotate-90" : "opacity-80 group-hover:opacity-100 scale-100 rotate-0"}
              `}
              >
                <Logo className="text-neutral-950 dark:text-white" />
              </div>
            </div>
          </Link>

          <div
            className={`
              hidden sm:flex items-center flex-1 h-full w-full
              transition-all duration-300 ease-out
              ${isSearchOpen ? "opacity-0 -translate-x-4 pointer-events-none delay-0" : "opacity-100 translate-x-0 delay-100"}
            `}
          >
            <div ref={navLinksRef} className="flex items-center gap-1 pl-1">
              {NAV_CONFIG.map((item) => {
                const isActive = item.href === pathname;
                const isTrigger = activeMenu === item.label;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onMouseEnter={() =>
                      item.subMenu && handleMouseEnter(item.label)
                    }
                    className={`
                      relative px-3.5 py-1.5 text-[13px] font-medium transition-all duration-300 rounded-full tracking-wide whitespace-nowrap
                      ${
                        isActive || isTrigger
                          ? "text-neutral-900 dark:text-white bg-black/5 dark:bg-white/10 shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.1)] dark:shadow-[inset_0_-2px_0_0_rgba(255,255,255,0.1)]"
                          : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div ref={navButtonRef} className="shrink-0 ml-auto pl-2">
              <Button
                variant="primary"
                href="https://github.com/jiramo/jiramo"
                size="sm"
                className="rounded-full h-9! text-[11px]! uppercase tracking-wider font-bold px-5 whitespace-nowrap"
              >
                Code
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`
            w-full grid transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
            ${isMenuOpen || isMobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"}
          `}
        >
          <div className="overflow-hidden">
            <div className="pt-2 pb-4 px-3 sm:px-2" ref={contentRef}>
              <div
                className={`sm:hidden flex flex-col gap-1 transition-all duration-500 delay-75 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                <div className="px-2 mb-2 flex items-center gap-3">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                    Navigation
                  </span>
                  <div className="h-px flex-1 bg-linear-to-r from-black/10 dark:from-white/10 to-transparent"></div>
                </div>

                {NAV_CONFIG.map((item) => {
                  const hasSub = !!item.subMenu;
                  const isExpanded = expandedMobileMenu === item.label;

                  return (
                    <div key={item.label} className="flex flex-col">
                      <Link
                        href={item.href}
                        onClick={(e) =>
                          handleMobileMenuToggle(item.label, hasSub, e)
                        }
                        className={`
                          flex items-center justify-between px-4 py-3 rounded-xl transition-colors duration-200 active:bg-black/10 dark:active:bg-white/10
                          ${
                            item.href === pathname && !hasSub
                              ? "bg-black/5 dark:bg-white/10 text-neutral-900 dark:text-white"
                              : "text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-neutral-900 dark:hover:text-white"
                          }
                        `}
                      >
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                        {hasSub && (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        )}
                      </Link>

                      {hasSub && (
                        <div
                          className={`grid transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0 mt-0"}`}
                        >
                          <div className="overflow-hidden flex flex-col gap-1 px-2">
                            {item.subMenu?.map((sub) => (
                              <Link
                                key={sub.title}
                                href={sub.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors active:bg-black/10 dark:active:bg-white/10"
                              >
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-black/5 dark:bg-[#151515] text-neutral-500 dark:text-neutral-400">
                                  <Icon name={sub.icon} size={14} />
                                </div>
                                <span className="text-[13px] font-medium text-neutral-700 dark:text-neutral-300">
                                  {sub.title}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="mt-3 px-1">
                  <Button
                    variant="primary"
                    href="https://github.com/jiramo/jiramo"
                    className="w-full rounded-xl py-4 text-[11px] uppercase tracking-wider font-bold shadow-md active:scale-[0.98] transition-transform"
                  >
                    Code
                  </Button>
                </div>
              </div>

              <div className="hidden sm:block">
                {isMenuOpen && activeMenu && (
                  <div
                    key={activeMenu}
                    className="animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out"
                  >
                    <div className="px-3 mb-3 flex justify-between items-end">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                        {activeMenu} Suite
                      </span>
                      <div className="h-px flex-1 ml-4 bg-linear-to-r from-transparent via-black/10 dark:via-white/10 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {activeItemConfig?.subMenu?.map((item, idx) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          style={{ animationDelay: `${idx * 30}ms` }}
                          className="group relative flex items-start gap-3 rounded-xl p-3 hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-black/5 dark:hover:border-white/5 transition-all duration-200 animate-in fade-in fill-mode-backwards"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-[#151515] border border-black/5 dark:border-white/5 group-hover:border-black/20 dark:group-hover:border-white/20 group-hover:scale-105 transition-all duration-300 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white shadow-sm">
                            <Icon name={item.icon} />
                          </div>
                          <div className="pt-px">
                            <span className="block text-[13px] font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                              {item.title}
                            </span>
                            <span className="block text-[11px] text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-400 transition-colors leading-tight mt-0.5">
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <NavSearch isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
    </div>
  );
}
