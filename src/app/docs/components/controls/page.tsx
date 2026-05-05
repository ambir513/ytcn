import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { PropsTable } from "@/components/docs/props-table";
import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { getPageNav } from "@/lib/navigation";

export default function ControlsPage() {
  const nav = getPageNav("/docs/components/controls");

  return (
    <>
      <PageHeader
        badge="Component"
        title="Controls"
        description="The full controls bar — progress, play, volume, speed, and fullscreen."
      />

      <h2 id="overview" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Overview
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        YtcnControls is the complete controls bar used inside YtcnPlayer. It
        composes the progress bar, play/pause button, volume slider, speed
        picker, and fullscreen toggle into a single horizontal bar. It can also
        be used standalone with the{" "}
        <code className="font-mono text-foreground text-sm">useYtcnPlayer</code>{" "}
        hook for custom player layouts.
      </p>
      <CodeBlock
        filename="custom-layout.tsx"
        code={`"use client"

import { useYtcnPlayer } from "@/hooks/ytcn/use-ytcn-player"
import { YtcnControls } from "@/components/ytcn/ytcn-controls"
import { useIdleControls } from "@/hooks/ytcn/use-idle-controls"

export function CustomLayout({ videoId }: { videoId: string }) {
  const { containerRef, playerDivRef, state, controls } =
    useYtcnPlayer({ videoId })
  const { controlsVisible } = useIdleControls({
    isPlaying: state.isPlaying,
    isFullscreen: state.isFullscreen,
    isSettingsOpen: false,
  })

  return (
    <div ref={containerRef} className="relative aspect-video">
      <div ref={playerDivRef} className="absolute inset-0" />
      <YtcnControls
        state={state}
        onTogglePlay={controls.togglePlay}
        onSeek={controls.seekTo}
        onVolumeChange={controls.setVolume}
        onToggleMute={controls.toggleMute}
        onSpeedChange={controls.setSpeed}
        onToggleFullscreen={controls.toggleFullscreen}
        isFullscreen={state.isFullscreen}
        visible={controlsVisible}
        containerRef={containerRef}
      />
    </div>
  )
}`}
      />

      <h2 id="props" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Props
      </h2>
      <PropsTable
        props={[
          {
            name: "state",
            type: "PlayerState",
            description: "Full player state object from useYtcnPlayer.",
            required: true,
          },
          {
            name: "onTogglePlay",
            type: "() => void",
            description: "Toggle play/pause.",
            required: true,
          },
          {
            name: "onSeek",
            type: "(seconds: number) => void",
            description: "Seek to an absolute position in seconds.",
            required: true,
          },
          {
            name: "onVolumeChange",
            type: "(volume: number) => void",
            description: "Set volume from 0 to 100.",
            required: true,
          },
          {
            name: "onToggleMute",
            type: "() => void",
            description: "Toggle mute state.",
            required: true,
          },
          {
            name: "onSpeedChange",
            type: "(speed: PlaybackSpeed) => void",
            description: "Set playback speed.",
            required: true,
          },
          {
            name: "onToggleFullscreen",
            type: "() => void",
            description: "Toggle fullscreen mode.",
            required: true,
          },
          {
            name: "isFullscreen",
            type: "boolean",
            description: "Whether the player is currently in fullscreen.",
            required: true,
          },
          {
            name: "visible",
            type: "boolean",
            description:
              "Controls visibility. Managed by useIdleControls hook.",
            required: true,
          },
          {
            name: "containerRef",
            type: "RefObject<HTMLDivElement>",
            description:
              "Used to portal popovers inside the fullscreen element.",
            required: true,
          },
        ]}
      />

      <h2 id="visibility" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Visibility behavior
      </h2>
      <Callout type="info" title="Two modes">
        In windowed mode, controls appear on hover using CSS{" "}
        <code className="font-mono">group-hover</code>. In fullscreen,
        visibility is controlled by the{" "}
        <code className="font-mono">useIdleControls</code> hook, which hides
        controls after 3 seconds of mouse inactivity.
      </Callout>

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
