"use client";

import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TwitterIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TwitterIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const TwitterIcon = forwardRef<TwitterIconHandle, TwitterIconProps>(
  ({ className, size = 28, ...props }, ref) => {
    return (
      <div className={cn(className)} {...props}>
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          fill="currentColor"
        >
          <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
        </svg>
      </div>
    );
  }
);

TwitterIcon.displayName = "TwitterIcon";

export { TwitterIcon };
