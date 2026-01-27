"use client";

import Background from "@/app/components/background";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full font-sans text-neutral-200 selection:bg-orange-500/20 selection:text-orange-500 overflow-x-hidden">
      <Background />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none"></div>
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-250 h-150 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-3">
            <div className="sticky top-32">
              <nav className="flex flex-row lg:flex-col gap-2 relative">
                <SidebarLink href="/about" label="About" />
                <SidebarLink href="/team" label="Team" />
                <SidebarLink href="/brand" label="Brand" />
              </nav>
            </div>
          </div>

          <div className="lg:col-span-9 min-h-150">
            <div className="animate-[fadeIn_0.7s_ease-out_forwards]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
                group relative flex items-center justify-between px-5 py-3.5 rounded-xl
                transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                overflow-hidden
                ${
                  isActive
                    ? "bg-white/3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                    : "hover:bg-white/2"
                }
            `}
    >
      <span
        className={`
                absolute left-0 top-1/2 -translate-y-1/2 w-0.75 rounded-r-full bg-orange-500
                shadow-[0_0_12px_rgba(249,115,22,0.8)]
                transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${isActive ? "h-5 opacity-100" : "h-0 opacity-0"}
            `}
      ></span>

      <span
        className={`
                relative z-10 text-sm font-medium tracking-wide transition-all duration-300
                ${isActive ? "text-white translate-x-2" : "text-neutral-500 group-hover:text-neutral-300 group-hover:translate-x-1"}
            `}
      >
        {label}
      </span>

      <span
        className={`
                text-[10px] text-orange-500 font-bold hidden lg:block
                transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${
                  isActive
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4 group-hover:opacity-50 group-hover:-translate-x-1"
                }
            `}
      >
        0{href === "/about" ? "1" : href === "/team" ? "2" : "3"}
      </span>

      <span className="absolute inset-0 bg-linear-to-b from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></span>
    </Link>
  );
}
