"use client";

import React from "react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

type BadgeVariant =
  | "default"
  | "brand"
  | "success"
  | "warning"
  | "error"
  | "purple";
type BadgeSize = "sm" | "md";

interface AnnouncementBadgeProps {
  children: React.ReactNode;
  href?: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  showDot?: boolean;
  showArrow?: boolean;
  badgeText?: string;
}

const VARIANTS: Record<
  BadgeVariant,
  {
    container: string;
    dot: string;
    badgePill: string;
    separator: string;
  }
> = {
  default: {
    container:
      "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700",
    dot: "bg-neutral-500",
    badgePill:
      "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700",
    separator: "bg-neutral-200 dark:bg-neutral-700",
  },
  brand: {
    container:
      "border-orange-200/50 dark:border-orange-900/50 bg-orange-50/50 dark:bg-orange-950/20 text-orange-900 dark:text-orange-100 hover:border-orange-300 dark:hover:border-orange-800/80 hover:bg-orange-100/50 dark:hover:bg-orange-900/30",
    dot: "bg-orange-500",
    badgePill:
      "bg-orange-100 dark:bg-orange-900/60 text-orange-700 dark:text-orange-200 border-orange-200 dark:border-orange-800",
    separator: "bg-orange-200 dark:bg-orange-800",
  },
  success: {
    container:
      "border-emerald-200/50 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-100 hover:border-emerald-300 dark:hover:border-emerald-800/80 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30",
    dot: "bg-emerald-500",
    badgePill:
      "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800",
    separator: "bg-emerald-200 dark:bg-emerald-800",
  },
  warning: {
    container:
      "border-amber-200/50 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-100 hover:border-amber-300 dark:hover:border-amber-800/80 hover:bg-amber-100/50 dark:hover:bg-amber-900/30",
    dot: "bg-amber-500",
    badgePill:
      "bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-200 border-amber-200 dark:border-amber-800",
    separator: "bg-amber-200 dark:bg-amber-800",
  },
  error: {
    container:
      "border-red-200/50 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 text-red-900 dark:text-red-100 hover:border-red-300 dark:hover:border-red-800/80 hover:bg-red-100/50 dark:hover:bg-red-900/30",
    dot: "bg-red-500",
    badgePill:
      "bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-200 border-red-200 dark:border-red-800",
    separator: "bg-red-200 dark:bg-red-800",
  },
  purple: {
    container:
      "border-purple-200/50 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-950/20 text-purple-900 dark:text-purple-100 hover:border-purple-300 dark:hover:border-purple-800/80 hover:bg-purple-100/50 dark:hover:bg-purple-900/30",
    dot: "bg-purple-500",
    badgePill:
      "bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-200 border-purple-200 dark:border-purple-800",
    separator: "bg-purple-200 dark:bg-purple-800",
  },
};

export function AnnouncementBadge({
  children,
  href,
  variant = "brand",
  size = "md",
  showDot = true,
  showArrow = true,
  badgeText,
  className,
}: AnnouncementBadgeProps) {
  const styles = VARIANTS[variant];
  const isLink = Boolean(href);
  const Component = (isLink ? Link : "div") as React.ElementType;
  const props = isLink ? { href: href as string } : {};

  return (
    <Component
      {...props}
      className={cn(
        "group relative inline-flex items-center rounded-full border px-1 py-1 transition-all duration-300 ease-out",
        "backdrop-blur-md cursor-pointer select-none",

        "shadow-sm hover:shadow-md",
        "ring-1 ring-inset ring-white/20 dark:ring-white/5",

        styles.container,

        size === "sm" ? "h-7 text-xs pr-2" : "h-8 text-[13px] pr-3",

        className,
      )}
    >
      <div className="flex items-center gap-1.5 px-1.5">
        {showDot && !badgeText && (
          <span className="relative flex h-2 w-2 shrink-0">
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                styles.dot,
              )}
            ></span>
            <span
              className={cn(
                "relative inline-flex rounded-full h-2 w-2",
                styles.dot,
              )}
            ></span>
          </span>
        )}

        {badgeText && (
          <span
            className={cn(
              "flex items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border shadow-sm",
              styles.badgePill,
            )}
          >
            {badgeText}
          </span>
        )}
      </div>

      {(showDot || badgeText) && (
        <div className={cn("h-3 w-px mx-1 opacity-60", styles.separator)} />
      )}

      <span
        className={cn(
          "font-medium tracking-tight truncate pl-1",
          !showArrow && "pr-1",
        )}
      >
        {children}
      </span>

      {showArrow && (
        <svg
          className="ml-1 w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </Component>
  );
}
