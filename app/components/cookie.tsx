"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "./button";
import { Cookie } from "./icons/cookie";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:top-6 z-100 max-w-md animate-in slide-in-from-top-4 fade-in duration-700 ease-out fill-mode-forwards">
      <div className="relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-[#101010]/80 p-5 shadow-2xl backdrop-blur-xl ring-1 ring-black/5">
        <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-neutral-500/10 dark:bg-white/5 blur-3xl pointer-events-none"></div>

        <div className="flex flex-col gap-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/5">
              <Cookie className="text-neutral-700 dark:fill-neutral-200" />
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">
                We use cookies
              </h3>
              <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                We use cookies to improve your experience. By using our site,
                you agree to our use of cookies. See our{" "}
                <Link
                  href="/privacy"
                  className="text-neutral-900 dark:text-neutral-200 hover:text-black dark:hover:text-white underline underline-offset-2 transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end mt-1">
            <div
              onClick={() => setIsVisible(false)}
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto justify-center text-xs h-9 border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300"
              >
                Decline
              </Button>
            </div>
            <div
              onClick={() => setIsVisible(false)}
              className="w-full sm:w-auto"
            >
              <Button
                variant="secondary"
                size="md"
                className="w-full sm:w-auto justify-center text-xs h-9 bg-neutral-900 dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
