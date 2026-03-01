import { IconProps } from "@/app/types/icon";
import { forwardRef } from "react";

export const Chart = forwardRef<SVGSVGElement, IconProps>(
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
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  )
);

Chart.displayName = "Chart";