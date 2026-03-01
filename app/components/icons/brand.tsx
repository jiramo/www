import { IconProps } from "@/app/types/icon";
import { forwardRef } from "react";

export const Brand = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8.3 10a.7.7 0 0 1-.626-1.079l1.7-2.798a.7.7 0 0 1 1.252 0l1.7 2.798A.7.7 0 0 1 11.7 10Z" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <circle cx="6" cy="18" r="3" />
    </svg>
  )
);

Brand.displayName = "Brand";