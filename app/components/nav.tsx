"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import Button from "./button";

const NAV_CONFIG = [
  {
    label: "Product",
    href: "/product",
    menuWidth: "520px",
    subMenu: [
      { title: "Integrations", desc: "Connect tools", icon: "plug", href: "/integrations" },
      { title: "Analytics", desc: "Data insights", icon: "chart", href: "/analytics" },
      { title: "Security", desc: "Firewall protection", icon: "shield", href: "/security" },
      { title: "API SDK", desc: "Developer tools", icon: "code", href: "/api" },
    ]
  },
  { label: "Download", href: "/download" },
  { label: "Pricing", href: "/pricing" },
  {
  label: "About",
  href: "/about",
  menuWidth: "520px",
  subMenu: [
    { title: "Team", desc: "Who build your software", icon: "team", href: "/team" },
    { title: "Brand", icon: "brand", href: "/brand" },
  ]
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

  const activeItemConfig = useMemo(() => 
    NAV_CONFIG.find(item => item.label === activeMenu), 
  [activeMenu]);

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

  const glassPanelClass = `
    bg-[#0A0A0A]/90 backdrop-blur-2xl saturate-150
    border border-white/10 ring-1 ring-black/50
    shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),0_0_20px_rgba(0,0,0,0.2)]
  `;

  const currentWidth = isSearchOpen 
    ? "56px" 
    : isMenuOpen 
        ? activeItemConfig?.menuWidth || "520px" 
        : `${navBaseWidth}px`;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-end gap-3 isolate font-sans antialiased">
      
      <nav 
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => { if (timeoutRef.current && !isSearchOpen) clearTimeout(timeoutRef.current); }}
        style={{
            height: isMenuOpen ? `${menuHeight + 56 + 16}px` : "56px",
            width: currentWidth,
        }}
        className={`
          relative flex flex-col-reverse overflow-hidden
          transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-bottom will-change-[width,height] rounded-2xl
          ${glassPanelClass}
        `}
      >
        
        <div className="relative z-20 flex items-center h-14 w-full shrink-0 pr-2">
             
             <Link
                href="/"
                onClick={() => { setIsSearchOpen(false); setActiveMenu(null); }}
                className="group w-14 h-14 shrink-0 flex items-center justify-center transition-all z-10"
             >
                <div className="relative h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
                    <div className="relative h-5 w-5 opacity-80 group-hover:opacity-100">
                        <Image src="/logo.svg" fill alt="Logo" className="object-contain" />
                    </div>
                </div>
             </Link>

             <div className={`
                flex items-center flex-1 h-full w-full
                transition-all duration-300 ease-out
                ${isSearchOpen ? "opacity-0 -translate-x-4 pointer-events-none delay-0" : "opacity-100 translate-x-0 delay-100"}
             `}>
                 
                 <div ref={navLinksRef} className="flex items-center gap-1 pl-1">
                     {NAV_CONFIG.map((item) => {
                        const isActive = item.href === pathname;
                        const isTrigger = activeMenu === item.label;
                        
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onMouseEnter={() => item.subMenu && handleMouseEnter(item.label)}
                                className={`
                                    relative px-3.5 py-1.5 text-[13px] font-medium transition-all duration-300 rounded-full tracking-wide whitespace-nowrap
                                    ${isActive || isTrigger 
                                        ? "text-white bg-white/10 shadow-[inset_0_-2px_0_0_rgba(255,255,255,0.1)]" 
                                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                                    }
                                `}
                            >
                                {item.label}
                            </Link>
                        )
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
                <div key={activeMenu} className="animate-in fade-in slide-in-from-bottom-3 duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
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
                                    <IconByName name={item.icon} />
                                </div>
                                <div className="pt-px">
                                    <span className="block text-[13px] font-medium text-neutral-200 group-hover:text-white transition-colors">{item.title}</span>
                                    <span className="block text-[11px] text-neutral-500 group-hover:text-neutral-400 transition-colors leading-tight mt-0.5">{item.desc}</span>
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

      <div 
        onClick={() => !isSearchOpen && setIsSearchOpen(true)}
        style={{ width: isSearchOpen ? "320px" : "56px" }}
        className={`
            relative flex items-center shrink-0
            h-14 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] rounded-2xl
            ${glassPanelClass}
            ${isSearchOpen ? "cursor-text pl-2 pr-2" : "hover:bg-white/5 cursor-pointer justify-center"}
        `}
      >
          <div className={`
             flex items-center justify-center shrink-0 text-neutral-400 transition-colors
             ${isSearchOpen ? "w-10 h-10 text-white" : "w-full h-full hover:text-white"}
          `}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>

          <div className={`
             flex flex-1 items-center overflow-hidden transition-all duration-500 ease-out
             ${isSearchOpen ? "opacity-100 w-full ml-1" : "opacity-0 w-0 ml-0"}
          `}>
             <input 
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent text-[14px] text-white placeholder-neutral-500 focus:outline-none font-medium h-full pb-px"
                onClick={(e) => e.stopPropagation()} 
             />
          </div>

          <div className={`
             flex items-center gap-2 shrink-0 overflow-hidden transition-all duration-300
             ${isSearchOpen ? "w-auto opacity-100 mr-1" : "w-0 opacity-0"}
          `}>
            <span className="hidden sm:inline-flex items-center border border-white/10 rounded px-1.5 py-0.5 text-[10px] text-neutral-500 font-mono bg-white/5">ESC</span>
            <button 
                onClick={(e) => { e.stopPropagation(); setIsSearchOpen(false); }}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
      </div>
    </div>
  );
}

const IconByName = ({ name }: { name: string }) => {
    const p = { width: "16", height: "16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    const icons: Record<string, React.JSX.Element> = {
        plug: <svg viewBox="0 0 24 24" {...p}><path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/></svg>,
        chart: <svg viewBox="0 0 24 24" {...p}><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
        shield: <svg viewBox="0 0 24 24" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
        code: <svg viewBox="0 0 24 24" {...p}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
        rocket: <svg viewBox="0 0 24 24" {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
        building: <svg viewBox="0 0 24 24" {...p}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>,
        team: <svg viewBox="0 0 24 24" {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
        brand: <svg viewBox="0 0 24 24" {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" style={{display:'none'}}/><path d="M12 2l-9 19h18L12 2z" style={{display:'none'}}/><path d="M8.3 10a.7.7 0 0 1-.626-1.079l1.7-2.798a.7.7 0 0 1 1.252 0l1.7 2.798A.7.7 0 0 1 11.7 10Z"/><rect x="14" y="14" width="7" height="7" rx="1"/><circle cx="6" cy="18" r="3"/></svg>,
        about: <svg viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
    };
    return icons[name] || null;
}