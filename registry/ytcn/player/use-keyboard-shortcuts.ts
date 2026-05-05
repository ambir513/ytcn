"use client";

import { useEffect } from "react";
import type { KeyboardBindings } from "./types";
import { DEFAULT_KEYBOARD_BINDINGS } from "./types";

export interface UseKeyboardShortcutsOptions {
  enabled: boolean;
  onPlay?: () => void;
  onMute?: () => void;
  onFullscreen?: () => void;
  onSeekBack?: () => void;
  onSeekForward?: () => void;
  bindings?: KeyboardBindings;
}

export function useKeyboardShortcuts({
  enabled,
  onPlay,
  onMute,
  onFullscreen,
  onSeekBack,
  onSeekForward,
  bindings: customBindings,
}: UseKeyboardShortcutsOptions): void {
  useEffect(() => {
    if (!enabled) return;
    const bindings = { ...DEFAULT_KEYBOARD_BINDINGS, ...customBindings };
    const handleKeyDown = (e: KeyboardEvent): void => {
      const target = e.target as HTMLElement;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable
      ) return;
      const key = e.key;
      if (key === bindings.play) { e.preventDefault(); onPlay?.(); }
      else if (key.toLowerCase() === bindings.mute?.toLowerCase()) { onMute?.(); }
      else if (key.toLowerCase() === bindings.fullscreen?.toLowerCase()) { onFullscreen?.(); }
      else if (key === bindings.seekBack) { onSeekBack?.(); }
      else if (key === bindings.seekForward) { onSeekForward?.(); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onPlay, onMute, onFullscreen, onSeekBack, onSeekForward, customBindings]);
}
