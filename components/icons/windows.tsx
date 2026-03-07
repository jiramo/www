import { forwardRef } from "react";
import { IconProps } from "../../types/icon";

export const Windows = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      fill="currentColor"
      stroke="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 640"
      {...props}
    >
      <path d="M96 157.7L279.6 132.4L279.6 309.8L96 309.8L96 157.7zM96 482.3L279.6 507.6L279.6 332.4L96 332.4L96 482.3zM299.8 510.3L544 544L544 332.4L299.8 332.4L299.8 510.3zM299.8 129.7L299.8 309.8L544 309.8L544 96L299.8 129.7z" />
    </svg>
  )
);

Windows.displayName = "Windows";