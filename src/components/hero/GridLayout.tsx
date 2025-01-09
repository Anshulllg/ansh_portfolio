"use client";

import { cn } from "@/lib/utils";
import GridPattern from "@/components/ui/grid-pattern";

export function GridPatternLinearGradient() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
      <GridPattern
        width={80}
        height={80}
        x={-1}
        y={-1}
        className={cn(
          // "[mask-image:linear-gradient(to_top,#CE0000,#CE0000,transparent)]"
          "opacity-40"
        )}
      />
    </div>
  );
}


