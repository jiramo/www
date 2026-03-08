"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import Button from "./button";
import { Icon } from "./Icon";
import NavSearch from "./navSearch";

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

  const [menuHeight, setMenuHeight] = useState(0);
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
  }, [NAV_CONFIG]);

  useEffect(() => {
    if (isMenuOpen && contentRef.current) {
      setMenuHeight(contentRef.current.scrollHeight);
    } else {
      setMenuHeight(0);
    }
  }, [activeMenu, isMenuOpen]);

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

  const currentWidth = isSearchOpen
    ? "56px"
    : isMenuOpen
      ? activeItemConfig?.menuWidth || "520px"
      : `${navBaseWidth}px`;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-end gap-3 isolate font-sans antialiased">
      <nav
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => {
          if (timeoutRef.current && !isSearchOpen)
            clearTimeout(timeoutRef.current);
        }}
        style={{
          height: isMenuOpen ? `${menuHeight + 56 + 16}px` : "56px",
          width: currentWidth,
        }}
        className={`
          relative flex flex-col-reverse overflow-hidden
          transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-bottom will-change-[width,height] rounded-2xl
          glass
        `}
      >
        <div className="relative z-20 flex items-center h-14 w-full shrink-0 pr-2">
          <Link
            href="/"
            onClick={() => {
              setIsSearchOpen(false);
              setActiveMenu(null);
            }}
            className="group w-14 h-14 shrink-0 flex items-center justify-center transition-all z-10"
          >
            <div className="relative h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
              <div className="relative h-5 w-5 opacity-80 group-hover:opacity-100">
                <Image
                  src="/logo.svg"
                  fill
                  alt="Logo"
                  className="object-contain"
                />
              </div>
            </div>
          </Link>

          <div
            className={`
                flex items-center flex-1 h-full w-full
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
                                        ? "text-white bg-white/10 shadow-[inset_0_-2px_0_0_rgba(255,255,255,0.1)]"
                                        : "text-neutral-400 hover:text-white hover:bg-white/5"
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
                size="sm"
                className="rounded-full h-9! text-[11px]! uppercase tracking-wider font-bold px-5 whitespace-nowrap"
              >
                Access
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`
                w-full relative px-2 transition-opacity duration-300
                ${isMenuOpen ? "opacity-100 delay-100" : "opacity-0 delay-0 pointer-events-none"}
            `}
        >
          <div ref={contentRef} className="pt-4 pb-2">
            <div
              key={activeMenu}
              className="animate-in fade-in slide-in-from-bottom-3 duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              <div className="px-3 mb-3 flex justify-between items-end">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  {activeMenu} Suite
                </span>
                <div className="h-px flex-1 ml-4 bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {activeItemConfig?.subMenu?.map((item, idx) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    style={{ animationDelay: `${idx * 40}ms` }}
                    className="group relative flex items-start gap-3 rounded-xl p-3 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-200 animate-in fade-in fill-mode-backwards"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#151515] border border-white/5 group-hover:border-white/20 group-hover:scale-105 transition-all duration-300 text-neutral-400 group-hover:text-white shadow-sm">
                      <Icon name={item.icon} />
                    </div>
                    <div className="pt-px">
                      <span className="block text-[13px] font-medium text-neutral-200 group-hover:text-white transition-colors">
                        {item.title}
                      </span>
                      <span className="block text-[11px] text-neutral-500 group-hover:text-neutral-400 transition-colors leading-tight mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-2 w-full px-2">
              <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </nav>

      <NavSearch  isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
    </div>
  );
}
