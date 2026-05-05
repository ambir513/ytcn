"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  PlayerState,
  PlayerControls,
  PlaybackSpeed,
  YtcnPlayerOptions,
} from "./types";
import { loadYouTubeAPI, styleIframe } from "./loader";
import { useFullscreen } from "./use-fullscreen";

/* ================================================================ */
/*  Return type                                                      */
/* ================================================================ */

export interface UseYtcnPlayerReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  playerDivRef: React.RefObject<HTMLDivElement | null>;
  playerRef: React.RefObject<YT.Player | null>;
  state: PlayerState;
  controls: PlayerControls;
}

/* ================================================================ */
/*  Initial state factory                                            */
/* ================================================================ */

function createInitialState(
  options: YtcnPlayerOptions,
  prev?: Partial<PlayerState>
): PlayerState {
  return {
    phase: "thumbnail",
    isPlaying: false,
    isMuted: prev?.isMuted ?? true,
    volume: prev?.volume ?? 100,
    currentTime: 0,
    duration: 0,
    loadedFraction: 0,
    isLoading: false,
    isCued: false,
    isFullscreen: typeof document !== "undefined" ? !!document.fullscreenElement : false,
    playbackRate: options.defaultSpeed ?? (prev?.playbackRate ?? 1),
  };
}

function getYT(): typeof YT | undefined {
  return (window as unknown as YTWindow).YT;
}

