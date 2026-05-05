"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import { formatTime } from "./format";
import { useTimeline } from "./use-timeline";

export interface YtcnProgressProps {
  currentTime: number;
  duration: number;
  loadedFraction: number;
  onSeek: (seconds: number) => void;
  className?: string;
}

export const YtcnProgress = memo(function YtcnProgress({
  currentTime,
  duration,
  loadedFraction,
  onSeek,
  className,
}: YtcnProgressProps): React.JSX.Element {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const buffered = loadedFraction * 100;

  const { barRef, hoverTime, hoverFraction, handlers } = useTimeline({
    duration,
    onSeek,
  });

  return (
    <div
      ref={barRef}
      className={cn(
        "group/progress relative h-1 w-full cursor-pointer transition-[height] hover:h-1.5",
        className
      )}
      onMouseDown={handlers.onMouseDown}
      onMouseMove={handlers.onMouseMove}
      onMouseLeave={handlers.onMouseLeave}
      onClick={(e) => e.stopPropagation()}
      role="slider"
      aria-valuenow={Math.floor(currentTime)}
      aria-valuemin={0}
      aria-valuemax={Math.floor(duration)}
      aria-label="Video progress"
      tabIndex={0}
    >
      <div className="absolute inset-0 rounded-full bg-white/20" />
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-white/30 transition-[width] duration-500"
        style={{ width: `${buffered}%` }}
      />
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
      <div
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 size-3 rounded-full bg-primary border-2 border-background shadow-lg opacity-0 transition-opacity group-hover/progress:opacity-100"
        style={{ left: `${progress}%` }}
      />
      {hoverTime !== null && duration > 0 && (
        <div
          className="absolute -top-8 -translate-x-1/2 rounded bg-background/90 px-1.5 py-0.5 text-xs text-foreground shadow-md pointer-events-none"
          style={{ left: `${hoverFraction * 100}%` }}
        >
          {formatTime(hoverTime)}
        </div>
      )}
    </div>
  );
});
