"use client";

import { IconSettings } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { PlaybackSpeed } from "./types";
import { PLAYBACK_SPEEDS } from "./types";

export interface YtcnSpeedProps {
  playbackRate: number;
  onSpeedChange: (rate: PlaybackSpeed) => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  onOpenChange?: (open: boolean) => void;
}

export function YtcnSpeed({
  playbackRate,
  onSpeedChange,
  containerRef,
  onOpenChange,
}: YtcnSpeedProps): React.JSX.Element {
  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-0.5 rounded-sm px-1.5 py-1 text-xs font-medium text-white transition-colors hover:bg-white/10"
          aria-label="Playback speed"
          onClick={(e) => e.stopPropagation()}
        >
          <IconSettings className="size-4" />
          <span>{playbackRate}x</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        className="w-auto border-border/50 bg-card/95 p-1 backdrop-blur-md"
        container={containerRef?.current ?? undefined}
      >
        <div className="flex flex-col gap-0.5">
          <p className="px-2 py-1 text-xs text-muted-foreground">Speed</p>
          {PLAYBACK_SPEEDS.map((speed) => (
            <button
              key={speed}
              onClick={() => onSpeedChange(speed)}
              className={cn(
                "rounded-sm px-3 py-1.5 text-left text-sm transition-colors hover:bg-accent",
                playbackRate === speed
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-foreground"
              )}
            >
              {speed}x
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
