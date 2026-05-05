"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useYtcnPlayer } from "./use-ytcn-player";
import { useKeyboardShortcuts } from "./use-keyboard-shortcuts";
import { useThumbnail } from "./use-thumbnail";
import type {
  YtcnPlayerOptions,
  KeyboardBindings,
} from "./types";
import { YtcnControls } from "./ytcn-controls";
import { useIdleControls } from "./use-idle-controls";
import { IconPlayerPlayFilled, IconLoader2 } from "@tabler/icons-react";

export interface YtcnPlayerProps extends Omit<YtcnPlayerOptions, "thumbnailFailed"> {
  keyboardShortcuts?: boolean;
  keyboardBindings?: KeyboardBindings;
  className?: string;
}

export function YtcnPlayer({
  videoId,
  autoplay = false,
  defaultSpeed = 1,
  startAt = 0,
  onEnd,
  onTimeUpdate,
  onPlaybackRateChange,
  keyboardShortcuts = true,
  keyboardBindings,
  className,
}: YtcnPlayerProps): React.JSX.Element {
  const { thumbnailUrl, thumbnailLoaded, thumbnailFailed } = useThumbnail(videoId);

  const { containerRef, playerDivRef, state, controls } = useYtcnPlayer({
    videoId,
    autoplay,
    defaultSpeed,
    startAt,
    onEnd,
    onTimeUpdate,
    onPlaybackRateChange,
    thumbnailFailed,
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { controlsVisible, showControls } = useIdleControls({
    isPlaying: state.isPlaying,
    isFullscreen: state.isFullscreen,
    isSettingsOpen,
  });

  const [isHovering, setIsHovering] = useState(false);

  useKeyboardShortcuts({
    enabled: keyboardShortcuts && state.phase === "ready",
    onPlay: controls.togglePlay,
    onMute: controls.toggleMute,
    onFullscreen: controls.toggleFullscreen,
    onSeekBack: () => controls.seekRelative(-10),
    onSeekForward: () => controls.seekRelative(10),
    bindings: keyboardBindings,
  });

  const [thumbnailMounted, setThumbnailMounted] = useState(true);

  useEffect(() => {
    if (state.phase === "ready") {
      const t = setTimeout(() => setThumbnailMounted(false), 600);
      return () => clearTimeout(t);
    } else {
      setThumbnailMounted(true);
    }
  }, [state.phase]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Video player"
      className={cn(
        "relative w-full bg-black select-none overflow-hidden",
        state.isFullscreen && !controlsVisible && "cursor-none",
        state.isFullscreen
          ? "fixed inset-0 z-50"
          : "aspect-video rounded-lg group",
        className
      )}
      onMouseEnter={() => { setIsHovering(true); showControls(); }}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={() => { if (!isHovering) setIsHovering(true); showControls(); }}
    >
      {state.phase !== "thumbnail" && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div ref={playerDivRef} className="w-full h-full" />
        </div>
      )}

      {state.phase === "loading" && (
        <div className="absolute inset-0 z-10 bg-black" aria-hidden="true" />
      )}

      {thumbnailMounted && thumbnailUrl && (
        <div
          className={cn(
            "absolute inset-0 z-20 transition-opacity duration-500",
            state.phase === "ready" ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <img
            src={thumbnailUrl}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      )}

      {state.phase === "thumbnail" && !thumbnailLoaded && !thumbnailFailed && (
        <div className="absolute inset-0 z-20 bg-muted animate-pulse" />
      )}

      {state.phase === "loading" && (
        <div
          className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
          aria-label="Loading video"
        >
          <IconLoader2 className="h-10 w-10 animate-spin text-white/80" />
        </div>
      )}

      {state.phase === "thumbnail" && thumbnailLoaded && (
        <button
          onClick={controls.handleThumbnailClick}
          className="absolute inset-0 z-40 flex items-center justify-center group/play bg-transparent border-0 cursor-pointer"
          aria-label="Play video"
        >
          <div
            className={cn(
              "flex items-center justify-center",
              "h-16 w-16 rounded-full",
              "bg-black/60 text-white",
              "transition-transform duration-200",
              "group-hover/play:scale-110"
            )}
          >
            <IconPlayerPlayFilled className="h-8 w-8 translate-x-0.5" fill="currentColor" />
          </div>
        </button>
      )}

      {state.phase === "ready" && (
        <>
          <div
            className="absolute inset-0 z-[25] cursor-pointer"
            onClick={controls.togglePlay}
            aria-label="Toggle playback"
            role="button"
            tabIndex={-1}
          />
          <YtcnControls
            state={state}
            onTogglePlay={controls.togglePlay}
            onSeek={controls.seekTo}
            onVolumeChange={controls.setVolume}
            onToggleMute={controls.toggleMute}
            onSpeedChange={controls.setSpeed}
            onToggleFullscreen={controls.toggleFullscreen}
            visible={controlsVisible}
            containerRef={containerRef}
            onSettingsOpenChange={setIsSettingsOpen}
            onInteraction={showControls}
          />
        </>
      )}
    </div>
  );
}
