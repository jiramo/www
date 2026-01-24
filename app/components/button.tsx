import style from "../styles/button.module.css";
import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  const baseVariantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-orange-500 text-black border border-orange-500 hover:bg-black hover:text-white hover:border-white/20",
    secondary:
      "bg-white text-black border border-white hover:bg-black hover:text-white hover:border-white",
    outline:
      "bg-[#1f1d1c] text-white border border-[#1f1d1c] hover:bg-white hover:text-black hover:border-black",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-3 h-6.25 text-sm",
    md: "px-4 py-1 text-md",
    lg: "px-6 py-2 text-lg",
  };

  const patternStyleMap: Record<ButtonVariant, string> = {
    primary: style.whiteStripes,
    secondary: style.whiteStripes,
    outline: style.blackStripes,
  };

  return (
    <button
      className={clsx(
        "group relative overflow-hidden cursor-pointer rounded-md transition-colors duration-300",
        baseVariantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-15">
        
        <div
          className={clsx(
            style.patternLayer,
            style.animate,
            patternStyleMap[variant]
          )}
        />
      </div>
    </button>
  );
}