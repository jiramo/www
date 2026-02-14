"use client";

import style from "../styles/button.module.css";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ButtonHTMLAttributes,
  ReactNode,
  AnchorHTMLAttributes,
  useEffect,
} from "react";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";
type IconPosition = "left" | "right";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: IconPosition;
  shortcut?: string;
  loading?: boolean;
  disabled?: boolean;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type LinkButtonProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type Props = ButtonProps | LinkButtonProps;

// parses a keyboard shortcut string like "Ctrl+S" into an object
function parseShortcut(shortcut: string) {
  const parts = shortcut
    .toLowerCase()
    .split("+")
    .map((p) => p.trim());
  return {
    ctrl: parts.includes("ctrl"),
    shift: parts.includes("shift"),
    meta: parts.includes("cmd") || parts.includes("⌘"),
    key: parts.find((p) => !["ctrl", "shift", "cmd", "⌘"].includes(p)),
  };
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.isContentEditable
  );
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  leftIcon,
  rightIcon,
  shortcut,
  onClick,
  href,
  loading = false,
  disabled = false,
  ...props
}: Props) {
  const router = useRouter();

  const baseVariantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-orange-500 text-black border border-orange-500 hover:bg-black hover:text-white hover:border-white/20",
    secondary:
      "bg-white text-black border border-white hover:bg-black hover:text-white hover:border-white",
    outline:
      "bg-[#1f1d1c] text-white border border-[#1f1d1c] hover:bg-white hover:text-black hover:border-black",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-3 h-6.25 text-sm gap-1.5",
    md: "px-4 h-7.75 text-md gap-2",
    lg: "px-6 h-9.25 text-lg gap-2.5",
  };

  const patternStyleMap: Record<ButtonVariant, string> = {
    primary: style.whiteStripes,
    secondary: style.whiteStripes,
    outline: style.blackStripes,
  };

  // shortcut
  useEffect(() => {
    if (!shortcut) return;
    if (!onClick && !href) return;
    if (disabled || loading) return;

    const parsed = parseShortcut(shortcut);

    const handler = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;

      if (
        e.ctrlKey !== parsed.ctrl ||
        e.shiftKey !== parsed.shift ||
        e.metaKey !== parsed.meta
      ) {
        return;
      }

      if (!parsed.key || e.key.toLowerCase() !== parsed.key.toLowerCase())
        return;

      e.preventDefault();

      if (onClick) {
        onClick(e as unknown as any);
      } else if (href) {
        router.push(href);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcut, onClick, href, router, disabled, loading]);

  const content = (
    <>
      {leftIcon && !loading && (
        <span className="flex items-center">{leftIcon}</span>
      )}

      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <span className="animate-spin border-2 border-current border-t-transparent rounded-full w-4 h-4" />
        ) : (
          children
        )}

        {shortcut && !loading && (
          <kbd className="ml-2 rounded bg-black/10 px-1.5 py-0.5 text-xs font-mono opacity-70">
            {shortcut}
          </kbd>
        )}
      </span>

      {rightIcon && !loading && (
        <span className="flex items-center">{rightIcon}</span>
      )}

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-15">
        <div
          className={clsx(
            style.patternLayer,
            style.animate,
            patternStyleMap[variant],
          )}
        />
      </div>
    </>
  );

  const sharedClassName = clsx(
    "group relative shadow-[inset_0_-3px_0_0_rgba(0,0,0,0.2)] overflow-hidden cursor-pointer rounded-md transition-colors duration-300 inline-flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50",
    baseVariantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={sharedClassName}
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          if (disabled || loading) {
            e.preventDefault();
            return;
          }
          e.preventDefault();
          router.push(href);
        }}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={sharedClassName}
      disabled={disabled || loading}
      onClick={
        disabled || loading
          ? undefined
          : (onClick as React.MouseEventHandler<HTMLButtonElement>)
      }
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
