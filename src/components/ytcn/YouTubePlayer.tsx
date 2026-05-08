"use client";

import * as React from "react";
import {
  IconArrowsMaximize,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconVolume,
  IconVolume2,
  IconVolume3,
} from "@tabler/icons-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type YouTubeQualityKey = "default" | "auto" | "hd720" | "large" | "medium" | "small";

type YouTubePlayerApi = YT.Player & {
  getAvailableQualityLevels: () => YouTubeQualityKey[];
  setPlaybackQuality: (suggestedQuality: YouTubeQualityKey) => void;
};

type QualityOption = {
  key: YouTubeQualityKey;
  label: string;
};

export interface YouTubePlayerProps {
  videoId: string;
  autoplay?: boolean;
  className?: string;
}

const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;
const QUALITY_LABELS: Record<YouTubeQualityKey, string> = {
  auto: "Auto",
  default: "Auto",
  hd720: "720p",
  large: "480p",
  medium: "360p",
  small: "240p",
};
const QUALITY_ORDER: YouTubeQualityKey[] = ["hd720", "large", "medium"];

let youtubeApiPromise: Promise<typeof YT> | null = null;

function loadYouTubeIframeApi(): Promise<typeof YT> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("YouTube player requires a browser environment."));
  }

  const ytWindow = window as YTWindow;
  if (ytWindow.YT?.Player) {
    return Promise.resolve(ytWindow.YT);
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }

  youtubeApiPromise = new Promise((resolve, reject) => {
    const previousReady = ytWindow.onYouTubeIframeAPIReady;
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]'
    );

    const timeout = window.setTimeout(() => {
      reject(new Error("YouTube IFrame API failed to load."));
    }, 15000);

    ytWindow.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      window.clearTimeout(timeout);

      if (ytWindow.YT?.Player) {
        resolve(ytWindow.YT);
      } else {
        reject(new Error("YouTube IFrame API loaded without a Player constructor."));
      }
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        window.clearTimeout(timeout);
        reject(new Error("Unable to load the YouTube IFrame API script."));
      };
      document.head.appendChild(script);
    }
  });

  return youtubeApiPromise;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

function getQualityOptions(player: YouTubePlayerApi | null): QualityOption[] {
  const available = new Set(player?.getAvailableQualityLevels?.() ?? []);
  const filtered = QUALITY_ORDER.filter((quality) => available.has(quality));

  return [
    { key: "default", label: QUALITY_LABELS.default },
    ...filtered.map((quality) => ({
      key: quality,
      label: QUALITY_LABELS[quality],
    })),
  ];
}

function stopTouchEvent(event: React.TouchEvent<HTMLElement>) {
  event.preventDefault();
  event.stopPropagation();
}

function stopMouseEvent(event: React.MouseEvent<HTMLElement>) {
  event.stopPropagation();
}

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return isMobile;
}

