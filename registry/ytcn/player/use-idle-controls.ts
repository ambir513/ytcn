"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export interface UseIdleControlsOptions {
  isPlaying: boolean;
  isFullscreen: boolean;
  isSettingsOpen: boolean;
}

export interface UseIdleControlsReturn {
  controlsVisible: boolean;
  showControls: () => void;
}

export function useIdleControls({
  isPlaying,
  isFullscreen,
  isSettingsOpen,
}: UseIdleControlsOptions): UseIdleControlsReturn {
  const [controlsVisible, setControlsVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isFullscreen && isPlaying && !isSettingsOpen) {
      timerRef.current = setTimeout(() => setControlsVisible(false), 3000);
    }
  }, [isFullscreen, isPlaying, isSettingsOpen]);

  useEffect(() => {
    showControls();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isPlaying, isFullscreen, isSettingsOpen, showControls]);

  useEffect(() => {
    if (!isPlaying || !isFullscreen) {
      setControlsVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, [isPlaying, isFullscreen]);

  return { controlsVisible, showControls };
}
