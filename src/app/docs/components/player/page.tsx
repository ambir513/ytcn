import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { PropsTable } from "@/components/docs/props-table";
import { CodeBlock } from "@/components/docs/code-block";
import { Callout } from "@/components/docs/callout";
import { getPageNav } from "@/lib/navigation";

export default function PlayerPage() {
  const nav = getPageNav("/docs/components/player");

  return (
    <>
      <PageHeader
        badge="Component"
        title="Player"
        description="The top-level composed YouTube player component."
      />

      <h2 id="installation" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Installation
      </h2>
      <CodeBlock
        code="npx shadcn@latest add https://ytcn.dev/r/player.json"
        language="bash"
      />

      <h2 id="usage" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Usage
      </h2>
      <CodeBlock
        filename="components/my-player.tsx"
        code={`"use client"

import { YtcnPlayer } from "@/components/ytcn/ytcn-player"

export function MyPlayer() {
  return (
    <YtcnPlayer
      videoId="dQw4w9WgXcQ"
      startAt={0}
      onEnd={() => console.log("Video ended")}
      onTimeUpdate={(current, duration) => {
        console.log(\`\${Math.floor(current)}s / \${Math.floor(duration)}s\`)
      }}
    />
  )
}`}
      />

      <h2 id="props" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Props
      </h2>
      <PropsTable
        props={[
          {
            name: "videoId",
            type: "string",
            description:
              '11-character YouTube video ID extracted from any YouTube URL. Example: "dQw4w9WgXcQ"',
            required: true,
          },
          {
            name: "startAt",
            type: "number",
            default: "0",
            description:
              "Resume playback from this position in seconds. Useful for LMS progress tracking.",
          },
          {
            name: "onEnd",
            type: "() => void",
            description:
              "Fired when video reaches the end. Use for auto-advance in playlists or course completion.",
          },
          {
            name: "onTimeUpdate",
            type: "(current: number, duration: number) => void",
            description:
              "Polled every 250ms during playback. Throttle writes to avoid excessive database calls.",
          },
          {
            name: "keyboardShortcuts",
            type: "boolean",
            default: "true",
            description:
              "Enables built-in keyboard shortcuts. Disable if your app has conflicting key bindings.",
          },
          {
            name: "className",
            type: "string",
            description: "Applied to the outermost container div.",
          },
        ]}
      />

      <h2 id="keyboard-shortcuts" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Keyboard Shortcuts
      </h2>
      <div className="border border-border rounded-lg overflow-hidden my-6">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Key
              </th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Space", "Play / Pause"],
              ["F", "Toggle fullscreen"],
              ["M", "Toggle mute"],
              ["←", "Seek back 10 seconds"],
              ["→", "Seek forward 10 seconds"],
            ].map(([key, action]) => (
              <tr
                key={key}
                className="border-t border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <kbd className="rounded bg-muted border border-border px-2 py-0.5 font-mono text-xs text-foreground">
                    {key}
                  </kbd>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="note" title="Input safety">
        Shortcuts are automatically disabled when focus is on an input,
        textarea, or contenteditable element.
      </Callout>

      <h2 id="source" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Source
      </h2>
      <p className="text-muted-foreground text-sm">
        <a
          href="https://github.com/nicholasxjy/ytcn/blob/main/src/components/ytcn/ytcn-player.tsx"
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline underline-offset-4 hover:text-foreground/80"
        >
          View source on GitHub →
        </a>
      </p>

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
