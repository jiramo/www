"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "./button";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:top-6 z-100 max-w-md animate-in slide-in-from-top-4 fade-in duration-700 ease-out fill-mode-forwards">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010]/80 p-5 shadow-2xl backdrop-blur-xl ring-1 ring-black/5">
        
        <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>

        <div className="flex flex-col gap-4 relative z-10">
          
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 256 256"
                fill="currentColor"
              >
                <path d="M164.49,163.51a12,12,0,1,1-17,0A12,12,0,0,1,164.49,163.51Zm-81-8a12,12,0,1,0,17,0A12,12,0,0,0,83.51,155.51Zm9-39a12,12,0,1,0-17,0A12,12,0,0,0,92.49,116.49Zm48-1a12,12,0,1,0,0,17A12,12,0,0,0,140.49,115.51ZM232,128A104,104,0,1,1,128,24a8,8,0,0,1,8,8,40,40,0,0,0,40,40,8,8,0,0,1,8,8,40,40,0,0,0,40,40A8,8,0,0,1,232,128Zm-16.31,7.39A56.13,56.13,0,0,1,168.5,87.5a56.13,56.13,0,0,1-47.89-47.19,88,88,0,1,0,95.08,95.08Z"></path>
              </svg>
            </div>
            
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white mb-1">
                We use cookies
              </h3>
              <p className="text-xs leading-relaxed text-neutral-400">
                We use cookies to improve your experience. By using our site, you agree to our use of cookies. See our{" "}
                <Link 
                  href="/privacy" 
                  className="text-neutral-200 hover:text-white underline underline-offset-2 transition-colors"
                >
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end mt-1">
            <div onClick={() => setIsVisible(false)} className="w-full sm:w-auto">
                <Button variant="outline" size="sm" className="w-full sm:w-auto justify-center text-xs h-9">
                    Decline
                </Button>
            </div>
            <div onClick={() => setIsVisible(false)} className="w-full sm:w-auto">
                <Button variant="secondary" size="md" className="w-full sm:w-auto justify-center text-xs h-9">
                    Accept All
                </Button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}