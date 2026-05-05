import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { CodeBlock } from "@/components/docs/code-block";
import { getPageNav } from "@/lib/navigation";

export default function HeadlessPage() {
  const nav = getPageNav("/docs/advanced/headless");

  return (
    <>
      <PageHeader
        badge="Advanced"
        title="Headless Usage"
        description="Build a fully custom player UI using only hooks. No ytcn components required."
      />

      <h2 id="when-to-go-headless" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        When to go headless
      </h2>
      <ul className="space-y-2 text-sm text-muted-foreground mb-6">
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          When the default ytcn controls don&apos;t match your design system
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          When you need custom control layouts (e.g., controls above the video)
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          When you want to integrate with an existing media player UI
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          When you need a minimal player with only play/pause
        </li>
      </ul>

      <h2 id="minimum-viable" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Minimum viable headless player
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        The simplest possible player — just a video with a play/pause button
        and time display. No ytcn components used at all.
      </p>
      <CodeBlock
        filename="components/minimal-player.tsx"
        code={`"use client"

import { useYtcnPlayer } from "@/hooks/ytcn/use-ytcn-player"
import { useThumbnail } from "@/hooks/ytcn/use-thumbnail"
import { IconPlayerPlayFilled, IconPlayerPauseFilled } from "@tabler/icons-react"

interface MinimalPlayerProps {
  videoId: string
}

export function MinimalPlayer({ videoId }: MinimalPlayerProps) {
  const { containerRef, playerDivRef, state, controls } =
    useYtcnPlayer({ videoId })
  const { thumbnailUrl } = useThumbnail(videoId)

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return \`\${m}:\${sec.toString().padStart(2, "0")}\`
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-video bg-black rounded-xl overflow-hidden group"
    >
      {/* Video layer */}
      <div ref={playerDivRef} className="absolute inset-0" />

      {/* Thumbnail (shown before iframe loads) */}
      {state.phase === "thumbnail" && thumbnailUrl && (
        <button
          onClick={controls.togglePlay}
          className="absolute inset-0 z-10 cursor-pointer"
        >
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="size-16 rounded-full bg-white/90 flex items-center justify-center">
              <IconPlayerPlayFilled className="size-7 text-black ml-0.5" />
            </div>
          </div>
        </button>
      )}

      {/* Custom controls overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={controls.togglePlay}
            className="text-white hover:scale-110 transition-transform"
          >
            {state.isPlaying ? (
              <IconPlayerPauseFilled className="size-5" />
            ) : (
              <IconPlayerPlayFilled className="size-5" />
            )}
          </button>
          <span className="text-white text-sm font-mono tabular-nums">
            {formatTime(state.currentTime)} / {formatTime(state.duration)}
          </span>
        </div>
      </div>
    </div>
  )
}`}
      />

      <h2 id="full-custom" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Full custom controls
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        A more complete example with progress bar, volume, and speed — all
        built from scratch using the hook.
      </p>
      <CodeBlock
        filename="components/custom-player.tsx"
        code={`"use client"

import { useYtcnPlayer } from "@/hooks/ytcn/use-ytcn-player"
import { useThumbnail } from "@/hooks/ytcn/use-thumbnail"
import { useRef } from "react"

export function CustomPlayer({ videoId }: { videoId: string }) {
  const { containerRef, playerDivRef, state, controls } =
    useYtcnPlayer({ videoId })
  const { thumbnailUrl } = useThumbnail(videoId)
  const progressRef = useRef<HTMLDivElement>(null)

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = progressRef.current?.getBoundingClientRect()
    if (!rect) return
    const fraction = (e.clientX - rect.left) / rect.width
    controls.seekTo(fraction * state.duration)
  }

  const progress = state.duration > 0
    ? (state.currentTime / state.duration) * 100
    : 0

  return (
    <div ref={containerRef} className="relative aspect-video bg-black rounded-xl overflow-hidden">
      <div ref={playerDivRef} className="absolute inset-0" />

      {/* Progress bar (bottom edge) */}
      <div
        ref={progressRef}
        onClick={handleProgressClick}
        className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 cursor-pointer z-20 hover:h-2 transition-all"
      >
        <div
          className="h-full bg-red-500 transition-[width] duration-100"
          style={{ width: \`\${progress}%\` }}
        />
      </div>

      {/* Controls */}
      <div className="absolute bottom-2 left-4 right-4 flex items-center gap-4 z-20">
        <button onClick={controls.togglePlay} className="text-white text-lg">
          {state.isPlaying ? "⏸" : "▶"}
        </button>
        <button onClick={controls.toggleMute} className="text-white text-sm">
          {state.isMuted ? "🔇" : "🔊"}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={state.isMuted ? 0 : state.volume}
          onChange={(e) => controls.setVolume(Number(e.target.value))}
          className="w-20"
        />
        <select
          value={state.playbackRate}
          onChange={(e) => controls.setSpeed(Number(e.target.value) as 0.75 | 1 | 1.5 | 2)}
          className="bg-black/50 text-white text-xs rounded px-1 py-0.5"
        >
          <option value={0.75}>0.75x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>
      </div>
    </div>
  )
}`}
      />

      <h2 id="lms-integration" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        LMS integration example
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        A complete LMS use case — save progress, resume from saved position,
        mark complete when 90% watched, and prevent seeking forward in locked
        content.
      </p>
      <CodeBlock
        filename="components/lms-player.tsx"
        code={`"use client"

import { useYtcnPlayer } from "@/hooks/ytcn/use-ytcn-player"
import { useRef, useCallback, useEffect } from "react"

interface LmsPlayerProps {
  videoId: string
  lessonId: string
  onComplete: () => void
  allowSeekForward?: boolean
}

export function LmsPlayer({
  videoId,
  lessonId,
  onComplete,
  allowSeekForward = false,
}: LmsPlayerProps) {
  const savedTime = Number(localStorage.getItem(\`lms-\${lessonId}\`) ?? 0)
  const maxWatched = useRef(savedTime)
  const completed = useRef(false)

  const { containerRef, playerDivRef, state, controls } = useYtcnPlayer({
    videoId,
    startAt: savedTime,
    onTimeUpdate: useCallback(
      (current: number, duration: number) => {
        // Save progress every 5 seconds
        if (current - (Number(localStorage.getItem(\`lms-\${lessonId}\`)) ?? 0) > 5) {
          localStorage.setItem(\`lms-\${lessonId}\`, String(Math.floor(current)))
        }

        // Track max watched position
        if (current > maxWatched.current) {
          maxWatched.current = current
        }

        // Mark complete at 90%
        if (!completed.current && current / duration > 0.9) {
          completed.current = true
          onComplete()
        }

        // Prevent seeking forward (if locked)
        if (!allowSeekForward && current > maxWatched.current + 2) {
          controls.seekTo(maxWatched.current)
        }
      },
      [lessonId, onComplete, allowSeekForward, controls]
    ),
  })

  return (
    <div ref={containerRef} className="relative aspect-video bg-black rounded-lg overflow-hidden">
      <div ref={playerDivRef} className="absolute inset-0" />
      {/* Add your custom controls here */}
    </div>
  )
}`}
      />

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
