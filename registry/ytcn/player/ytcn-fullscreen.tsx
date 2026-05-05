"use client";

import { IconMaximize, IconMinimize } from "@tabler/icons-react";

export interface YtcnFullscreenProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export function YtcnFullscreen({ isFullscreen, onToggle }: YtcnFullscreenProps): React.JSX.Element {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="flex items-center justify-center rounded-sm p-1.5 text-white transition-colors hover:bg-white/10"
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      {isFullscreen ? (
        <IconMinimize className="size-5" />
      ) : (
        <IconMaximize className="size-5" />
      )}
    </button>
  );
}
