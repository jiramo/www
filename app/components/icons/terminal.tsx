import { forwardRef } from "react";
import { IconProps } from "../../types/icon";

export const Terminal = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, ...props }, ref) => (
    <svg ref={ref} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  )
);

Terminal.displayName = "Terminal";