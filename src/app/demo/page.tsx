"use client";

import { useState } from "react";
import Link from "next/link";
import { YtcnPlayer } from "@/components/ytcn/ytcn-player";
import { useYtcnPlayer } from "@/hooks/ytcn/use-ytcn-player";
import { useThumbnail } from "@/hooks/ytcn/use-thumbnail";
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconArrowLeft,
  IconVolume,
  IconVolumeOff,
  IconSettings,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const DEMO_VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "Never Gonna Give You Up", duration: "3:32" },
  { id: "jNQXAC9IVRw", title: "Me at the zoo", duration: "0:19" },
  { id: "9bZkp7q19f0", title: "Gangnam Style", duration: "4:12" },
];

function CustomGlassPlayer({ videoId }: { videoId: string }) {
  const { containerRef, playerDivRef, state, controls } = useYtcnPlayer({
    videoId,
  });
  const { thumbnailUrl } = useThumbnail(videoId);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress =
    state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="relative aspect-video rounded-xl overflow-hidden bg-black group shadow-2xl ring-1 ring-white/10"
    >
      <div ref={playerDivRef} className="absolute inset-0" />

      {state.phase === "thumbnail" && thumbnailUrl && (
        <button
          onClick={controls.togglePlay}
          className="absolute inset-0 w-full h-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnailUrl}
            alt="Thumbnail"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px] transition-all group-hover:bg-black/20">
            <div className="size-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl transition-transform group-hover:scale-110">
              <IconPlayerPlayFilled className="size-8 text-white ml-1" />
            </div>
          </div>
        </button>
      )}

      {/* Custom Glass Controls */}
      <div
        className={cn(
          "absolute inset-x-4 bottom-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-4 transition-all duration-300",
          state.phase === "ready" ? "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={controls.togglePlay}
            className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors shrink-0"
          >
            {state.isPlaying ? (
              <IconPlayerPauseFilled className="size-4 text-white" />
            ) : (
              <IconPlayerPlayFilled className="size-4 text-white ml-0.5" />
            )}
          </button>

          <div className="flex-1 flex flex-col gap-2">
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer relative" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const fraction = (e.clientX - rect.left) / rect.width;
              controls.seekTo(fraction * state.duration);
            }}>
              <div 
                className="absolute inset-y-0 left-0 bg-white/30" 
                style={{ width: `${state.loadedFraction * 100}%` }} 
              />
              <div 
                className="absolute inset-y-0 left-0 bg-primary" 
                style={{ width: `${progress}%` }} 
              />
            </div>
            <div className="flex justify-between items-center text-xs text-white/70 font-mono">
              <span>{formatTime(state.currentTime)}</span>
              <span>{formatTime(state.duration)}</span>
            </div>
          </div>

          <button
            onClick={controls.toggleMute}
            className="size-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors shrink-0 text-white"
          >
            {state.isMuted ? (
              <IconVolumeOff className="size-5" />
            ) : (
              <IconVolume className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DemoPage() {
  const [playlistIndex, setPlaylistIndex] = useState(0);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center h-14 px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <IconArrowLeft className="size-4" />
            Back to home
          </Link>
          <div className="flex-1 flex justify-center">
            <span className="font-semibold text-sm">Interactive Demo</span>
          </div>
          <div className="w-[100px]" /> {/* Spacer */}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pt-16 space-y-32">
        {/* Section 1: The Difference */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              The Difference
            </h2>
            <p className="text-muted-foreground text-lg">
              Compare the standard YouTube embed (with YouTube branding, "More Videos" overlays, and watermarks) against the clean, professional ytcn player.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Native Iframe */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="font-semibold text-red-500/80 flex items-center gap-2">
                  Native Iframe
                </span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded font-mono">{"<iframe>"}</span>
              </div>
              <div className="rounded-xl overflow-hidden ring-1 ring-border shadow-xl aspect-video bg-black relative">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* ytcn player */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="font-semibold text-primary flex items-center gap-2">
                  <IconPlayerPlayFilled className="size-4" /> ytcn Player
                </span>
                <span className="text-xs text-primary-foreground bg-primary px-2 py-1 rounded font-mono">{"<YtcnPlayer />"}</span>
              </div>
              <div className="rounded-xl overflow-hidden ring-1 ring-primary/20 shadow-xl shadow-primary/10 bg-black aspect-video">
                <YtcnPlayer videoId="dQw4w9WgXcQ" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Standard Player */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Standard Player
            </h2>
            <p className="text-muted-foreground text-lg">
              The default out-of-the-box experience. Clean, professional, with zero
              YouTube branding and thumbnail-first loading.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl p-2 bg-gradient-to-b from-white/5 to-transparent border border-white/10 shadow-2xl">
            <div className="rounded-xl overflow-hidden ring-1 ring-white/10">
              <YtcnPlayer videoId="jNQXAC9IVRw" />
            </div>
          </div>
        </section>

        {/* Section 3: LMS / Playlist Interface */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Playlist & LMS Interface
            </h2>
            <p className="text-muted-foreground text-lg">
              Perfect for course platforms. Automatically advances to the next
              video upon completion.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6 max-w-6xl mx-auto">
            <div className="rounded-2xl p-2 bg-muted/30 border border-border">
              <div className="rounded-xl overflow-hidden ring-1 ring-border shadow-xl">
                <YtcnPlayer
                  videoId={DEMO_VIDEOS[playlistIndex].id}
                  onEnd={() => {
                    if (playlistIndex < DEMO_VIDEOS.length - 1) {
                      setPlaylistIndex((i) => i + 1);
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-muted/30 border border-border h-[calc(100%-1rem)]">
              <h3 className="font-semibold px-2 mb-2">Course Modules</h3>
              <div className="space-y-1 overflow-y-auto">
                {DEMO_VIDEOS.map((video, idx) => {
                  const isActive = idx === playlistIndex;
                  return (
                    <button
                      key={video.id}
                      onClick={() => setPlaylistIndex(idx)}
                      className={cn(
                        "w-full flex items-center justify-between text-left px-3 py-3 rounded-lg text-sm transition-all",
                        isActive
                          ? "bg-primary text-primary-foreground font-medium shadow-md"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex items-center justify-center size-6 rounded-full text-xs",
                            isActive ? "bg-primary-foreground/20" : "bg-background"
                          )}
                        >
                          {idx + 1}
                        </span>
                        <span className="truncate">{video.title}</span>
                      </div>
                      <span className={cn("text-xs", isActive ? "text-primary-foreground/80" : "text-muted-foreground/60")}>{video.duration}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Headless Glassmorphism */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Headless Custom UI
            </h2>
            <p className="text-muted-foreground text-lg">
              Using the <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">useYtcnPlayer</code> hook to build a completely custom,
              premium glassmorphism interface. No ytcn UI components used.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative group">
            {/* Decorative background glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-2xl rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
            
            <CustomGlassPlayer videoId="dQw4w9WgXcQ" />
          </div>
        </section>
      </main>
    </div>
  );
}