export function YouTubePlayer({
  videoId,
  autoplay = false,
  className,
}: YouTubePlayerProps): React.JSX.Element {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const playerHostRef = React.useRef<HTMLDivElement | null>(null);
  const playerRef = React.useRef<YouTubePlayerApi | null>(null);
  const isMountedRef = React.useRef(false);
  const isMobile = useIsMobile();

  const [ratio, setRatio] = React.useState(16 / 9);
  const [error, setError] = React.useState<string | null>(null);
  const [isReady, setIsReady] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [volume, setVolumeState] = React.useState(80);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [seekValue, setSeekValue] = React.useState(0);
  const [quality, setQuality] = React.useState<YouTubeQualityKey>("default");
  const [qualityOptions, setQualityOptions] = React.useState<QualityOption[]>([
    { key: "default", label: "Auto" },
  ]);
  const [qualityOpen, setQualityOpen] = React.useState(false);
  const [controlsVisible, setControlsVisible] = React.useState(true);
  const invalidVideoId = !YOUTUBE_ID_PATTERN.test(videoId);

  const syncTimeline = React.useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    const nextCurrentTime = player.getCurrentTime();
    const nextDuration = player.getDuration();

    setCurrentTime(nextCurrentTime);
    setSeekValue(nextCurrentTime);
    setDuration(Number.isFinite(nextDuration) ? nextDuration : 0);
  }, []);

  const refreshQualityOptions = React.useCallback(() => {
    const options = getQualityOptions(playerRef.current);
    setQualityOptions(options);
  }, []);

  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    const abortController = new AbortController();

    if (invalidVideoId) {
      return () => abortController.abort();
    }

    const resetTimer = window.setTimeout(() => {
      setRatio(16 / 9);
      setError(null);
    }, 0);

    fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      { signal: abortController.signal }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not read YouTube metadata.");
        }
        return response.json() as Promise<{ width?: number; height?: number }>;
      })
      .then((metadata) => {
        if (!isMountedRef.current) return;
        const width = Number(metadata.width);
        const height = Number(metadata.height);
        setRatio(height > width ? 9 / 16 : 16 / 9);
      })
      .catch((metadataError: unknown) => {
        if (abortController.signal.aborted) return;
        setError(
          metadataError instanceof Error
            ? metadataError.message
            : "Could not read YouTube metadata."
        );
      });

    return () => {
      window.clearTimeout(resetTimer);
      abortController.abort();
    };
  }, [invalidVideoId, videoId]);

  React.useEffect(() => {
    let cancelled = false;
    let resetTimer: number | null = null;

    resetTimer = window.setTimeout(() => {
      setIsReady(false);
      setIsPlaying(false);
      setCurrentTime(0);
      setSeekValue(0);
      setDuration(0);
      setQuality("default");
      setQualityOptions([{ key: "default", label: "Auto" }]);
      setQualityOpen(false);
    }, 0);

    playerRef.current?.destroy();
    playerRef.current = null;

    if (invalidVideoId || !playerHostRef.current) {
      return () => {
        cancelled = true;
        if (resetTimer !== null) window.clearTimeout(resetTimer);
      };
    }

    loadYouTubeIframeApi()
      .then((YTApi) => {
        if (cancelled || !playerHostRef.current) return;

        playerRef.current = new YTApi.Player(playerHostRef.current, {
          videoId,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: autoplay ? 1 : 0,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
          },
          events: {
            onReady: (event) => {
              if (cancelled) return;
              const player = event.target as YouTubePlayerApi;
              playerRef.current = player;
              player.setVolume(80);
              setIsMuted(player.isMuted());
              setIsReady(true);
              setDuration(player.getDuration());
              refreshQualityOptions();

              const iframe = player.getIframe();
              iframe.setAttribute("title", "YouTube video player");
              iframe.style.width = "100%";
              iframe.style.height = "100%";
              iframe.style.pointerEvents = "none";
            },
            onStateChange: (event) => {
              if (cancelled) return;
              const state = event.data;
              setIsPlaying(state === YTApi.PlayerState.PLAYING);

              if (state === YTApi.PlayerState.PLAYING || state === YTApi.PlayerState.PAUSED) {
                syncTimeline();
                refreshQualityOptions();
              }
            },
            onError: () => {
              if (!cancelled) {
                setError("Unable to play this video.");
              }
            },
          },
        }) as YouTubePlayerApi;
      })
      .catch((apiError: unknown) => {
        if (cancelled) return;
        setError(
          apiError instanceof Error ? apiError.message : "YouTube IFrame API failed to load."
        );
      });

    return () => {
      cancelled = true;
      if (resetTimer !== null) window.clearTimeout(resetTimer);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [autoplay, invalidVideoId, refreshQualityOptions, syncTimeline, videoId]);

  React.useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(syncTimeline, 500);
    return () => window.clearInterval(interval);
  }, [isPlaying, syncTimeline]);

  React.useEffect(() => {
    let visibilityTimer: number | null = null;

    if (isMobile) {
      visibilityTimer = window.setTimeout(() => setControlsVisible(true), 0);
      return () => {
        if (visibilityTimer !== null) window.clearTimeout(visibilityTimer);
      };
    }

    if (!isPlaying) {
      visibilityTimer = window.setTimeout(() => setControlsVisible(true), 0);
      return () => {
        if (visibilityTimer !== null) window.clearTimeout(visibilityTimer);
      };
    }

    visibilityTimer = window.setTimeout(() => setControlsVisible(false), 2200);
    return () => {
      if (visibilityTimer !== null) window.clearTimeout(visibilityTimer);
    };
  }, [currentTime, isMobile, isPlaying]);

  const showControls = React.useCallback(() => setControlsVisible(true), []);

  const togglePlay = React.useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
      setIsPlaying(false);
    } else {
      player.playVideo();
      setIsPlaying(true);
    }

    showControls();
  }, [isPlaying, showControls]);

  const changeVolume = React.useCallback((nextVolume: number) => {
    const player = playerRef.current;
    const clampedVolume = Math.max(0, Math.min(100, Math.round(nextVolume)));

    setVolumeState(clampedVolume);

    if (!player) return;
    player.setVolume(clampedVolume);

    if (clampedVolume === 0) {
      player.mute();
      setIsMuted(true);
    } else {
      player.unMute();
      setIsMuted(false);
    }
  }, []);

  const toggleMute = React.useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    if (player.isMuted() || volume === 0) {
      player.unMute();
      if (volume === 0) {
        player.setVolume(50);
        setVolumeState(50);
      }
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }

    showControls();
  }, [showControls, volume]);

  const seekTo = React.useCallback(
    (seconds: number) => {
      const player = playerRef.current;
      const target = Math.max(0, Math.min(duration || seconds, seconds));

      setCurrentTime(target);
      setSeekValue(target);
      player?.seekTo(target, true);
      showControls();
    },
    [duration, showControls]
  );

  const changeQuality = React.useCallback(
    (nextQuality: string) => {
      const player = playerRef.current;
      if (!player) return;

      const youtubeQuality = nextQuality as YouTubeQualityKey;
      const current = player.getCurrentTime();
      const requestedQuality = youtubeQuality === "auto" ? "default" : youtubeQuality;

      player.setPlaybackQuality(requestedQuality);
      player.seekTo(current, true);
      setQuality(requestedQuality);
      showControls();
    },
    [showControls]
  );

  const toggleFullscreen = React.useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void wrapper.requestFullscreen();
    }

    showControls();
  }, [showControls]);

  const activeVolumeIcon = React.useMemo(() => {
    if (isMuted || volume === 0) return IconVolume3;
    if (volume < 50) return IconVolume2;
    return IconVolume;
  }, [isMuted, volume]);

  const VolumeIcon = activeVolumeIcon;
  const visibleControls = isMobile || controlsVisible || !isPlaying;

  return (
    <div className={cn("w-full", className)}>
      <AspectRatio ratio={ratio}>
        <div
          ref={wrapperRef}
          className="group relative size-full overflow-hidden rounded-lg bg-black text-white"
          role="region"
          aria-label="YouTube video player"
          onMouseMove={showControls}
          onMouseEnter={showControls}
          onTouchStart={showControls}
        >
          <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
            <div ref={playerHostRef} className="size-full" />
          </div>

          <div
            className="absolute inset-0 z-40 md:hidden"
            style={{ pointerEvents: "auto" }}
            onClick={(event) => {
              stopMouseEvent(event);
              showControls();
            }}
            onTouchEnd={(event) => {
              stopTouchEvent(event);
              showControls();
            }}
            aria-hidden="true"
          />

          {(invalidVideoId || error) && (
            <div className="absolute inset-0 z-40 flex items-center justify-center bg-black px-6 text-center text-sm text-white/80">
              {invalidVideoId ? "Invalid YouTube video ID." : error}
            </div>
          )}

          {!invalidVideoId && !error && !isReady && (
            <div className="absolute inset-0 z-40 flex items-center justify-center bg-black text-sm text-white/70">
              Loading video...
            </div>
          )}

          <div
            className={cn(
              "absolute right-0 bottom-0 left-0 z-50 flex flex-col gap-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 pt-10 pb-3 transition-opacity duration-200 md:px-4",
              visibleControls ? "opacity-100" : "pointer-events-none opacity-0"
            )}
            style={{ pointerEvents: "auto" }}
            onClick={stopMouseEvent}
            onTouchEnd={stopTouchEvent}
            onMouseMove={showControls}
          >
            <Slider
              value={[seekValue]}
              min={0}
              max={duration || 0}
              step={0.1}
              disabled={!isReady || duration <= 0}
              onValueChange={(value) => {
                showControls();
                setSeekValue(value[0] ?? 0);
              }}
              onValueCommit={(value) => seekTo(value[0] ?? 0)}
              onClick={stopMouseEvent}
              onTouchEnd={stopTouchEvent}
              className="touch-manipulation"
              aria-label="Seek"
            />

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon-lg"
                className="min-h-11 min-w-11 touch-manipulation text-white hover:bg-white/15 hover:text-white"
                onClick={(event) => {
                  stopMouseEvent(event);
                  togglePlay();
                }}
                onTouchEnd={(event) => {
                  stopTouchEvent(event);
                  togglePlay();
                }}
                aria-label={isPlaying ? "Pause" : "Play"}
                disabled={!isReady}
              >
                {isPlaying ? (
                  <IconPlayerPauseFilled data-icon="inline-start" />
                ) : (
                  <IconPlayerPlayFilled data-icon="inline-start" />
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon-lg"
                className="min-h-11 min-w-11 touch-manipulation text-white hover:bg-white/15 hover:text-white"
                onClick={(event) => {
                  stopMouseEvent(event);
                  toggleMute();
                }}
                onTouchEnd={(event) => {
                  stopTouchEvent(event);
                  toggleMute();
                }}
                aria-label={isMuted ? "Unmute" : "Mute"}
                disabled={!isReady}
              >
                <VolumeIcon data-icon="inline-start" />
              </Button>

              <Slider
                value={[isMuted ? 0 : volume]}
                min={0}
                max={100}
                step={1}
                disabled={!isReady}
                onValueChange={(value) => {
                  showControls();
                  changeVolume(value[0] ?? 0);
                }}
                onClick={stopMouseEvent}
                onTouchEnd={stopTouchEvent}
                className="hidden w-24 touch-manipulation sm:flex"
                aria-label="Volume"
              />

              <span className="min-w-24 select-none text-xs font-medium tabular-nums text-white/80">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="flex-1" />

              <Select
                value={quality}
                onValueChange={changeQuality}
                open={qualityOpen}
                onOpenChange={setQualityOpen}
                disabled={!isReady}
              >
                <SelectTrigger
                  className="min-h-11 w-[104px] touch-manipulation border-white/15 bg-black/40 text-white hover:bg-white/10"
                  onClick={stopMouseEvent}
                  onTouchEnd={(event) => {
                    stopTouchEvent(event);
                    setQualityOpen((open) => !open);
                  }}
                  aria-label="Video quality"
                >
                  <SelectValue placeholder="Auto" />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-neutral-950 text-white">
                  <SelectGroup>
                    {qualityOptions.map((option) => (
                      <SelectItem
                        key={option.key}
                        value={option.key}
                        onClick={(event) => {
                          stopMouseEvent(event);
                          changeQuality(option.key);
                        }}
                        onTouchEnd={(event) => {
                          stopTouchEvent(event);
                          changeQuality(option.key);
                        }}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button
                type="button"
                variant="ghost"
                size="icon-lg"
                className="min-h-11 min-w-11 touch-manipulation text-white hover:bg-white/15 hover:text-white"
                onClick={(event) => {
                  stopMouseEvent(event);
                  toggleFullscreen();
                }}
                onTouchEnd={(event) => {
                  stopTouchEvent(event);
                  toggleFullscreen();
                }}
                aria-label="Fullscreen"
                disabled={!isReady}
              >
                <IconArrowsMaximize data-icon="inline-start" />
              </Button>
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
}
