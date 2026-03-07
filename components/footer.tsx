"use client";

import { useState, useEffect } from "react";
import ThemeSelector from "./themeSelector";
import Link from "./link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterData {
  [category: string]: FooterLink[];
}

const footerLinks: FooterData = {
  Resources: [
    { label: "News", href: "/news" },
    { label: "Docs", href: "/docs" },
    { label: "Contact Sales", href: "/contact" },
    { label: "Open Source", href: "/open-source" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  const [isOperational, setIsOperational] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOperational(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="w-full p-4 md:p-6">
      <div className="relative mx-auto flex min-h-75 w-full max-w-7xl flex-col justify-between rounded-3xl bg-neutral-50 p-8 dark:bg-neutral-900/80 dark:ring-1 dark:ring-white/10 transition-colors duration-300">
        
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-400 dark:text-neutral-500">
              <span className="relative flex h-2.5 w-2.5">
                {!isOperational && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75 duration-1000"></span>
                )}
                <span className={`relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500`}></span>
              </span>
              FOOTER
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            {Object.entries(footerLinks).map(([section, items]) => (
              <div key={section} className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">
                  {section}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {items.map((item, id) => (
                    <li key={id}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t border-neutral-200 pt-8 dark:border-neutral-800 md:flex-row md:items-center">
          
          <div className="flex flex-col gap-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 md:flex-row md:gap-8">
            <span>© 2026 Jiramo. All rights reserved.</span>
            <Link href="https://github.com/jiramo">
              GitHub
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </footer>
  );
}