export function useYtcnPlayer(options: YtcnPlayerOptions): UseYtcnPlayerReturn {
  const {
    videoId,
    autoplay = false,
    defaultSpeed = 1,
    startAt = 0,
    onEnd,
    onTimeUpdate,
    onPlaybackRateChange,
    thumbnailFailed = false,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const playerDivRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const volumeRef = useRef(100);
  const isMutedRef = useRef(true);
  const playbackSpeedRef = useRef<PlaybackSpeed>(defaultSpeed);
  const phaseRef = useRef<PlayerState["phase"]>("thumbnail");

  const onEndRef = useRef(onEnd);
  const onTimeUpdateRef = useRef(onTimeUpdate);
  const onPlaybackRateChangeRef = useRef(onPlaybackRateChange);

  useEffect(() => {
    onEndRef.current = onEnd;
    onTimeUpdateRef.current = onTimeUpdate;
    onPlaybackRateChangeRef.current = onPlaybackRateChange;
  });

  const [state, setState] = useState<PlayerState>(() =>
    createInitialState(options)
  );

  useEffect(() => {
    volumeRef.current = state.volume;
    isMutedRef.current = state.isMuted;
    playbackSpeedRef.current = state.playbackRate;
    phaseRef.current = state.phase;
  }, [state.volume, state.isMuted, state.playbackRate, state.phase]);

  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen(containerRef);

  useEffect(() => {
    if (!mountedRef.current) return;
    setState((prev) => ({ ...prev, isFullscreen }));
    try {
      const player = playerRef.current;
      if (player) {
        player.unloadModule("captions");
        player.unloadModule("cc");
        player.setOption("captions", "track", {});
        player.setOption("cc", "track", {});
      }
    } catch {}
  }, [isFullscreen]);

  const suppressCaptions = useCallback((player: YT.Player): void => {
    try {
      player.unloadModule("captions");
      player.unloadModule("cc");
      player.setOption("captions", "track", {});
      player.setOption("cc", "track", {});
    } catch {}
  }, []);

  const createPlayer = useCallback(
    (seekSeconds: number) => {
      if (!videoId || !playerDivRef.current) return;
      try { playerRef.current?.destroy(); } catch {}
      playerRef.current = null;

      const container = playerDivRef.current.parentElement;
      if (!container) return;
      const newDiv = document.createElement("div");
      newDiv.style.width = "100%";
      newDiv.style.height = "100%";
      container.replaceChild(newDiv, playerDivRef.current);
      (playerDivRef as React.MutableRefObject<HTMLDivElement>).current = newDiv;

      const yt = getYT();
      if (!yt) return;

      const playerVars: Record<string, string | number | undefined> = {
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        cc_load_policy: 0,
        cc_lang_pref: "",
        fs: 0,
        disablekb: 1,
        playsinline: 1,
        autoplay: 1,
        mute: 1,
        origin: window.location.origin,
        start: Math.floor(seekSeconds),
      };

      playerRef.current = new yt.Player(newDiv, {
        videoId,
        playerVars,
        events: {
          onReady: (event: YT.PlayerEvent) => {
            const player = event.target;
            styleIframe(player);
            try {
              player.setVolume(volumeRef.current);
              if (!isMutedRef.current) player.unMute();
              if (playbackSpeedRef.current !== 1) {
                player.setPlaybackRate(playbackSpeedRef.current);
              }
              suppressCaptions(player);
            } catch {}
            if (!mountedRef.current) return;
            setState((prev) => ({
              ...prev,
              isLoading: false,
              duration: player.getDuration() || prev.duration,
            }));
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            const yt2 = getYT();
            if (!yt2) return;
            const player = event.target;
            switch (event.data) {
              case yt2.PlayerState.UNSTARTED:
                if (!mountedRef.current) return;
                setState((prev) => ({ ...prev, isCued: true, isPlaying: false }));
                break;
              case yt2.PlayerState.CUED:
                if (!mountedRef.current) return;
                setState((prev) => ({ ...prev, isCued: true, isPlaying: false }));
                break;
              case yt2.PlayerState.PLAYING: {
                suppressCaptions(player);
                if (!mountedRef.current) return;
                setState((prev) => ({
                  ...prev,
                  phase: "ready",
                  isPlaying: true,
                  isLoading: false,
                  isCued: false,
                  duration: player.getDuration() || prev.duration,
                }));
                break;
              }
              case yt2.PlayerState.PAUSED:
                suppressCaptions(player);
                if (!mountedRef.current) return;
                setState((prev) => ({ ...prev, isPlaying: false }));
                break;
              case yt2.PlayerState.BUFFERING:
                if (!mountedRef.current) return;
                setState((prev) => ({
                  ...prev,
                  phase: prev.phase === "thumbnail"
                    ? prev.phase
                    : prev.phase === "loading" ? "ready" : prev.phase,
                  isLoading: true,
                  isCued: false,
                }));
                break;
              case yt2.PlayerState.ENDED:
                if (!mountedRef.current) return;
                setState((prev) => ({ ...prev, isPlaying: false }));
                onEndRef.current?.();
                break;
            }
          },
          onPlaybackRateChange: (event: YT.OnPlaybackRateChangeEvent) => {
            const rate = event.data as PlaybackSpeed;
            if (!mountedRef.current) return;
            setState((prev) => ({ ...prev, playbackRate: rate }));
            onPlaybackRateChangeRef.current?.(rate);
          },
          onError: () => {
            if (!mountedRef.current) return;
            setState((prev) => ({ ...prev, isLoading: false }));
          },
        },
      });
    },
    [videoId, suppressCaptions]
  );

  const handleThumbnailClick = useCallback(async () => {
    if (phaseRef.current !== "thumbnail") return;
    if (!mountedRef.current) return;
    setState((prev) => ({ ...prev, phase: "loading", isLoading: true }));
    await loadYouTubeAPI();
    if (!mountedRef.current) return;
    createPlayer(startAt);
  }, [startAt, createPlayer]);

  useEffect(() => {
    if (!videoId) return;
    try { playerRef.current?.destroy(); } catch {}
    playerRef.current = null;
    setState((prev) => ({
      ...prev,
      phase: "thumbnail",
      isPlaying: false,
      isCued: false,
      currentTime: 0,
      loadedFraction: 0,
      isLoading: false,
    }));
  }, [videoId]);

  useEffect(() => {
    if (autoplay && videoId && phaseRef.current === "thumbnail") {
      handleThumbnailClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: only trigger on videoId/autoplay changes
  }, [videoId, autoplay]);

  useEffect(() => {
    if (thumbnailFailed && phaseRef.current === "thumbnail") {
      handleThumbnailClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: only trigger on thumbnailFailed change
  }, [thumbnailFailed]);

  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current;
      if (!player?.getCurrentTime) return;
      try {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        const loadedFraction = player.getVideoLoadedFraction();
        if (!mountedRef.current) return;
        setState((prev) => ({
          ...prev,
          currentTime,
          duration: duration > 0 ? duration : prev.duration,
          loadedFraction,
        }));
        onTimeUpdateRef.current?.(currentTime, duration);
      } catch {}
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const play = useCallback((): void => {
    try { playerRef.current?.playVideo(); } catch {}
  }, []);

  const pause = useCallback((): void => {
    try { playerRef.current?.pauseVideo(); } catch {}
  }, []);

  const togglePlay = useCallback((): void => {
    const player = playerRef.current;
    if (!player) return;
    try {
      const yt = getYT();
      if (!yt) return;
      if (player.getPlayerState() === yt.PlayerState.PLAYING) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    } catch {}
  }, []);

  const seekTo = useCallback((seconds: number): void => {
    const player = playerRef.current;
    if (!player) return;
    try {
      player.seekTo(seconds, true);
      if (mountedRef.current) setState((prev) => ({ ...prev, currentTime: seconds }));
    } catch {}
  }, []);

  const seekRelative = useCallback((delta: number): void => {
    const player = playerRef.current;
    if (!player) return;
    try {
      const current = player.getCurrentTime();
      const duration = player.getDuration();
      const newTime = Math.max(0, Math.min(duration, current + delta));
      player.seekTo(newTime, true);
      if (mountedRef.current) setState((prev) => ({ ...prev, currentTime: newTime }));
    } catch {}
  }, []);

  const setVolume = useCallback((vol: number): void => {
    const player = playerRef.current;
    if (!player) return;
    try {
      player.setVolume(vol);
      if (vol > 0) { player.unMute(); isMutedRef.current = false; }
      else { player.mute(); isMutedRef.current = true; }
      volumeRef.current = vol;
      if (mountedRef.current) setState((prev) => ({ ...prev, volume: vol, isMuted: vol === 0 }));
    } catch {}
  }, []);

  const toggleMute = useCallback((): void => {
    const player = playerRef.current;
    if (!player) return;
    try {
      if (isMutedRef.current) {
        player.unMute();
        isMutedRef.current = false;
        if (mountedRef.current) setState((prev) => ({ ...prev, isMuted: false }));
      } else {
        player.mute();
        isMutedRef.current = true;
        if (mountedRef.current) setState((prev) => ({ ...prev, isMuted: true }));
      }
    } catch {}
  }, []);

  const setSpeed = useCallback((rate: PlaybackSpeed): void => {
    const player = playerRef.current;
    if (!player) return;
    try {
      player.setPlaybackRate(rate);
      playbackSpeedRef.current = rate;
      if (mountedRef.current) setState((prev) => ({ ...prev, playbackRate: rate }));
    } catch {}
  }, []);

  const controls: PlayerControls = {
    play, pause, togglePlay, seekTo, seekRelative,
    setVolume, toggleMute, setSpeed, toggleFullscreen, handleThumbnailClick,
  };

  return { playerRef, containerRef, playerDivRef, state, controls };
}
