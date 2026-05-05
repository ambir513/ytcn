"use client";

import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { formatTime } from "./format";
import type { PlayerState, PlaybackSpeed } from "./types";
import { YtcnProgress } from "./ytcn-progress";
import { YtcnVolume } from "./ytcn-volume";
import { YtcnSpeed } from "./ytcn-speed";
import { YtcnFullscreen } from "./ytcn-fullscreen";

export interface YtcnControlsProps {
  state: PlayerState;
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  onSpeedChange: (rate: PlaybackSpeed) => void;
  onToggleFullscreen: () => void;
  visible: boolean;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  onSettingsOpenChange?: (open: boolean) => void;
  onInteraction?: () => void;
}

export function YtcnControls({
  state,
  onTogglePlay,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onSpeedChange,
  onToggleFullscreen,
  visible,
  containerRef,
  onSettingsOpenChange,
  onInteraction,
}: YtcnControlsProps): React.JSX.Element {
  return (
    <div
      onMouseEnter={onInteraction}
      onMouseMove={onInteraction}
      className={cn(
        "absolute inset-x-0 bottom-0 z-30 flex flex-col transition-opacity duration-300",
        state.isFullscreen
          ? visible ? "opacity-100" : "opacity-0 pointer-events-none"
          : "opacity-0 group-hover:opacity-100"
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative z-10 px-3">
        <YtcnProgress
          currentTime={state.currentTime}
          duration={state.duration}
          loadedFraction={state.loadedFraction}
          onSeek={onSeek}
        />
      </div>
      <div className="relative z-10 flex items-center gap-1 px-3 pb-2.5 pt-1.5">
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onTogglePlay(); }}
            className="flex items-center justify-center rounded-sm p-1.5 text-white transition-all duration-150 hover:bg-white/10 active:scale-95"
            aria-label={state.isPlaying ? "Pause" : "Play"}
          >
            {state.isPlaying ? (
              <IconPlayerPauseFilled className="size-5" />
            ) : (
              <IconPlayerPlayFilled className="size-5" />
            )}
          </button>
          <YtcnVolume
            volume={state.volume}
            isMuted={state.isMuted}
            onVolumeChange={onVolumeChange}
            onToggleMute={onToggleMute}
          />
          <span className="ml-1.5 select-none text-xs tabular-nums text-white/80 font-mono">
            {formatTime(state.currentTime)}
            <span className="text-white/50 mx-1">/</span>
            <span className="text-white/70">{formatTime(state.duration)}</span>
          </span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-0.5">
          <YtcnSpeed
            playbackRate={state.playbackRate}
            onSpeedChange={onSpeedChange}
            containerRef={containerRef}
            onOpenChange={onSettingsOpenChange}
          />
          <YtcnFullscreen
            isFullscreen={state.isFullscreen}
            onToggle={onToggleFullscreen}
          />
        </div>
      </div>
    </div>
  );
}
