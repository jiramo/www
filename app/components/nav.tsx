"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Button from "./button";

const NAV_ITEMS = [
  { label: "Product", href: "/product", trigger: true },
  { label: "Solutions", href: "/solutions", trigger: true },
  { label: "Pricing", href: "/pricing" },
];

const PRODUCT_SUBMENU = [
  { title: "Integrations", desc: "Connect tools", icon: "plug", href: "/integrations" },
  { title: "Analytics", desc: "Data insights", icon: "chart", href: "/analytics" },
  { title: "Security", desc: "Firewall protection", icon: "shield", href: "/security" },
  { title: "API SDK", desc: "Developer tools", icon: "code", href: "/api" },
];

const SOLUTIONS_SUBMENU = [
  { title: "Startups", desc: "Growth kit", icon: "rocket", href: "/sol/startups" },
  { title: "Enterprise", desc: "Compliance", icon: "building", href: "/sol/enterprise" },
  { title: "Finance", desc: "Global payments", icon: "bank", href: "/sol/finance" },
  { title: "E-commerce", desc: "Shopify sync", icon: "cart", href: "/sol/ecom" },
  { title: "Education", desc: "LMS tools", icon: "book", href: "/sol/edu" },
  { title: "Healthcare", desc: "HIPAA ready", icon: "heart", href: "/sol/health" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeItems = activeMenu === "Product" ? PRODUCT_SUBMENU : (activeMenu === "Solutions" ? SOLUTIONS_SUBMENU : null);
  const isMenuOpen = activeItems !== null && !isSearchOpen;

  useEffect(() => {
    if (isMenuOpen && contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
    } else {
        setContentHeight(0);
    }
  }, [activeMenu, isMenuOpen]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 150);
    }
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

  const handleMouseEnter = (menu: string) => {
    if (isSearchOpen) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const glassPanelClass = `
    bg-[#0A0A0A]/90 backdrop-blur-2xl saturate-150
    border border-white/10 ring-1 ring-black/50
    shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),0_0_20px_rgba(0,0,0,0.2)]
  `;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-end gap-3 isolate font-sans antialiased">
      
      <nav 
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => {
            if (timeoutRef.current && !isSearchOpen) clearTimeout(timeoutRef.current);
        }}
        style={{
            height: isMenuOpen ? `${contentHeight + 56 + 16}px` : "56px",
            width: isSearchOpen ? "56px" : isMenuOpen ? "520px" : "420px",
        }}
        className={`
          relative flex flex-col-reverse overflow-hidden
          transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-bottom will-change-[width,height] rounded-2xl
          ${glassPanelClass}
        `}
      >
        
        <div className="relative z-20 flex items-center h-14 w-full shrink-0">
             
             <Link
                href="/"
                onClick={() => { setIsSearchOpen(false); setActiveMenu(null); }}
                className="group w-14 h-14 shrink-0 flex items-center justify-center transition-all z-10"
             >
                <div className="relative h-10 w-10 flex items-center justify-center rounded-full bg-linear-to-br from-white/10 to-white/5 hover:from-white/15 border border-white/5 shadow-inner transition-all">
                    <div className="relative h-5 w-5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <Image src="/logo.svg" fill alt="Logo" className="object-contain" />
                    </div>
                </div>
             </Link>

             <div className={`
                flex items-center flex-1 w-full pr-2 h-full
                transition-all duration-300 ease-out
                ${isSearchOpen ? "opacity-0 -translate-x-4 pointer-events-none delay-0" : "opacity-100 translate-x-0 delay-100"}
             `}>
                 <div className="flex items-center gap-1 mr-auto pl-1">
                     {NAV_ITEMS.map((item) => {
                        const isActive = item.href === pathname;
                        const isTrigger = activeMenu === item.label;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onMouseEnter={() => item.trigger && handleMouseEnter(item.label)}
                                className={`
                                    relative px-3.5 py-1.5 text-[13px] font-medium transition-all duration-300 rounded-full tracking-wide
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

                 <div className="shrink-0 ml-auto">
                    <Button 
                        variant="primary" 
                        size="sm" 
                        className="rounded-full h-9! text-[11px]! uppercase tracking-wider font-bold px-4"
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
                             {activeMenu === "Product" ? "Product Suite" : "Solutions"}
                        </span>
                        <div className="h-px w-24 bg-linear-to-r from-transparent to-white/10"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {activeItems?.map((item, idx) => (
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
    switch(name) {
        case "plug": return <svg viewBox="0 0 24 24" {...p}><path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/></svg>;
        case "chart": return <svg viewBox="0 0 24 24" {...p}><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>;
        case "shield": return <svg viewBox="0 0 24 24" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
        case "code": return <svg viewBox="0 0 24 24" {...p}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
        case "rocket": return <svg viewBox="0 0 24 24" {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>;
        case "building": return <svg viewBox="0 0 24 24" {...p}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>;
        case "bank": return <svg viewBox="0 0 24 24" {...p}><path d="M3 21h18"/><path d="M5 21v-7"/><path d="M19 21v-7"/><path d="M2 10h20"/><path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7 7 7 0 0 0-7 7H3a9 9 0 0 1 9-9z"/></svg>;
        case "cart": return <svg viewBox="0 0 24 24" {...p}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>;
        case "book": return <svg viewBox="0 0 24 24" {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
        case "heart": return <svg viewBox="0 0 24 24" {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
        default: return null;
    }
}