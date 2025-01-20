"use client";

import { cn } from "@/lib/utils";
import GridPattern from "@/components/ui/grid-pattern";
import Noise from "../ui/Noise";

export function GridPatternLinearGradient() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden ">
      <div >
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={10}
        />
      </div>
      <GridPattern
        width={80}
        height={80}
        x={-1}
        y={-1}
        className={cn(
          "opacity-40"
        )}
      />
    </div>
  );
}


