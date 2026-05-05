"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface UseFullscreenReturn {
  isFullscreen: boolean;
  toggle: () => void;
  enter: () => void;
  exit: () => void;
}

export function useFullscreen(
  containerRef: React.RefObject<HTMLDivElement | null>
): UseFullscreenReturn {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const handleChange = (): void => {
      if (mounted.current) setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () => {
      mounted.current = false;
      document.removeEventListener("fullscreenchange", handleChange);
    };
  }, []);

  const enter = useCallback((): void => {
    try { containerRef.current?.requestFullscreen(); } catch {}
  }, [containerRef]);

  const exit = useCallback((): void => {
    try { if (document.fullscreenElement) document.exitFullscreen(); } catch {}
  }, []);

  const toggle = useCallback((): void => {
    if (document.fullscreenElement) exit();
    else enter();
  }, [enter, exit]);

  return { isFullscreen, toggle, enter, exit };
}
