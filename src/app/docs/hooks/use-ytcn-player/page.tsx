import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { PropsTable } from "@/components/docs/props-table";
import { CodeBlock } from "@/components/docs/code-block";
import { Callout } from "@/components/docs/callout";
import { getPageNav } from "@/lib/navigation";

export default function UseYtcnPlayerPage() {
  const nav = getPageNav("/docs/hooks/use-ytcn-player");

  return (
    <>
      <PageHeader
        badge="Hook"
        title="useYtcnPlayer"
        description="Core hook. Returns player refs, reactive state, and imperative controls."
      />

      <h2 id="signature" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Signature
      </h2>
      <CodeBlock
        filename="signature"
        language="ts"
        code={`const { containerRef, playerDivRef, state, controls } =
  useYtcnPlayer(options)`}
      />

      <h2 id="options" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Options
      </h2>
      <PropsTable
        props={[
          {
            name: "videoId",
            type: "string",
            description: "YouTube video ID to load.",
            required: true,
          },
          {
            name: "startAt",
            type: "number",
            default: "0",
            description: "Initial playback position in seconds.",
          },
          {
            name: "onEnd",
            type: "() => void",
            description: "Called when the video finishes playing.",
          },
          {
            name: "onTimeUpdate",
            type: "(current: number, duration: number) => void",
            description:
              "Called every 250ms during playback with current time and total duration.",
          },
          {
            name: "keyboardShortcuts",
            type: "boolean",
            default: "true",
            description: "Enable built-in keyboard shortcut handling.",
          },
        ]}
      />

      <h2 id="returns-state" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Returns — State
      </h2>
      <p className="text-muted-foreground mb-4 text-sm">
        The <code className="font-mono text-foreground">state</code> object is
        reactive — it re-renders your component when any field changes.
      </p>
      <PropsTable
        props={[
          {
            name: "phase",
            type: '"thumbnail" | "loading" | "ready"',
            description:
              "Current player lifecycle phase. Thumbnail is shown first, then loading while iframe initializes, then ready when playback begins.",
          },
          {
            name: "isPlaying",
            type: "boolean",
            description: "Whether the video is currently playing.",
          },
          {
            name: "isMuted",
            type: "boolean",
            description: "Whether the video is currently muted.",
          },
          {
            name: "volume",
            type: "number",
            description: "Current volume level from 0 to 100.",
          },
          {
            name: "currentTime",
            type: "number",
            description: "Current playback position in seconds. Polled every 250ms.",
          },
          {
            name: "duration",
            type: "number",
            description: "Total video duration in seconds.",
          },
          {
            name: "loadedFraction",
            type: "number",
            description: "Buffer progress from 0 to 1.",
          },
          {
            name: "isLoading",
            type: "boolean",
            description: "True while the player is initializing.",
          },
          {
            name: "isFullscreen",
            type: "boolean",
            description: "True when in fullscreen mode.",
          },
          {
            name: "playbackRate",
            type: "0.75 | 1 | 1.5 | 2",
            description: "Currently active playback speed.",
          },
        ]}
      />

      <h2 id="returns-controls" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Returns — Controls
      </h2>
      <PropsTable
        props={[
          {
            name: "togglePlay()",
            type: "() => void",
            description: "Play or pause the video.",
          },
          {
            name: "seekTo(seconds)",
            type: "(s: number) => void",
            description: "Jump to an absolute position in seconds.",
          },
          {
            name: "seekRelative(delta)",
            type: "(d: number) => void",
            description: "Seek ±N seconds from current position.",
          },
          {
            name: "setVolume(0–100)",
            type: "(v: number) => void",
            description: "Set volume level. Also unmutes if muted.",
          },
          {
            name: "toggleMute()",
            type: "() => void",
            description: "Toggle mute state.",
          },
          {
            name: "setSpeed(speed)",
            type: "(s: PlaybackSpeed) => void",
            description: "Set playback rate to 0.75, 1, 1.5, or 2.",
          },
          {
            name: "toggleFullscreen()",
            type: "() => void",
            description: "Enter or exit fullscreen mode.",
          },
        ]}
      />

      <h2 id="stale-closure" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Stale closure warning
      </h2>
      <Callout type="warning" title="YouTube API callbacks fire outside React">
        YouTube API callbacks fire outside React&apos;s render cycle. Do not read
        state directly inside YT callbacks — read refs instead.
        useYtcnPlayer handles this internally. If you extend the hook, follow
        the same ref-sync pattern.
      </Callout>
      <CodeBlock
        filename="stale-closure.ts"
        language="ts"
        code={`// ❌ WRONG — state.volume is stale inside YT callback
onReady: () => player.setVolume(state.volume)

// ✅ CORRECT — ref is always current
onReady: () => player.setVolume(volumeRef.current)`}
      />

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
