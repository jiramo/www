type Variant = "default" | "ghost" | "primary";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonComponentProps = ButtonProps | LinkProps;

const baseStyles =
  "inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2";

const variantStyles: Record<Variant, string> = {
  default: "bg-black text-white hover:bg-black/90",
  ghost: "hover:bg-[#F3F3F3]",
  primary: "bg-[#E9A97B] text-black hover:bg-[#FB944A]",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-2.5 py-1 text-sm",
  md: "px-3.5 py-1.5 text-sm",
  lg: "px-5 py-2 text-base",
};

export function Button(props: ButtonComponentProps) {
  const {
    variant = "ghost",
    size = "md",
    className = "",
    children,
    ...rest
  } = props;

  const styles = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  ].join(" ");

  // Link
  if ("href" in props) {
    return (
      <a
        className={styles}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  // Button
  return (
    <button
      className={styles}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
