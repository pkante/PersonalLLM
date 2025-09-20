import * as React from "react";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation === "horizontal" ? "horizontal" : "vertical"}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  );
});
Separator.displayName = "Separator";

export { Separator };
